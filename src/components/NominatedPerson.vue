<template>
  <span
    ><person-link
      :person-id="nominatedPerson.person.id"
      :person-name="nominatedPerson.person.name"
      >{{ nominatedPerson.person.name }}</person-link
    ><span v-if="nominatedPerson.character" class="ml-1 text-gray-500">
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
        id
        character
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
        nominatedPersonPrizes {
          totalCount
          nodes {
            prize {
              id
              name
              order
              display
              award {
                id
                nameShort
              }
              category {
                id
                name
              }
            }
          }
        }
      }
      ${PersonListItem.fragments.person}
    `
  }
};
</script>

<style lang="scss" scoped></style>
