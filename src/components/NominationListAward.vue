<template>
  <ul>
    <h4 class="text-xl text-gray-500 mb-2">Winners</h4>
    <li v-for="movieGroup in winnerNominationsByMovie" :key="movieGroup.movie.id" class="mb-4 flex">
      <figure class="mt-1 hidden mr-2 sm:block flex-none">
        <movie-poster :tmdb-id="movieGroup.movie.tmdbId" w="100" />
      </figure>
      <article>
        <h4 class="mb-1">
          <movie-link :movie-id="movieGroup.movie.id" :movie-title="movieGroup.movie.title">{{
            movieGroup.movie.title
          }}</movie-link>
        </h4>
        <nomination-credits
          v-for="nomination in movieGroup.nominations"
          :key="nomination.id"
          :has-star="true"
          :nominated-people="nomination.nominatedPeople.nodes"
        />
      </article>
    </li>
  </ul>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "@/components/MovieLink";
import MoviePoster from "@/components/MoviePoster";
import NominationCredits from "@/components/NominationCredits";

export default {
  name: "NominationListAward",
  components: {
    MoviePoster,
    MovieLink,
    NominationCredits
  },
  props: {
    nominations: {
      type: Array,
      required: true
    }
  },
  computed: {
    movies() {
      const movies = [];
      this.winnerNominations.map(nomination => {
        if (movies.findIndex(movie => nomination.movie.id === movie.id) < 0) {
          movies.push(nomination.movie);
        }
      });
      return movies;
    },
    winnerNominationsByMovie() {
      const winnerNominationsByMovie = [];
      for (const movie of this.movies) {
        const nominations = this.winnerNominations.filter(
          nomination => nomination.movie.id === movie.id
        );
        winnerNominationsByMovie.push({
          movie,
          nominations
        });
      }
      return winnerNominationsByMovie;
    },
    winnerNominations() {
      return this.nominations.filter(nomination => nomination.winner);
    },
    allNominationsByMovie() {
      return this.groupByMovie(this.nominations);
    },
    allWinnerNominationsByMovie() {
      let winners = this.allNominationsByMovie
        .map(movie => movie.filter(nomination => nomination.winner))
        .filter(movie => movie.length > 0);

      return this.sortMoviesByCategory(winners);
    }
  },
  methods: {
    groupByMovie(nominations) {
      return Object.values(groupBy(nominations, "movie.id"));
    },
    isWinner(nomination) {
      return nomination.nominatedPeople.nodes.filter(person => person.prize).length > 0;
    },
    sortMoviesByCategory(movies) {
      let moviesCategoriesSorted = movies.map(movie =>
        movie.sort((a, b) => a.category.order - b.category.order)
      );
      return moviesCategoriesSorted.sort((a, b) => a[0].category.order - b[0].category.order);
    }
  }
};
</script>

<style lang="scss" scoped></style>
