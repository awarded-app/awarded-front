<template>
  <div>
    <div
      v-for="nomination in winnersMainCategory"
      :key="nomination.id"
      class="mb-2"
    >
      <h3 class="-mb-1 md:flex md:flex-row md:items-center">
        <span class="mr-2 flex items-start pb-2 lg:items-center">
          <star :winner="true" />
        </span>
        <movie-link
          :movie-id="nomination.movie.id"
          :movie-title="nomination.movie.title"
        />
      </h3>
      <p
        v-for="nominatedPerson in nomination.nominatedPeople.nodes"
        :key="nominatedPerson.id"
        class="ml-6"
      >
        <span v-if="nominatedPerson.prize" class="text-gray-500">
          {{ nominatedPerson.prize.name
          }}<span class="text-white ml-2">{{
            nominatedPerson.person.name
          }}</span
          ><br />
        </span>
      </p>
    </div>
  </div>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "./MovieLink";

export default {
  name: "NominationListFestival",
  components: { MovieLink },
  props: {
    nominations: {
      type: Array,
      required: true
    }
  },
  computed: {
    nominationsByCategory() {
      return Object.values(groupBy(this.nominations, "category.id"));
    },
    nominationsMainCategory() {
      return [...this.nominationsByCategory].sort((a, b) => {
        a[0].category.order - b[0].category.order;
      })[0];
    },
    winnersMainCategory() {
      return this.nominationsMainCategory.filter(
        nomination => nomination.winner
      );
    },
    winnerNominationsByCategory() {
      return this.nominationsByCategory
        .map(categoryNominations =>
          categoryNominations.filter(nomination => nomination.winner)
        )
        .filter(categoryNominations => categoryNominations.length > 0);
    }
  },
};
</script>

<style lang="scss" scoped></style>
