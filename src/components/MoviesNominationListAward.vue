<template>
  <ul>
    <h4 class="text-faded mb-4 a-uppercase-info">
      Winners<star-separator class="text-gray-300" /><edition-link
              :award-name-short="awardNameShort"
              :edition-official-year="editionOfficialYear"
              award-type="movies"
              >All Nominations</edition-link></a>
    </h4>
    <list-transition>
      <li
        v-for="(nominationGroup, index) in winnerNominationByMovie"
        :key="nominationGroup[0].movie.id"
        :data-index="index"
        class="mb-4 flex"
      >
        <figure class="mt-1 mr-2 mb-2 flex-none">
          <movie-link :movie-id="nominationGroup[0].movie.id" :movie-title="nominationGroup[0].movie.title"
            ><movie-poster :tmdb-id="nominationGroup[0].movie.tmdbId" w="100"
          /></movie-link>
        </figure>
        <article>
          <h4 class="mb-1">
            <movie-link :movie-id="nominationGroup[0].movie.id" :movie-title="nominationGroup[0].movie.title">{{
              nominationGroup[0].movie.title
            }}</movie-link>
          </h4>
          <movies-nomination-credits
            v-for="nomination in nominationGroup"
            :key="nomination.id"
            :has-star="true"
            :show-people="nomination.category.display === 'person'"
            :nominated-people="nomination.moviesNominatedPeople.nodes"
          />
        </article>
      </li>
    </list-transition>
  </ul>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "@/components/MovieLink";
import MoviePoster from "@/components/MoviePoster";
import MoviesNominationCredits from "@/components/MoviesNominationCredits";
import ListTransition from "@/components/ListTransition";
import EditionLink from "@/components/EditionLink";
import StarSeparator from "@/components/StarSeparator";

export default {
  name: "MoviesNominationListAward",
  components: {
    MoviePoster,
    MovieLink,
    MoviesNominationCredits,
    StarSeparator,
    EditionLink,
    ListTransition,
  },
  props: {
    nominations: {
      type: Array,
      required: true
    },
    editionOfficialYear: {
      type: [String, Number],
      required: true
    },
    awardNameShort: {
      type: String,
      required: true
    }
  },

  computed: {
    winnerNominationByMovie() {
      const nominationsByMovie = this.groupByMovie(this.nominations);
      let winnersByMovie = this.getWinnerMovies(nominationsByMovie)
      return this.sortMoviesByCategory(winnersByMovie);
    }
    /* winnerMovies() {
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
    }, */
/*     allNominationsByMovie() {
      return this.groupByMovie(this.nominations);
    }, */

  },
  methods: {
    getWinnerMovies(nominations) {
      return nominations
        .map(movie => movie.filter(nomination => nomination.isWinner))
        .filter(movie => movie.length > 0);

    },
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
