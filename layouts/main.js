import Base from './base';
import PropTypes from 'prop-types';
import { Link } from '../components/anchor';
import glamorous, { Div } from 'glamorous';

const Logo = glamorous.span({
  display: 'inline-block',
  padding: '.25em .5em',
  marginBottom: '1em',
  border: '2px solid black',
  color: 'black',
  fontSize: 20
});

const MainLayout = ({ children }) => (
  <Base>
    <Div textAlign="center">
      <Link route="about">
        <Logo>disquisition.net</Logo>
      </Link>
    </Div>

    {children}
  </Base>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
