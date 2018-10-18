import A from '../components/anchor';
import Base from './base';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

export const Logo = styled.div`
  text-align: center;
`;

export const LogoText = styled.span`
  color: black;
  font-size: 24px;
  display: inline-block;
  padding: 0.125em 0.5em 0.3em;
  border: 2px solid black;
  margin-bottom: 1em;
`;

export default function MainLayout({ children }) {
  return (
    <Base>
      <Logo>
        <A route="about">
          <LogoText>disquisition.net</LogoText>
        </A>
      </Logo>

      {children}
    </Base>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};
