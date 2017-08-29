/* eslint-env node */
require('isomorphic-unfetch');

const Unsplash = require('unsplash-js').default;
const hljs = require('highlight.js');
const markdownIt = require('markdown-it');
const moment = require('moment');
const parse = require('rehype-parse');
const typeset = require('typeset');
const unified = require('unified');
const yamlFront = require('yaml-front-matter');

const unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_APP_ID,
  secret: process.env.UNSPLASH_APP_SECRET
});

function hastify() {
  // This cuts anything we won't need from the AST
  const minifyHast = ({ children, properties, tagName, type, value }) =>
    type === 'text'
      ? {
        type,
        value
      }
      : {
        children: children && children.map(minifyHast),
        properties,
        tagName: tagName || 'div',
        type: type === 'root' ? 'element' : type
      };

  // "Compile" to HAST
  this.Compiler = minifyHast;
}

const markdownItOptions = {
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(lang, str).value;

        return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
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

const hast = unified()
  .use(parse, { fragment: true })
  .use(hastify);

async function _getUnsplashImage(unsplashPhotoId) {
  const width = 720;
  const res = await unsplash.photos.getPhoto(unsplashPhotoId, width);
  const json = await res.json();

  return {
    link: json.urls.custom,
    width: width,
    height: Math.round(width * json.height / json.width),
    description: json.description,
    user: {
      name: json.user.name,
      link: json.user.links.html
    }
  };
}

function _toAST(content) {
  const html = _toHTML(content);

  return hast.processSync(html).contents;
}

function _toDate(file) {
  const date = file.match(/(\d{4}-\d{2}-\d{2})-.*\.md$/)[1];

  return moment.utc(date, 'YYYY-MM-DD').format('MMMM Do, YYYY');
}

function _toHTML(content) {
  return typeset(md.render(content), {
    enable: ['hyphenate', 'spaces']
  });
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

module.exports = async (file, content) => {
  const results = yamlFront.loadFront(content);
  const post = Object.assign({}, results, {
    content: _toAST(results.__content),
    html: _toHTML(results.__content),
    image: await _getUnsplashImage(results.unsplash_photo_id),
    date: _toDate(file),
    slug: _toSlug(file),
    timestamp: _toTimestamp(file),
    title: _toTitle(results.__content)
  });

  delete post.__content;
  delete post.unsplash_photo_id;

  return post;
};
