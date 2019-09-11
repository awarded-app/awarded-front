<template>
  <layout name="HomeLayout">
    <div class="flex flex-wrap justify-around">
      <article class="section-card bg-gray-900 text-white border-gray-900 hover:border-yellow-500">
        <main class="flex flex-col justify-between mb-6 card-main">
          <section>
            <h2 class="-mt-2"><a href="/movies" class="title-link movies-link">MOVIES</a></h2>
            <p class="mb-4">
              Keep track of the most important film awards and festivals.
            </p>
            <ul v-if="!$apollo.queries.moviesAwards.loading" class="mb-4">
              <li v-for="award in moviesAwards.nodes" :key="award.id">
                <star :is-winner="false" /><award-link
                  award-type="movies"
                  :award-name-short="award.nameShort"
                  class="movies-link"
                  >{{ award.nameShort }}</award-link
                >
              </li>
            </ul>
          </section>
        </main>
        <section>
          <p class="mb-6">
            <button
              class="cta-button bg-yellow-500 text-yellow-900  hover:bg-yellow-400 hover:text-yellow-800 hover:shadow-lg"
              @click.stop="$router.push('/movies')"
            >
              <span class="mr-2">Find the next movie to watch</span
              ><font-awesome-icon icon="arrow-circle-right" />
            </button>
          </p>
          <ul v-if="!$apollo.queries.randomMovies.loading" class="image-grid mb-4 md:mb-0 md:mr-8">
            <li v-for="movie in randomMovies.nodes.slice(0, 6)" :key="movie.id">
              <movie-link :movie-id="movie.id" :movie-title="movie.title">
                <movie-poster :tmdb-id="movie.tmdbId" w="100" class="object-cover image" />
              </movie-link>
            </li>
          </ul>
        </section>
      </article>
      <article class="section-card bg-gray-100 text-gray-800 border-gray-100 hover:border-red-600">
        <main class="flex flex-col justify-between mb-6">
          <section>
            <h2 class="-mt-2"><a href="/books" class="title-link books-link">BOOKS</a></h2>
            <p class="mb-4">
              Keep track of the most important book awards.
            </p>
            <ul v-if="!$apollo.queries.booksAwards.loading" class="mb-4">
              <li v-for="award in booksAwards.nodes" :key="award.id">
                <star :is-winner="false" /><award-link
                  award-type="books"
                  :award-name-short="award.nameShort"
                  class="books-link"
                  >{{ award.nameShort }}</award-link
                >
              </li>
            </ul>
          </section>
        </main>
        <section>
          <p class="mb-6">
            <button
              class="cta-button bg-red-600 text-red-100 hover:bg-red-500 hover:text-red-200 hover:shadow-lg"
              @click.stop="$router.push('/books')"
            >
              <span class="mr-2">Find the next book to read</span
              ><font-awesome-icon icon="arrow-circle-right" />
            </button>
          </p>
          <ul v-if="!$apollo.queries.randomBooks.loading" class="image-grid mb-4 md:mb-0 md:mr-8">
            <li v-for="book in randomBooks.nodes.slice(0, 6)" :key="book.id">
              <book-link :book-id="book.id" :book-title="book.title">
                <book-cover
                  :image-url="book.imageUrl"
                  :isbn="book.isbn10 || book.isbn13"
                  w="100"
                  class="object-cover image"
                />
              </book-link>
            </li>
          </ul>
        </section>
      </article>
    </div>
  </layout>
</template>

<script>
import gql from "graphql-tag";
import Layout from "@/layouts/Layout";
import BookCover from "@/components/BookCover";
import MoviePoster from "@/components/MoviePoster";
import AwardLink from "@/components/AwardLink";
import BookLink from "@/components/BookLink";
import MovieLink from "@/components/MovieLink";

export default {
  name: "Home",
  metaInfo: {
    title: `Awarded - Keep track of the most important awards and festivals`,
    titleTemplate: ""
  },
  components: {
    MoviePoster,
    BookCover,
    Layout,
    MovieLink,
    BookLink,
    AwardLink
  },
  data() {
    return {
      randomAmount: 12,
      randomBooks: null,
      randomMovies: null
    };
  },
  apollo: {
    booksAwards: {
      query: gql`
        query booksAwards {
          booksAwards(orderBy: NAME_SHORT_ASC, condition: { publish: true }) {
            totalCount
            nodes {
              id
              nameShort
            }
          }
        }
      `
    },
    moviesAwards: {
      query: gql`
        query moviesAwards {
          moviesAwards(orderBy: NAME_SHORT_ASC, condition: { publish: true }) {
            totalCount
            nodes {
              id
              nameShort
            }
          }
        }
      `
    },
    randomBooks: {
      query: gql`
        query booksRandomBooks($amount: Int!) {
          booksRandomBooks(amount: $amount, filter: { imageUrl: { notIncludes: "nophoto" } }) {
            nodes {
              id
              title
              imageUrl
              isbn10
              isbn13
            }
          }
        }
      `,
      variables() {
        return {
          amount: this.randomAmount
        };
      },
      update(data) {
        return (this.randomBooks = data.booksRandomBooks);
      }
    },
    randomMovies: {
      query: gql`
        query moviesRandomMovies($amount: Int!) {
          moviesRandomMovies(amount: $amount) {
            nodes {
              id
              title
              tmdbId
            }
          }
        }
      `,
      variables() {
        return {
          amount: this.randomAmount
        };
      },
      update(data) {
        return (this.randomMovies = data.moviesRandomMovies);
      }
    }
  }
};
</script>

<style scoped>
.image-grid {
  width: 310px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 5px;
}
.image {
  width: 100px;
  height: 150px;
}
.cta-button {
  @apply p-2 rounded shadow w-full h-12 font-semibold;
}
.section-card {
  @apply rounded shadow mb-8 border justify-between flex flex-col;
  width: 402px;
  padding: 45px;
}
</style>
