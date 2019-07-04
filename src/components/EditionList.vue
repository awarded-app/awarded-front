<template>
  <div>
    <spinner v-if="$apollo.loading" />
    <div v-else-if="editions">
      <p v-if="editions.totalCount === 0">No editions!</p>
      <edition-list-item
        v-for="edition in editions.nodes"
        :key="edition.id"
        :edition="edition"
      />
    </div>
    <div v-else>Error...</div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "./Spinner";
import EditionListItem from "@/components/EditionListItem";

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
          editions(condition: $condition) {
            totalCount
            nodes {
              ...edition
            }
          }
        }
        ${EditionListItem.fragments.edition}
      `,
      variables() {
        return {
          condition: {
            awardId: this.awardId
          }
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
