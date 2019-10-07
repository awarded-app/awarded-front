<template>
  <a :href="amazonUrl" target="_blank" rel="noopener" class="amazon-link">Buy on Amazon</a>
</template>

<script>
import axios from "axios";
import affiliates from "@/data/affiliates.json";
export default {
  props: {
    isbn: {
      type: String,
      required: true
    },
    kindleAsin: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      amazonUrl: "",
      countryCode: "us",
      affiliates
    };
  },
  async mounted() {
    //console.log(this.affiliates);
    try {
      const ipUrl = `https://api.ipdata.co/?api-key=${process.env.VUE_APP_IPDATA_API_KEY}`;
      const {
        data: { country_code }
      } = await axios.get(ipUrl);
      if (country_code) {
        this.countryCode = country_code.toLowerCase();
        //console.log(this.countryCode);
      }
    } catch (e) {
      console.error(e);
    }
    this.assembleAmazonUrl();
  },
  methods: {
    assembleAmazonUrl() {
      if (this.affiliates.hasOwnProperty(this.countryCode)) {
        return (this.amazonUrl = `https://${this.affiliates[this.countryCode].url}/dp/${
          this.isbn
        }?tag=${this.affiliates[this.countryCode].tag}`);
      }
      return (this.amazonUrl = `https://${this.affiliates.us.url}/dp/${this.isbn}?tag=${
        this.affiliates.us.tag
      }`);
    }
  }
};
</script>

<style scoped>
a.amazon-link {
  text-decoration: none;
  background-image: none;
  background-size: auto auto;
  background-position: 0 0;
  transition: none;
  background-repeat: repeat;
  padding: 0;
  border: 0;
  @apply p-2 text-center border-yellow-500 border rounded shadow bg-yellow-400 text-sm font-semibold text-yellow-800;
}
a.amazon-link:hover {
  @apply shadow-lg bg-yellow-300;
}
</style>
