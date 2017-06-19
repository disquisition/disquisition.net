/* eslint-env node */
const hljs = require('highlight.js');
const markdownIt = require('markdown-it');
const moment = require('moment');
const parse = require('rehype-parse');
const typeset = require('typeset');
const unified = require('unified');
const yamlFront = require('yaml-front-matter');

function stringify() {
  // "Compile" to HAST
  this.Compiler = tree => tree;
}

const markdownItOptions = {
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs language-${lang}">${hljs.highlight(lang, str).value}</code></pre>`;
      } catch (err) {
        /* empty */
      }
    }

    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
  }
};

const md = markdownIt(markdownItOptions)
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-named-headers'));

const hast = unified().use(parse, { fragment: true }).use(stringify);

function _toAST(content) {
  const html = typeset(md.render(content), {
    enable: ['hyphenate', 'spaces']
  });

  return hast.processSync(html).contents;
}

function _toDate(file) {
  const date = file.match(/(\d{4}-\d{2}-\d{2})-.*\.md$/)[1];

  return moment.utc(date, 'YYYY-MM-DD').format('MMMM Do, YYYY');
}

function _toSlug(file) {
  return file.match(/\d{4}-\d{2}-\d{2}-(.*)\.md$/)[1];
}

function _toTimestamp(file) {
  const date = file.match(/(\d{4}-\d{2}-\d{2})-.*\.md$/)[1];

  return moment.utc(date, 'YYYY-MM-DD').valueOf();
}

function _toTitle(content) {
  const m = content.match(/^\s*# ([^\r\n]*)[\r\n]/m);

  return m ? m[1] : null;
}

module.exports = function parsePost(file, content) {
  const results = yamlFront.loadFront(content);
  const post = Object.assign({}, results, {
    content: _toAST(results.__content),
    title: _toTitle(results.__content),
    slug: _toSlug(file),
    date: _toDate(file),
    timestamp: _toTimestamp(file)
  });

  delete post.__content;

  return post;
};
