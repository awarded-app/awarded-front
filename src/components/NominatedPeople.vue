<template>
  <ul class="flex flex-wrap">
    <li
      v-for="(nominatedPerson, index) in nominatedPeople"
      :key="nominatedPerson.id"
      class="flex flex-no-wrap"
    >
      <nominated-person :nominated-person="nominatedPerson" /><span
        v-if="index != nominatedPeople.length - 1"
        >,&nbsp;</span
      >
    </li>
  </ul>
</template>

<script>
import NominatedPerson from './NominatedPerson';
export default {
  name: "NominatedPeople",
  components: { NominatedPerson },
  props: {
    nominatedPeople: {
      type: Array,
      required: true
    }
  },
  computed: {
    names() {
      return this.nominatedPeople
        .map(nominatedPerson => nominatedPerson.person.name)
        .join(", ");
    }
  }
};
</script>

<style scoped></style>
