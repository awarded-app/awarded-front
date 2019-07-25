<template>
  <div v-if="peopleByPrize">
    <template v-for="prize in peopleByPrize">
      <span class="text-gray-500 mr-1" :key="prize[0].prize.id">
        <category-link
          :category-name="nomination.category.name"
          :award-name-short="nomination.category.award.nameShort"
          >{{ prize[0].prize.name }}</category-link
        >&nbsp;
        <span>
          <span
            v-for="(nomination, index) in prize"
            :key="nomination.id"
            class="text-gray-300"
          >
            <template v-if="prize.length > 1">
              <span v-if="index === prize.length - 1">&</span>
              <span v-else-if="index > 0">,</span> </template
            ><person-link
              :person-id="nomination.person.id"
              :person-name="nomination.person.name"
            >
              {{ nomination.person.name }}
            </person-link></span
          >
        </span>
      </span>
    </template>
  </div>
  <div v-else>
    <span class="text-gray-500">
      <category-link
        :category-name="nomination.category.name"
        :award-name-short="nomination.category.award.nameShort"
        >{{ nomination.category.name }}
      </category-link>
      <span class="pl-1">
        <span
          v-for="(nominatedPerson, index) in nomination.nominatedPeople.nodes"
          :key="nominatedPerson.id"
          class="text-gray-400"
        >
          <template v-if="nomination.nominatedPeople.nodes.length > 1">
            <span v-if="index === nomination.nominatedPeople.nodes.length - 1"
              >&</span
            >
            <span v-else-if="index > 0">,</span> </template
          ><person-link
            :person-id="nominatedPerson.person.id"
            :person-name="nominatedPerson.person.name"
          >
            {{ nominatedPerson.person.name }}
          </person-link>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
const groupBy = require("lodash.groupby");
import CategoryLink from "./CategoryLink";
import PersonLink from "./PersonLink";

export default {
  components: {
    PersonLink,
    CategoryLink
  },
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
