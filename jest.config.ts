import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '\\.(css|scss)$': 'identity-obj-proxy' },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          target: 'ES2023',
          lib: ['ES2023', 'DOM'],
          jsx: 'react-jsx',
          esModuleInterop: true,
        },
      },
    ],
  },
};
export default config;