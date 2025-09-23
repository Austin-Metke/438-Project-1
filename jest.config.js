/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Back to node environment
  roots: ["<rootDir>/api", "<rootDir>/app"],
  testMatch: [
    "**/api/**/*.test.{js,jsx,ts,tsx}",
    "**/api/**/*.spec.{js,jsx,ts,tsx}",
    "**/app/**/*.test.{js,jsx,ts,tsx}",
    "**/app/**/*.spec.{js,jsx,ts,tsx}",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react-jsx",
      },
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Add setup file
};
