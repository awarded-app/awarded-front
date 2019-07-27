<template>
  <div class="indented">
    <breadcrumbs :prevScreenParams="prevScreenParams">{{
      categoryName
    }}</breadcrumbs>
    <div class="flex sm:items-center mb-4">
      <div class="-ml-6 pr-2 lg:-ml-8 lg:pr-4">
        <back-arrow :to="prevScreen" />
      </div>
      <h2 class="flex items-center flex-wrap">
        <span class="mr-2">{{ categoryName }}</span>
        <span class="text-gray-500 leading-none mt-0">{{ nameShort }}</span>
      </h2>
    </div>
    <spinner v-if="$apollo.loading" />
    <section v-else>
      <ul>
        <li
          v-for="{ edition } in category.editionCategories.nodes"
          :key="edition.id"
          class="mb-8"
        >
          <category-edition-nomination-list
            :edition="edition"
            :name-short="nameShort"
            :is-festival="award.isFestival"
            :display="category.display"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
const groupBy = require("lodash.groupby");
import gql from "graphql-tag";
import Spinner from "@/components/Spinner.vue";
import AwardListItem from "../components/AwardListItem";
import CategoryListItem from "../components/CategoryListItem";
import CategoryEditionNominationList from "../components/CategoryEditionNominationList";
import MovieListItem from "../components/MovieListItem";
import NominatedPerson from "../components/NominatedPerson";

export default {
  name: "CategoryView",
  components: {
    Spinner,
    CategoryEditionNominationList
  },
  props: {
    categoryName: {
      type: String,
      required: true
    },
    nameShort: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      prevScreen: "",
      prevScreenParams: null,
      category: null,
      award: null,
      categoryId: null
    };
  },
  methods: {
    getWinner(nominations) {
      return nominations.find(nomination => nomination.winner);
    },
    groupByMovie(nominations) {
      return Object.values(groupBy(nominations, "movie.id"));
    }
  },
  apollo: {
    category: {
      query: gql`
        query category(
          $id: Int!
          $awardId: Int!
          $nCondition: NominationCondition
        ) {
          category(id: $id, awardId: $awardId) {
            ...category
            editionCategories(
              condition: { complete: true }
              orderBy: EDITION_BY_EDITION_ID__DATE_DESC
            ) {
              nodes {
                edition {
                  date
                  id
                  name
                  publish
                  nominations(condition: $nCondition) {
                    totalCount
                    nodes {
                      id
                      winner
                      movie {
                        ...movie
                      }
                      nominatedPeople {
                        nodes {
                          ...nominatedPerson
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ${MovieListItem.fragments.movie}
        ${NominatedPerson.fragments.nominatedPerson}
        ${CategoryListItem.fragments.category}
      `,
      variables() {
        return {
          id: this.categoryId,
          awardId: this.award.id,
          nCondition: { categoryId: this.categoryId }
        };
      },
      skip: true
    },
    awardByNameShort: {
      query: gql`
        query awardByNameShort($nameShort: String!) {
          awardByNameShort(nameShort: $nameShort) {
            ...award
            categories {
              nodes {
                id
                name
              }
            }
          }
        }
        ${AwardListItem.fragments.award}
      `,
      variables() {
        return {
          nameShort: this.nameShort
        };
      },
      update(data) {
        //console.log(this.$apollo.queries);
        this.award = { ...data.awardByNameShort };
        const { id } = this.award.categories.nodes.find(
          category => category.name === this.categoryName
        );
        this.categoryId = id;
        if (id) {
          this.$apollo.queries.category.skip = false;
        }
      }
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
