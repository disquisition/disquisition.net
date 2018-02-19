import glamorous from 'glamorous';

const Paragraph = glamorous.p(
  {
    margin: '1em 0'
  },
  ({ center }) => ({
    textAlign: center ? 'center' : 'left'
  })
);

export default Paragraph;
