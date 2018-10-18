import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import themes from '../../themes';

function toId(children) {
  return typeof children === 'string'
    ? children
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
    : null;
}

export const postHeaderStyle = css`
  color: ${themes.main.color};
  line-height: 1.4;

  .heading {
    margin-top: 1rem;
    margin-bottom: 0;
  }
`;

export default function PostHeader({ children, className, date, ...props }) {
  return (
    <header className={cx(postHeaderStyle, className)} {...props}>
      <h1 id={toId(children)} className="heading">
        {children}
      </h1>

      <span>{date}</span>
    </header>
  );
}

PostHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  date: PropTypes.string.isRequired
};
