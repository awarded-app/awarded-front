<template>
  <div class="text-xl mb-2">
    <p class="mr-2 text-faded font-semibold">
      {{ nomination.category.name }}
    </p>


    <movies-nomination-credits
      :nominated-people="nominatedPeople.people"
      :prizes="nominatedPeople.prizes"
      :is-festival="true"
      :show-job="true"


    />

  </div>
</template>

<script>
//import CategoryLink from "@/components/CategoryLink";
import MoviesNominationCredits from "@/components/MoviesNominationCredits";
export default {
  components: {
    //CategoryLink,
    MoviesNominationCredits
  },
  props: {
    nomination: {
      type: Object,
      required: true
    },

  },

  computed: {
    nominatedPeople() {
      if (this.nomination.isWinner) {
        const people = this.nomination.hasOwnProperty("moviesNominatedPeople")
          ? this.nomination.moviesNominatedPeople.nodes.filter(
              nominatedPerson =>
                nominatedPerson.moviesNominatedPersonPrizes.totalCount > 0
            )
          : [];
        let prizes = people.length
          ? people.map(person => person.moviesNominatedPersonPrizes.nodes)
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
        people: this.nomination.hasOwnProperty('moviesNominatedPeople')
          ? this.nomination.moviesNominatedPeople.nodes
          : [],
        prizes: []
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
