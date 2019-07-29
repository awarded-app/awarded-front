<template>
  <article class="flex">
    <figure class="mr-2 mt-1 flex-none">
      <movie-poster :tmdb-id="winnerNomination.movie.tmdbId" />
    </figure>

    <div>
      <h3 class="text-gray-500">
        <edition-link :edition-date="edition.date" :award-name-short="nameShort">{{
          edition.date | year
        }}</edition-link>
      </h3>
      <h4
        class="mb-2"
        :class="display === 'movie' ? 'flex-row justify-start' : 'flex-row-reverse justify-end'"
      >
        <span :class="display === 'movie' ? 'mr-2' : 'text-gray-500'">
          <movie-link
            :movie-id="winnerNomination.movie.id"
            :movie-title="winnerNomination.movie.title"
          />
        </span>
        <nomination-credits
          :nominated-people="winnerNomination.nominatedPeople.nodes"
          :has-star="true"
          :show-prize="isFestival"
        />
      </h4>
      <h4 class="text-gray-500 flex items-center">
        <plus-sign @click="showNominations = !showNominations" class="text-lg mb-2 mr-2" />
        <edition-link :edition-date="edition.date" :award-name-short="nameShort"
          >Other Nominees</edition-link
        >
      </h4>

      <ul v-if="showNominations" class="mb-4 indented">
        <li v-for="nomination in otherNominations" :key="nomination.id" class="mb-2">
          <p
            class="flex flex-wrap"
            :class="display === 'movie' ? 'flex-row justify-start' : 'flex-row-reverse justify-end'"
          >
            <span :class="display === 'movie' ? 'mr-2' : 'text-gray-500'">
              <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title" />
            </span>
          </p>
          <nomination-credits
            :nominated-people="nomination.nominatedPeople.nodes"
            :has-star="true"
          />
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import MoviePoster from "@/components/MoviePoster";
import NominatedPeople from "@/components/NominatedPeople";
import NominationCredits from "@/components/NominationCredits";
import EditionLink from "@/components/EditionLink";
import MovieLink from "@/components/MovieLink";

export default {
  components: {
    MovieLink,
    EditionLink,
    NominationCredits,
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
    },
    isFestival: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showNominations: false
    };
  },
  computed: {
    winnerNomination() {
      const winners = this.edition.nominations.nodes.filter(nomination => nomination.winner);
      if (this.isFestival) {
        return winners.find(winner =>
          winner.nominatedPeople.nodes.find(person =>
            person.prize ? person.prize.order === 0 : false
          )
        );
      }
      return winners[0];
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
