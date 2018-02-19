import glamorous from 'glamorous';

const JobDescription = glamorous.p({
  fontSize: '0.8rem',
  letterSpacing: '0.1rem',
  textTransform: 'uppercase',
  marginBottom: '1rem',
  '@media print': {
    fontSize: '0.6rem',
    marginBottom: '0.5rem'
  }
});

export default JobDescription;
