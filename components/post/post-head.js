import Head from 'next/head';
import PropTypes from 'prop-types';

const PostHead = ({ post }) => {
  const canonical = `https://disquisition.net/blog/${post.slug}`;

  return (
    <Head>
      <title>{post.title}</title>
      <link rel="canonical" href={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@disquisition" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.description} />
      <meta name="twitter:image" content={post.image.link} />

      <meta property="og:site_name" content="disquisition.net" />
      <meta property="og:title" content={post.title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={post.description} />
      <meta property="og:image" content={post.image.link} />
      <meta property="og:image:width" content={post.image.width} />
      <meta property="og:image:height" content={post.image.height} />
      <meta property="og:type" content="article" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'NewsArticle',
            mainEntityOfPage: canonical,
            headline: post.title,
            datePublished: new Date(post.timestamp).toISOString(),
            description: post.description,
            image: {
              '@type': 'ImageObject',
              url: post.image.link,
              width: post.image.width,
              height: post.image.height
            },
            author: {
              '@type': 'Person',
              name: 'Spenser Isdahl'
            },
            publisher: {
              '@type': 'Organization',
              logo: {
                '@type': 'ImageObject',
                url:
                  'https://disquisition.net/static/images/disquisition-net-logo.jpg',
                width: 249,
                height: 60
              },
              name: 'disquisition.net'
            }
          })
        }}
      />
    </Head>
  );
};

PostHead.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.shape({
      link: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      user: PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }).isRequired
};

export default PostHead;
