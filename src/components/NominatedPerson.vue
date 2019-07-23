<template>
  <span
    ><person-link
      :person-id="nominatedPerson.person.id"
      :person-name="nominatedPerson.person.name"
      >{{ nominatedPerson.person.name }}</person-link
    ><span class="ml-1 text-gray-500" v-if="nominatedPerson.character">
      (as {{ nominatedPerson.character }})</span
    ></span
  >
</template>

<script>
import gql from "graphql-tag";
import PersonLink from "./PersonLink";
import PersonListItem from "./PersonListItem";
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
          ...person
        }
        prize {
          id
          name
          order
          display
        }
      }
      ${PersonListItem.fragments.person}
    `
  }
};
</script>

<style lang="scss" scoped></style>
