<template>
  <ul class="flex flex-wrap">
    <li
      v-for="(nominatedPerson, index) in nominatedPeople"
      :key="nominatedPerson.id"
      class="flex"
    >
      <span
        v-if="isFestival && nominatedPerson.prize"
        class="text-white mr-2"
        >{{ nominatedPerson.prize.name }}</span
      >
      <nominated-person :nominated-person="nominatedPerson" /><span
        v-if="index != nominatedPeople.length - 1"
        >,&nbsp;</span
      >
    </li>
  </ul>
</template>

<script>
import NominatedPerson from "./NominatedPerson";
export default {
  name: "NominatedPeople",
  components: { NominatedPerson },
  props: {
    nominatedPeople: {
      type: Array,
      required: true
    },
    isFestival: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped></style>
