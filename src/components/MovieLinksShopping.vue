<template>
  <ul class="text-sm flex">
    <li>
      <a :href="amazonUrl" target="_blank" class="link-external">
        Buy on Amazon
      </a>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  props: {
    imdbId: {
      type: String,
      required: true
    },
    movieTitle: {
      type: String,
      required: true
    },
    asin: {
      type: Object,
      required: true
    }
  },
  created() {
    this.assembleAmazonUrl();
    const AmazonAff = require("../plugins/Affiliate");
    AmazonAff.attach();
  },
  data() {
    return {
      amazonUrl: "",
      countryCode: "",
      urlBase: {
        us: "https://www.amazon.com/dp",
        de: "https://www.amazon.de/dp"
      }
    };
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
      if (this.asin.hasOwnProperty(this.countryCode)) {
        this.amazonUrl = `${this.urlBase[this.countryCode]}/${
          this.asin[this.countryCode]
        }`;
      } else {
        this.amazonUrl = `${this.urlBase.us}/${this.asin.us}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
