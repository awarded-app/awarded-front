<template>
  <article class="flex">
    <figure class="mr-2 mt-1 flex-none">
      <movie-poster :tmdb-id="winnerNomination.movie.tmdbId" />
    </figure>

    <div>
      <h3 class="text-gray-500 font-mono">
        <edition-link
          :edition-date="edition.date"
          :award-name-short="nameShort"
          >{{ edition.date | year }}</edition-link
        >
      </h3>
      <div
        class="mb-2 flex"
        :class="
          display === 'movie'
            ? 'flex-col justify-start'
            : 'flex-col-reverse justify-end'
        "
      >
        <p
          :class="display === 'movie' ? 'font-semibold' : 'pl-6 text-gray-500'"
        >
          <star v-if="display === 'movie'" :winner="true" />
          <movie-link
            :movie-id="winnerNomination.movie.id"
            :movie-title="winnerNomination.movie.title"
          />
        </p>
        <nomination-credits
          :nominated-people="winnerNomination.nominatedPeople.nodes"
          :has-star="display !== 'movie'"
          :show-prize="isFestival"
          :is-festival="isFestival"
          :display="display"
          :class="display === 'movie' ? 'pl-6' : 'font-semibold'"
        />
      </div>
      <div
        class=" flex items-center mb-2"
        @click="showNominations = !showNominations"
      >
        <plus-sign :is-open="showNominations" />
        <p>
          <a class="text-gray-500 title-link cursor-pointer">
            Other Nominees
          </a>
        </p>
      </div>

      <ul v-if="showNominations" class="mb-4 indented">
        <li
          v-for="nomination in otherNominations"
          :key="nomination.id"
          class="mb-2"
        >
          <p
            class="flex flex-wrap"
            :class="
              display === 'movie'
                ? 'flex-row justify-start'
                : 'flex-row-reverse justify-end'
            "
          >
            <span
              :class="
                display === 'movie' ? 'mr-2 font-semibold' : 'text-gray-500'
              "
            >
              <star :winner="nomination.winner" class="mr-2" />
              <movie-link
                :movie-id="nomination.movie.id"
                :movie-title="nomination.movie.title"
              />
            </span>
          </p>
          <nomination-credits
            :nominated-people="nomination.nominatedPeople.nodes"
            :has-star="false"
            :show-prize="isFestival"
            :is-festival="isFestival"
            class="indented"
            :display="display"
            :class="display === 'movie' ? '' : 'font-semibold'"
          />
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import MoviePoster from "@/components/MoviePoster";
import NominationCredits from "@/components/NominationCredits";
import EditionLink from "@/components/EditionLink";
import MovieLink from "@/components/MovieLink";

export default {
  components: {
    MovieLink,
    EditionLink,
    NominationCredits,
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
      const winners = this.edition.nominations.nodes.filter(
        nomination => nomination.winner
      );
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
