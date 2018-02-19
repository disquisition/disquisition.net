import glamorous from 'glamorous';

const SectionBody = glamorous.section(
  {
    paddingLeft: '1.25rem',
    borderLeftWidth: 3,
    borderLeftStyle: 'solid',
    '> :last-child': {
      marginBottom: 0
    },
    ' *': {
      marginTop: 0
    },
    '@media print': {
      borderLeftWidth: 1
    }
  },
  ({ theme }) => ({
    fontFamily: theme.resume.fonts.serif,
    borderLeftColor: theme.resume.colors.highlight
  })
);

export default SectionBody;
