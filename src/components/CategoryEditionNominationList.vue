<template>
  <article class="flex">
    <movie-poster :tmdb-id="winnerNomination.movie.tmdbId" class="mr-2" />
    <div>
      <h3
        class="flex items-center mb-2"
        :class="
          display === 'movie'
            ? 'flex-row justify-start'
            : 'flex-row-reverse justify-end'
        "
      >
        <span :class="display === 'movie' ? 'mr-2' : 'text-gray-500'">
          <movie-link
            :movie-id="winnerNomination.movie.id"
            :movie-title="winnerNomination.movie.title"
          />
        </span>
        <nominated-people
          :nominated-people="winnerNomination.nominatedPeople.nodes"
          :class="display === 'movie' ? 'text-gray-500' : 'mr-2'"
        />
      </h3>
      <h3 class="text-gray-500 mr-1 flex items-center">
        <plus-sign
          @click="showNominations = !showNominations"
          class="text-lg mb-2"
        />
        <edition-link
          :edition-date="edition.date"
          :award-name-short="nameShort"
        />
      </h3>

      <ul v-if="showNominations" class="mb-4 pl-6 lg:pl-8">
        <li
          v-for="nomination in otherNominations"
          :key="nomination.id"
          class="mb-1"
        >
          <h4
            class="flex"
            :class="
              display === 'movie'
                ? 'flex-row justify-start'
                : 'flex-row-reverse justify-end'
            "
          >
            <span :class="display === 'movie' ? 'mr-2' : 'text-gray-500'">
              <movie-link
                :movie-id="nomination.movie.id"
                :movie-title="nomination.movie.title"
              />
            </span>
            <nominated-people
              :nominated-people="nomination.nominatedPeople.nodes"
              :class="display === 'movie' ? 'text-gray-500' : 'mr-2'"
            />
          </h4>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import MoviePoster from "@/components/MoviePoster";
import NominatedPeople from "@/components/NominatedPeople";
import EditionLink from "@/components/EditionLink";
import MovieLink from "@/components/MovieLink";

export default {
  components: {
    MovieLink,
    EditionLink,
    NominatedPeople,
    MoviePoster
  },
  props: {
    edition: {
      type: Object,
      required: true
    },
    nameShort: {
      type: String,
      required: true
    },
    display: {
      type: String,
      default: "movie"
    }
  },
  data() {
    return {
      showNominations: false
    };
  },
  computed: {
    winnerNomination() {
      return this.edition.nominations.nodes.find(
        nomination => nomination.winner
      );
    },
    otherNominations() {
      return this.edition.nominations.nodes.filter(
        nomination => nomination.id !== this.winnerNomination.id
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
