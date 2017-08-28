/* eslint-env node */
const express = require('express');

const { getPost, indexPosts, queryPosts, watchPosts } = require('./db');

const api = express();

api.get('/posts', (req, res) => {
  const posts = queryPosts({
    select: ['date', 'slug', 'title']
  });

  if (posts) {
    res.json(posts);
  } else {
    res.status(201).end();
  }
});

api.get('/posts/:slug', (req, res) => {
  const post = getPost(req.params.slug, {
    select: [
      'content',
      'date',
      'description',
      'image',
      'slug',
      'title',
      'timestamp'
    ]
  });

  if (post) {
    res.json(post);
  } else {
    res.status(404).end();
  }
});

if (process.env.NODE_ENV !== 'production') {
  let unwatch;

  api.on('mount', () => {
    unwatch = watchPosts('./posts');
  });

  api.on('close', () => unwatch());
} else {
  api.on('mount', () => indexPosts('./posts'));
}

module.exports = api;
