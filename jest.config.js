module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFiles: [],
  globalSetup: '<rootDir>/__test__/setup.js',
  globalTeardown: '<rootDir>/__test__/teardown.js',
  verbose: true,
};
