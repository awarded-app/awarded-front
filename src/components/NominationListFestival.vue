<template>
  <ul>
    <h4 class="text-xl text-gray-500 mb-2">Winners (Official Competition)</h4>
    <li
      v-for="nomination in winnersMainCategory"
      :key="nomination.id"
      class="mb-4 flex"
    >
      <div class="mt-1 flex-none">
        <movie-poster :tmdb-id="nomination.movie.tmdbId" w="100" />
      </div>
      <div class="pl-2">
        <h4 class="-mb-1 md:flex md:flex-row md:items-center">
          <star :winner="true" class="mr-2 pb-2" />
          <movie-link
            :movie-id="nomination.movie.id"
            :movie-title="nomination.movie.title"
          />
        </h4>
        <ul class="ml-8">
          <li
            v-for="nominatedPerson in nomination.nominatedPeople.nodes"
            :key="nominatedPerson.id"
          >
            <span v-if="nominatedPerson.prize" class="text-gray-500">
              {{ nominatedPerson.prize.name
              }}<span class="text-white ml-2">{{
                nominatedPerson.person.name
              }}</span
              ><br />
            </span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "./MovieLink";
import MoviePoster from "./MoviePoster";

export default {
  name: "NominationListFestival",
  components: { MovieLink, MoviePoster },
  props: {
    nominations: {
      type: Array,
      required: true
    }
  },
  methods: {
    orderByPrize(nominations) {
      return nominations.sort((a, b) => {
        const a_prize = a.nominatedPeople.nodes
          .filter(person => person.prize)
          .sort((a, b) => a.prize.order - b.prize.order)[0].prize;
        const b_prize = b.nominatedPeople.nodes
          .filter(person => person.prize)
          .sort((a, b) => a.prize.order - b.prize.order)[0].prize;
        console.log("a_prize", a_prize);
        console.log("b_prize", b_prize);

        return a_prize.order - b_prize.order;
      });
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
      return this.orderByPrize(
        this.nominationsMainCategory.filter(nomination => nomination.winner)
      );
    },
    winnerNominationsByCategory() {
      return this.nominationsByCategory
        .map(categoryNominations =>
          categoryNominations.filter(nomination => nomination.winner)
        )
        .filter(categoryNominations => categoryNominations.length > 0);
    }
  }
};
</script>

<style lang="scss" scoped></style>
