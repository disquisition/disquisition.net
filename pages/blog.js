import A from '../components/anchor';
import Page from '../layouts/main';
import PropTypes from 'prop-types';
import React from 'react';
import UL from '../components/unordered-list';
import fetch from 'isomorphic-unfetch';
import getOrigin from '../lib/get-origin';
import glamorous from 'glamorous';

const BlogListItem = glamorous.li({ display: 'flex', marginBottom: '.25em' });
const RightColumn = glamorous.div({ flex: '50% 1 1' });
const LeftColumn = glamorous(RightColumn)({
  textAlign: 'right',
  marginRight: '1em'
});

export default class BlogPage extends React.Component {
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
            <BlogListItem key={slug}>
              <LeftColumn>{date}</LeftColumn>

              <RightColumn>
                <A route="post" params={{ slug }} prefetch>
                  {title}
                </A>
              </RightColumn>
            </BlogListItem>
          ))}
        </UL>
      </Page>
    );
  }
}
