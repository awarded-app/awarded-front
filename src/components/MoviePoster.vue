<template functional>
  <div
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <img
      :src="
        `https://awarded.imgix.net/movies/posters/${
          props.tmdbId
        }_poster.jpg?w=${props.w}&fit=clip`
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
