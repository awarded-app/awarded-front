const Affiliate = require("affiliate"); // window.Affiliate if using a CDN
const amazonAff = Affiliate({
  log: false, // enable logging
  tags: [
    {
      hosts: ["amazon.com", "www.amazon.com"], // a list of applicable hosts
      query: {
        tag: "awrdd-20" // will output a url with ?ref=my-tag
      }
    },
    {
      hosts: ["amazon.de", "www.amazon.de"], // a list of applicable hosts
      query: {
        tag: "awrdd-21" // will output a url with ?ref=my-tag
      }
    }
  ]
});
module.exports = amazonAff;
