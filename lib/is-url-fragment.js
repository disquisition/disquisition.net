export default url => {
  if (typeof url !== 'string') {
    throw new TypeError('Expected a string');
  }

  return /^#/.test(url);
};
