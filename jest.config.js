const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');

module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coverageReporters: [
        // "lcov",
        'text',
    ],
    collectCoverageFrom: [
        'src/**/*.ts',
        'src/**/*.tsx',
        '!src/**/*.spec.ts',
        '!src/**/*.spec.tsx',
    ],
    testMatch: ['<rootDir>/src/**/*.spec.tsx', '<rootDir>/src/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    moduleNameMapper: {
        ...getJestMappersFromTSConfig(),
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': 'jest-transform-stub',
    },
    globals: {
        'ts-jest': {
            diagnostics: false,
            isolatedModules: true,
        },
    },
};
