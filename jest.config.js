module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-enzyme"],
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
    enzymeAdapter: "react16",
  },
  roots: ["./src"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  testPathIgnorePatterns: ["node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts|tsx)"],
};
