import A from '../components/anchor';
import Hr from '../components/horizontal-rule';
import Page from '../layouts/main';
import PostHead from '../components/post/post-head';
import PostHeroImage from '../components/post/post-hero-image';
import PostFooter from '../components/post/post-footer';
import PropTypes from 'prop-types';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import getOrigin from '../lib/get-origin';
import renderPost from '../lib/render-post';
import { Article, Div } from 'glamorous';

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
            {renderPost(post)}

            <Hr />

            <PostFooter />
          </Article>
        </Div>
      </Page>
    );
  }
}
