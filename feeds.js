const Feed = require('feed');
const express = require('express');
const max = require('lodash/max');
const { queryPosts } = require('./db');

async function _getFeed() {
  const posts = await queryPosts({ limit: 10 });
  const lastUpdated = max(posts.map(p => p.timestamp));

  const feed = new Feed({
    title: 'disquisition.net',
    description: "Spenser Isdahl's blog",
    id: 'https://disquisition.net',
    link: 'https://disquisition.net',
    image: 'https://disquisition.net/static/image/disquisition-net-logo.jpg',
    favicon: 'https://disquisition.net/static/image/favicon.ico',
    copyright: `© ${new Date().getFullYear()} Spenser Isdahl. All Rights Reserved.`,
    updated: new Date(lastUpdated),
    feedLinks: {
      atom: 'https://disquisition.net/feeds/atom',
      json: 'https://disquisition.net/feeds/json',
      rss: 'https://disquisition.net/feeds/rss'
    },
    author: {
      name: 'Spenser Isdahl',
      email: 'scisdahl@gmail.com',
      link: 'https://disquisition.net'
    }
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `https://disquisition.net/blog/${post.slug}`,
      link: `https://disquisition.net/blog/${post.slug}`,
      description: post.description,
      content: post.html,
      author: [
        {
          name: 'Spenser Isdahl',
          email: 'scisdahl@gmail.com',
          link: 'https://disquisition.net'
        }
      ],
      date: new Date(post.timestamp),
      image: post.image.link
    });
  });

  return feed;
}

const feeds = express();

feeds.get('/atom', async (req, res) => {
  const feed = await _getFeed();

  res.set('Content-Type', 'text/xml');
  res.send(feed.atom1());
});

feeds.get('/json', async (req, res) => {
  const feed = await _getFeed();

  res.set('Content-Type', 'application/json');
  res.send(feed.json1());
});

feeds.get('/rss', async (req, res) => {
  const feed = await _getFeed();

  res.set('Content-Type', 'text/xml');
  res.send(feed.rss2());
});

module.exports = feeds;
