import SectionBody from './section-body';
import SectionHeading from './section-heading';
import glamorous from 'glamorous';

const SectionWrapper = glamorous.div({
  margin: '1rem 0 2rem',
  ':first-child': {
    marginTop: 0
  },
  ':last-child': {
    marginBottom: 0
  }
});

export default props => (
  <SectionWrapper>
    <SectionHeading>
      {props.title}
    </SectionHeading>

    <SectionBody>
      {props.children}
    </SectionBody>
  </SectionWrapper>
);
