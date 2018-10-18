import PropTypes from 'prop-types';
import { css, cx } from 'emotion';

export const codeFontStyle = css`
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, monospace;
  font-size: 90%;
`;

export const codeLayoutStyle = css`
  background-color: #f5f5f5;
  padding: 2px 0;
  border-radius: 3px;

  &::before,
  &::after {
    content: '\\00a0';
    letter-spacing: -0.2em;
  }
`;

export default function Code({ children, className, ...props }) {
  const isHighlighted = className && className.includes('hljs');

  return (
    <code
      className={cx(
        codeFontStyle,
        { [codeLayoutStyle]: !isHighlighted },
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}

Code.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
