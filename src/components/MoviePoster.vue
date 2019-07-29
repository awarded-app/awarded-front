<template functional>
  <img
    class="shadow flex-none"
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    v-on="listeners"
    :src="
      `https://awarded.imgix.net/movies/posters/${props.tmdbId}_poster.jpg?w=${props.w}&ar=2:3&fit=crop`
    "
  />
</template>

<script>
export default {
  props: {
    tmdbId: {
      type: Number,
      required: true
    },
    w: {
      type: String,
      default: "100"
    }
  }
};
</script>
