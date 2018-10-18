import Line from './line';
import TextLink from './text-link';
import themes from '../../themes';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';

const resumeFooterStyle = css`
  font-family: ${themes.resume.fonts.mono};
  text-align: center;
  margin: 2rem 1rem;

  @media print {
    margin-bottom: 0;
  }
`;

export default function ResumeFooter({ className, ...props }) {
  return (
    <div className={cx(resumeFooterStyle, className)} {...props}>
      <Line>This document was built with React</Line>
      <Line>
        {'Check it out on the web at '}
        <TextLink href="https://disquisition.net/resume">
          disquisition.net/resume
        </TextLink>
      </Line>
    </div>
  );
}

ResumeFooter.propTypes = {
  className: PropTypes.string
};
