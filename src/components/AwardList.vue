<template>
  <spinner v-if="$apollo.loading" class="indented" />
  <ul v-else-if="awards">
    <award-list-item
      v-for="award in awards.nodes"
      :key="award.id"
      :award="award"
      :award-type="awardType"
    />
  </ul>

  <p v-else class="indented">
    Hmm, something went wrong! Try reloading?
  </p>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Spinner.vue";
import AwardListItem from "./AwardListItem";

export default {
  name: "AwardList",
  components: { AwardListItem, Spinner },
  props: {
    awardType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      awards: null,
      AwardType: this.$options.filters.capitalize(this.awardType)
    };
  },
  apollo: {
    awards: {
      query() {
        return gql`
          query ${this.awardType}Awards($condition: ${this.AwardType}AwardCondition) {
            ${this.awardType}Awards(condition: $condition, orderBy: NAME_SHORT_ASC) {
              totalCount
              nodes {
                id
                link
                logo
                nameLong
                nameShort
                description
                country {
                  id
                  code
                  name
                }
                isFestival
              }
            }
          }
        `;
      },
      variables() {
        return {
          condition: {
            publish: true
          }
        };
      },
      update(data) {
        return (this.awards = data[`${this.awardType}Awards`]);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
