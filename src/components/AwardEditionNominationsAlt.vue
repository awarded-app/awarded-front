<template>
  <apollo-query
    :query="
      gql => gql`
        query edition($id: Int!) {
          edition(id: $id) {
            nominations(
              condition: { winner: true }
              orderBy: CATEGORY_ORDER_ASC
            ) {
              nodes {
                id
                movie {
                  id
                  title
                  posterPath
                }
                category {
                  id
                  name
                  important
                  order
                  display
                }
                nominatedPeople {
                  nodes {
                    character
                    id
                    job {
                      id
                      name
                    }
                    person {
                      id
                      name
                    }
                    prize {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `
    "
    :variables="{ id: edition.id }"
    :update="data => groupByMovie(data)"
  >
    <template v-slot="{ result: { data, error }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="data" class="mb-8 mt-4">
        <div v-for="movie in data" :key="movie[0].movie.id" class="mb-4">
          <h3 class="flex items-center">
            {{ movie[0].movie.title }}
            <nomination-stars :nominations="movie"/>
          </h3>
          <award-edition-nomination
            v-for="nomination in movie"
            :key="nomination.id"
            :nomination="nomination"
          />
        </div>
      </div>
      <div v-else>Error...</div>
    </template>
  </apollo-query>
</template>

<script>
import AwardEditionNomination from "./AwardEditionNomination";
import NominationStars from "./NominationStars";
const groupBy = require("lodash.groupby");
export default {
  components: { AwardEditionNomination, NominationStars },
  props: {
    edition: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    groupByMovie(data) {
      const winners = data.edition.nominations.nodes.filter(
        nomination => nomination.category.important
      );
      console.log(winners);
      return groupBy(winners, "movie.id");
    }
  }
};
</script>

<style lang="scss" scoped></style>
