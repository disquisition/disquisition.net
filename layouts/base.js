import Head from 'next/head';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import themes from '../themes';
import { Router } from '../routes';
import { css, rehydrate } from 'glamor';
import { ThemeProvider } from 'glamorous';

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.glamor_cache);
}

css.global('*', { boxSizing: 'border-box' });
css.global('body', {
  padding: '1em 2em',
  margin: 0,
  font: `${themes.main.fontSize}px ${themes.main.fontFamily}`,
  WebkitFontSmoothing: 'antialiased'
});
css.global('#nprogress', {
  pointerEvents: 'none'
});
css.global('#nprogress .bar', {
  background: themes.main.color,
  position: 'fixed',
  zIndex: 1031,
  top: 0,
  left: 0,
  width: '100%',
  height: '2px'
});
css.global('#nprogress .peg', {
  display: 'block',
  position: 'absolute',
  right: '0px',
  width: '100px',
  height: '100%',
  boxShadow: `0 0 10px ${themes.main.color}, 0 0 5px ${themes.main.color}`,
  opacity: 1,
  transform: 'rotate(3deg) translate(0px, -4px)'
});

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const BaseLayout = ({ children }) => (
  <ThemeProvider theme={themes}>
    <div>
      <Head>
        <title>disquisition.net</title>
      </Head>

      {children}
    </div>
  </ThemeProvider>
);

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default BaseLayout;
