<template>
  <div
    class="mb-2 lg:flex lg:items-center lg:flex-wrap"
    :class="display === 'person' ? 'lg:mb-1' : 'lg:-mb-1'"
  >
    <div class="flex items-center">
      <template v-if="display === 'person'">
        <star class="w-6 mr-1" :winner="nomination.winner" />
        <nominatedPeople :nominated-people="nomination.nominatedPeople.nodes" />
      </template>
      <template v-else>
        <star class="w-6 mr-1 mb-2" :winner="nomination.winner" />

        <movie-link
          :movie-id="nomination.movie.id"
          :movie-title="nomination.movie.title"
        />
      </template>
    </div>
    <div class="text-gray-500 ml-6 lg:ml-2 ">
      <template v-if="display === 'person'">
        <movie-link
          :movie-id="nomination.movie.id"
          :movie-title="nomination.movie.title"
        />
      </template>
      <template v-else>
        <nominatedPeople
          :nominated-people="nomination.nominatedPeople.nodes"
          class="-mt-2"
        />
      </template>
    </div>
  </div>
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
