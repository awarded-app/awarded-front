<template>
  <ul class="text-sm flex">
    <li>
      <a
        :href="`https://www.themoviedb.org/movie/${tmdbId}/`"
        target="_blank"
        class="link-external"
        >TMDB</a
      >
    </li>
    <li>
      <a
        :href="`https://www.imdb.com/title/${imdbId}/`"
        target="_blank"
        class="link-external"
        >IMDB<span v-if="imdbRating" class="pl-1 text-gray-500">{{
          imdbRating
        }}</span></a
      >
    </li>
    <li v-if="rt">
      <a
        :href="`https://www.rottentomatoes.com/search/?search=${title}`"
        target="_blank"
        class="link-external"
        >RT<span class="pl-1 text-gray-500">{{ rt }}</span></a
      >
    </li>
    <li v-if="metacritic">
      <a
        :href="`https://www.metacritic.com/search/movie/${title}/results`"
        target="_blank"
        class="link-external"
        >Metacritic<span class="pl-1 text-gray-500">{{ metacritic }}</span></a
      >
    </li>
    <li v-if="title">
      <a
        :href="`https://www.youtube.com/results?search_query=${title} trailer`"
        target="_blank"
        class="link-external"
        >YouTube<span class="pl-1 text-gray-500">Trailer</span></a
      >
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  props: {
    imdbId: {
      type: String,
      required: true
    },
    tmdbId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      rating: null,
      imdbRating: null,
      metacritic: null,
      rt: null,
      title: ""
    };
  },
  mounted() {
    this.getOMDBInfo();
  },
  methods: {
    async getOMDBInfo() {
      const url = `http://www.omdbapi.com/?apikey=${
        process.env.VUE_APP_OMDB_API_KEY
      }&i=${this.imdbId}`;
      const { data } = await axios.get(url);
      this.rt = data.Ratings.find(
        rating => rating.Source === "Rotten Tomatoes"
      ).Value;
      this.metacritic = data.Ratings.find(
        rating => rating.Source === "Metacritic"
      ).Value;
      this.imdbRating = data.Ratings.find(
        rating => rating.Source === "Internet Movie Database"
      ).Value;
      this.title = data.Title;
    }
  }
};
</script>

<style scoped>
ul > li {
  @apply mr-2;
}
</style>
