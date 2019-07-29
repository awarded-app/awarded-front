<template>
  <ul :class="showPrize && hasStar ? 'ml-6' : ''">
    <li v-for="prizeGroup in peopleByPrize" :key="prizeGroup.prize.id" class="flex flex-wrap">
      <p v-if="showPrize" class="mr-2">
        <star v-if="hasStar" :winner="true" class="-ml-6 mr-2 mt-1 text-base" />{{
          prizeGroup.prize.name
        }}
      </p>
      <ul class="flex flex-wrap text-gray-500">
        <li v-for="(credit, index) in prizeGroup.people" :key="credit.id">
          <person-link :person-name="credit.person.name" :person-id="credit.person.id">{{
            credit.person.name
          }}</person-link
          ><span v-if="credit.character"> (as {{ credit.character }})</span
          ><span v-if="index < prizeGroup.people.length - 1">,&nbsp;</span>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import PersonLink from "./PersonLink";

export default {
  components: {
    PersonLink
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
    }
  },
  computed: {
    prizes() {
      const prizes = [];
      for (const nominatedPerson of this.nominatedPeople) {
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
