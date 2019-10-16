<template>
  <div class="shadow overflow-hidden object-cover" :style="`width: ${w}px; height: ${h}px;`">
    <img v-if="url" class=" flex-none" :src="url" :width="w" :height="h" />
    <div
      v-else
      class="w-full h-full text-center border border-gray-500  bg-gray-300 p-1 flex flex-col justify-end"
    >
      <p class="font-semibold text-sm">{{ title | truncate(50) }}</p>
      <p v-if="authors" class="text-xs">{{ authors[0].author.name }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    authors: {
      type: Array,
      default: null
    },
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
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      url: "",
      genericImage: `https://awarded.imgix.net/placeholder-book-cover.png?w=${this.w}`
    };
  },
  computed: {
    h() {
      return 1.5 * this.w;
    }
  },
  async created() {
    let url = "";
    if (this.imageUrl && !this.placeholder) {
      if (this.imageUrl.includes("nophoto") && this.isbn) {
        url = await this.getGoogleCover(this.isbn);
      } else if (!this.imageUrl.includes("nophoto")) {
        url = this.imageUrl;
      }
    }
    return (this.url = url);
  },
  methods: {
    async getGoogleCover(isbn) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
      try {
        const { data } = await axios.get(url);
        console.log(data);
        if (data.totalItems) {
          const { items } = data;
          let {
            volumeInfo: {
              imageLinks: { thumbnail }
            }
          } = items[0];
          thumbnail = thumbnail.replace("http:", "https:");
          return thumbnail;
        }
      } catch (error) {
        console.error(error);
      }
      return "";
    }
  }
};
</script>
