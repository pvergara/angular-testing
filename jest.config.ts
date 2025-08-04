import { Config } from 'jest';

const config: Config = {
  rootDir: '.',
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/app/domains/shared/$1',
    '^@products/(.*)$': '<rootDir>/src/app/domains/products/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
  },
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: 'coverage/my-app',
};

export default config;
