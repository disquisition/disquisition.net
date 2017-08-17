/* eslint-env jest */
import React from 'react';
import Code, { BaseCode, StyledCode } from '../code';
import { render } from 'enzyme';

describe('Code component', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Code>{'export default () => <span>Hello World!</span>'}</Code>
    );

    // Ensure we are rendering a StyledCode
    expect(wrapper.find(StyledCode)).toBeTruthy();
  });

  it('renders with Highlight.js correctly', () => {
    const wrapper = render(
      <Code className="hljs language-js">
        {'export default () => <span>Hello World!</span>'}
      </Code>
    );

    // Ensure we are rendering a BaseCode
    expect(wrapper.find(BaseCode)).toBeTruthy();
  });
});
