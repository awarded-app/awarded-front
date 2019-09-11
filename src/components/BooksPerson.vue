<template>
  <spinner v-if="$apollo.loading" class="mt-4" />
  <div v-else>
    <goodreads-author-query :goodreads-id="goodreadsId">
      <template v-slot="{ author, loading }">
        <spinner v-if="loading" />
        <section v-else-if="author" class="sm:flex mb-4">
          <figure class="mb-2 mt-2 sm:mr-4 flex-none">
            <person-headshot :image-url="author.image_url" w="200" />
          </figure>
          <div class="md:w-2/3 lg:w-1/2">
          <header class="mb-2 flex sm:items-center">
          <h2 class="flex items-center flex-wrap leading-tight">
            <span class="mr-2">{{ personName }}</span>
          </h2>
        </header>
            <truncate
              v-if="author.about"
              :text="author.about"
              type="html"
              collapsed-text-class="text-faded mr-2"
              action-class="title-link"
              :length="400"
              clamp="more"
              less="less"
              class="mb-4"
            />

            <p v-if="author.died_at">&#10013; {{ author.died_at | formatDate("Do MMMM YY") }}</p>
            <p v-else-if="author.born_at">
              {{ author.born_at | age }}<span class="text-faded "> years old</span>
            </p>
            <p v-if="author.hometown" class="mb-2">
              <span class="text-faded">From</span>
              {{ author.hometown }}
            </p>
          </div>
        </section>
      </template>
    </goodreads-author-query>
    <section>
      <p class="text-faded mb-4 a-uppercase-info">
        {{ numNominations | pluralize("nomination", { includeNumber: true }) }} <star-separator />{{
          numWins | pluralize("win", { includeNumber: true })
        }}
      </p>
      <div v-for="{ book } in books" :key="book.id" class="flex mb-4">
        <book-cover :image-url="book.imageUrl" :isbn="book.isbn10 || book.isbn13" class="mr-2" />
        <div>
          <h4>
            <book-link :book-id="book.id" :book-title="book.title">{{ book.title }}</book-link>
          </h4>
          <ul>
            <li
              v-for="nomination in book.booksNominations.nodes"
              :key="nomination.id"
              class="flex flex-wrap"
            >
              <star :is-winner="nomination.isWinner" />
              <p class="font-semibold mr-2">
                <span v-if="nomination.isWinner">{{
                  nomination.booksNominationPrizes.nodes[0].prize.name
                }}</span
                ><span v-else-if="nomination.category.name !== 'Selection'"
                  >{{ nomination.category.name }}
                  <span v-if="nomination.isShortlisted">(Shortlist)</span></span
                ><span v-else>{{ nomination.isShortlisted ? "Shortlist" : "Longlist" }}</span>
              </p>
              <p class="text-faded">
                <edition-link
                  award-type="books"
                  :award-name-short="nomination.award.nameShort"
                  :edition-date="nomination.edition.date"
                >
                  {{ nomination.edition.name }}
                </edition-link>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
const orderBy = require("lodash.orderby");
import GoodreadsAuthorQuery from "@/components/GoodreadsAuthorQuery";
import Spinner from "@/components/Spinner";
import PersonHeadshot from "@/components/PersonHeadshot";
import Truncate from "@/components/Truncate";
import BookCover from "@/components/BookCover";
import EditionLink from "@/components/EditionLink";
import BookLink from "@/components/BookLink";
import StarSeparator from "@/components/StarSeparator";

export default {
  name: "BooksPerson",
  components: {
    GoodreadsAuthorQuery,
    Spinner,
    PersonHeadshot,
    StarSeparator,
    BookLink,
    EditionLink,
    BookCover,
    Truncate
  },
  props: {
    personId: {
      type: String,
      required: true
    },
    personName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      goodreadsId: null,
      books: null,
      numNominations: null,
      numWins: null
    };
  },

  apollo: {
    author: {
      query: gql`
        query booksAuthor($id: Int!) {
          booksAuthor(id: $id) {
            id
            name
            goodreadsId
            authoredBooksBookAuthors {
              nodes {
                book {
                  id
                  title
                  imageUrl
                  booksNominations {
                    totalCount
                    nodes {
                      id
                      isWinner
                      isShortlisted
                      award {
                        id
                        nameShort
                      }
                      category {
                        id
                        name
                      }
                      edition {
                        id
                        name
                        date
                      }
                      booksNominationPrizes {
                        totalCount
                        nodes {
                          id
                          prize {
                            id
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
              totalCount
            }
          }
        }
      `,
      variables() {
        return {
          id: Number(this.personId)
        };
      },
      update(data) {
        this.goodreadsId = data.booksAuthor.goodreadsId;
        this.books = data.booksAuthor.authoredBooksBookAuthors.nodes;
        for (const { book } of this.books) {
          book.booksNominations.nodes = orderBy(
            book.booksNominations.nodes,
            ["isWinner", "isShortlisted"],
            ["desc", "desc"]
          );
        }
        this.numNominations = this.books.reduce((total, { book }) => {
          return total + book.booksNominations.totalCount;
        }, 0);
        this.numWins = this.books.reduce((total, { book }) => {
          return (
            total +
            book.booksNominations.nodes.reduce((totalPerBook, nomination) => {
              return totalPerBook + nomination.isWinner;
            }, 0)
          );
        }, 0);
        /* for (const { book } of this.books) {
          let nominations = book.booksNominations.nodes;
          console.log(nominations);
          book.booksNominations.nodes = Object.values(groupBy(nominations, "edition.id"))
          console.log(book);

        }
 */
        /* this.books.map(({ book }) => {
          let nominations = book.booksNominations.nodes;
          console.log(book);

          nominations = groupBy(book.booksNominations.nodes, "edition.id");
          book.booksNominations.nodes = nominations;
        }); */
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
