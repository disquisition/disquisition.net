module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['jest-glamor-react'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  verbose: true
};
