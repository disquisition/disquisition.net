import glamorous from 'glamorous';

export default glamorous.p({
  fontSize: '0.8rem',
  letterSpacing: '0.1rem',
  textTransform: 'uppercase',
  marginBottom: '1rem',
  '@media print': {
    fontSize: '0.6rem',
    marginBottom: '0.5rem'
  }
});
