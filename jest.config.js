module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  setupFilesAfterEnv: ["jest-enzyme"],
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
    enzymeAdapter: "react16",
  },
  roots: ["./src"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  testPathIgnorePatterns: ["node_modules/"],
  testMatch: ["**/*.test.(ts|tsx)"],
};
