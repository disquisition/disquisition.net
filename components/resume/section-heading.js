import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const SectionHeadingText = glamorous.span(
  {
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    letterSpacing: '.25rem',
    paddingLeft: '.5rem',
    paddingRight: '.25rem',
    backgroundColor: 'white',
    marginRight: '-.25rem',
    '@media print': {
      fontSize: '1rem'
    }
  },
  ({ theme }) => ({
    color: theme.resume.colors.highlight,
    fontFamily: theme.resume.fonts.mono
  })
);

const SectionHeading = ({ children, ...props }) => (
  <h2 {...props}>
    <SectionHeadingText>{children}</SectionHeadingText>
  </h2>
);

SectionHeading.propTypes = {
  children: PropTypes.node.isRequired
};

export default glamorous(SectionHeading, {
  rootEl: 'h2'
})({
  margin: 0,
  marginBottom: '-1.2rem',
  textAlign: 'right',
  fontWeight: 500,
  fontSize: '1.2rem',
  lineHeight: 1,
  transform: 'translate(calc(-100% + .66rem), -1.2rem) rotate(-90deg)',
  transformOrigin: 'right bottom',
  '@media print': {
    marginBottom: '-1rem',
    fontSize: '1rem',
    transform: 'translate(calc(-100% + .6rem), -1rem) rotate(-90deg)'
  }
});
