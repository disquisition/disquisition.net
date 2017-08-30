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

let _allPosts = [];
let _postIndex = {};
let _isIndexing$ = new BehaviorSubject(true);

async function _runQuery(query = {}) {
  await _waitForIndexing();

  let posts = _allPosts;

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

async function _waitForIndexing() {
  return _isIndexing$.find(i => !i).toPromise();
}

// public API

async function queryAllPosts(query = {}) {
  return _runQuery(query);
}

async function queryPosts(query = {}) {
  query = Object.assign(query, {
    filter: Object.assign(query.filter || {}, { published: true })
  });

  return _runQuery(query);
}

async function getPost(key, query = {}) {
  await _waitForIndexing();

  let post = _postIndex[key];

  if (query.select) {
    post = pick(post, query.select);
  }

  return post;
}

async function indexPosts(dirpath) {
  _isIndexing$.next(true);

  const files = (await readDir(dirpath)).filter(file => file.match(/\.md$/));

  _postIndex = {};
  _allPosts = [];

  await Promise.all(
    files.map(async file => {
      const filePath = path.join(dirpath, file);
      const contents = await readFile(filePath);
      const post = await parsePost(file, contents);

      _postIndex[post.slug] = post;
      _allPosts.push(post);
    })
  );

  _allPosts.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    } else if (a.timestamp > b.timestamp) {
      return -1;
    }

    return 0;
  });

  _isIndexing$.next(false);
}

function watchPosts(dirpath) {
  const watcher = sane(dirpath, { glob: ['*.md'] });
  const cb = () => indexPosts(dirpath);

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
