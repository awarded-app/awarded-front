<template>
  <ul>
    <h4 class="text-xl text-gray-500 mb-2">Winners (Official Competition)</h4>
    <li
      v-for="nomination in winnersMainCategory"
      :key="nomination.id"
      class="mb-4 flex"
    >
      <div class="mt-1 mr-2 hidden sm:block">
        <movie-poster :tmdb-id="nomination.movie.tmdbId" w="100" />
      </div>
      <div>
        <h4 class="flex items-center">
          <star :winner="true" class="text-lg mr-2 mb-1 md:mb-0" />
          <span>
            <movie-link
              :movie-id="nomination.movie.id"
              :movie-title="nomination.movie.title"
            />
          </span>
        </h4>
        <ul class="ml-6 text-lg">
          <li
            v-for="nominatedPerson in nomination.nominatedPeople.nodes"
            :key="nominatedPerson.id"
            class="flex flex-col md:flex-row"
          >
            <template v-if="nominatedPerson.prize">
              <span class="text-gray-500 mr-2">{{
                nominatedPerson.prize.name
              }}</span
              ><span class="text-white"
                ><person-link
                  :person-name="nominatedPerson.person.name"
                  :person-id="nominatedPerson.person.id"
                  >{{ nominatedPerson.person.name }}</person-link
                ></span
              >
            </template>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
const groupBy = require("lodash.groupby");
import MovieLink from "./MovieLink";
import PersonLink from "./PersonLink";
import MoviePoster from "./MoviePoster";

export default {
  name: "NominationListFestival",
  components: { MovieLink, MoviePoster, PersonLink },
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
