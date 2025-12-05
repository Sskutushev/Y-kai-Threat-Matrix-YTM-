const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
  transformIgnorePatterns: ['node_modules/(?!(until-async|@mswjs/interceptors))'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/**tests**/**',
  ],
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 60,
      lines: 67,
      statements: 68,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
