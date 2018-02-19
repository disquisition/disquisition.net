import glamorous from 'glamorous';

const UnorderedList = glamorous.ul(({ inline, unstyled }) => ({
  paddingLeft: inline || unstyled ? '0' : '2em',
  listStyleType: inline || unstyled ? 'none' : 'disc',
  ' li': {
    display: inline ? 'inline-block' : null,
    paddingLeft: inline ? '1em' : null,
    ':first-of-type': {
      paddingLeft: inline ? 0 : null
    }
  }
}));

export default UnorderedList;
