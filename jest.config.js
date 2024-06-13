/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
      '^.+\\.(css|less)$': '<rootDir>/config/jest/CSSStub.js',
      '.+\\.svg$': '<rootDir>/config/jest/fileTransform.js',
      '.+\\.(css|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/bootstrap.tsx',
      '!src/index.js',
      '!src/tests/**/*',
      '!src/App.js',
      '!src/**/*.d.js',
      '!src/**/*.styles.js',
      '!src/mocks/**/*',
      '!src/**/*.enum.js',
      '!src/app/routing/contexts/*',
    ],
    coveragePathIgnorePatterns: [
      '<rootDir>/src/index.js',
      '<rootDir>/src/bootstrap.js',
      '<rootDir>/src/App.js',
      '<rootDir>/src/tests/',
      '<rootDir>/src/mocks/',
      '<rootDir>/src/app/translations/',
      '<rootDir>/src/app/shared/models/',
      '<rootDir>/src/app/shared/constants/',
      '<rootDir>/src/app/review/models/',
      '<rootDir>/src/app/review/constants/',
      '<rootDir>/src/app/mainPage/models/',
      '<rootDir>/src/app/mainPage/constants/',
    ],
    modulePathIgnorePatterns: ['integration'],
    coverageReporters: ['lcov', 'html', 'json', 'text-summary'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testMatch: ['<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}'],
    // testEnvironment: '<rootDir>/src/tests/custom-js-dom.ts',
    transform: {
      '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
      '.+\\.(css|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: ['/node_modules/(?!@takamol/(qiwa-design-system))/.*'],
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx'],
    resetMocks: true,
  };
  