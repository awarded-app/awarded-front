<template>
<layout name="MoviesLayout">
  <div>
    <breadcrumbs :prev-screen-params="prevScreenParams">{{ person.name }}</breadcrumbs>
    <article>
      <header class="mb-2 flex sm:items-center">
        <h2 class="flex items-center flex-wrap leading-tight">
          <span class="mr-2">{{ person.name }}</span>
        </h2>
      </header>
      <main>
        <spinner v-if="$apollo.loading" class="mt-4" />
        <template v-else>
          <section id="person">
            <div class="lg:w-2/3">
              <person-headshot
                :tmdb-id="person.tmdbId"
                :profile-path="person.profilePath"
                w="200"
                class="mb-2 sm:mr-4 sm:float-left"
              />
              <p v-if="person.biography" class="text-gray-500 mb-2">
                {{ person.biography }}
              </p>
            </div>
            <div class="clearfix">
              <p v-if="person.deathday">
                &#10013; {{ person.deathday | formatDate("Do MMMM YY") }}
              </p>
              <p v-else-if="person.birthday">
                {{ person.birthday | age }}<span class="text-gray-500 "> years old</span>
              </p>
              <p v-if="person.placeOfBirth" class="mb-2">
                <span class="text-gray-500">From</span>
                {{ person.placeOfBirth }}
              </p>
              <p>
                <person-social-links :tmdb-id="person.tmdbId" :imdb-id="person.imdbId" />
              </p>
            </div>
          </section>
          <section id="movie-nominations" class="pt-4">
            <p class="text-gray-500 mb-4 a-uppercase-info">
              {{ stats.nominations }} nominations<star-separator />{{ stats.wins }}
              wins
            </p>
            <div class="xl:flex xl:flex-wrap">
              <div
                v-for="(movieGroup, index) in nominationsByMovie"
                :key="index"
                class="md:flex w-full xl:w-1/3 xl:mr-4"
              >
                <div class="md:flex">
                  <div class="mr-2 flex-none">
                    <movie-poster :tmdb-id="movieGroup.movie.tmdbId" w="100" />
                  </div>
                  <div>
                    <h3 class="mb-1">
                      <movie-link
                        :movie-id="movieGroup.movie.id"
                        :movie-title="movieGroup.movie.title"
                      >
                        {{ movieGroup.movie.title }}
                      </movie-link>
                    </h3>
                    <div v-for="({ nominations }, index) in movieGroup.nominations" :key="index">
                      <movie-nominations-by-award :nominations="nominations" />
                    </div>
                  </div>
                </div>
                <!--
                <div>


                  <ul>
                    <li
                      v-for="nomination in movieGroup.nominations"
                      :key="nomination.id"
                      class="mb-1"
                    >
                      <star :winner="nomination.winner" class="mr-2" />
                      <span v-if="nomination.prizes.totalCount > 0" class="mr-2">{{
                        nomination.prizes.nodes[0].prize.name
                      }}</span>
                      <category-link
                        :category-name="nomination.category.name"
                        :award-name-short="nomination.award.nameShort"
                        class="mr-2"
                        >{{ nomination.category.name }}</category-link
                      >
                      <edition-link
                        :edition-date="nomination.edition.date"
                        :award-name-short="nomination.award.nameShort"
                        class="mr-2"
                        ><span class="text-gray-500"
                          ><span class="font-mono">{{ nomination.edition.date | year }}</span>
                          {{ nomination.award.nameShort }}</span
                        ></edition-link
                      >
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </section>
        </template>
      </main>
    </article>
  </div>
  </layout>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");
const orderBy = require("lodash.orderby");
import Layout from "@/layouts/Layout";
import Spinner from "@/components/Spinner";
import PersonSocialLinks from "@/components/PersonSocialLinks";
import PersonHeadshot from "@/components/PersonHeadshot";
import PersonListItem from "@/components/PersonListItem";
import MoviePoster from "@/components/MoviePoster";
import MovieLink from "@/components/MovieLink";
import CategoryLink from "@/components/CategoryLink";
import EditionLink from "@/components/EditionLink";
import StarSeparator from "@/components/StarSeparator";
import MovieNominationsByAward from "@/components/MovieNominationsByAward";

export default {
  name: "PersonView",
  metaInfo() {
    return {
      title: `${this.personName} - Nominations and wins`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `${this.personName}: nominations and wins in all Awards and Festivals.`
        }
      ]
    };
  },
  components: {
    Spinner,
    PersonHeadshot,
    PersonSocialLinks,
    MovieNominationsByAward,
    StarSeparator,
    EditionLink,
    CategoryLink,
    MovieLink,
    MoviePoster,
    Layout
  },
  props: {
    personName: {
      type: String,
      required: true
    },
    personId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      person: {
        id: Number(this.personId),
        name: this.personName
      },
      prevScreen: "",
      prevScreenParams: null,
      nominations: []
    };
  },
  apollo: {
    person: {
      query: gql`
        query person($id: Int!) {
          person(id: $id) {
            ...person
          }
        }
        ${PersonListItem.fragments.person}
      `,
      variables() {
        return {
          id: Number(this.personId)
        };
      },
      update(data) {
        return (this.person = data.person);
      }
    },
    nominatedPeople: {
      query: gql`
        query nominatedPeople($condition: NominatedPersonCondition) {
          nominatedPeople(condition: $condition) {
            totalCount
            nodes {
              nominatedPersonPrizes {
                nodes {
                  prize {
                    id
                    name
                  }
                }
                totalCount
              }
              nomination {
                id
                winner
                edition {
                  id
                  name
                  date
                  publish
                }
                award {
                  id
                  nameShort
                  isFestival
                }
                category {
                  id
                  name
                  display
                  important
                  order
                }
                movie {
                  id
                  tmdbId
                  title
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          condition: { personId: this.person.id }
        };
      },
      update(data) {
        return (this.nominations = data.nominatedPeople.nodes.map(node => {
          return {
            ...node.nomination,
            prizes: { ...node.nominatedPersonPrizes }
          };
        }));
      }
    }
  },
  computed: {
    nominationsByMovie() {
      if (!this.nominations) return null;
      let sortedNominations = Object.values(groupBy(this.nominations, "movie.id"));
      sortedNominations = sortedNominations.map(nomination => {
        return {
          movie: { ...nomination[0].movie },
          nominations: orderBy(nomination, "winner", "desc")
        };
      });

      for (const movie of sortedNominations) {
        let nomByAward = Object.values(groupBy(movie.nominations, "award.id"));
        nomByAward = nomByAward.map(award => {
          return {
            award: { ...award[0].award },
            edition: { ...award[0].edition },
            nominations: award
          };
        });
        movie.nominations = nomByAward;
      }

      sortedNominations = orderBy(sortedNominations, "nominations[0].edition.date", "desc");
      return sortedNominations;
    },

    stats() {
      if (!this.nominations) return null;
      return this.getStats(this.nominations);
    }
  },
  methods: {
    groupByAward(nominations) {
      return Object.values(groupBy(nominations, "award.id"));
    },
    orderByEditionDate(nominations) {
      return orderBy(nominations, "edition.date");
    },
    getStats(nominations) {
      const stats = { nominations: nominations.length, wins: 0 };
      stats.wins = nominations.filter(nomination => nomination.winner).length;
      return stats;
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
