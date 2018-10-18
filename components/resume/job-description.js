import styled from 'react-emotion';

const JobDescription = styled.p`
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  margin-bottom: 1rem;

  @media print {
    font-size: 0.6rem;
    margin-bottom: 0.5rem;
  }
`;

export default JobDescription;
