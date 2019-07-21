<template>
  <div>
    <h4 class="text-xl text-gray-500 mb-2">Winners</h4>
    <li
      v-for="movieNominations in allWinnerNominationsByMovie"
      :key="movieNominations.id"
      class="mb-4 flex"
    >
      <div class="mt-1 flex-none">
        <movie-poster :tmdb-id="movieNominations[0].movie.tmdbId" w="100" />
      </div>

      <div class="pl-4">
        <h4 class="md:flex md:flex-row md:items-center">
          <movie-link
            :movie-id="movieNominations[0].movie.id"
            :movie-title="movieNominations[0].movie.title"
          />
          <movie-stats :movie-nominations="movieNominations" />
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
import MovieStats from "./MovieStats";
import AwardEditionNomination from "./AwardEditionNomination";
export default {
  name: "NominationListAwardItem",
  components: { AwardEditionNomination, MoviePoster, MovieLink, MovieStats },
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
      return this.allNominationsByMovie.filter(movie => {
        const winnerNominations = movie.filter(nomination =>
          nomination.nominatedPeople.nodes.some(person => person.prize)
        );
        return winnerNominations.length > 0;
      });
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
