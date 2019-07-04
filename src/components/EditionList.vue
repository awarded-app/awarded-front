<template>
  <div>
    <spinner v-if="$apollo.loading" />
    <div v-else-if="editions">
      <p v-if="editions.totalCount === 0">No editions!</p>
      <award-edition
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
import AwardEdition from "@/components/AwardEdition";

export default {
  name: "EditionsList",
  components: { AwardEdition, Spinner },
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
        ${AwardEdition.fragments.edition}
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
