<template>
  <div>
    <header class="flex items-center mb-2">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" />
      <h3>
        <category-link
          :award-name-short="category.award.nameShort"
          :category-name="category.name"
          >{{ category.name }}</category-link
        >
      </h3>
    </header>
    <div v-if="isOpen" class="indented mb-4">
      <template v-if="isFestival">
        <nomination-festival
          v-for="nomination in nominationsByPrize"
          :key="nomination.id"
          :nomination="nomination"
        />
        <p class="text-gray-500">Other movies in {{ category.name }}:</p>
        <category-posters :nominations="losers" />
      </template>
      <template v-else>
        <nomination
          v-for="nomination in category.nominations.nodes"
          :key="nomination.id"
          :nomination="nomination"
          :display="category.display"
        />
        <category-posters :nominations="category.nominations.nodes" />
      </template>
    </div>
  </div>
</template>

<script>
const orderBy = require("lodash.orderby");
import Nomination from "../components/Nomination";
import NominationFestival from "../components/NominationFestival";
import CategoryPosters from "../components/CategoryPosters";
import CategoryLink from "../components/CategoryLink";
export default {
  name: "Category",
  components: {
    NominationFestival,
    Nomination,
    CategoryLink,
    CategoryPosters
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
      isOpen: this.category.important
    };
  },
  computed: {
    winners() {
      return this.category.nominations.nodes.filter(nomination => nomination.winner);
    },
    losers() {
      return this.category.nominations.nodes.filter(nomination => !nomination.winner);
    },
    orderWinnersByPrize() {
      const winners = this.winners.map(winner => {
        return {
          ...winner,
          prizeOrder: this.getHighestPrize(winner.nominatedPeople.nodes).order
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
        for (const { prize } of nominatedPerson.nominatedPersonPrizes.nodes) {
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
