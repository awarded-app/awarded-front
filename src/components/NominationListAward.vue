<template>
  <div>
    <div
      v-for="movie in allWinnerNominationsByMovie"
      :key="movie.id"
      class="mb-4"
    >
      <h3 class="md:flex md:flex-row md:items-center">
        <movie-link
          :movie-id="movie[0].movie.id"
          :movie-title="movie[0].movie.title"
        />
        <span
          v-if="movieStats(movie).nominations > 1"
          class="block text-sm text-gray-700  md:ml-2 mb-1"
        >
          {{ movieStats(movie).nominations }}
          {{ movieStats(movie).nominations | pluralize("nomination") }}
          <span v-if="movieStats(movie).wins">
            <span class="text-xs mx-1 text-gray-800">★</span>
            {{ movieStats(movie).wins }}
            {{ movieStats(movie).wins | pluralize("win") }}
          </span>
        </span>
      </h3>
      <div v-for="nomination in movie" :key="nomination.id">
        <award-edition-nomination
          v-if="isWinner(nomination)"
          :nomination="nomination"
        />
      </div>
    </div>
  </div>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "./MovieLink";
import AwardEditionNomination from "./AwardEditionNomination";
export default {
  name: "NominationListAward",
  components: { AwardEditionNomination, MovieLink },
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
    movieStats(movie) {
      let wins = 0;
      let losses = 0;
      movie.map(nomination => {
        if (!nomination.winner) {
          return (losses += 1);
        }
        if (nomination.nominatedPeople.nodes.some(person => person.prize)) {
          return (wins += 1);
        }
      });
      return { nominations: wins + losses, wins, losses };
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
