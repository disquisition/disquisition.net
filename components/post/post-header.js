import PropTypes from 'prop-types';
import glamorous from 'glamorous';

function toId(children) {
  return typeof children === 'string'
    ? children
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
    : null;
}

const PostHeading = glamorous
  .h1({
    marginTop: '1rem',
    marginBottom: 0
  })
  .withProps(({ children }) => ({
    id: toId(children)
  }));

const StyledHeader = glamorous.header(({ theme }) => ({
  color: theme.main.color,
  lineHeight: 1.4
}));

const PostHeader = ({ children, date }) => (
  <StyledHeader>
    <PostHeading>{children}</PostHeading>

    <span>{date}</span>
  </StyledHeader>
);

PostHeader.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string.isRequired
};

export default PostHeader;
