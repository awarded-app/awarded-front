const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");
const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/graphql": {
        target: "http://localhost:4000",
        changeOrigin: true
      }
    }
  }
};
