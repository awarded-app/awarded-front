<template functional>
  <router-link
    :to="`/movie/${props.movieId}/${props.movieTitle}`"
    tag="a"
    class="title-link"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    ><slot>{{ props.movieTitle }}</slot></router-link
  >
</template>
<script>
export default {
  props: {
    movieId: {
      type: Number,
      required: true
    },
    movieTitle: {
      type: String,
      required: true
    }
  }
};
</script>
