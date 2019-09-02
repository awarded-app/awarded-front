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
      :award-type="awardType"
    />
  </ul>
</template>

<script>
//import CategoryLink from "@/components/CategoryLink";
import NominationCredits from "@/components/NominationCredits";
export default {
  components: {
    //CategoryLink,
    NominationCredits
  },
  props: {
    nomination: {
      type: Object,
      required: true
    },
    awardType: {
      type: String,
      required: true
    }
  },

  computed: {
    nominatedPeople() {
      if (this.nomination.isWinner) {
        const people = this.nomination.hasOwnProperty(`${this.awardType}NominatedPeople`)
          ? this.nomination[`${this.awardType}NominatedPeople`].nodes.filter(
              nominatedPerson =>
                nominatedPerson[`${this.awardType}NominatedPersonPrizes`].totalCount > 0
            )
          : [];
        let prizes = people.length
          ? people.map(person => person[`${this.awardType}NominatedPersonPrizes`].nodes)
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
        people: this.nomination.hasOwnProperty(`${this.awardType}NominatedPeople`)
          ? this.nomination[`${this.awardType}NominatedPeople`].nodes
          : [],
        prizes: []
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
