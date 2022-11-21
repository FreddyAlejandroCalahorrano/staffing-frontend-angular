module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@services/(.*)': '<rootDir>/src/app/services/$1',
    '@dt-table/(.*)': '<rootDir>/src/app/common/components/table/$1',
    '@modal/(.*)': '<rootDir>/src/app/common/modal/$1',
    '@interfaces/(.*)': '<rootDir>/src/app/types/$1',
    '@environments/(.*)': '<rootDir>/src/environments/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  /*
  coveragePathIgnorePatterns: [
    "<rootDir>/src/app/common/components/",
    "<rootDir>/src/app/common/modal/",
  ]
  */
};
