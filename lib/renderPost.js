import A from '../components/anchor';
import Code from '../components/code';
import Hr from '../components/horizontal-rule';
import P from '../components/paragraph';
import PostHeader from '../components/post-header';
import React from 'react';
import SectionHeader from '../components/section-header';
import Sup from '../components/superscript';
import toH from 'hast-to-hyperscript';

const componentAliases = {
  a: A,
  code: Code,
  h1: PostHeader,
  h2: SectionHeader,
  hr: Hr,
  p: P,
  sup: Sup
};

const createPost = post => (name, attrs, children) => {
  const component = componentAliases[name];

  return component
    ? React.createElement(component, { post, ...attrs }, children)
    : React.createElement(name, attrs, children);
};

export default post => {
  let hast = post.content;

  // toH requires an element at the HAST root
  if (hast.type === 'root') {
    hast = Object.assign({}, hast, {
      type: 'element',
      tagName: 'div'
    });
  }

  return toH(createPost(post), hast);
};
