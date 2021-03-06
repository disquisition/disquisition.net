import A from '../components/anchor';
import Code from '../components/code';
import Hr from '../components/horizontal-rule';
import Page from '../layouts/main';
import PostBody from '../components/post/post-body';
import PostHead from '../components/post/post-head';
import PostHeader from '../components/post/post-header';
import PostHeroImage from '../components/post/post-hero-image';
import PostFooter from '../components/post/post-footer';
import SectionHeading from '../components/post/section-heading';
import P from '../components/paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import redirectTo from '../lib/redirect-to';
import Sup from '../components/superscript';
import fetch from 'isomorphic-unfetch';
import getOrigin from '../lib/get-origin';
import styled from 'react-emotion';

const PostContentContainer = styled.div`
  max-width: 30em;
  margin: auto;
`;
const PostContent = styled.article`
  line-height: 1.6;
`;

const componentAliases = {
  a: A,
  code: Code,
  h1: () => null, // This gets rendered in the PostHeader instead
  h2: SectionHeading,
  hr: Hr,
  p: P,
  sup: Sup
};

export default class PostPage extends React.Component {
  static async getInitialProps({ query: { slug }, req, res }) {
    if (slug) {
      const postRes = await fetch(`${getOrigin(req)}/api/posts/${slug}`);
      const post = await postRes.json();

      return { post };
    } else {
      // If we don't have a slug, redirect back to the post list
      redirectTo(res, '/blog');

      return {};
    }
  }

  static propTypes = {
    post: PropTypes.shape({
      content: PropTypes.object.isRequired,
      date: PropTypes.string.isRequired,
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
    })
  };

  render() {
    const { post } = this.props;

    return post ? (
      <Page>
        <PostHead post={post} />

        <PostHeroImage image={post.image} />

        <PostContentContainer>
          <A route="blog" css={{ ':hover': { textDecoration: 'none' } }}>
            ↜ Blog
          </A>

          <PostContent>
            <PostHeader date={post.date}>{post.title}</PostHeader>

            <PostBody hast={post.content} aliases={componentAliases} />

            <Hr />

            <PostFooter />
          </PostContent>
        </PostContentContainer>
      </Page>
    ) : null;
  }
}
