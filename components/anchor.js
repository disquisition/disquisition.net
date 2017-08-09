import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { Link as RouterLink } from '../routes';

const WrappedAnchor = ({ children, ...props }) => {
  const rel = props.target === '_blank' ? 'noopener noreferrer' : null;

  return <a rel={rel} {...props}>{children}</a>;
};

WrappedAnchor.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string
};

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
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  className: PropTypes.string
};

const styles = [
  {
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' }
  },
  ({ theme }) => ({
    color: theme.main.color
  })
];

export default glamorous(WrappedAnchor, { rootEl: 'a' })(...styles);
export const Link = glamorous(WrappedLink)(...styles);
