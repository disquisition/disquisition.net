import Line from './line';
import TextLink from './text-link';
import glamorous from 'glamorous';

const StarBar = glamorous(props => <Line {...props}>✶ ✶ ✶ ✶</Line>)(
  {
    fontSize: '1.5em'
  },
  ({ theme }) => ({
    color: theme.resume.colors.highlight
  })
);

const ResumeHeading = glamorous.h1({
  letterSpacing: '.25rem',
  textTransform: 'uppercase',
  marginBottom: 0,
  '@media print': {
    marginTop: 0
  }
});

const ResumeHeader = props => (
  <header {...props}>
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

export default glamorous(ResumeHeader, { rootEl: 'header' })(
  {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  ({ theme }) => ({
    color: theme.resume.colors.strong,
    fontFamily: theme.resume.fonts.mono
  })
);
