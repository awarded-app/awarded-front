<template>
  <ul>
    <h4 class="text-faded mb-4 a-uppercase-info">
      Winners (Official Competition)
      <star-separator />
      <edition-link
        :award-name-short="awardNameShort"
        :edition-official-year="editionOfficialYear"
        award-type="movies"
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
        <figure class="mt-1 mr-2 mb-2 flex-none">
          <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title"
            ><movie-poster :tmdb-id="nomination.movie.tmdbId" w="100" h="150"
          /></movie-link>
        </figure>
        <div >

            <h4>
              <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title">{{
                nomination.movie.title
              }}</movie-link>
            </h4>

          <movies-nomination-credits
            :nominated-people="nomination.moviesNominatedPeople.nodes"
            :has-star="true"
            :is-festival="true"

          />
        </div>
      </li>
    </list-transition>
  </ul>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "@/components/MovieLink";
import EditionLink from "@/components/EditionLink";
import MoviePoster from "@/components/MoviePoster";
import MoviesNominationCredits from "@/components/MoviesNominationCredits";
import StarSeparator from "@/components/StarSeparator";
import ListTransition from "@/components/ListTransition";

export default {
  name: "MoviesNominationListFestival",
  components: {
    EditionLink,
    MovieLink,
    MoviePoster,
    StarSeparator,
    MoviesNominationCredits,
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
    awardNameShort: {
      type: String,
      required: true
    },

  },

  computed: {
    nominationsMainCategorySorted() {
      const winnerNominations = this.getWinnerNominations(this.nominations);
      const nominationsByCategory = this.getNominationsByCategory(winnerNominations);
      const nominationsMainCategory = this.getNominationsMainCategory(nominationsByCategory);

      for (let nomination of nominationsMainCategory) {
        nomination.moviesNominatedPeople.nodes = nomination.moviesNominatedPeople.nodes.filter(
          nominatedPerson =>
            nominatedPerson.moviesNominatedPersonPrizes.totalCount > 0
        );
      }

      return this.orderByPrize(nominationsMainCategory);
    }
  },
  methods: {
    getNominationsMainCategory(nominations) {
      return nominations.sort((a, b) => {
        a[0].category.order - b[0].category.order;
      })[0];
    },
    getWinnerNominations(nominations) {
      return nominations.filter(nomination => nomination.isWinner);
    },
    getNominationsByCategory(nominations) {
      return Object.values(groupBy(nominations, "category.id"));
    },
    orderByPrize(nominations) {
      let sorted = nominations.sort((a, b) => {
        const aPrizes = [];
        a.moviesNominatedPeople.nodes.map(nominatedPerson => {
          for (const { prize } of nominatedPerson.moviesNominatedPersonPrizes.nodes) {
            aPrizes.push(prize);
          }
        });
        const aPrize = aPrizes.sort((a, b) => a.order - b.order)[0];
        const bPrizes = [];
        b.moviesNominatedPeople.nodes.map(nominatedPerson => {
          for (const { prize } of nominatedPerson.moviesNominatedPersonPrizes.nodes) {
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
