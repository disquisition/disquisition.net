import glamorous from 'glamorous';

const TwoColumns = ({
  children: { columnOne: ColumnOne, columnTwo: ColumnTwo },
  ...props
}) => (
  <div {...props}>
    <ColumnOne />
    <ColumnTwo />
  </div>
);

export default glamorous(TwoColumns, {
  rootEl: 'div'
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
