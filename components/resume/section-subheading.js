import glamorous from 'glamorous';

export default glamorous.h3(
  {
    fontSize: '1rem',
    letterSpacing: '0.1rem',
    fontWeight: 'normal',
    textTransform: 'uppercase',
    margin: '0 0 0.5rem',
    ':not(:first-child)': {
      marginTop: '1.5rem'
    },
    '@media print': {
      fontSize: '.85rem',
      margin: '0 0 0.25rem'
    }
  },
  ({ theme }) => ({
    color: theme.resume.colors.strong
  })
);
