import styled from 'react-emotion';

const Paragraph = styled.p`
  margin: 1em 0;
  text-align: ${props => (props.center ? 'center' : 'left')};
`;

export default Paragraph;
