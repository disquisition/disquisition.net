import A from '../components/anchor';
import Head from 'next/head';
import Page from '../layouts/main';
import UL from '../components/unordered-list';
import styled from 'react-emotion';

const canonical = 'https://disquisition.net/';
const description =
  'My name is Spenser Isdahl. I’m a software engineer based in Chicago, IL. I’m currently engineering Conversant.';

const Box = styled.div`
  padding: 1em 2em;
  background-color: lightcyan;
  max-width: 30em;
  margin: auto;
`;

const Center = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function AboutPage() {
  return (
    <Page>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta name="description" content={description} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'WebSite',
              url: canonical,
              description: description
            })
          }}
        />
      </Head>

      <Center>
        <Box>
          <p>My name is Spenser Isdahl.</p>

          <p>I’m a software engineer based in Chicago, IL.</p>

          <p>
            I’m currently engineering{' '}
            <A href="https://conversantmedia.com" target="_blank">
              Conversant
            </A>
            .
          </p>

          <UL inline>
            <li>
              <span role="img" aria-label="notebook">
                📓
              </span>{' '}
              <A route="blog" prefetch>
                Blog
              </A>
            </li>
            <li>
              <span role="img" aria-label="floppy disc">
                💾
              </span>{' '}
              <A href="https://github.com/disquisition" target="_blank">
                GitHub
              </A>
            </li>
            <li>
              <span role="img" aria-label="mailbox">
                📬
              </span>{' '}
              <A href="mailto:scisdahl@gmail.com">E-mail</A>
            </li>
          </UL>
        </Box>
      </Center>
    </Page>
  );
}
