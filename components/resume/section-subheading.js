import themes from '../../themes';
import styled from 'react-emotion';

const SectionSubheading = styled.h3`
  color: ${themes.resume.colors.strong};
  font-size: 1rem;
  letter-spacing: 0.1rem;
  font-weight: normal;
  text-transform: uppercase;
  margin: 0 0 0.5rem;

  &:not(:first-child) {
    margin-top: 1.5rem;
  }

  @media print {
    font-size: 0.85rem;
    margin: 0 0 0.25rem;
  }
`;

export default SectionSubheading;
