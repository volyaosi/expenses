/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    // preset: 'ts-jest',
    // testEnvironment: 'node',
    // transform: {
    //     // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    //     // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    //     '^.+\\.tsx?$': [
    //         'ts-jest',
    //         {
    //             // ts-jest configuration goes here
    //         },
    //     ],
    // },
    testEnvironment: 'node',
    preset: ['ts-jest'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
