/* eslint-env jest */
import React from 'react';
import A, { StyledAnchor, StyledLink } from '../anchor';
import { mount, render } from 'enzyme';

const mockedTheme = { main: { color: 'MOCKED_COLOR' } };

describe('Anchor component', () => {
  it('renders external link correctly', () => {
    const wrapper = render(
      <A href="https://google.com" theme={mockedTheme}>
        Anchor text
      </A>
    );

    // Ensure text is rendered
    expect(wrapper.text()).toBe('Anchor text');

    // Ensure anchor href is correct
    expect(wrapper.find('a').prop('href')).toBe('https://google.com');

    // Ensure we are rendering a StyledAnchor
    expect(wrapper.find(StyledAnchor)).toBeTruthy();
  });

  it('renders external link with `target="_blank"` correctly', () => {
    const wrapper = render(
      <A href="https://google.com" target="_blank" theme={mockedTheme}>
        Anchor text
      </A>
    );

    // Ensure text is rendered
    expect(wrapper.text()).toBe('Anchor text');

    // Ensure anchor props are correct
    expect(wrapper.find('a').prop('href')).toBe('https://google.com');
    expect(wrapper.find('a').prop('target')).toBe('_blank');
    expect(wrapper.find('a').prop('rel')).toBe('noopener noreferrer');

    // Ensure we are rendering a StyledAnchor
    expect(wrapper.find(StyledAnchor)).toBeTruthy();
  });

  it('renders URL fragment correctly', () => {
    const wrapper = render(
      <A href="#fragment" theme={mockedTheme}>
        Anchor text
      </A>
    );

    // Ensure text is rendered
    expect(wrapper.text()).toBe('Anchor text');

    // Ensure anchor href is correct
    expect(wrapper.find('a').prop('href')).toBe('#fragment');

    // Ensure we are rendering a StyledAnchor
    expect(wrapper.find(StyledAnchor)).toBeTruthy();
  });

  it('renders internal link with `route` correctly', () => {
    const wrapper = render(
      <A route="about" theme={mockedTheme}>
        Anchor text
      </A>
    );

    // Ensure text is rendered
    expect(wrapper.text()).toBe('Anchor text');

    // Ensure anchor href is correct
    expect(wrapper.find('a').prop('href')).toBe('/');

    // Ensure we are rendering a StyledLink
    expect(wrapper.find(StyledLink)).toBeTruthy();
  });

  it('renders internal link with `href` correctly', () => {
    const wrapper = mount(
      <A href="/" theme={mockedTheme}>
        Anchor text
      </A>
    );

    // Ensure text is rendered
    expect(wrapper.text()).toBe('Anchor text');

    // Ensure anchor href is correct
    expect(wrapper.find('a').prop('href')).toBe('/');

    // Ensure we are rendering a StyledLink and that it has the props we expect
    expect(wrapper.find(StyledLink)).toBeTruthy();
    expect(wrapper.find(StyledLink).prop('href')).toBeUndefined();
    expect(wrapper.find(StyledLink).prop('route')).toBe('/');
  });
});
