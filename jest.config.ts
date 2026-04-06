import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    collectCoverage: true,
    collectCoverageFrom: [
        'components/**/*.{ts,tsx}',
        'tools/**/*.{ts,tsx}',
        'api/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/index.ts'
    ],
    coverageReporters: ['lcov', 'clover', 'text', 'text-summary'],
    // on node 14.x coverage provider v8 offers good speed and more or less good report
    coverageProvider: 'v8',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.node.json'
        }
    },
    moduleNameMapper: {
        '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': 'identity-obj-proxy',

        // Handle CSS imports (with CSS modules)
        // https://jestjs.io/docs/webpack#mocking-css-modules
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

        // Mock next/image to avoid static import issues in Jest
        '^next/image$': '<rootDir>/__mocks__/next/image.tsx',

        // Mock simple-react-ui-kit (ESM package, not transpiled by default)
        '^simple-react-ui-kit$': '<rootDir>/__mocks__/simple-react-ui-kit.tsx',

        // Handle module aliases
        '^@/(.*)$': '<rootDir>/$1',
        '^@/api/(.*)$': '<rootDir>/api/$1',
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/tools/(.*)$': '<rootDir>/tools/$1',
        '^@/public/(.*)$': '<rootDir>/public/$1',
        '^@/styles/(.*)$': '<rootDir>/styles/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.config.tsx'],
    silent: true, // hide all warnings
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    transform: {
        // Use babel-jest to transpile tests with the next/babel preset
        // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
    },
    transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$']
}

export default config
