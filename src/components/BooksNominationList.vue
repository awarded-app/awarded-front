<template>
  <spinner v-if="$apollo.loading" class="indented" />
  <div v-else-if="nominations" class="mb-8 indented">
    <h4 class="text-faded mb-2 a-uppercase-info">
      Winner<span v-if="nominations.totalCount > 1">s</span
      ><star-separator class="text-gray-300" /><edition-link
              :award-name-short="edition.award.nameShort"
              :edition-date="edition.date"
              :award-type="awardType"
              >All Nominations</edition-link></a>
    </h4>
    <ul>
      <list-transition>
        <books-nomination-item
          v-for="(nomination, index) in nominations.nodes"
          :key="nomination.id"
          :nomination="nomination"
          :data-index="index"
          class="mb-4"
          tag="li"

          />
      </list-transition>
    </ul>
  </div>
  <p v-else class="indented">
    Hmm, something went wrong! Try reloading?
  </p>
</template>

<script>
import gql from "graphql-tag";
const orderBy = require("lodash.orderby");

import Spinner from "@/components/Spinner.vue";
import ListTransition from "./ListTransition";
import StarSeparator from "@/components/StarSeparator";
import EditionLink from "@/components/EditionLink";
import BooksNominationItem from "@/components/BooksNominationItem";

export default {
  name: "BooksNominationList",
  components: {
    Spinner,
    ListTransition,
    StarSeparator,
    EditionLink,
    BooksNominationItem
  },
  props: {
    edition: {
      type: Object,
      required: true
    },
    awardType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      nominations: null
    };
  },
  apollo: {
    nominations: {
      query: gql`
        query booksNominations($condition: BooksNominationCondition) {
          booksNominations(
            condition: $condition
            orderBy: BOOKS_CATEGORY_BY_CATEGORY_ID__ORDER_DESC
          ) {
            totalCount
            nodes {
              id
              isWinner
              isShortlisted
              book {
                id
                title
                imageUrl
                booksBookAuthors {
                  totalCount
                  nodes {
                    id
                    author {
                      id
                      name
                    }
                  }
                }
              }
              booksNominationPrizes {
                totalCount
                nodes {
                  id
                  prize {
                    id
                    name
                    order
                  }
                }
              }
              category {
                id
                name
                order
              }
            }
          }
        }
      `,
      variables() {
        return {
          condition: {
            editionId: this.edition.id,
            isWinner: true
          }
        };
      },
      update(data) {
        this.nominations = data.booksNominations;
        this.nominations.nodes = orderBy(this.nominations.nodes, "category.order");
        return (this.nominations = data.booksNominations);
      }
    }
  }
};
</script>

<style scoped>
.author-list > span:after {
  content: ", ";
}
.author-list > span:last-child:after {
  content: "";
}
</style>
