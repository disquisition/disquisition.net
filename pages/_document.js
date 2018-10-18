import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  constructor(props, ...rest) {
    super(props, ...rest);

    const { __NEXT_DATA__, ids } = props;

    if (ids) {
      __NEXT_DATA__.emotion_cache = ids;
    }
  }

  render() {
    return (
      <html lang="en-US">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/images/favicon.ico"
          />

          <link
            rel="alternate"
            type="application/atom+xml"
            href="/feeds/atom"
          />
          <link rel="alternate" type="application/json" href="/feeds/json" />
          <link rel="alternate" type="application/rss+xml" href="/feeds/rss" />

          <link rel="stylesheet" href="/static/css/atom-one-light.css" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
