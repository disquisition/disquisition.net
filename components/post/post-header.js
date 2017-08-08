import glamorous, { H1 } from 'glamorous';

const PostHeader = glamorous.header(({ theme }) => ({
  color: theme.main.color,
  lineHeight: 1.4
}));

export default props => (
  <PostHeader>
    <H1 marginTop="1rem" marginBottom={0}>{props.children}</H1>
    <span>{props.post.date}</span>
  </PostHeader>
);
