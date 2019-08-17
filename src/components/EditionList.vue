<template>
  <spinner v-if="$apollo.loading" />
  <ul v-else-if="editions && editions.totalCount > 0">
    <p class="a-uppercase-info text-gray-500 mb-2">Editions</p>
    <edition-list-item v-for="edition in editions.nodes" :key="edition.id" :edition="edition" />
  </ul>
  <p v-else>
    Hmm, something went wrong! Try reloading?
  </p>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Spinner.vue";
import EditionListItem from "./EditionListItem";

export default {
  name: "EditionsList",
  components: { EditionListItem, Spinner },
  props: {
    awardId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      editions: null
    };
  },
  apollo: {
    editions: {
      query: gql`
        query editions($condition: EditionCondition) {
          editions(condition: $condition, orderBy: DATE_DESC) {
            totalCount
            nodes {
              id
              date
              name
              award {
                id
                nameShort
                isFestival
              }
            }
          }
        }
      `,
      variables() {
        return {
          condition: {
            awardId: this.awardId,
            publish: true
          }
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
