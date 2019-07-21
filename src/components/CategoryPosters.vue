<template>
  <ul class="flex flex-wrap pt-2">
    <li v-for="movie in uniqueMovies" :key="movie.id" class="mr-2 mb-2">
      <movie-link :movie-id="movie.id" :movie-title="movie.title">
        <movie-poster :tmdb-id="movie.tmdbId" />
      </movie-link>
    </li>
  </ul>
</template>

<script>
import MoviePoster from "./MoviePoster";
import MovieLink from "./MovieLink";
export default {
  name: "CategoryPosters",
  components: {
    MovieLink,
    MoviePoster
  },
  props: {
    nominations: {
      type: Array,
      required: true
    }
  },
  computed: {
    uniqueMovies() {
      const movies = this.nominations.map(nomination => nomination.movie);
      return movies.filter((movie, index) => {
        return (
          index ===
          movies.findIndex(obj => {
            return obj.id === movie.id;
          })
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
