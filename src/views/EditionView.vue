<template>
  <div>
    <breadcrumbs :prev-screen-params="{ nameShort }">{{
      editionYear
    }}</breadcrumbs>
    <article class="indented">
      <header class="flex sm:items-center mb-2">
        <h2 class="flex items-center flex-wrap">
          <span class="mr-2 font-mono">{{ editionYear }}</span>
          <span class="text-gray-500 leading-none mt-0">{{
            edition.name
          }}</span>
        </h2>
      </header>
      <spinner v-if="$apollo.loading" />
      <section v-else>
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="text-gray-500">
            {{ edition.date | formatDate("MMMM Do") }}
          </p>
        </div>
        <section class="pt-4">
          <h4 class="text-gray-500 mb-2 a-uppercase-info">
            <template v-if="award.isFestival"
              >Main Sections</template
            >
            <template v-else
              >All Categories</template
            >
          </h4>
          <category
            v-for="category in categories.nodes"
            :key="category.id"
            :category="category"
            :is-festival="award.isFestival"
          />
        </section>
      </section>
    </article>
  </div>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");
import Spinner from "@/components/Spinner.vue";
import AwardListItem from "../components/AwardListItem";
import EditionListItem from "../components/EditionListItem";
import CategoryListItem from "../components/CategoryListItem";
import NominationListItem from "../components/NominationListItem";
import Category from "../components/Category";

export default {
  name: "EditionView",
  metaInfo() {
    const editionName = this.edition.name;
    return {
      title: `${this.editionYear} ${this.nameShort} - Winners and nominees in all categories`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `Winners and nominees in all categories of the ${this.nameShort} ${this.editionYear} (${editionName})`
        }
      ]
    };
  },
  components: { Category, Spinner },
  props: {
    nameShort: {
      type: String,
      required: true
    },
    editionYear: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      award: {
        nameShort: this.nameShort,
        nameLong: "",
        country: {
          code: ""
        }
      },
      edition: {
        name: ""
      },
      allNominations: null,
      allNominationsByMovie: null,
      categories: { nodes: [] }
    };
  },
  apollo: {
    categories: {
      query: gql`
        query categories(
          $categoryCondition: CategoryCondition
          $nominationCondition: NominationCondition
          $editionCategoryCondition: EditionCategoryCondition
        ) {
          categories(condition: $categoryCondition, orderBy: [ORDER_ASC]) {
            totalCount
            nodes {
              ...category
              editionCategories(condition: $editionCategoryCondition) {
                totalCount
                nodes {
                  id
                  categoryId
                  complete
                }
              }
              nominations(
                condition: $nominationCondition
                orderBy: WINNER_DESC
              ) {
                totalCount
                nodes {
                  ...nomination
                }
              }
            }
          }
        }
        ${NominationListItem.fragments.nomination}
        ${CategoryListItem.fragments.category}
      `,
      variables() {
        return {
          categoryCondition: {
            awardId: this.award.id
          },
          nominationCondition: {
            editionId: this.edition.id
          },
          editionCategoryCondition: {
            editionId: this.edition.id
          }
        };
      },
      update(data) {
        // filter only complete
        this.categories = data.categories;
        this.categories.nodes = data.categories.nodes.filter(category => {
          if (category.editionCategories.totalCount > 0) {
            return category.editionCategories.nodes[0].complete;
          }
          return false;
        });
        return this.categories;
      },
      skip: true
    },
    editionByYear: {
      query: gql`
        query editionByYear($filter: EditionFilter, $year: Int) {
          editionByYear(filter: $filter, year: $year) {
            nodes {
              ...edition
            }
          }
        }
        ${EditionListItem.fragments.edition}
      `,
      variables() {
        return {
          filter: {
            awardId: {
              equalTo: this.award.id
            }
          },
          year: Number(this.editionYear)
        };
      },
      update(data) {
        this.edition = { ...data.editionByYear.nodes[0] };
        this.$apollo.queries.categories.skip = false;
        //this.allNominations = this.edition.nominations.nodes;
        //this.allNominationsByMovie = this.groupByMovie(this.allNominations);
      },
      skip: true
    },
    awardByNameShort: {
      query: gql`
        query awardByNameShort($nameShort: String!) {
          awardByNameShort(nameShort: $nameShort) {
            ...award
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
        this.$apollo.queries.editionByYear.skip = false;
      }
    }
  },
  methods: {
    groupByMovie(nominations) {
      return Object.values(groupBy(nominations, "movie.id"));
    },
    movieStats(movie) {
      let wins = 0;
      let losses = 0;
      movie.map(nomination => {
        if (!nomination.winner) {
          return (losses += 1);
        }
        if (nomination.nominatedPeople.nodes.some(person => person.prize)) {
          return (wins += 1);
        }
      });
      return { nominations: wins + losses, wins, losses };
    },
    isWinner(nomination) {
      return (
        nomination.nominatedPeople.nodes.filter(person => person.prize).length >
        0
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
