import PropTypes from 'prop-types';
import { css, cx } from 'emotion';

export const postFooterStyle = css`
  font-style: italic;
  margin: 1.5em 0;
`;

export default function PostFooter({ className, ...props }) {
  return (
    <footer className={cx(postFooterStyle, className)} {...props}>
      Spenser Isdahl is a front-end software developer based in Chicago, IL.
    </footer>
  );
}

PostFooter.propTypes = {
  className: PropTypes.string
};
