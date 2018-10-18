import PropTypes from 'prop-types';
import React from 'react';
import { css, cx } from 'react-emotion';

const resumeBodyStyle = css`
  display: grid;

  @media print, screen and (min-width: 800px) {
    grid-template-columns: repeat(2, calc(50% - 1em));
    grid-column-gap: 2em;
  }

  @media screen and (max-width: 800px) {
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 2em;
  }
`;

export default function ResumeBody({ children, className, ...props }) {
  if (React.Children.count(children) !== 2) {
    throw new Error('ResumeBody requires exactly two children.');
  }

  return (
    <div {...props} className={cx(resumeBodyStyle, className)}>
      {children}
    </div>
  );
}

ResumeBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
