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
