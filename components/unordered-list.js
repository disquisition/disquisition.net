import styled from 'react-emotion';

const UnorderedList = styled.ul`
  padding-left: ${props => (props.inline || props.unstyled ? '0' : '2em')};
  list-style-type: ${props =>
    props.inline || props.unstyled ? 'none' : 'disc'};

  li {
    display: ${props => (props.inline ? 'inline-block' : null)};
    padding-left: ${props => (props.inline ? '1em' : null)};

    &:first-of-type {
      padding-left: ${props => (props.inline ? 0 : null)};
    }
  }
`;

export default UnorderedList;
