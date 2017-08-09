import Page from '../layouts/main';
import PropTypes from 'prop-types';
import React from 'react';
import UL from '../components/unordered-list';
import fetch from 'isomorphic-unfetch';
import getOrigin from '../lib/getOrigin';
import { Div, Li } from 'glamorous';
import { Link } from '../components/anchor';

export default class Blog extends React.Component {
  static async getInitialProps({ req }) {
    const res = await fetch(`${getOrigin(req)}/api/posts`);
    const posts = await res.json();

    return { posts };
  }

  static propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    const { posts } = this.props;

    return (
      <Page>
        <UL unstyled css={{ margin: 0 }}>
          {posts.map(({ date, slug, title }) => (
            <Li key={slug} display="flex" marginBottom=".25em">
              <Div flex="50% 1 1" textAlign="right" marginRight="1em">
                {date}
              </Div>
              <Div flex="50% 1 1">
                <Link route="post" params={{ slug }}>
                  {title}
                </Link>
              </Div>
            </Li>
          ))}
        </UL>
      </Page>
    );
  }
}
