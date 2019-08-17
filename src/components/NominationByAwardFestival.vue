<template>
  <ul class="text-xl mb-2">
    <li class="mr-2 text-gray-500 font-semibold">
      {{ nomination.category.name }}
    </li>
    <nomination-credits
      :nominated-people="nominatedPeople.people"
      :prizes="nominatedPeople.prizes"
      :is-festival="true"
      :show-job="true"
    />
  </ul>
</template>

<script>
import CategoryLink from "@/components/CategoryLink";
import NominationCredits from "@/components/NominationCredits";
export default {
  components: {
    CategoryLink,
    NominationCredits
  },
  props: {
    nomination: {
      type: Object,
      required: true
    }
  },

  computed: {
    nominatedPeople() {
      if (this.nomination.winner) {
        const people = this.nomination.hasOwnProperty("nominatedPeople")
          ? this.nomination.nominatedPeople.nodes.filter(
              nominatedPerson => nominatedPerson.nominatedPersonPrizes.totalCount > 0
            )
          : [];
        let prizes = people.length
          ? people.map(person => person.nominatedPersonPrizes.nodes)
          : this.nomination.prizes.nodes;

        prizes = prizes.filter(
          (prize, index, self) => index === self.findIndex(p => prize.id === p.id)
        );
        return {
          people,
          prizes
        };
      }
      return {
        people: this.nominations.hasOwnProperty("nominatedPeople")
          ? this.nomination.nominatedPeople.nodes
          : [],
        prizes: []
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
