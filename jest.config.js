const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
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
        // This ensures any path aliases in tsconfig also work in jest
        ...pathsToModuleNameMapper(compilerOptions.paths || {}),
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
