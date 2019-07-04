<template>
  <span class="h-full flex items-center ml-2">
    <span
      v-for="(win, index) in stars"
      :key="index"
      class="mr-1 flex items-center"
    >
      <star :winner="win" />
    </span>
  </span>
</template>
<script>
import Star from "./Star";
export default {
  components: { Star },
  props: {
    movie: {
      type: Array,
      required: true
    }
  },
  computed: {
    stars() {
      return this.countMovieWinsAndLosses(this.movie);
    }
  },
  methods: {
    countMovieWinsAndLosses(movie) {
      let winsLosses = [];
      movie.map(nomination => {
        let prizeId;
        if (!nomination.winner) {
          return winsLosses.push(false);
        }
        nomination.nominatedPeople.nodes.map(person => {
          if (person.prize) {
            person.prize.id === prizeId ? winsLosses : winsLosses.push(true);
            prizeId = person.prize.id;
          } else {
            winsLosses.push(false);
          }
        });
      });
      return winsLosses.sort((a, b) => b - a);
    }
  }
};
</script>
