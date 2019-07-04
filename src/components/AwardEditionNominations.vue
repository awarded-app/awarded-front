<template>
  <spinner v-if="$apollo.loading" />
  <div v-else-if="allNominations" class="pl-6 lg:pl-8 mb-8 mt-4">
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
  <div v-else>Error...</div>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "./Spinner";
import MovieLink from "./MovieLink";
import AwardEditionNomination from "./AwardEditionNomination";
const groupBy = require("lodash.groupby");
export default {
  components: {
    AwardEditionNomination,
    Spinner,
    MovieLink
  },
  props: {
    edition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      allNomination: null,
      allNominationsByMovie: null,
      allWinnerNominationsByMovie: null,
      nominationsByImportantCategory: null,
      winnerNominationsByImportantCategory: null
    };
  },
  apollo: {
    edition: {
      query: gql`
        query edition($id: Int!, $nominationCondition: NominationCondition) {
          edition(id: $id) {
            nominations(
              condition: $nominationCondition
              orderBy: CATEGORY_ORDER_ASC
            ) {
              nodes {
                ...nomination
              }
            }
          }
        }
        ${AwardEditionNomination.fragments.nomination}
      `,
      variables() {
        return {
          id: this.edition.id
        };
      },
      update(data) {
        //console.log(data);
        this.allNominations = data.edition.nominations.nodes;
        this.allNominationsByMovie = this.groupByMovie(this.allNominations);
        this.allWinnerNominationsByMovie = this.allNominationsByMovie.filter(
          movie => {
            const winnerNominations = movie.filter(nomination =>
              nomination.nominatedPeople.nodes.some(person => person.prize)
            );
            return winnerNominations.length > 0;
          }
        );

        // only important
        this.nominationsByImportantCategory = this.groupByMovie(
          this.filterByImportantCategory(
            this.allNominations.filter(
              nomination => nomination.category.important
            )
          )
        );
        //only winner important
        this.winnerNominationsByImportantCategory = this.nominationsByImportantCategory.filter(
          movie =>
            movie.filter(nomination =>
              nomination.nominatedPeople.nodes.filter(person => person.prize)
            )
        );
      }
    }
  },
  methods: {
    filterByImportantCategory(nominations) {
      //console.log(nominations);
      return nominations.filter(nomination => nomination.category.important);
    },
    groupByMovie(nominations) {
      return Object.values(groupBy(nominations, "movie.id"));
    },
    isWinner(nomination) {
      return (
        nomination.nominatedPeople.nodes.filter(person => person.prize).length >
        0
      );
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
