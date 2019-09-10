<template>
  <div class="shadow flex-none">
    <img :src="url" :width="w" />
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: ""
    },
    profilePath: {
      type: String,
      default: ""
    },
    w: {
      type: String,
      default: "100"
    }
  },
  computed: {
    url() {
      if (this.imageUrl) return this.imageUrl;
      if (!this.profilePath) {
        return `https://awarded.imgix.net/placeholder-person.png?w=${this.w}`;
      }
      return `https://image.tmdb.org/t/p/w${this.w}/${this.profilePath}`;
    }
  }
};
</script>
