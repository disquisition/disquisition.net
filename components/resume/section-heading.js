import themes from '../../themes';
import styled, { css, cx } from 'react-emotion';
import PropTypes from 'prop-types';

const sectionHeadingStyle = css`
  text-align: right;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1;
  margin: 0;
  margin-bottom: -1.2rem;
  transform: translate(calc(-100% + 0.66rem), -1.2rem) rotate(-90deg);
  transform-origin: right bottom;

  @media print {
    font-size: 1rem;
    margin-bottom: -1rem;
    transform: translate(calc(-100% + 0.6rem), -1rem) rotate(-90deg);
  }
`;

const SectionHeadingText = styled.span`
  color: ${themes.resume.colors.highlight};
  font-family: ${themes.resume.fonts.mono};
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  background-color: white;
  padding-left: 0.5rem;
  padding-right: 0.25rem;
  margin-right: -0.25rem;

  @media print {
    font-size: 1rem;
  }
`;

export default function SectionHeading({ children, className, ...props }) {
  return (
    <h2 className={cx(sectionHeadingStyle, className)} {...props}>
      <SectionHeadingText>{children}</SectionHeadingText>
    </h2>
  );
}

SectionHeading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
