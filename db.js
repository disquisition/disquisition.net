/* eslint-env node */
const defaultTo = require('lodash/defaultTo');
const fs = require('fs');
const path = require('path');
const pick = require('lodash/pick');
const sane = require('sane');
const toPairs = require('lodash/toPairs');
const util = require('util');

const parsePost = require('./lib/parse-post');

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

let _postIndex = {};
let _allPosts = [];

const defaultQueryOpts = {
  select: ['date', 'slug', 'title']
};

function _runQuery(opts = {}) {
  opts = Object.assign({}, defaultQueryOpts, opts);

  let posts = _allPosts;

  if (opts.filter) {
    toPairs(opts.filter).forEach(([key, value]) => {
      posts = posts.filter(post => {
        const postValue = defaultTo(post[key], false);

        return Array.isArray(postValue)
          ? postValue.includes(value)
          : postValue === value;
      });
    });
  }

  if (opts.select) {
    posts = posts.map(post => pick(post, opts.select));
  }

  if (opts.limit) {
    posts = posts.slice(0, opts.limit);
  }

  return posts;
}

// public API

function queryAllPosts(query = {}) {
  return _runQuery(query);
}

function queryPosts(query = {}) {
  query = Object.assign(query, {
    filter: Object.assign(query.filter || {}, { published: true })
  });

  return _runQuery(query);
}

function getPost(key) {
  return _postIndex[key];
}

async function indexPosts(dirpath) {
  _postIndex = {};
  _allPosts = [];

  const files = await readDir(dirpath);

  await Promise.all(
    files
      .filter(file => {
        return file.match(/\.md$/);
      })
      .map(async file => {
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
