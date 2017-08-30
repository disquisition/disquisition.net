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

const PostHeader = ({ children, className, date }) => (
  <header className={className}>
    <PostHeading>{children}</PostHeading>

    <span>{date}</span>
  </header>
);

PostHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  date: PropTypes.string.isRequired
};

export default glamorous(PostHeader)(({ theme }) => ({
  color: theme.main.color,
  lineHeight: 1.4
}));
