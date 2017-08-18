/* eslint-env jest */
import getOrigin from '../get-origin';

describe('getOrigin', () => {
  it('returns http://localhost:3000 when req arg is truthy', () => {
    const req = {};
    const origin = getOrigin(req);

    expect(origin).toBe('http://localhost:3000');
  });

  it('returns an empty string when req arg is falsy', () => {
    const req = undefined;
    const origin = getOrigin(req);

    expect(origin).toBe('');
  });
});
