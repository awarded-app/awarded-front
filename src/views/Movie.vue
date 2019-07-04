<template>
  <div class="pl-6 lg:pl-8">
    <breadcrumbs>
      <ul>
        <li>
          <router-link to="/" tag="a" class="title-link">Awards</router-link>
        </li>
        <template v-if="prevScreenParams">
          <li v-if="prevScreenParams.hasOwnProperty('nameShort')">
            <router-link
              :to="`/award/${prevScreenParams.nameShort}`"
              tag="a"
              class="title-link"
            >
              {{ prevScreenParams.nameShort }}</router-link
            >
          </li>
          <li v-if="prevScreenParams.hasOwnProperty('editionYear')">
            <router-link
              :to="
                `/award/${prevScreenParams.nameShort}/${
                  prevScreenParams.editionYear
                }`
              "
              tag="a"
              class="title-link"
            >
              {{ prevScreenParams.editionYear }}</router-link
            >
          </li>
        </template>
        <li>{{ movie.title }}</li>
      </ul>
    </breadcrumbs>
    <div class="flex sm:items-center">
      <div class="-ml-6 pr-2 lg:-ml-8 lg:pr-4">
        <back-arrow :to="prevScreen" />
      </div>
      <h1 class="flex items-center flex-wrap">
        <span class="mr-2">{{ movie.title }}</span>
        <span v-if="!$apollo.loading" class="text-gray-500 leading-none mt-0">{{
          movie.releaseDate | year
        }}</span>
      </h1>
    </div>
    <section>
      <template v-if="$apollo.loading">
        <spinner />
      </template>
      <template v-else>
        <section id="movie-details" class="flex">
          <div class="w-1/4 mr-2">
            <span v-if="movie.moviePosters.nodes.length > 0">
              <img
                :data-src="
                  `https://awarded.gumlet.com/movies/posters/${
                    movie.moviePosters.nodes[0].filename
                  }`
                "
              />
            </span>
            <span v-else>
              <img
                data-gumlet="false"
                :src="`https://image.tmdb.org/t/p/w1280${movie.posterPath}`"
              />
            </span>
          </div>
          <div>
            <p class="text-gray-500">
              Original title: {{ movie.originalTitle }}
            </p>
            <p class="text-gray-500">Runtime: {{ movie.runtime }} minutes</p>
            <p class="text-gray-500">
              Release date: {{ movie.releaseDate | formatDate }}
            </p>
            <p class="text-gray-500">
              {{ movie.tagline }}
            </p>
            <p class="text-gray-500">
              {{ movie.overview }}
            </p>
            <p class="text-gray-500">IMDB link {{ movie.imdbId }}</p>
            <p>
              <span
                v-for="{ country } in movie.movieCountries.nodes"
                :key="country.id"
                >{{ country.code }}</span
              >
            </p>
          </div>
        </section>
        <section id="movie-nominations" class="pt-4">
          <div v-if="movieStats" class="block text-sm text-gray-700  mb-1">
            {{ movieStats.nominations }}
            {{ movieStats.nominations | pluralize("nomination") }}
            <span v-if="movieStats.wins">
              <span class="text-xs mx-1 text-gray-800">★</span>
              {{ movieStats.wins }}
              {{ movieStats.wins | pluralize("win") }}
            </span>
          </div>
          <div>
            <div
              v-for="(awardNominations, index) in nominationsByAward"
              :key="index"
              class="mb-4"
            >
              <movie-nominations-by-award :nominations="awardNominations" />
            </div>
          </div>
        </section>
      </template>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");

import NominatedPerson from "../components/NominatedPerson.vue";
import MovieNominationsByAward from "../components/MovieNominationsByAward.vue";

export default {
  name: "MovieView",
  components: { MovieNominationsByAward },
  props: {
    title: {
      type: String,
      required: true
    },
    movie_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movie: {
        id: this.movie_id,
        title: this.title,
        nominations: {
          nodes: []
        }
      },
      prevScreen: "",
      prevScreenParams: null
    };
  },
  apollo: {
    movie: {
      query: gql`
        query movie($id: Int!) {
          movie(id: $id) {
            nodeId
            id
            title
            homepage
            imdbId
            originalLanguage
            originalTitle
            overview
            releaseDate
            runtime
            tagline
            tmdbId
            movieCountries {
              totalCount
              nodes {
                country {
                  nodeId
                  id
                  name
                  code
                }
              }
            }
            posterPath
            moviePosters {
              totalCount
              nodes {
                id
                filename
              }
            }
            movieBackdrops {
              nodes {
                id
                filename
              }
              totalCount
            }
            nominations {
              totalCount
              nodes {
                id
                award {
                  id
                  nameLong
                  nameShort
                }
                category {
                  display
                  id
                  name
                  order
                  important
                }
                edition {
                  id
                  date
                  name
                }
                winner
                nominatedPeople {
                  totalCount
                  nodes {
                    ...nominatedPerson
                  }
                }
              }
            }
          }
        }
        ${NominatedPerson.fragments.nominatedPerson}
      `,
      variables() {
        return {
          id: Number(this.movie_id)
        };
      }
    }
  },
  computed: {
    nominationsByAward() {
      return this.groupByAward(this.movie.nominations.nodes);
    },
    movieStats() {
      if (this.$apollo.loading) return;
      let wins = 0;
      this.movie.nominations.nodes.map(nomination => {
        if (nomination.winner) {
          return (wins += 1);
        } else if (
          nomination.nominatedPeople.nodes.some(person => person.prize)
        ) {
          return (wins += 1);
        }
      });
      return { nominations: this.movie.nominations.totalCount, wins };
    }
  },
  methods: {
    groupByAward(nominations) {
      return Object.values(groupBy(nominations, "award.id"));
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevScreen = from.fullPath || "/";
      vm.prevScreenParams = from.params || null;
    });
  }
};
</script>

<style lang="scss" scoped></style>
