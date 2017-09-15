import PropTypes from 'prop-types';
import SectionBody from './section-body';
import SectionHeading from './section-heading';
import glamorous from 'glamorous';

const Section = ({ children, className, title }) => (
  <div className={className}>
    <SectionHeading>{title}</SectionHeading>

    <SectionBody>{children}</SectionBody>
  </div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default glamorous(Section)({
  margin: '1rem 0 2rem',
  ':first-child': {
    marginTop: 0
  },
  ':last-child': {
    marginBottom: 0
  }
});
