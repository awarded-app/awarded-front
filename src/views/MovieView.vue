<template>
  <layout name="MoviesLayout">
    <div>
      <breadcrumbs :prev-screen-params="prevScreenParams" award-type="movies">{{
        movie.title
      }}</breadcrumbs>
      <spinner v-if="$apollo.loading" />
      <div v-else>
        <section class="sm:flex">
          <div class="flex flex-col flex-none sm:mr-4 ">
            <figure class="flex-none mt-2 mb-2">
              <movie-poster :poster-path="movie.posterPath" :tmdb-id="movie.tmdbId" w="185" />
            </figure>
            <movie-links-shopping
              :movie-title="movie.title"
              :asins="movie.moviesMovieAsins ? movie.moviesMovieAsins.nodes : null"
            />
            <movie-links :imdb-id="movie.imdbId" :tmdb-id="movie.tmdbId" :title="movie.title" />
          </div>
          <section>
            <header class="flex mb-2 sm:items-center">
              <h2 class="flex flex-wrap items-center">
                <span class="mr-2">{{ movie.title }}</span>
                <span class="mr-2 font-mono leading-none text-faded">{{
                  movie.releaseDate | year
                }}</span>
                <template v-if="movie.moviesMovieCountries.totalCount > 0">
                  <sup
                    v-for="{ country } in movie.moviesMovieCountries.nodes"
                    :key="country.id"
                    class="mr-1 text-faded a-uppercase-info"
                    >{{ country.code }}</sup
                  >
                </template>
              </h2>
            </header>
            <spinner v-if="$apollo.loading" />
            <main v-else id="movie-details">
              <p class="mb-2 text-faded">
                {{ movie.overview }}
              </p>
              <p v-if="movie.originalTitle !== movie.title">
                <span class="mr-1">{{ movie.originalTitle }}</span
                ><span class="text-faded">Original Title</span>
              </p>
              <p v-if="movie.moviesMovieGenres.totalCount > 0" class="text-faded">
                <span v-for="({ genre }, index) in movie.moviesMovieGenres.nodes" :key="index"
                  >{{ genre.name
                  }}<span v-if="index < movie.moviesMovieGenres.totalCount - 1">, </span></span
                >
              </p>
              <p class="mb-2 text-faded">{{ movie.runtime }} minutes</p>
            </main>

            <section id="movie-nominations" class="pt-8 mt-8 border-t border-gray-700">
              <div v-if="movieStats" class="mb-4 text-faded a-uppercase-info">
                {{ movieStats.nominations }}
                {{ movieStats.nominations | pluralize("nomination") }}
                <span v-if="movieStats.wins">
                  <span class="mx-1 text-xs text-gray-700">★</span>
                  {{ movieStats.wins }}
                  {{ movieStats.wins | pluralize("win") }}
                </span>
              </div>
              <div>
                <list-transition>
                  <div
                    v-for="(awardNominations, index) in nominationsByAward"
                    :key="index"
                    :data-index="index"
                    class="mb-4"
                  >
                    <movies-movie-nominations-by-award :nominations="awardNominations" />
                  </div>
                </list-transition>
              </div>
            </section>
          </section>
        </section>
      </div>
    </div>
  </layout>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");
import Layout from "@/layouts/Layout";
import Spinner from "@/components/Spinner";
import MovieListItem from "@/components/MovieListItem";
import NominationListItem from "@/components/NominationListItem";
import MoviePoster from "@/components/MoviePoster";
import MovieLinks from "@/components/MovieLinks";
import MovieLinksShopping from "@/components/MovieLinksShopping";
import MoviesMovieNominationsByAward from "../components/MoviesMovieNominationsByAward";
import ListTransition from "../components/ListTransition";

export default {
  name: "MovieView",
  metaInfo() {
    const movieTitle = this.movie.title;
    const movieYear = this.movieYear;
    return {
      title: `${movieTitle} (${movieYear}) - Nominations and Wins`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `${movieTitle} (${movieYear}): nominations and wins in all Awards and Festivals`
        }
      ]
    };
  },
  components: {
    MoviesMovieNominationsByAward,
    Spinner,
    MoviePoster,
    MovieLinksShopping,
    MovieLinks,
    Layout,
    ListTransition
  },
  props: {
    title: {
      type: String,
      required: true
    },
    movieId: {
      type: String,
      required: true
    },
    awardType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movie: {
        id: this.movie_id,
        title: "",
        releaseDate: null,
        moviesNominations: {
          nodes: []
        },
        moviesMovieCountries: {
          nodes: [],
          totalCount: 0
        },
        asin: null
      },
      prevScreen: "",
      prevScreenParams: null
    };
  },
  apollo: {
    movie: {
      query: gql`
        query moviesMovie($id: Int!) {
          moviesMovie(id: $id) {
            ...movie
            moviesNominations {
              totalCount
              nodes {
                ...moviesNomination
                award {
                  id
                  nameLong
                  nameShort
                  isFestival
                }
                edition {
                  id
                  date
                  officialYear
                  name
                }
              }
            }
          }
        }
        ${NominationListItem.fragments.moviesNomination}
        ${MovieListItem.fragments.movie}
      `,
      variables() {
        return {
          id: Number(this.movieId)
        };
      },
      update(data) {
        return (this.movie = data.moviesMovie);
      }
    }
  },
  computed: {
    nominationsByAward() {
      return this.groupByAward(this.movie.moviesNominations.nodes);
    },
    movieStats() {
      if (this.$apollo.loading) return;
      let wins = 0;
      this.movie.moviesNominations.nodes.map(nomination => {
        if (nomination.isWinner) {
          return (wins += 1);
        } else if (nomination.moviesNominatedPeople.nodes.some(person => person.prize)) {
          return (wins += 1);
        }
      });
      return { nominations: this.movie.moviesNominations.totalCount, wins };
    },
    movieYear() {
      if (this.movie.releaseDate) {
        return this.$options.filters.year(this.movie.releaseDate);
      }
      return "";
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
