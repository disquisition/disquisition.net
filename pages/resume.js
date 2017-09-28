import Head from 'next/head';
import Page from '../layouts/base';
import Resume from '../components/resume';

export default () => (
  <Page>
    <Head>
      <title>Spenser Isdahl’s résumé</title>
      <meta name="robots" content="noindex" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inconsolata:400,700|PT+Serif:400,400i,700,700i"
      />
    </Head>

    <Resume />
  </Page>
);
