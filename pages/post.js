import Head from 'next/head';
import Hr from '../components/horizontal-rule';
import Page from '../layouts/main';
import PostFooter from '../components/post/post-footer';
import PropTypes from 'prop-types';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import getOrigin from '../lib/getOrigin';
import renderPost from '../lib/renderPost';
import { Article } from 'glamorous';

export default class Post extends React.Component {
  static async getInitialProps({ query: { slug }, req }) {
    const res = await fetch(`${getOrigin(req)}/api/posts/${slug}`);
    const post = await res.json();

    return { post };
  }

  static propTypes = {
    post: PropTypes.shape({
      content: PropTypes.object.isRequired,
      date: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { post } = this.props;

    return (
      <Page>
        <Head>
          <title>{post.title}</title>
          <link
            rel="canonical"
            href={`https://disquisition.net/blog/${post.slug}`}
          />
        </Head>

        <Article maxWidth="30em" margin="auto" lineHeight={1.6}>
          {renderPost(post)}

          <Hr />

          <PostFooter />
        </Article>
      </Page>
    );
  }
}
