/* eslint-env jest */
import isUrlFragment from '../is-url-fragment';

describe('isUrlFragment', () => {
  it('returns `true` for URL fragment', () => {
    const url = '#fragment';

    expect(isUrlFragment(url)).toBe(true);
  });

  it('returns `false` for absolute URL', () => {
    const url = 'https://google.com';

    expect(isUrlFragment(url)).toBe(false);
  });

  it('returns `false` for relative URL', () => {
    const url = '/blog/first-post';

    expect(isUrlFragment(url)).toBe(false);
  });

  it('throws TypeError if url arg is not a string', () => {
    const url = null;

    expect(() => isUrlFragment(url)).toThrow(TypeError);
  });
});
