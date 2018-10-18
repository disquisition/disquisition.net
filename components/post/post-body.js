import PropTypes from 'prop-types';
import React from 'react';
import toH from 'hast-to-hyperscript';

const createElementFactory = (aliases = {}) => (name, attrs, children) => {
  const component = aliases[name];

  return React.createElement(component || name, attrs, children);
};

export default function PostBody({ aliases, hast }) {
  return toH(createElementFactory(aliases), hast);
}

PostBody.propTypes = {
  aliases: PropTypes.object,
  hast: PropTypes.object.isRequired
};
