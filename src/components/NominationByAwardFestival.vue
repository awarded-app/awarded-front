<template>
  <ul class="text-xl mb-2">
    <li class="mr-2 text-gray-500">{{ nomination.category.name }}</li>
    <li
      v-if="
        nominatedPeople.prizes.length &&
          nominatedPeople.prizes.length < nominatedPeople.people.length
      "
      class="mr-2"
    >
      {{ nominatedPeople.prizes[0].name }}
    </li>
    <li
      v-for="nominatedPerson in nominatedPeople.people"
      :key="nominatedPerson.id"
    >
      <span
        v-if="
          nominatedPerson.prize &&
            nominatedPeople.prizes.length === nominatedPeople.people.length
        "
        class="mr-2"
        >{{ nominatedPerson.prize.name }}</span
      ><span class="text-gray-500 mr-2">{{ nominatedPerson.person.name }}</span>
      <span v-if="nominatedPerson.character" class="text-gray-500"
        >(as {{ nominatedPerson.character }})</span
      >
    </li>
  </ul>
</template>

<script>
export default {
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
          (prize, index, self) =>
            index === self.findIndex(p => prize.id === p.id)
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
