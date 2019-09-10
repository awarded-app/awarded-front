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
    },
    {
      hosts: ["amazon.co.uk", "www.amazon.co.uk"],
      query: {
        tag: "awrdd05-21"
      }
    },
    {
      hosts: ["amazon.fr", "www.amazon.fr"],
      query: {
        tag: "awrdd02-21"
      }
    },
    {
      hosts: ["amazon.es", "www.amazon.es"],
      query: {
        tag: "awrdd09-21"
      }
    },
    {
      hosts: ["amazon.it", "www.amazon.it"],
      query: {
        tag: "awrdd0b-21"
      }
    },
    {
      hosts: ["amazon.com.br", "www.amazon.com.br"],
      query: {
        tag: "awarded-20"
      }
    }
  ]
});
module.exports = amazonAff;
