/* eslint-env node */
const { BehaviorSubject } = require('rxjs/BehaviorSubject');
const defaultTo = require('lodash/defaultTo');
const fs = require('fs');
const path = require('path');
const pick = require('lodash/pick');
const sane = require('sane');
const toPairs = require('lodash/toPairs');
const util = require('util');

require('rxjs/add/operator/find');
require('rxjs/add/operator/toPromise');

const parsePost = require('./lib/parse-post');

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

let allPosts = [];
let postIndex = {};
let isIndexing = new BehaviorSubject(true);

async function runQuery(query = {}) {
  await waitForIndexing();

  let posts = allPosts;

  if (query.filter) {
    toPairs(query.filter).forEach(([key, value]) => {
      posts = posts.filter(post => {
        const postValue = defaultTo(post[key], false);

        return Array.isArray(postValue)
          ? postValue.includes(value)
          : postValue === value;
      });
    });
  }

  if (query.select) {
    posts = posts.map(post => pick(post, query.select));
  }

  if (query.limit) {
    posts = posts.slice(0, query.limit);
  }

  return posts;
}

async function waitForIndexing() {
  return isIndexing.find(i => !i).toPromise();
}

// public API

async function queryAllPosts(query = {}) {
  return runQuery(query);
}

async function queryPosts(query = {}) {
  query = Object.assign(query, {
    filter: Object.assign(query.filter || {}, { published: true })
  });

  return runQuery(query);
}

async function getPost(key, query = {}) {
  await waitForIndexing();

  let post = postIndex[key];

  if (query.select) {
    post = pick(post, query.select);
  }

  return post;
}

async function indexPosts(dirpath) {
  isIndexing.next(true);

  const files = (await readDir(dirpath)).filter(file => file.match(/\.md$/));

  postIndex = {};
  allPosts = [];

  await Promise.all(
    files.map(async file => {
      const filePath = path.join(dirpath, file);
      const contents = await readFile(filePath);
      const post = await parsePost(file, contents);

      postIndex[post.slug] = post;
      allPosts.push(post);
    })
  );

  allPosts.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    } else if (a.timestamp > b.timestamp) {
      return -1;
    }

    return 0;
  });

  isIndexing.next(false);
}

function watchPosts(dirpath) {
  let queue = Promise.resolve();
  const watcher = sane(dirpath, { glob: ['*.md'] });
  const cb = () => {
    queue = queue.then(() => indexPosts(dirpath));
  };

  watcher.on('ready', cb);
  watcher.on('change', cb);
  watcher.on('add', cb);
  watcher.on('delete', cb);

  return () => watcher.close();
}

module.exports = {
  getPost,
  queryPosts,
  queryAllPosts,
  indexPosts,
  watchPosts
};
