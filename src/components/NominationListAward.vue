<template>
  <div>
    <h4 class="text-xl text-gray-500 mb-2">Winners</h4>
    <li
      v-for="movieNominations in allWinnerNominationsByMovie"
      :key="movieNominations.id"
      class="mb-4 flex"
    >
      <div class="mt-1 hidden mr-2 sm:block">
        <movie-poster :tmdb-id="movieNominations[0].movie.tmdbId" w="100" />
      </div>

      <div>
        <h4 class="md:flex md:flex-row md:items-center">
          <movie-link
            :movie-id="movieNominations[0].movie.id"
            :movie-title="movieNominations[0].movie.title"
          />
          <!-- <movie-stats :movie-nominations="movieNominations" class="mb-2" /> -->
        </h4>
        <ul>
          <li v-for="nomination in movieNominations" :key="nomination.id">
            <award-edition-nomination
              v-if="isWinner(nomination)"
              :nomination="nomination"
            />
          </li>
        </ul>
      </div>
    </li>
  </div>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "./MovieLink";
import MoviePoster from "./MoviePoster";
import AwardEditionNomination from "./AwardEditionNomination";
export default {
  name: "NominationListAward",
  components: { AwardEditionNomination, MoviePoster, MovieLink },
  props: {
    nominations: {
      type: Array,
      required: true
    }
  },
  computed: {
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
      return (
        nomination.nominatedPeople.nodes.filter(person => person.prize).length >
        0
      );
    },
    sortMoviesByCategory(movies) {
      let moviesCategoriesSorted = movies.map(movie =>
        movie.sort((a, b) => a.category.order - b.category.order)
      );
      return moviesCategoriesSorted.sort(
        (a, b) => a[0].category.order - b[0].category.order
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
