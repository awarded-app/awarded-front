<template>
  <ul class="text-sm">
    <li>
      <a
        :href="`https://www.themoviedb.org/movie/${tmdbId}/`"
        target="_blank"
        rel="noopener"
        class="link-external"
        >TMDB</a
      >
    </li>
    <li>
      <a
        :href="`https://www.imdb.com/title/${imdbId}/`"
        target="_blank"
        rel="noopener"
        class="link-external"
        >IMDB<span v-if="imdbRating" class="pl-1 text-faded">{{ imdbRating }}</span></a
      >
    </li>
    <li v-if="rt">
      <a
        :href="`https://www.rottentomatoes.com/search/?search=${title}`"
        target="_blank"
        rel="noopener"
        class="link-external"
        >RT<span class="pl-1 text-faded">{{ rt }}</span></a
      >
    </li>
    <li v-if="metacritic">
      <a
        :href="`https://www.metacritic.com/search/movie/${title}/results`"
        target="_blank"
        rel="noopener"
        class="link-external"
        >Metacritic <span class="pl-1 text-faded">{{ metacritic }}</span></a
      >
    </li>
    <li>
      <a
        :href="`https://www.youtube.com/results?search_query=${title} trailer`"
        target="_blank"
        rel="noopener"
        class="link-external"
        >YouTube Trailer</a
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
    title: {
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
      rt: null
    };
  },
  mounted() {
    this.getOMDBInfo();
  },
  methods: {
    async getOMDBInfo() {
      const url = `http://www.omdbapi.com/?apikey=${process.env.VUE_APP_OMDB_API_KEY}&i=${
        this.imdbId
      }`;
      try {
        const { data } = await axios.get(url);
        if (!data.hasOwnProperty("Ratings")) return;
        this.rt = this.findValue("Rotten Tomatoes", data.Ratings);
        this.metacritic = this.findValue("Metacritic", data.Ratings);
        this.imdbRating = this.findValue("Internet Movie Database", data.Ratings);
      } catch (error) {
        console.log(error);
      }
    },
    findValue(name, ratings) {
      const idx = ratings.findIndex(rating => rating.Source === name);
      if (idx >= 0) {
        return ratings[idx].Value;
      }
      return null;
    }
  }
};
</script>

<style scoped>
ul {
  @apply flex flex-col;
}
ul > li {
  @apply my-1 flex;
}
ul > li > a {
  @apply w-full p-2 border rounded text-center border-gray-800;
}
ul > li > a:hover {
  @apply bg-gray-800;
}
</style>
