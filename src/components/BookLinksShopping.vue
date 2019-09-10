<template>
  <ul class="text-sm flex">
    <li>
      <a :href="amazonUrl" target="_blank" rel="noopener" class="link-external">
        Buy on Amazon
      </a>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  props: {
    isbn: {
      type: String,
      required: true
    },
    kindleAsin: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      amazonUrl: "",
      countryCode: "",
      urlBase: {
        us: "com",
        de: "de",
        es: "es",
        br: "com.br",
        fr: "fr",
        uk: "co.uk",
        it: "it"
      }
    };
  },
  created() {
    this.assembleAmazonUrl();
    const AmazonAff = require("../plugins/Affiliate");
    AmazonAff.attach();
  },
  methods: {
    async getCountry() {
      const ipUrl = "http://ip-api.com/json/?fields=status,message,countryCode";
      try {
        const { data } = await axios.get(ipUrl);
        console.log(data);
        return data.countryCode;
      } catch (error) {
        console.error(error);
      }
    },
    async assembleAmazonUrl() {
      this.countryCode = await this.getCountry();
      this.countryCode = this.countryCode.toLowerCase();
      console.log(this.countryCode);
      if (this.urlBase.hasOwnProperty(this.countryCode)) {
        return (this.amazonUrl = `https://www.amazon.${this.urlBase[this.countryCode]}/dp/${
          this.isbn
        }`);
      }
      return (this.amazonUrl = `https://www.amazon.${this.urlBase.us}/dp/${this.isbn}`);
    }
  }
};
</script>

<style lang="scss" scoped></style>
