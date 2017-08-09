import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const BaseCode = glamorous.code({
  fontFamily: 'Menlo, Monaco, Lucida Console, Liberation Mono, monospace',
  fontSize: '90%'
});

const StyledCode = glamorous(BaseCode)({
  backgroundColor: '#f5f5f5',
  padding: '2px 0',
  borderRadius: '3px',
  '&::before, &::after': {
    content: "'\\00a0'",
    letterSpacing: '-0.2em'
  }
});

const Code = ({ children, ...props }) => {
  const isHighlighted = props.className && props.className.includes('hljs');

  return isHighlighted
    ? <BaseCode {...props}>{children}</BaseCode>
    : <StyledCode {...props}>{children}</StyledCode>;
};

Code.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Code;
