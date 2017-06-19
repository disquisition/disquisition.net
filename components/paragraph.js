import glamorous from 'glamorous';

export default glamorous.p(
  {
    margin: '1em 0'
  },
  ({ center }) => ({
    textAlign: center ? 'center' : 'left'
  })
);
