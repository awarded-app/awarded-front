<template>
  <a :href="amazonUrl" target="_blank" rel="noopener" class="amazon-link">Buy on Amazon</a>
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
    asin: {
      type: Object,
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
      const ipUrl = "http://ip-api.com/json/?fields=status,message,countryCode";
      const { data } = await axios.get(ipUrl);
      if (data.hasOwnProperty("countryCode")) {
        this.countryCode = data.countryCode.toLowerCase();
        //console.log(this.countryCode);
      }
    } catch (e) {
      console.error(e);
    }
    this.assembleAmazonUrl();
  },
  methods: {
    async assembleAmazonUrl() {
      if (this.affiliates.hasOwnProperty(this.countryCode)) {
        return (this.amazonUrl = `https://${this.affiliates[this.countryCode].url}/dp/${
          this.asin
        }?tag=${this.affiliates[this.countryCode].tag}`);
      }
      return (this.amazonUrl = `https://${this.affiliates.us.url}/dp/${this.asin}?tag=${
        this.affiliates.us.tag
      }`);
    }
  }
};
</script>

<style lang="scss" scoped></style>
