import styled from 'react-emotion';
import themes from '../../themes';

const SectionBody = styled.section`
  font-family: ${themes.resume.fonts.serif};
  padding-left: 1.25rem;
  border-left: 3px solid ${themes.resume.colors.highlight};

  > :last-child {
    margin-bottom: 0;
  }

  * {
    margin-top: 0;
  }

  @media print {
    border-left-width: 1;
  }
`;

export default SectionBody;
