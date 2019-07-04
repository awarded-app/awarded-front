<template>
  <span>
    {{ nominatedPerson.person.name
    }}<span class="text-gray-500" v-if="nominatedPerson.character">
      (as {{ nominatedPerson.character }})</span
    >
  </span>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "NominatedPerson",
  props: {
    nominatedPerson: {
      type: Object,
      required: true
    }
  },
  fragments: {
    nominatedPerson: gql`
      fragment nominatedPerson on NominatedPerson {
        character
        id
        job {
          id
          name
        }
        person {
          id
          name
        }
        prize {
          id
          name
          order
        }
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
