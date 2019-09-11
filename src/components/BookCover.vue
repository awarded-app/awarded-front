<template>
  <div class="overflow-hidden">
    <img class="shadow flex-none" :src="url" :width="w" :height="h" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    imageUrl: {
      type: String,
      default: ""
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
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      url: ""
    };
  },
  async created() {
    if (this.imageUrl && !this.placeholder) {
      if (this.imageUrl.includes("nophoto") && this.isbn) {
        return (this.url = await this.getGoogleCover(this.isbn));
      }
      return (this.url = this.imageUrl);
    }
    return (this.url = `https://awarded.imgix.net/placeholder-book-cover.png?w=${this.w}`);
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
