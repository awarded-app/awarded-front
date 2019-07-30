<template functional>
  <ul class="text-sm flex">
    <li class="mr-2">
      <a
        :href="`https://www.themoviedb.org/person/${props.tmdbId}/`"
        target="_blank" rel="noopener"
        class="link-external"
        >TMDB</a
      >
    </li>
    <li v-if="props.imdbId">
      <a
        :href="`https://www.imdb.com/name/${props.imdbId}/`"
        target="_blank" rel="noopener"
        class="link-external"
        >IMDB</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    imdbId: {
      type: String,
      default: null
    },
    tmdbId: {
      type: Number,
      required: true
    }
  }
};
</script>
