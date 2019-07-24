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
  },
  configureWebpack: {
    // Merged into the final Webpack config
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, "./src/index.html"),
          path.join(__dirname, "./**/*.vue"),
          path.join(__dirname, "./src/**/*.js")
        ])
      })
    ]
  }
};
