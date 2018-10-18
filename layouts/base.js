import Head from 'next/head';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import themes from '../themes';
import { Router } from '../routes';
import { hydrate, injectGlobal } from 'emotion';

// Adds server generated styles to emotion cache. Has to run before any
// `style()` calls. `__NEXT_DATA__.emotion_cache` is set in `_document.js`.
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.emotion_cache);

  Router.onRouteChangeStart = () => NProgress.start();
  Router.onRouteChangeComplete = () => NProgress.done();
  Router.onRouteChangeError = () => NProgress.done();
}

injectGlobal`
  * { box-sizing: border-box; }

  body {
    padding: 1em 2em;
    margin: 0;
    font: ${themes.main.fontSize}px ${themes.main.fontFamily};
    -webkit-font-smoothing: antialiased
  }

  #nprogress { pointer-events: none; }

  #nprogress .bar {
    background: ${themes.main.color};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${themes.main.color}, 0 0 5px ${themes.main.color};
    opacity: 1;
    transform: rotate(3deg) translate(0px, -4px);
  }
`;

export default function BaseLayout({ children }) {
  return (
    <>
      <Head>
        <title>disquisition.net</title>
      </Head>

      {/* <ThemeProvider theme={themes}> */}
      {children}
      {/* </ThemeProvider> */}
    </>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired
};
