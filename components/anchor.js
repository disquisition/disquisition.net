import PropTypes from 'prop-types';
import { css, cx } from 'emotion';
import isRelativeUrl from 'is-relative-url';
import isUrlFragment from '../lib/is-url-fragment';
import { Link as RouterLink } from '../routes';
import themes from '../themes';

const anchorStyle = css`
  text-decoration: none;
  color: ${themes.main.color};

  &:hover {
    text-decoratio: underline;
  }
`;

function WrappedAnchor({ children, className, ...props }) {
  const rel = props.target === '_blank' ? 'noopener noreferrer' : null;

  return (
    <a rel={rel} className={cx(anchorStyle, className)} {...props}>
      {children}
    </a>
  );
}

WrappedAnchor.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  target: PropTypes.string
};

/* eslint-disable jsx-a11y/anchor-is-valid */
function WrappedLink({ children, className, ...props }) {
  return (
    <RouterLink {...props}>
      <a className={cx(anchorStyle, className)}>{children}</a>
    </RouterLink>
  );
}
/* eslint-enable jsx-a11y/anchor-is-valid */

WrappedLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default function Anchor(props) {
  const { href, route, to } = props;

  if (route || to || (isRelativeUrl(href) && !isUrlFragment(href))) {
    const newProps = {
      ...props,
      href: undefined,
      route: route || to || href
    };

    return <WrappedLink {...newProps} />;
  } else {
    return <WrappedAnchor {...props} />;
  }
}

Anchor.propTypes = {
  href: PropTypes.string,
  route: PropTypes.string,
  to: PropTypes.string
};
