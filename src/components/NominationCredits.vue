<template>
  <ul v-if="peopleByPrize.length > 0">
    <li v-for="prizeGroup in peopleByPrize" :key="prizeGroup.prize.id" class="flex flex-wrap">
      <star v-if="hasStar" :winner="true" />
      <div class="flex items-center">
        <p v-if="showPrize" class="mr-2">
          <prize-link
            v-if="isFestival"
            :category-name="prizeGroup.prize.category.name"
            :award-name-short="prizeGroup.prize.award.nameShort"
            :prize-name="prizeGroup.prize.name"
            >{{ prizeGroup.prize.name }}</prize-link
          >
          <category-link
            v-else
            :category-name="prizeGroup.prize.category.name"
            :award-name-short="prizeGroup.prize.award.nameShort"
            >{{ prizeGroup.prize.name }}</category-link
          >
        </p>
      </div>
      <ul
        class="flex flex-wrap"
        :class="hasStar && showPrize ? 'pl-6 md:pl-0' : ''"
        v-bind="$attrs"
      >
        <li v-for="(credit, index) in prizeGroup.people" :key="credit.id">
          <p :class="display === 'movie' ? 'text-gray-500' : 'text-white'">
            <person-link :person-name="credit.person.name" :person-id="credit.person.id">{{
              credit.person.name
            }}</person-link
            ><span v-if="credit.character"> (as {{ credit.character }})</span
            ><span v-if="index < prizeGroup.people.length - 1">,&nbsp;</span>
          </p>
        </li>
      </ul>
    </li>
  </ul>
  <ul v-else>
    <ul class="flex flex-wrap" :class="hasStar && showPrize ? 'pl-6 md:pl-0' : ''" v-bind="$attrs">
      <li v-for="(credit, index) in nominatedPeople" :key="credit.id">
        <p :class="display === 'movie' ? 'text-gray-500' : 'text-white'">
          <person-link :person-name="credit.person.name" :person-id="credit.person.id">{{
            credit.person.name
          }}</person-link
          ><span v-if="credit.character"> (as {{ credit.character }})</span
          ><span v-else-if="credit.job && showJob"> ({{ credit.job.name }})</span
          ><span v-if="index < nominatedPeople.length - 1">,&nbsp;</span>
        </p>
      </li>
    </ul>
  </ul>
</template>

<script>
import PersonLink from "./PersonLink";
import PrizeLink from "./PrizeLink";
import CategoryLink from "./CategoryLink";

export default {
  components: {
    PersonLink,
    CategoryLink,
    PrizeLink
  },
  props: {
    nominatedPeople: {
      type: Array,
      required: true
    },
    hasStar: {
      type: Boolean,
      default: false
    },
    showPrize: {
      type: Boolean,
      default: true
    },
    isFestival: {
      type: Boolean,
      default: false
    },
    display: {
      type: String,
      default: "movie"
    },
    showJob: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    prizes() {
      const prizes = [];
      for (const nominatedPerson of this.nominatedPeople) {
        if (!nominatedPerson.hasOwnProperty("nominatedPersonPrizes")) break;
        for (const { prize } of nominatedPerson.nominatedPersonPrizes.nodes) {
          if (prizes.findIndex(p => p.id === prize.id) < 0) {
            prizes.push(prize);
          }
        }
      }
      return prizes;
    },
    peopleByPrize() {
      const people = this.prizes.map(p => {
        const nominees = this.nominatedPeople.filter(
          nominatedPerson =>
            nominatedPerson.nominatedPersonPrizes.nodes.findIndex(
              ({ prize }) => p.id === prize.id
            ) >= 0
        );
        return {
          prize: p,
          people: nominees
        };
      });

      return people;
    }
  }
};
</script>

<style lang="scss" scoped></style>
