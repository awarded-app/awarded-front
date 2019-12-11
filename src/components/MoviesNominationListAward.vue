<template>
  <div>
    <h4 class="mb-4 text-faded a-uppercase-info">
      <span v-if="!isPast">Award ceremony on {{ editionDate | formatDate("Do LLL") }}</span
      ><span v-else>Winners</span><star-separator class="text-gray-300" /><edition-link
        :award-name-short="awardNameShort"
        :edition-official-year="editionOfficialYear"
        award-type="movies"
        >By Category</edition-link
      >
    </h4>
    <ul>
      <list-transition>
        <li
          v-for="(nominationGroup, index) in winnerNominationByMovie"
          :key="nominationGroup[0].movie.id"
          :data-index="index"
          class="flex mb-6"
        >
          <figure class="flex-none mt-1 mb-2 mr-2">
            <movie-link
              :movie-id="nominationGroup[0].movie.id"
              :movie-title="nominationGroup[0].movie.title"
              ><movie-poster :tmdb-id="nominationGroup[0].movie.tmdbId" w="100"
            /></movie-link>
          </figure>
          <article>
            <h4 class="mb-1">
              <movie-link
                :movie-id="nominationGroup[0].movie.id"
                :movie-title="nominationGroup[0].movie.title"
                >{{ nominationGroup[0].movie.title }}</movie-link
              >
            </h4>
            <p v-if="!isPast" class="mb-1 text-sm font-normal text-faded">
              {{ nominationGroup.length }} nominations
            </p>
            <movies-nomination-credits
              v-for="nomination in nominationGroup"
              :key="nomination.id"
              :has-star="true"
              :show-people="true"
              :nominated-people="nomination.moviesNominatedPeople.nodes"
              :category="nomination.category"
              :award-name-short="awardNameShort"
            />
          </article>
        </li>
      </list-transition>
    </ul>
  </div>
</template>

<script>
import startOfYesterday from "date-fns/startOfYesterday";
import isPast from "date-fns/isPast";
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
    ListTransition
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
    editionDate: {
      type: [String, Number],
      default: startOfYesterday()
    },
    awardNameShort: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPast: isPast(new Date(this.editionDate))
    };
  },
  computed: {
    winnerNominationByMovie() {
      const nominationsByMovie = this.groupByMovie(this.nominations);
      if (this.isPast) {
        let winnersByMovie = this.getWinnerMovies(nominationsByMovie);
        return this.sortMoviesByCategory(winnersByMovie);
      }

      return this.sortMoviesByMostNominations(this.sortMoviesByCategory(nominationsByMovie));
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
    sortMoviesByMostNominations(movies) {
      return movies.sort((a, b) => b.length - a.length);
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
