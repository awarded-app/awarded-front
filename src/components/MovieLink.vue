<template functional>
  <router-link
    :to="`/movies/movie/${props.movieId}/${$options.methods.cleanTitle(props.movieTitle)}`"
    tag="a"
    class="title-link"
    :title="movieTitle"
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
  },
  methods: {
    cleanTitle(title) {
      //remove everything after a colon
      if (title.indexOf(":") > 1) {
        title = title.slice(0, title.indexOf(":"));
      }
      //remove spaces and punctuation, making everything lowercase and split by dashes
      return title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    }
  }
};
</script>
