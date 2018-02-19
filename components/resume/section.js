import PropTypes from 'prop-types';
import SectionBody from './section-body';
import SectionHeading from './section-heading';
import { css } from 'glamor';

const styling = css({
  margin: '1rem 0 2rem',
  ':first-child': {
    marginTop: 0
  },
  ':last-child': {
    marginBottom: 0
  }
});

const Section = ({ children, className, title }) => (
  <div {...styling} className={className}>
    <SectionHeading>{title}</SectionHeading>

    <SectionBody>{children}</SectionBody>
  </div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default Section;
