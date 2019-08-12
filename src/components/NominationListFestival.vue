<template>
  <ul>
    <h4 class="text-lg text-gray-500 mb-2 font-semibold">
      Winners (Official Competition)
    </h4>
    <li
      v-for="nomination in nominationsMainCategorySorted"
      :key="nomination.id"
      class="mb-4 flex"
    >
      <figure class="mt-1 mr-2 hidden sm:block flex-none">
        <movie-poster :tmdb-id="nomination.movie.tmdbId" w="100" />
      </figure>
      <article>
        <header class="flex items-center">
          <!-- <star :winner="true" class="text-base mr-2 mb-1 md:mb-0" /> -->
          <h4>
            <movie-link
              :movie-id="nomination.movie.id"
              :movie-title="nomination.movie.title"
              >{{ nomination.movie.title }}</movie-link
            >
          </h4>
        </header>
        <nomination-credits
          :nominated-people="nomination.nominatedPeople.nodes"
          :has-star="true"
          :is-festival="true"
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
  name: "NominationListFestival",
  components: { MovieLink, MoviePoster, NominationCredits },
  props: {
    nominations: {
      type: Array,
      required: true
    }
  },
  computed: {
    winnerNominations() {
      return this.nominations.filter(nomination => nomination.winner);
    },
    nominationsByCategory() {
      return Object.values(groupBy(this.winnerNominations, "category.id"));
    },
    nominationsMainCategory() {
      return [...this.nominationsByCategory].sort((a, b) => {
        a[0].category.order - b[0].category.order;
      })[0];
    },
    nominationsMainCategorySorted() {
      for (let nomination of this.nominationsMainCategory) {
        nomination.nominatedPeople.nodes = nomination.nominatedPeople.nodes.filter(
          nominatedPerson =>
            nominatedPerson.nominatedPersonPrizes.totalCount > 0
        );
      }

      return this.orderByPrize(this.nominationsMainCategory);
    }
  },
  methods: {
    orderByPrize(nominations) {
      let sorted = nominations.sort((a, b) => {
        const aPrizes = [];
        a.nominatedPeople.nodes.map(nominatedPerson => {
          for (const { prize } of nominatedPerson.nominatedPersonPrizes.nodes) {
            aPrizes.push(prize);
          }
        });
        const aPrize = aPrizes.sort((a, b) => a.order - b.order)[0];
        const bPrizes = [];
        b.nominatedPeople.nodes.map(nominatedPerson => {
          for (const { prize } of nominatedPerson.nominatedPersonPrizes.nodes) {
            bPrizes.push(prize);
          }
        });
        const bPrize = bPrizes.sort((a, b) => a.order - b.order)[0];

        return aPrize.order - bPrize.order;
      });
      return sorted;
    }
  }
};
</script>

<style lang="scss" scoped></style>
