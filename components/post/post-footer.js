import A from '../anchor';
import { Footer } from 'glamorous';

export default () => (
  <Footer margin="1.5em 0">
    <em>
      Spenser Isdahl is a front-end software developer based in Chicago, IL.
      He is currently
      {' '}
      <A href="mailto:scisdahl@gmail.com?subject=Join Our Team!">
        available for hire
      </A>
      .
    </em>
  </Footer>
);
