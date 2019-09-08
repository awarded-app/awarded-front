<template>
  <spinner v-if="$apollo.loading" class="indented" />
  <div v-else-if="nominations" class="mb-8 indented">
    <h4 class="text-faded mb-2 a-uppercase-info">
      Winner<span v-if="nominations.totalCount > 1">s</span
      ><star-separator class="text-gray-300" /><edition-link
              :award-name-short="edition.award.nameShort"
              :edition-date="edition.date"
              >All Nominations</edition-link></a>
    </h4>
    <ul>
      <list-transition>
        <li
          v-for="(nomination, index) in nominations.nodes"
          :key="nomination.id"
          :data-index="index"
          class="mb-4 sm:flex"
        >
          <figure class="mt-1 mr-2 mb-2 flex-none">
            <book-link :book-id="nomination.book.id" :book-title="nomination.book.title"><book-cover :url="nomination.book.imageUrl"/></book-link>
          </figure>
          <article>
            <h4>
              <book-link :book-id="nomination.book.id" :book-title="nomination.book.title">{{ nomination.book.title }}</book-link>
            </h4>
            <p class="author-list">
              by
              <span
                v-for="{ author } in nomination.book.booksBookAuthors.nodes"
                :key="author.id"
                class="font-semibold"
                >{{ author.name }}</span
              >
            </p>
            <p
              v-for="{ prize } in nomination.booksNominationPrizes.nodes"
              :key="prize.id"
              class="flex items-center"
            >
              <star class="mr-2" />{{ prize.name }}
            </p>
          </article>
        </li>
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
import BookCover from "@/components/BookCover";
import BookLink from "@/components/BookLink";

export default {
  name: "BooksNominationList",
  components: {
    Spinner,
    ListTransition,
    StarSeparator,
    EditionLink,
    BookCover,
    BookLink
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
