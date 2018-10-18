import styled from 'react-emotion';

const List = styled.ul`
  list-style-type: square;
  padding-left: 1rem;

  li {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    @media print {
      margin-bottom: 0.25rem;
    }
  }
`;

export default List;
