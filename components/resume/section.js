import PropTypes from 'prop-types';
import SectionBody from './section-body';
import SectionHeading from './section-heading';
import { css, cx } from 'emotion';

export const sectionStyle = css`
  margin: 1rem 0 2rem;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function Section({ children, className, title, ...props }) {
  return (
    <div className={cx(sectionStyle, className)} {...props}>
      <SectionHeading>{title}</SectionHeading>

      <SectionBody>{children}</SectionBody>
    </div>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired
};
