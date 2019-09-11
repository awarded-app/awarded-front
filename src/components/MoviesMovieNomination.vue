<template>
  <ul class="text-xl lg:flex lg:items-center lg:flex-wrap">
    <li class="mb-2 flex lg:items-center">
      <star :is-winner="nomination.isWinner" />
      <div
        class="flex flex-wrap"
        :class="
          display === 'person'
            ? 'flex-col items-start lg:flex-row'
            : 'flex-col-reverse items-start lg:flex-row lg:flex-row-reverse'
        "
      >
        <movies-nominated-people
          :nominated-people="nomination.moviesNominatedPeople.nodes"
          class="mr-2 lg:mb-0"
          :class="display === 'person' ? 'font-semibold' : 'text-faded'"
        />
        <p>
          <movie-link
            :movie-id="nomination.movie.id"
            :movie-title="nomination.movie.title"
            class="mr-2 lg:mb-0"
            :class="display === 'person' ? 'text-faded' : '-mb-2 font-semibold'"
          />
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import MovieLink from "./MovieLink";
import MoviesNominatedPeople from "./MoviesNominatedPeople";
export default {
  name: "MoviesMovieNomination",
  components: { MoviesNominatedPeople, MovieLink },
  props: {
    nomination: {
      type: Object,
      required: true
    },
    display: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped></style>
