/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",          // Use ts-jest for TS files
  testEnvironment: "node",    // Node environment
  moduleFileExtensions: ["ts", "js", "json", "node"],

  // Transform TS files with ts-jest
  transform: {
    "^.+\\.ts$": "ts-jest"
  },

  // Which test files to run
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.ts$",

  // Ignore node_modules
  transformIgnorePatterns: ["/node_modules/"]
};
