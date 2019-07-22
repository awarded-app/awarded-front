<template>
  <span class="flex"
    ><person-link
      :person-id="nominatedPerson.person.id"
      :person-name="nominatedPerson.person.name"
      class="mr-1"
      >{{ nominatedPerson.person.name }}</person-link
    ><span class="text-gray-500" v-if="nominatedPerson.character">
      (as {{ nominatedPerson.character }})</span
    ></span
  >
</template>

<script>
import gql from "graphql-tag";
import PersonLink from "./PersonLink";

export default {
  name: "NominatedPerson",
  components: {
    PersonLink
  },
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
          display
        }
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
