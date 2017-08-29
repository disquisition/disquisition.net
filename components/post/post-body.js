import PropTypes from 'prop-types';
import React from 'react';
import toH from 'hast-to-hyperscript';

const createElementFactory = (aliases = {}) => (name, attrs, children) => {
  const component = aliases[name];

  return React.createElement(component || name, attrs, children);
};

const PostBody = ({ aliases, hast }) => {
  // toH requires an element at the HAST root
  if (hast.type === 'root') {
    hast = Object.assign({}, hast, {
      type: 'element',
      tagName: 'div'
    });
  }

  return toH(createElementFactory(aliases), hast);
};

PostBody.propTypes = {
  aliases: PropTypes.object,
  hast: PropTypes.object.isRequired
};

export default PostBody;
