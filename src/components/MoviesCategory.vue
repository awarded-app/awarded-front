<template>
  <div>
    <header class="flex items-center mb-2">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" />
      <h3>
        <category-link
          :award-name-short="category.award.nameShort"
          :category-name="category.name"
          award-type="movies"
          >{{ category.name }}</category-link
        >
      </h3>
    </header>
    <div v-if="isOpen" class="indented mb-4">
      <template v-if="isFestival">
        <list-transition>
          <movies-nomination-festival
            v-for="(nomination, index) in nominationsByPrize"
            :key="nomination.id"
            :data-index="index"
            :nomination="nomination"
          />
        </list-transition>
        <p class="text-faded a-uppercase-info">
          Other movies in {{ category.name }}:
        </p>
        <category-posters :nominations="losers" />
      </template>
      <template v-else>
        <list-transition>
          <movies-movie-nomination
            v-for="(nomination, index) in category.moviesNominations.nodes"
            :key="nomination.id"
            :data-index="index"
            :nomination="nomination"
            :display="category.display"
          />
        </list-transition>
        <category-posters :nominations="category.moviesNominations.nodes" />
      </template>
    </div>
  </div>
</template>

<script>
const orderBy = require("lodash.orderby");
import MoviesMovieNomination from "../components/MoviesMovieNomination";
import MoviesNominationFestival from "../components/MoviesNominationFestival";
import CategoryPosters from "../components/CategoryPosters";
import CategoryLink from "../components/CategoryLink";
import ListTransition from "../components/ListTransition";

export default {
  name: "Category",
  components: {
    MoviesNominationFestival,
    MoviesMovieNomination,
    CategoryLink,
    CategoryPosters,
    ListTransition
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    isFestival: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: true
    };
  },
  computed: {
    winners() {
      return this.category.moviesNominations.nodes.filter(
        nomination => nomination.isWinner
      );
    },
    losers() {
      return this.category.moviesNominations.nodes.filter(
        nomination => !nomination.isWinner
      );
    },
    orderWinnersByPrize() {
      const winners = this.winners.map(winner => {
        return {
          ...winner,
          prizeOrder: this.getHighestPrize(winner.moviesNominatedPeople.nodes)
            .order
        };
      });
      return orderBy([...winners], "prizeOrder");
    },
    nominationsByPrize() {
      return [...this.orderWinnersByPrize];
    }
  },
  methods: {
    getHighestPrize(nominatedPeople) {
      let highestPrize;
      let highestOrder = 9999;
      for (const nominatedPerson of nominatedPeople) {
        for (const { prize } of nominatedPerson.moviesNominatedPersonPrizes
          .nodes) {
          if (prize.order < highestOrder) {
            highestOrder = prize.order;
            highestPrize = prize;
          }
        }
      }
      return highestPrize;
    }
  }
};
</script>

<style lang="scss" scoped></style>
