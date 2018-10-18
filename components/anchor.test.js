/* eslint-env jest */
import React from 'react';
import A from './anchor';
import { render } from 'react-testing-library';

test('renders external link correctly', () => {
  const { getByText } = render(<A href="https://google.com">Anchor text</A>);

  // Fetch anchor by text
  const anchor = getByText('Anchor text');

  // Ensure anchor href is correct
  expect(anchor.href).toBe('https://google.com/');
});

test('renders external link with `target="_blank"` correctly', () => {
  const { getByText } = render(
    <A href="https://google.com" target="_blank">
      Anchor text
    </A>
  );

  // Fetch anchor by text
  const anchor = getByText('Anchor text');

  // Ensure anchor props are correct
  expect(anchor.href).toBe('https://google.com/');
  expect(anchor.target).toBe('_blank');
  expect(anchor.rel).toBe('noopener noreferrer');
});

test('renders URL fragment correctly', () => {
  const { getByText } = render(<A href="#fragment">Anchor text</A>);

  // Fetch anchor by text
  const anchor = getByText('Anchor text');

  // Ensure anchor href is correct
  expect(anchor.href).toBe('http://localhost/#fragment');
});

test('renders internal link with `route` correctly', () => {
  const { getByText } = render(<A route="about">Anchor text</A>);

  // Fetch anchor by text
  const anchor = getByText('Anchor text');

  // Ensure anchor href is correct
  expect(anchor.href).toBe('http://localhost/');
});

test('renders internal link with `href` correctly', () => {
  const { getByText } = render(<A href="/">Anchor text</A>);

  // Fetch anchor by text
  const anchor = getByText('Anchor text');

  // Ensure anchor href is correct
  expect(anchor.href).toBe('http://localhost/');
});
