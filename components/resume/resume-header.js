import Line from './line';
import TextLink from './text-link';
import themes from '../../themes';
import styled, { css, cx } from 'react-emotion';
import PropTypes from 'prop-types';

const resumeHeaderStyle = css`
  color: ${themes.resume.colors.strong};
  font-family: ${themes.resume.fonts.mono};
  text-align: center;
  margin-bottom: 2rem;
`;

const ResumeHeading = styled.h1`
  letter-spacing: 0.25rem;
  text-transform: uppercase;
  margin-bottom: 0;

  @media print {
    margin-top: 0;
  }
`;

const StarBar = styled(Line)`
  font-size: 1.5em;
  color: ${themes.resume.colors.highlight};

  &::before {
    content: '✶ ✶ ✶ ✶';
  }
`;

export default function ResumeHeader({ className, ...props }) {
  return (
    <header className={cx(resumeHeaderStyle, className)} {...props}>
      <ResumeHeading>Spenser Isdahl</ResumeHeading>

      <StarBar />

      <Line>
        <TextLink href="https://disquisition.net" target="_blank">
          disquisition.net
        </TextLink>
        {' / '}
        <TextLink href="https://github.com/disquisition" target="_blank">
          github.com/disquisition
        </TextLink>
      </Line>
      <Line>scisdahl@gmail.com</Line>
      <Line>{process.env.PHONE_NUMBER}</Line>
    </header>
  );
}

ResumeHeader.propTypes = {
  className: PropTypes.string
};
