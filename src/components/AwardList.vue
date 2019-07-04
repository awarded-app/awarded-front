<template>
  <div>
    <spinner v-if="$apollo.loading" />
    <div v-else-if="awards">
      <award-list-item
        v-for="award in awards.nodes"
        :key="award.id"
        :award="award"
      />
    </div>
    <div v-else>Error...</div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import AwardListItem from "./AwardListItem";

export default {
  name: "AwardList",
  components: { AwardListItem },
  data() {
    return {
      awards: null
    };
  },
  apollo: {
    awards: {
      query: gql`
        {
          awards {
            totalCount
            nodes {
              ...award
            }
          }
        }
        ${AwardListItem.fragments.award}
      `
    }
  }
};
</script>

<style lang="scss" scoped></style>
