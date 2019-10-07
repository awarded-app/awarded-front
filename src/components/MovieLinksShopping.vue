<template>
  <a :href="amazonUrl" target="_blank" rel="noopener" class="amazon-link">Amazon</a>
</template>

<script>
import axios from "axios";
import affiliates from "@/data/affiliates.json";
export default {
  props: {
    movieTitle: {
      type: String,
      required: true
    },
    asins: {
      type: Array,
      required: true
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
  },
  created() {
    this.assembleAmazonUrl();
  },
  methods: {
    assembleAmazonUrl() {
      const tag = this.getTag();
      const asin = this.getAsin();
      let url = "https://";
      url += this.getBaseUrl();
      if (asin) {
        url += `/dp/${asin}`;
      } else {
        url += `/s?k=${this.movieTitle}&i=movies-tv`;
      }
      url += `&tag=${tag}`;
      this.amazonUrl = url;
    },
    getBaseUrl() {
      let url = this.affiliates.us.url;
      if (this.affiliates.hasOwnProperty(this.countryCode)) {
        url = this.affiliates[this.countryCode].url;
      }
      return url;
    },
    getTag() {
      let tag = this.affiliates.us.tag;
      if (this.affiliates.hasOwnProperty(this.countryCode)) {
        tag = this.affiliates[this.countryCode].tag;
      }
      return tag;
    },
    getAsin() {
      return this.asins.find(asin => asin.countryCode === this.countryCode);
    }
  }
};
</script>

<style scoped>
a.amazon-link {
  @apply p-2 text-center border-yellow-500 border rounded shadow  text-sm font-semibold;
}
a.amazon-link:hover {
  @apply shadow-lg border-yellow-400 bg-gray-800;
}
</style>
