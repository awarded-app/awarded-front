<template>
  <div class="pl-6 lg:pl-8">
    <breadcrumbs>
      <ul>
        <li>
          <router-link to="/" tag="a" class="title-link">Awards</router-link>
        </li>
        <li>
          <router-link :to="`/award/${nameShort}`" tag="a" class="title-link">{{
            nameShort
          }}</router-link>
        </li>
        <li>{{ editionYear }}</li>
      </ul>
    </breadcrumbs>
    <div class="flex sm:items-center">
      <div class="-ml-6 pr-2 lg:-ml-8 lg:pr-4">
        <back-arrow :to="`/award/${nameShort}`" />
      </div>
      <h1 class="flex items-center flex-wrap">
        <span class="mr-2">{{ editionYear }}</span>
        <span class="text-gray-500 leading-none mt-0">{{ edition.name }}</span>
      </h1>
    </div>
    <section>
      <template v-if="$apollo.loading">
        <spinner />
      </template>
      <template v-else>
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="text-gray-500">
            {{ edition.date | formatDate("MMMM Do") }}
          </p>
          <p class="text-gray-500 uppercase text-sm mt-4 sm:mt-0">
            DISPLAY by <span class="text-white">Category</span> / Movie
          </p>
        </div>
        <section class="pt-4">
          <category
            v-for="category in categories.nodes"
            :key="category.id"
            :category="category"
          />
        </section>
      </template>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");

import AwardListItem from "../components/AwardListItem";
import EditionListItem from "../components/EditionListItem";
import AwardEditionNomination from "../components/AwardEditionNomination";
import Category from "../components/Category";

export default {
  name: "EditionView",
  components: { Category },
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
      allNominationsByMovie: null
    };
  },
  apollo: {
    categories: {
      query: gql`
        query categories(
          $categoryCondition: CategoryCondition
          $nominationCondition: NominationCondition
        ) {
          categories(
            condition: $categoryCondition
            orderBy: [IMPORTANT_ASC, ORDER_ASC]
          ) {
            totalCount
            nodes {
              nodeId
              id
              important
              name
              description
              display
              order
              prizes {
                nodes {
                  id
                  name
                  order
                  display
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
        ${AwardEditionNomination.fragments.nomination}
      `,
      variables() {
        return {
          categoryCondition: {
            awardId: this.award.id
          },
          nominationCondition: {
            editionId: this.edition.id
          }
        };
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
