/* eslint-env node */
const fs = require('fs');
const path = require('path');
const sane = require('sane');

const parsePost = require('./lib/parsePost');

// let postFields = [
//   "shorturl",
//   "title",
//   "abstract",
//   "content",
//   "date",
//   "published",
//   "tags",
//   "headerimg",
//   "headerimgfull",
//   "readnext",
//   "assets"
// ];

let _postIndex = {};
let _allPosts = [];
// let _sqliteDb;

// function _getPosts(keys) {
//   return keys.map(k => _postIndex[k]);
// }

function _runQuery(opts) {
  opts = opts || {};
  let posts = _allPosts;

  if (opts.filter) {
    for (let name in opts.filter) {
      posts = posts.filter(post => {
        if (post[name] && post[name].length) {
          return post[name].indexOf(opts.filter[name]) !== -1;
        }

        const val = post[name] === undefined ? false : post[name];
        return val === opts.filter[name];
      });
    }
  }

  // if (opts.select) {
  //     posts = posts.map(x => {
  //         return t.toObj(opts.select, t.map(name => [name, x[name]]));
  //     });
  // }

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

function indexPosts(dirpath) {
  _postIndex = {};
  _allPosts = [];

  fs.readdirSync(dirpath).forEach(file => {
    if (!file.match(/\.md$/)) {
      return;
    }

    const contents = fs.readFileSync(path.join(dirpath, file));
    const post = parsePost(file, contents);

    _postIndex[post.slug] = post;
    _allPosts.push(post);
  });

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
