import Line from './line';
import TextLink from './text-link';
import glamorous from 'glamorous';

const BuiltWithWrapper = glamorous.div(
  {
    textAlign: 'center',
    margin: '2rem 1rem',
    '@media print': {
      marginBottom: 0
    }
  },
  ({ theme }) => ({
    fontFamily: theme.resume.fonts.mono
  })
);

export default () => (
  <BuiltWithWrapper>
    <Line>This document was built with React</Line>
    <Line>
      Check it out on the web at{' '}
      <TextLink href="https://disquisition.net/resume">
        disquisition.net/resume
      </TextLink>
    </Line>
  </BuiltWithWrapper>
);
