import PropTypes from 'prop-types';
import glamorous, { H1 } from 'glamorous';

const PostHeader = ({ children, className, post }) => (
  <header className={className}>
    <H1 marginTop="1rem" marginBottom={0}>{children}</H1>
    <span>{post.date}</span>
  </header>
);

PostHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  post: PropTypes.shape({
    date: PropTypes.string
  }).isRequired
};

export default glamorous(PostHeader)(({ theme }) => ({
  color: theme.main.color,
  lineHeight: 1.4
}));
