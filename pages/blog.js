import Page from '../layouts/main';
import PropTypes from 'prop-types';
import React from 'react';
import UL from '../components/unordered-list';
import fetch from 'isomorphic-unfetch';
import getOrigin from '../lib/getOrigin';
import glamorous from 'glamorous';
import { Link } from '../components/anchor';

const BlogListItem = glamorous.li({ display: 'flex', marginBottom: '.25em' });
const RightColumn = glamorous.div({ flex: '50% 1 1' });
const LeftColumn = glamorous(RightColumn)({
  textAlign: 'right',
  marginRight: '1em'
});

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
            <BlogListItem key={slug}>
              <LeftColumn>
                {date}
              </LeftColumn>

              <RightColumn>
                <Link route="post" params={{ slug }}>
                  {title}
                </Link>
              </RightColumn>
            </BlogListItem>
          ))}
        </UL>
      </Page>
    );
  }
}
