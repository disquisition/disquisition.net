import Base from './base';
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

export default ({ children }) => (
  <Base>
    <Div textAlign="center">
      <Link route="about">
        <Logo>disquisition.net</Logo>
      </Link>
    </Div>

    {children}
  </Base>
);
