<template>
  <ul class="text-xl mb-2">
    <li class="mr-2 text-gray-500">
      <category-link
        :award-name-short="nomination.award.nameShort"
        :category-name="nomination.category.name"
        >{{ nomination.category.name }}</category-link
      >
    </li>
    <nomination-credits :nominated-people="nomination.nominatedPeople.nodes"/>
  </ul>
</template>

<script>
import CategoryLink from "@/components/CategoryLink"
import NominationCredits from "@/components/NominationCredits"
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
        const people = this.nomination.nominatedPeople.nodes.filter(
          nominatedPerson => nominatedPerson.prize
        );
        let prizes = people.map(person => person.prize);
        prizes = prizes.filter(
          (prize, index, self) => index === self.findIndex(p => prize.id === p.id)
        );
        return {
          people,
          prizes
        };
      }
      return {
        people: this.nomination.nominatedPeople.nodes,
        prizes: []
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
