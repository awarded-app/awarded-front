<template>
  <ul v-if="peopleByPrize.length > 0">
    <li v-for="prizeGroup in peopleByPrize" :key="prizeGroup.prize.id" class="flex">
      <div class="flex">
        <star v-if="hasStar" />
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
              award-type="movies"
              >{{ prizeGroup.prize.name }}</category-link
            >
          </p>
        </div>
      </div>
      <ul v-if="showPeople" class="flex flex-wrap" v-bind="$attrs">
        <li v-for="(credit, index) in prizeGroup.people" :key="credit.id">
          <p :class="display === 'movie' ? 'text-faded' : 'text-white'">
            <person-link
              :person-name="credit.person.name"
              :person-id="credit.person.id"
              award-type="movies"
              >{{ credit.person.name }}</person-link
            ><span v-if="credit.character"> (as {{ credit.character }})</span
            ><span v-if="index < prizeGroup.people.length - 1">,&nbsp;</span>
          </p>
        </li>
      </ul>
    </li>
  </ul>
  <ul v-else>
    <ul class="flex flex-wrap" :class="hasStar && showPrize ? 'pl-6 md:pl-0' : ''" v-bind="$attrs">
      <star v-if="hasStar" :is-winner="false" />
      <template v-if="nominatedPeople.length && showPeople">
        <span v-if="showPrize" class="mr-2">
          <category-link
            v-if="showPrize"
            :category-name="nominatedPeople[0].nomination.category.name"
            :award-name-short="nominatedPeople[0].nomination.award.nameShort"
            award-type="movies"
            >{{ nominatedPeople[0].nomination.category.name }}</category-link
          ></span
        >
        <li
          v-for="(credit, index) in nominatedPeople"
          :key="credit.id"
          class="flex flex-wrap items-center"
        >
          <span :class="display === 'movie' ? 'text-faded' : 'text-white'">
            <person-link
              :person-name="credit.person.name"
              :person-id="credit.person.id"
              award-type="movies"
              >{{ credit.person.name }}</person-link
            ><span v-if="credit.character"> (as {{ credit.character }})</span
            ><span v-else-if="credit.job && showJob"> ({{ credit.job.name }})</span
            ><span v-if="index < nominatedPeople.length - 1">,&nbsp;</span>
          </span>
        </li>
      </template>
      <template v-else-if="prizes.length">
        <li v-for="{ prize } in prizes" :key="prize.id">
          {{ prize.name }}
        </li>
      </template>
      <template v-else>
        <span v-if="showPrize" class="mr-2">
          <category-link
            v-if="showPrize"
            :category-name="category.name"
            :award-name-short="awardNameShort"
            award-type="movies"
            >{{ category.name }}</category-link
          ></span
        >
      </template>
    </ul>
  </ul>
</template>

<script>
import PersonLink from "./PersonLink";
import PrizeLink from "./PrizeLink";
import CategoryLink from "./CategoryLink";

export default {
  name: "MoviesNominationCredits",
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
    prizes: {
      type: Array,
      default: () => []
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
    showPeople: {
      type: Boolean,
      default: true
    },
    showJob: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object,
      default: null
    },
    awardNameShort: {
      type: String,
      default: ""
    }
  },
  computed: {
    allPrizes() {
      if (!this.nominatedPeople.length) return this.prizes;
      const prizes = [];
      for (const nominatedPerson of this.nominatedPeople) {
        if (!nominatedPerson.hasOwnProperty("moviesNominatedPersonPrizes")) break;
        for (const { prize } of nominatedPerson.moviesNominatedPersonPrizes.nodes) {
          if (prizes.findIndex(p => p.id === prize.id) < 0) {
            prizes.push(prize);
          }
        }
      }
      return prizes;
    },
    peopleByPrize() {
      if (!this.nominatedPeople.length) return [];
      const people = this.allPrizes.map(p => {
        const nominees = this.nominatedPeople.filter(
          nominatedPerson =>
            nominatedPerson.moviesNominatedPersonPrizes.nodes.findIndex(
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
