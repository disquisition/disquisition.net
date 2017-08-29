import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const ResumeBody = ({
  content: { columnOne: ColumnOne, columnTwo: ColumnTwo },
  ...props
}) => (
  <div {...props}>
    <ColumnOne />
    <ColumnTwo />
  </div>
);

ResumeBody.propTypes = {
  content: PropTypes.shape({
    columnOne: PropTypes.func.isRequired,
    columnTwo: PropTypes.func.isRequired
  }).isRequired
};

export default glamorous(ResumeBody, {
  rootEl: 'div',
  forwardProps: ['content']
})({
  display: 'grid',
  '@media print, screen and (min-width: 800px)': {
    gridTemplateColumns: 'repeat(2, calc(50% - 1em))',
    gridColumnGap: '2em'
  },
  '@media screen and (max-width: 800px)': {
    gridTemplateRows: 'repeat(2, auto)',
    gridRowGap: '2em'
  }
});
