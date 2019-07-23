<template functional>
  <div
    class="shadow"
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <img :src="`https://image.tmdb.org/t/p/w${props.w}/${props.profilePath}`" />
  </div>
</template>

<script>
export default {
  props: {
    tmdbId: {
      type: Number,
      required: true
    },
    profilePath: {
      type: String,
      required: true
    },
    w: {
      type: String,
      default: "100"
    }
  }
};
</script>
