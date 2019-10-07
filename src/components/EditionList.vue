<template>
  <spinner v-if="$apollo.loading" />
  <ul v-else-if="editions && editions.totalCount > 0">
    <p class="a-uppercase-info text-faded mb-2">Editions</p>
    <list-transition>
      <edition-list-item
        v-for="(edition, index) in editions.nodes"
        :key="edition.id"
        :data-index="index"
        :edition="edition"
        :award-type="awardType"
      />
    </list-transition>
  </ul>
  <p v-else class="indented">
    Hmm, something went wrong! Try reloading?
  </p>
</template>

<script>
import gql from "graphql-tag";
import ListTransition from "@/components/ListTransition";
import Spinner from "@/components/Spinner.vue";
import EditionListItem from "./EditionListItem";

export default {
  name: "EditionsList",
  components: { EditionListItem, Spinner, ListTransition },
  props: {
    awardId: {
      type: Number,
      required: true
    },
    awardType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editions: null,
      AwardType: this.$options.filters.capitalize(this.awardType)
    };
  },
  apollo: {
    editions: {
      query() {
        return gql`
          query ${this.awardType}Editions($condition: ${this.AwardType}EditionCondition) {
            ${this.awardType}Editions(condition: $condition, orderBy: DATE_DESC) {
              totalCount
              nodes {
                id
                date
                name
                officialYear
                award {
                  id
                  nameShort
                  isFestival
                }
              }
            }
          }
        `;
      },
      variables() {
        return {
          condition: {
            awardId: this.awardId,
            publish: true
          }
        };
      },
      update(data) {
        return (this.editions = data[`${this.awardType}Editions`]);
      }
    }
  }
};
</script>

<style scoped></style>
