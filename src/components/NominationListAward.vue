<template>
  <ul>
    <h4 class="text-gray-500 mb-2 a-uppercase-info">Winners</h4>
    <li
      v-for="movieGroup in winnerNominationsByMovie"
      :key="movieGroup.movie.id"
      class="mb-4 sm:flex"
    >
      <figure class="mt-1 mr-2 mb-2 flex-none">
        <movie-link :movie-id="movieGroup.movie.id" :movie-title="movieGroup.movie.title"
          ><movie-poster :tmdb-id="movieGroup.movie.tmdbId" w="100"
        /></movie-link>
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
          :nominated-people="nomination[`${awardType}NominatedPeople`].nodes"
          :award-type="awardType"
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
    },
    awardType: {
      type: String,
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
      return this.nominations.filter(nomination => nomination.isWinner);
    },
    allNominationsByMovie() {
      return this.groupByMovie(this.nominations);
    },
    allWinnerNominationsByMovie() {
      let winners = this.allNominationsByMovie
        .map(movie => movie.filter(nomination => nomination.isWinner))
        .filter(movie => movie.length > 0);

      return this.sortMoviesByCategory(winners);
    }
  },
  methods: {
    groupByMovie(nominations) {
      return Object.values(groupBy(nominations, "movie.id"));
    },
    isWinner(nomination) {
      return (
        nomination[`${this.awardType}NominatedPeople`].nodes.filter(person => person.prize).length >
        0
      );
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
