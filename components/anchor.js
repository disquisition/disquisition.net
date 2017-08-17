import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import isRelativeUrl from 'is-relative-url';
import isUrlFragment from '../lib/is-url-fragment';
import { Link as RouterLink } from '../routes';

const styles = [
  {
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' }
  },
  ({ theme }) => ({
    color: theme.main.color
  })
];

const WrappedAnchor = ({ children, ...props }) => {
  const rel = props.target === '_blank' ? 'noopener noreferrer' : null;

  return <a rel={rel} {...props}>{children}</a>;
};

WrappedAnchor.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string
};

export const StyledAnchor = glamorous(WrappedAnchor, { rootEl: 'a' })(
  ...styles
);

/* eslint-disable jsx-a11y/anchor-is-valid */
const WrappedLink = ({ children, className, ...props }) => (
  <RouterLink {...props}>
    <a className={className}>
      {children}
    </a>
  </RouterLink>
);
/* eslint-enable jsx-a11y/anchor-is-valid */

WrappedLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export const StyledLink = glamorous(WrappedLink)(...styles);

const Anchor = props => {
  const { href, route, to } = props;

  if (route || to || (isRelativeUrl(href) && !isUrlFragment(href))) {
    const newProps = Object.assign({}, props, {
      href: undefined,
      route: route || to || href
    });

    return <StyledLink {...newProps} />;
  } else {
    return <StyledAnchor {...props} />;
  }
};

Anchor.propTypes = {
  href: PropTypes.string,
  route: PropTypes.string,
  to: PropTypes.string
};

export default Anchor;
