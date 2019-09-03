<template>
  <ul>
    <h4 class="text-faded mb-2 a-uppercase-info">
      Winners (Official Competition)
      <star-separator />
      <edition-link :award-name-short="awardNameShort" :edition-date="editionDate"
        >Full Edition</edition-link
      >
    </h4>
    <list-transition>
      <li
        v-for="(nomination, index) in nominationsMainCategorySorted"
        :key="nomination.id"
        :data-index="index"
        class="mb-4 flex"
      >
        <figure class="mt-1 mr-2 hidden sm:block flex-none">
          <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title"
            ><movie-poster :tmdb-id="nomination.movie.tmdbId" w="100" h="150"
          /></movie-link>
        </figure>
        <article>
          <header class="flex items-center">
            <!-- <star :is-winner="true" class="text-base mr-2 mb-1 md:mb-0" /> -->
            <h4>
              <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title">{{
                nomination.movie.title
              }}</movie-link>
            </h4>
          </header>
          <nomination-credits
            :nominated-people="nomination[`${awardType}NominatedPeople`].nodes"
            :has-star="true"
            :is-festival="true"
            :award-type="awardType"
          />
        </article>
      </li>
    </list-transition>
  </ul>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "@/components/MovieLink";
import EditionLink from "@/components/EditionLink";
import MoviePoster from "@/components/MoviePoster";
import NominationCredits from "@/components/NominationCredits";
import StarSeparator from "@/components/StarSeparator";
import ListTransition from "@/components/ListTransition";

export default {
  name: "NominationListFestival",
  components: {
    EditionLink,
    MovieLink,
    MoviePoster,
    StarSeparator,
    NominationCredits,
    ListTransition
  },
  props: {
    nominations: {
      type: Array,
      required: true
    },
    editionDate: {
      type: String,
      required: true
    },
    awardNameShort: {
      type: String,
      required: true
    },
    awardType: {
      type: String,
      required: true
    }
  },

  computed: {
    winnerNominations() {
      return this.nominations.filter(nomination => nomination.isWinner);
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
        nomination[`${this.awardType}NominatedPeople`].nodes = nomination[
          `${this.awardType}NominatedPeople`
        ].nodes.filter(
          nominatedPerson =>
            nominatedPerson[`${this.awardType}NominatedPersonPrizes`].totalCount > 0
        );
      }

      return this.orderByPrize(this.nominationsMainCategory);
    }
  },
  methods: {
    orderByPrize(nominations) {
      let sorted = nominations.sort((a, b) => {
        const aPrizes = [];
        a[`${this.awardType}NominatedPeople`].nodes.map(nominatedPerson => {
          for (const { prize } of nominatedPerson[`${this.awardType}NominatedPersonPrizes`].nodes) {
            aPrizes.push(prize);
          }
        });
        const aPrize = aPrizes.sort((a, b) => a.order - b.order)[0];
        const bPrizes = [];
        b[`${this.awardType}NominatedPeople`].nodes.map(nominatedPerson => {
          for (const { prize } of nominatedPerson[`${this.awardType}NominatedPersonPrizes`].nodes) {
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
