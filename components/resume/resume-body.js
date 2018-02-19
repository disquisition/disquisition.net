import PropTypes from 'prop-types';
import { css } from 'glamor';

const styling = css({
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

const ResumeBody = ({
  content: { columnOne: ColumnOne, columnTwo: ColumnTwo },
  ...props
}) => (
  <div {...styling} {...props}>
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

export default ResumeBody;
