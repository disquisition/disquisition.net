/* eslint-env jest */
import React from 'react';
import Code, { codeFontStyle, codeLayoutStyle } from './code';
import { cx } from 'emotion';
import { render } from 'react-testing-library';

test('renders with Highlight.js correctly', () => {
  const { container } = render(
    <Code className="hljs language-js">
      {'export default () => <span>Hello World!</span>'}
    </Code>
  );

  const code = container.querySelector('code');

  // Ensure we are rendering with only font styles
  expect(code.className).toContain(codeFontStyle);
});

test('renders correctly', () => {
  const { container } = render(
    <Code>{'export default () => <span>Hello World!</span>'}</Code>
  );

  const code = container.querySelector('code');

  // Ensure we are rendering with font and layout styles
  expect(code.className).toContain(cx(codeFontStyle, codeLayoutStyle));
});
