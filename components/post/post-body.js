import A from '../anchor';
import Code from '../code';
import Hr from '../horizontal-rule';
import P from '../paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import SectionHeader from './section-header';
import Sup from '../superscript';
import toH from 'hast-to-hyperscript';

const componentAliases = {
  a: A,
  code: Code,
  h1: () => null,
  h2: SectionHeader,
  hr: Hr,
  p: P,
  sup: Sup
};

const createElement = (name, attrs, children) => {
  const component = componentAliases[name];

  return React.createElement(component || name, attrs, children);
};

const PostBody = ({ hast }) => {
  // toH requires an element at the HAST root
  if (hast.type === 'root') {
    hast = Object.assign({}, hast, {
      type: 'element',
      tagName: 'div'
    });
  }

  return toH(createElement, hast);
};

PostBody.propTypes = {
  hast: PropTypes.object.isRequired
};

export default PostBody;
