<template>
  <span
    v-if="movieStats.nominations > 1"
    class="block text-sm text-gray-700  md:ml-2 mb-1"
  >
    {{ movieStats.nominations }}
    {{ movieStats.nominations | pluralize("nomination") }}
    <span v-if="movieStats.wins">
      <span class="text-xs mx-1 text-gray-800">★</span>
      {{ movieStats.wins }}
      {{ movieStats.wins | pluralize("win") }}
    </span>
  </span>
</template>

<script>
export default {
  name: "MovieStats",
  props: {
    movieNominations: {
      type: Array,
      required: true
    }
  },
  computed: {
    movieStats() {
      let wins = 0;
      let losses = 0;
      this.movieNominations.map(nomination => {
        if (!nomination.winner) {
          return (losses += 1);
        }
        if (nomination.nominatedPeople.nodes.some(person => person.prize)) {
          return (wins += 1);
        }
      });
      return { nominations: wins + losses, wins, losses };
    }
  }
};
</script>

<style lang="scss" scoped></style>
