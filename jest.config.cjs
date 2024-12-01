module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Use jsdom for DOM-based tests
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional: Additional setup
};
