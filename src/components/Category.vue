<template>
  <div class="pb-4">
    <h3 class="flex items-center">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" class="mb-2" />
      <category-link
        :award-name-short="category.award.nameShort"
        :category-name="category.name"
      />
    </h3>
    <div v-if="isOpen" class="indented">
      <template v-if="isFestival">
        <nomination-festival
          v-for="nomination in nominationsByPrize"
          :key="nomination.id"
          :nomination="nomination"
        />
      </template>
      <template v-else>
        <nomination
          v-for="nomination in category.nominations.nodes"
          :key="nomination.id"
          :nomination="nomination"
          :display="category.display"
        />
      </template>
      <category-posters :nominations="category.nominations.nodes" />
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
      return this.category.nominations.nodes.filter(
        nomination => nomination.winner
      );
    },
    losers() {
      return this.category.nominations.nodes.filter(
        nomination => !nomination.winner
      );
    },
    orderWinnersByPrize() {
      const winners = this.winners.map(winner => {
        return {
          ...winner,
          prizeOrder: this.getHighestPrize(winner.nominatedPeople.nodes).prize
            .order
        };
      });
      return orderBy([...winners], "prizeOrder");
    },
    nominationsByPrize() {
      return [...this.orderWinnersByPrize, ...this.losers];
    }
  },
  methods: {
    getHighestPrize(nominatedPeople) {
      return orderBy([...nominatedPeople], "prize.order")[0];
    }
  }
};
</script>

<style lang="scss" scoped></style>
