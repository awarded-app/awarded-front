<template>
  <img class="shadow flex-none" :src="url" :width="w" :height="h" />
</template>

<script>
import axios from "axios";
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    isbn: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "small"
    },
    w: {
      type: String,
      default: "100"
    },
    h: {
      type: String,
      default: "150"
    }
  },
  data() {
    return {
      url: ""
    };
  },
  async created() {
    if (this.imageUrl.includes("nophoto") && this.isbn) {
      this.url = await this.getGoogleCover(this.isbn);
    } else {
      this.url = this.imageUrl;
    }
  },
  methods: {
    async getGoogleCover(isbn) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
      try {
        const {
          data: { items }
        } = await axios.get(url);
        const {
          volumeInfo: {
            imageLinks: { thumbnail }
          }
        } = items[0];
        return thumbnail;
      } catch (error) {
        console.error(error);
      }
      return "";
    }
  }
};
</script>
