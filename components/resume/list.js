import glamorous from 'glamorous';

export default glamorous.ul({
  listStyleType: 'square',
  paddingLeft: '1rem',
  ' li': {
    marginBottom: '0.5rem',
    ':last-child': {
      marginBottom: 0
    },
    '@media print': {
      marginBottom: '0.25rem'
    }
  }
});
