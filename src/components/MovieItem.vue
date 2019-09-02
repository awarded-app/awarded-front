<template>
  <article :class="showPoster ? 'flex' : ''">
    <picture v-if="showPoster" class="mr-2">
      <movie-link :movie-id="movie.id" :movie-title="movie.title">
        <movie-poster :tmdb-id="movie.tmdbId" :movie-title="movie.title" />
      </movie-link>
    </picture>
    <main>
      <h3>
        <movie-link :movie-id="movie.id">{{ movie.title }}</movie-link>
      </h3>
      <ul v-if="isFull">
        <li v-for="nomination in nominations" :key="nomination.id" class="flex">
          <p class="mr-2">
            <star :is-winner="true" class="mr-1 text-sm" />{{ nomination.category.name }}
          </p>
          <ul class="text-gray-500 flex">
            <li
              v-for="(nominatedPerson, index) in nomination.nominatedPeople.nodes"
              :key="nominatedPerson.id"
            >
              {{ nominatedPerson.person.name
              }}<span v-if="nominatedPerson.character"> (as {{ nominatedPerson.character }})</span
              ><span v-if="index < nomination.nominatedPeople.nodes.length - 1">,&nbsp; </span>
            </li>
          </ul>
        </li>
      </ul>
      <ul v-if="isCategory" class="text-gray-500 flex">
        <li
          v-for="(nominatedPerson, index) in nominations[0].nominatedPeople.nodes"
          :key="nominatedPerson.id"
        >
          {{ nominatedPerson.person.name
          }}<span v-if="nominatedPerson.character"> (as {{ nominatedPerson.character }})</span
          ><span v-if="index < nominations[0].nominatedPeople.nodes.length - 1">,&nbsp; </span>
        </li>
      </ul>
      <slot></slot>
    </main>
  </article>
</template>

<script>
import Star from "@/components/Star";
import MoviePoster from "@/components/MoviePoster";
import MovieLink from "@/components/MovieLink";
export default {
  name: "MovieItem",
  components: {
    MovieLink,
    MoviePoster,
    Star
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    nominations: {
      type: Array,
      default: () => []
    },
    showPoster: {
      type: Boolean,
      default: false
    },
    isFull: {
      type: Boolean,
      default: false
    },
    isCategory: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
