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
      <spinner v-if="$apollo.loading" />
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
          <p class="text-gray-500">
            {{ stats.nominations }} nominations<span
              class="text-xs mx-1 text-gray-800"
              >★</span
            >{{ stats.wins }} wins
          </p>
          <div>
            <div
              v-for="(awardNominations, index) in nominationsByAward"
              :key="index"
              class="mb-4"
            >
              <person-nominations-by-award :nominations="awardNominations" />
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
import Spinner from "@/components/Spinner";
import PersonSocialLinks from "@/components/PersonSocialLinks";
import PersonHeadshot from "@/components/PersonHeadshot";
import PersonListItem from "../components/PersonListItem";
import PersonNominationsByAward from "../components/PersonNominationsByAward";

export default {
  name: "PersonView",
  components: {
    PersonNominationsByAward,
    Spinner,
    PersonHeadshot,
    PersonSocialLinks
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
        id: this.personId,
        name: this.personName
      },
      prevScreen: "",
      prevScreenParams: null,
      stats: null
    };
  },
  apollo: {
    person: {
      query: gql`
        query person($id: Int!) {
          person(id: $id) {
            ...person
            nominatedPeople {
              nodes {
                id
                tmdbCreditId
                character
                job {
                  id
                  name
                }
                nomination {
                  movie {
                    id
                    title
                    tmdbId
                  }
                  award {
                    id
                    nameShort
                    isFestival
                  }
                  category {
                    id
                    name
                    order
                    editionCategories {
                      nodes {
                        complete
                      }
                    }
                  }
                  edition {
                    id
                    name
                    date
                    publish
                  }
                  winner
                }
                prize {
                  id
                  name
                  order
                }
              }
              totalCount
            }
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
        this.stats = this.getStats(data.person.nominatedPeople.nodes);
        return (this.person = data.person);
      }
    }
  },
  computed: {
    nominationsByAward() {
      return this.groupByAward(this.person.nominatedPeople.nodes);
    }
  },
  methods: {
    groupByAward(nominations) {
      return Object.values(groupBy(nominations, "nomination.award.id"));
    },
    getStats(nominations) {
      const stats = { nominations: nominations.length, wins: 0 };
      stats.wins = nominations.filter(
        nomination => nomination.nomination.winner
      ).length;
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
