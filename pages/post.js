import A from '../components/anchor';
import Code from '../components/code';
import Hr from '../components/horizontal-rule';
import Page from '../layouts/main';
import PostBody from '../components/post/post-body';
import PostHead from '../components/post/post-head';
import PostHeader from '../components/post/post-header';
import PostHeroImage from '../components/post/post-hero-image';
import PostFooter from '../components/post/post-footer';
import SectionHeader from '../components/post/section-header';
import P from '../components/paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import Sup from '../components/superscript';
import fetch from 'isomorphic-unfetch';
import getOrigin from '../lib/get-origin';
import { Article, Div } from 'glamorous';

const componentAliases = {
  a: A,
  code: Code,
  h1: () => null, // This gets rendered in the PostHeader instead
  h2: SectionHeader,
  hr: Hr,
  p: P,
  sup: Sup
};

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

  render() {
    const { post } = this.props;

    return (
      <Page>
        <PostHead post={post} />

        <PostHeroImage image={post.image} />

        <Div maxWidth="30em" margin="auto">
          <A route="blog" css={{ ':hover': { textDecoration: 'none' } }}>
            ↜ Blog
          </A>

          <Article lineHeight={1.6}>
            <PostHeader date={post.date}>{post.title}</PostHeader>

            <PostBody hast={post.content} aliases={componentAliases} />

            <Hr />

            <PostFooter />
          </Article>
        </Div>
      </Page>
    );
  }
}
