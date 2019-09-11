<template functional>
  <div
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="flex-none"
    v-on="listeners"
  >
    <img
      class="shadow flex-none"
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
      required: true
    },
    w: {
      type: String,
      default: "100"
    }
  }
};
</script>
