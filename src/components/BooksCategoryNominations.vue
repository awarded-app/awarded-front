<template>
  <spinner v-if="$apollo.loading" />
  <section v-else>
    <p class="text-faded mb-4 md:w-2/3 lg:w-1/2">
      {{ category.description }}
    </p>
    <p class="mb-4 md:w-2/3 lg:w-1/2 text-faded a-uppercase-info">
      Winners and nominees from past editions
    </p>
    <ul>
      <list-transition>
        <li
          v-for="({ edition }, index) in category.booksEditionCategories.nodes"
          :key="edition.id"
          :data-index="index"
          class="mb-8"
        >
          <books-category-edition-nominations :edition="edition" />
        </li>
      </list-transition>
    </ul>
  </section>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Spinner";
import BooksCategoryEditionNominations from "@/components/BooksCategoryEditionNominations";
import ListTransition from "@/components/ListTransition";

export default {
  name: "BooksCategoryNomination",
  components: {
    ListTransition,
    BooksCategoryEditionNominations,
    Spinner
  },
  props: {
    categoryId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      award: null,
      category: null
    };
  },

  apollo: {
    category: {
      query: gql`
        query booksCategory($id: Int!) {
          booksCategory(id: $id) {
            id
            name
            description
            award {
              id
              nameShort
            }
            booksEditionCategories(condition: { complete: true }) {
              nodes {
                id
                edition {
                  id
                  date
                  officialYear
                  name
                  award {
                    id
                    nameShort
                  }
                  booksNominations(condition: { categoryId: $id }) {
                    nodes {
                      isWinner
                      isShortlisted
                      id
                      book {
                        id
                        title
                        imageUrl
                        isbn10
                        isbn13
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
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.categoryId
        };
      },
      update(data) {
        this.category = data.booksCategory;
        this.award = this.category.award;
        return this.category;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
