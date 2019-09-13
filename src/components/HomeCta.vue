<template>

  <div class="rounded shadow py-8 px-4  border justify-between flex flex-col"
  :class="awardType === 'movies' ? 'bg-gray-900 text-white border-gray-900 hover:border-yellow-500' : 'bg-gray-100 text-gray-800 border-gray-100 hover:border-red-600'"
  >
    <section class="mx-auto flex flex-col justify-between mb-6">
      <h2 class="-mt-2"><a :href="`/${awardType}`" class="title-link" :class="`${awardType}-link`">{{awardType.toUpperCase()}}</a></h2>
      <p class="mb-4">
        Keep track of award winning <span v-if="awardType === 'movies'">movies.</span><span v-else-if="awardType === 'books'">books.</span>
      </p>
      <ul v-if="!$apollo.queries.awards.loading" class="mb-4">
        <li v-for="award in awards.nodes" :key="award.id">
          <star :is-winner="false" /><award-link
            :award-type="awardType"
            :award-name-short="award.nameShort"
            :class="`${awardType.toLowerCase()}-link`"
            >{{ award.nameShort }}</award-link
          >
        </li>
      </ul>
    </section>
    <section>
      <p class="mb-6">
        <button
          class="p-2 rounded shadow w-full h-12 font-semibold hover:shadow-lg"
          :class="awardType === 'movies' ?
          'bg-yellow-500 text-yellow-900 hover:bg-yellow-400 hover:text-yellow-800'
          :'bg-red-600 text-red-100 hover:bg-red-500 hover:text-red-200'"
          @click.stop="$router.push(`/${awardType}`)"
        >
          <span class="mr-2">{{cta}}</span
          ><font-awesome-icon :icon="arrowCircleRightIcon"></font-awesome-icon>
        </button>
      </p>
      <ul v-if="!$apollo.queries.items.loading" class="image-grid ">
        <li v-for="item in items.nodes.slice(0, 6)" :key="item.id">
          <template v-if="awardType === 'movies'">
            <movie-link :movie-id="item.id" :movie-title="item.title">
              <movie-poster :tmdb-id="item.tmdbId" w="100" class="object-cover image" />
            </movie-link>
          </template>
          <template v-else-if="awardType === 'books'">
            <book-link :book-id="item.id" :book-title="item.title">
              <book-cover
                :image-url="item.imageUrl"
                :isbn="item.isbn10 || item.isbn13"
                w="100"
                class="object-cover image"
              />
            </book-link>
          </template>
        </li>
      </ul>
    </section>
  </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import BookCover from "@/components/BookCover";
import MoviePoster from "@/components/MoviePoster";
import AwardLink from "@/components/AwardLink";
import BookLink from "@/components/BookLink";
import MovieLink from "@/components/MovieLink";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: 'HomeCta',
  components: {
    MoviePoster,
    BookCover,
    MovieLink,
    BookLink,
    AwardLink,
    FontAwesomeIcon
  },
  props: {
    awardType: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      AwardType: this.$options.filters.capitalize(this.awardType),
      amount: 24,
      cta: this.awardType === 'movies' ? 'Find the next movie to watch' : 'Find the next book to read',
      arrowCircleRightIcon: faArrowCircleRight
    }
  },
  apollo: {
    awards: {
      query() {
        return gql`
        query ${this.awardType}Awards {
          ${this.awardType}Awards(orderBy: NAME_SHORT_ASC, condition: { publish: true }) {
            totalCount
            nodes {
              id
              nameShort
            }
          }
        }
      `
      },
      update(data) {
        return this.award = data[`${this.awardType}Awards`]
      }
    },
    items: {
      query() {
        if (this.awardType === 'books') {
          return gql`
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
          `
        } else if (this.awardType === 'movies') {
          return gql`
            query moviesRandomMovies($amount: Int!) {
              moviesRandomMovies(amount: $amount) {
                nodes {
                  id
                  title
                  tmdbId
                }
              }
            }
          `
        }
      },
      variables() {
        return {
          amount: this.amount
        }
      },
      update(data) {
        return this.items = data[`${this.awardType}Random${this.AwardType}`]
      }
    }
  }}
</script>

<style scoped>

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-gap: 5px;
  justify-content: center;
}
.image {
  width: 100px;
  height: 150px;
}

</style>
