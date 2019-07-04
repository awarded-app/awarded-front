<template>
  <div v-if="peopleByPrize">
    <template v-for="prize in peopleByPrize">
      <h3 class="text-gray-500" :key="prize[0].prize.id">
        {{ prize[0].prize.name }}
        <span class="ml-2">
          <span
            v-for="(nomination, index) in prize"
            :key="nomination.id"
            class="text-gray-300"
          >
            <template v-if="prize.length > 1">
              <span v-if="index === prize.length - 1">&</span>
              <span v-else-if="index > 0">,</span>
            </template>
            {{ nomination.person.name }}
          </span>
        </span>
      </h3>
    </template>
  </div>
  <div v-else>
    <h3 class="text-gray-500">
      {{ nomination.category.name }}
      <span class="ml-2">
        <span
          v-for="(nominatedPerson, index) in nomination.nominatedPeople.nodes"
          :key="nominatedPerson.id"
          class="text-gray-400"
        >
          <template v-if="nomination.nominatedPeople.nodes.length > 1">
            <span v-if="index === nomination.nominatedPeople.nodes.length - 1"
              >&</span
            >
            <span v-else-if="index > 0">,</span>
          </template>
          {{ nominatedPerson.person.name }}
        </span>
      </span>
    </h3>
  </div>
</template>

<script>
const groupBy = require("lodash.groupby");
import gql from "graphql-tag";

export default {
  props: {
    nomination: {
      type: Object,
      required: true
    }
  },
  computed: {
    peopleByPrize() {
      return this.groupByPrize(this.nomination);
    }
  },
  methods: {
    groupByPrize(nomination) {
      // check if there are many different prizes
      // if not, group under the category
      // otherwise, show the prize
      const winners = nomination.nominatedPeople.nodes.filter(
        person => person.prize
      );
      //console.log(winners);
      if (winners.length > 0) {
        return Object.values(groupBy(winners, "prize.id"));
      }
      return null;
    }
  }
};
</script>
