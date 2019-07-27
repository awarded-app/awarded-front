module.exports = {
  devServer: {
    proxy: {
      "^/graphql": {
        target: "http://localhost:4000",
        changeOrigin: true
      },
      "^/strapi": {
        target: "http://localhost:1337/graphql",
        changeOrigin: true,
        pathRewrite: {
          "^/strapi": ""
        }
      }
    }
  }
};
