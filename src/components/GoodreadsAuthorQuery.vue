<template>
  <div><slot :author="authorDetails" :loading="loading" /></div>
</template>

<script>
import axios from "axios";
const parseString = require("xml2js").parseString;

export default {
  props: {
    goodreadsId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      authorDetails: null,
      loading: false
    };
  },
  async created() {
    this.loading = true;
    const cors =
      process.env.NODE_ENV === "development" ? "http://cors-anywhere.herokuapp.com/" : "";
    const url = `${cors}https://www.goodreads.com/author/show.xml?id=${this.goodreadsId}&key=${
      process.env.VUE_APP_GOODREADS_KEY
    }`;
    try {
      const { data } = await axios.get(url);
      let authorDetails;
      parseString(data, function(err, result) {
        authorDetails = result.GoodreadsResponse.author[0];
      });

      this.authorDetails = this.cleanUpGoodreadsResult(authorDetails);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    cleanUpGoodreadsResult(resultObject) {
      // goodreads returns all fields as array with one element
      // this function flattens all arrays
      for (const key of Object.keys(resultObject)) {
        if (resultObject[key] instanceof Array && resultObject[key].length === 1) {
          resultObject[key] = resultObject[key][0];
        }
      }
      return resultObject;
    }
  }
};
</script>

<style lang="scss" scoped></style>
