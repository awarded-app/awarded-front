<template>
  <ul v-if="!winners">
    <li>Loading...</li>
  </ul>
  <ul v-else>
    <li v-for="nomination in winners" :key="nomination.id" class="mb-2">
      <award-edition-nomination :nomination="nomination" />
    </li>
    <li>more...</li>
  </ul>
</template>

<script>
import gql from "graphql-tag";
import AwardEditionNomination from "./AwardEditionNomination";
export default {
  components: { AwardEditionNomination },
  props: {
    edition: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      winners: []
    };
  },
  apollo: {
    nominations: {
      query: gql`
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
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.edition.id
        };
      },
      update(data) {
        // console.log(data)
        this.winners = data.edition.nominations.nodes.filter(
          nomination => nomination.category.important
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
