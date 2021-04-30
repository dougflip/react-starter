module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/fileMock.ts",
    "\\.(css|pcss)$": "<rootDir>/config/styleMock.ts",
  },
  testEnvironment: "jsdom",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
