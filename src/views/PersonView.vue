<template>
  <article class="pl-6 lg:pl-8">
    <breadcrumbs :prevScreenParams="prevScreenParams">{{
      person.name
    }}</breadcrumbs>
    <header class="mb-2 flex sm:items-center">
      <nav class="-ml-6 pr-2 lg:-ml-8 lg:pr-4">
        <back-arrow :to="prevScreen" />
      </nav>
      <h2 class="flex items-center flex-wrap">
        <span class="mr-2">{{ person.name }}</span>
      </h2>
    </header>
    <main>
      <spinner v-if="$apollo.loading" class="mt-4" />
      <template v-else>
        <section id="person" class="flex">
          <div class="mr-4">
            <person-headshot
              :tmdb-id="person.tmdbId"
              :profilePath="person.profilePath"
              w="200"
            />
          </div>
          <div class="w-1/2">
            <p v-if="person.biography" class="text-gray-500 mb-2">
              {{ person.biography }}
            </p>
            <p v-if="person.deathday">
              &#10013; {{ person.deathday | formatDate("Do MMMM YY") }}
            </p>
            <p v-else-if="person.birthday">
              {{ person.birthday | age
              }}<span class="text-gray-500 "> years old</span>
            </p>
            <p v-if="person.placeOfBirth" class="mb-2">
              <span class="mr-2">{{ person.placeOfBirth }}</span
              ><span class="text-gray-500 ">Place of Birth</span>
            </p>
            <p>
              <person-social-links
                :tmdb-id="person.tmdbId"
                :imdb-id="person.imdbId"
              />
            </p>
          </div>
        </section>
        <section id="movie-nominations" class="pt-4">
          <p class="text-gray-500 mb-4">
            {{ stats.nominations }} nominations<span
              class="text-xs mx-1 text-gray-800"
              >★</span
            >{{ stats.wins }} wins
          </p>
          <div class="xl:flex xl:flex-wrap">
            <div
              v-for="(movieGroup, index) in nominationsByMovie"
              :key="index"
              class="flex mb-4 w-full xl:w-1/3 xl:mr-4"
            >
              <div class="mr-2">
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

                <ul>
                  <li
                    v-for="nomination in movieGroup.nominations"
                    :key="nomination.id"
                    class="mb-1"
                  >
                    <star :winner="nomination.winner" class="mr-2" />
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
                        >{{ nomination.edition.date | year }}
                        {{ nomination.award.nameShort }}</span
                      ></edition-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </template>
    </main>
  </article>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");
const orderBy = require("lodash.orderby");
import Spinner from "@/components/Spinner";
import PersonSocialLinks from "@/components/PersonSocialLinks";
import PersonHeadshot from "@/components/PersonHeadshot";
import PersonListItem from "@/components/PersonListItem";
import MoviePoster from "@/components/MoviePoster";
import MovieLink from "@/components/MovieLink";
import CategoryLink from "@/components/CategoryLink";
import EditionLink from "@/components/EditionLink";

export default {
  name: "PersonView",
  components: {
    Spinner,
    PersonHeadshot,
    PersonSocialLinks,
    EditionLink,
    CategoryLink,
    MovieLink,
    MoviePoster
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
        return (this.nominations = data.nominatedPeople.nodes.map(
          node => node.nomination
        ));
      }
    }
  },
  computed: {
    nominationsByMovie() {
      if (!this.nominations) return null;
      let sortedNominations = Object.values(
        groupBy(this.nominations, "movie.id")
      );
      sortedNominations = sortedNominations.map(nomination => {
        return {
          movie: { ...nomination[0].movie },
          edition: { ...nomination[0].edition },
          nominations: orderBy(nomination,"winner", 'desc')
        };
      });

      sortedNominations = orderBy(sortedNominations, "edition.date", "desc");
      return sortedNominations;
    },
    stats() {
      if (!this.nominations) return null;
      return this.getStats(this.nominations);
    }
  },
  methods: {
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
