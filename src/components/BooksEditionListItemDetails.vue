<template>
  <!-- <ul class="flex-none w-full flex flex-wrap indented">
    <li v-for="book in books" :key="book.id" class="mr-2 mb-2"><img :src="book.imageUrl" /></li>
  </ul> -->
  <p></p>
  <!-- <p class="text-xl">
    <span v-for="{ book } in books" :key="book.id"
      >{{ book.title }} (<span
        v-for="({ author }, index) in book.booksBookAuthors.nodes"
        :key="author.id"
        >{{ author.name }}<span v-if="index < book.booksBookAuthors.totalCount - 1">, </span>)</span
      ></span
    >
  </p> -->
</template>

<script>
//import gql from "graphql-tag";

export default {
  props: {
    edition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      books: []
    };
  }
  /* apollo: {
    booksNominations: {
      query: gql`
        query booksNominations($condition: BooksNominationCondition) {
          booksNominations(condition: $condition) {
            totalCount
            nodes {
              booksNominationPrizes {
                nodes {
                  prize {
                    order
                  }
                }
              }
              book {
                id
                title
                imageUrl
                booksBookAuthors {
                  totalCount
                  nodes {
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
      `,
      variables() {
        return {
          condition: {
            editionId: this.edition.id,
            isWinner: true,
            isShortlisted: true
          }
        };
      },
      update(data) {
        this.books = data.booksNominations.nodes.map(node => {
          return {
            book: node.book,
            prizes: node.booksNominationPrizes.nodes.map(node => node.prize)
          };
        });
        return data;
      }
    },
    skip: true
  } */
};
</script>

<style scoped>
p > span:after {
  content: ", ";
}
p > span:last-child:after {
  content: "";
}
</style>
