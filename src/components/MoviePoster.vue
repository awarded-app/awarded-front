<template functional>
  <div
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="flex-none"
    v-on="listeners"
  >
    <img
      v-if="props.posterPath"
      class="flex-none shadow"
      :src="`https://image.tmdb.org/t/p/w${props.w}${props.posterPath}`"
    />
    <img
      v-else-if="props.tmdbId"
      class="flex-none shadow"
      :src="
        `https://awarded.imgix.net/movies/posters/${props.tmdbId}_poster.jpg?w=${
          props.w
        }&ar=2:3&fit=crop`
      "
    />
  </div>
</template>

<script>
export default {
  props: {
    tmdbId: {
      type: Number,
      default: null
    },
    posterPath: {
      type: String,
      default: null
    },
    w: {
      type: String,
      default: "100"
    }
  }
};
</script>
