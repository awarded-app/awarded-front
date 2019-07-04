module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    "\\.(gql|graphql)$": "jest-transform-graphql"
  },
  transformIgnorePatterns: ["/node_modules/[\\\\/]epic-spinners[\\\\/]"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/src/components/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.spec.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
