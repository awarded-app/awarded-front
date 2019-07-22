<template>
  <ul class="text-xl lg:flex lg:items-center lg:flex-wrap">
    <li class="flex lg:items-center">
      <star
        class="w-6 mr-1 mt-1 lg:mt-0 lg:mb-2 text-lg"
        :winner="nomination.winner"
      />
      <div
        class="flex flex-wrap"
        :class="
          display === 'person'
            ? 'flex-col items-start lg:flex-row'
            : 'flex-col-reverse items-start lg:flex-row lg:flex-row-reverse'
        "
      >
        <nominatedPeople
          :nominated-people="nomination.nominatedPeople.nodes"
          class="mr-2 lg:mb-0"
          :class="display === 'person' ? '-mb-2' : 'text-gray-500'"
        />
        <movie-link
          :movie-id="nomination.movie.id"
          :movie-title="nomination.movie.title"
          class="mr-2 lg:mb-0"
          :class="display === 'person' ? 'text-gray-500' : '-mb-2'"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import MovieLink from "./MovieLink";
import NominatedPeople from "./NominatedPeople";
export default {
  name: "Nomination",
  components: { NominatedPeople, MovieLink },
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
