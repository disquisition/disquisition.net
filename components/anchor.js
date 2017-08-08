import glamorous from 'glamorous';
import { Link as RouterLink } from '../routes';

const WrappedAnchor = ({ children, ...props }) => {
  const rel = props.target === '_blank' ? 'noopenner noreferrer' : null;

  return <a rel={rel} {...props}>{children}</a>;
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
