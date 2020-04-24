module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coverageReporters: [
        // "lcov",
        'text',
    ],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.spec.ts'],
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    globals: {
        'ts-jest': {
            diagnostics: false,
            isolatedModules: true,
            tsConfig: {
                target: 'esnext',
            },
        },
    },
};
