<template>
  <div class="pl-6 lg:pl-8">
    <breadcrumbs>
      <ul>
        <li>
          <router-link to="/" tag="a" class="title-link">Awards</router-link>
        </li>
        <li>{{ nameShort }}</li>
      </ul>
    </breadcrumbs>
    <div class="flex items-center">
      <div class="-ml-6 pr-2 lg:-ml-8 lg:pr-4">
        <back-arrow to="/" />
      </div>
      <h2 class="flex items-center flex-wrap">
        <span class="mr-2">{{ nameShort }}</span>
        <span class="text-gray-500 leading-none mt-0">
          {{ award.nameLong }}
          <sup class="text-sm">{{ award.country.code }}</sup>
        </span>
      </h2>
    </div>
    <section>
      <template v-if="$apollo.loading">
        <spinner />
      </template>
      <template v-else>
        <p class="text-gray-500 mt-2 lg:mt-0">
          <a
            :href="award.link"
            class="link-external hover:text-white"
            target="_blank"
            >{{ award.link | formatUrl }}</a
          >
        </p>
        <p class="text-gray-500">
          {{ award.editions.totalCount }} editions since
          {{ editionYears.minDate | year }}
        </p>
        <section class="pt-4">
          <edition-list :award-id="award.id" />
        </section>
      </template>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Spinner.vue";
import AwardListItem from "../components/AwardListItem";
import EditionList from "../components/EditionList";
import EditionListItem from "../components/EditionListItem";
import BackArrow from "../components/BackArrow";
export default {
  name: "AwardView",
  components: { BackArrow, EditionList, Spinner },
  props: {
    nameShort: {
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
      editionYears: null
    };
  },
  apollo: {
    awardByNameShort: {
      query: gql`
        query awardByNameShort($nameShort: String!) {
          awardByNameShort(nameShort: $nameShort) {
            ...award
            editions(orderBy: DATE_DESC) {
              totalCount
              nodes {
                ...edition
              }
            }
          }
        }

        ${AwardListItem.fragments.award}
        ${EditionListItem.fragments.edition}
      `,
      variables() {
        return {
          nameShort: this.nameShort
        };
      },
      update(data) {
        this.award = { ...data.awardByNameShort };
        this.editionYears = this.getEditionYears(this.award.editions.nodes);
      }
    }
  },
  methods: {
    getEditionYears(editions) {
      const dates = editions.map(edition => new Date(edition.date));
      return {
        minDate: new Date(Math.min.apply(null, dates)),
        maxDate: new Date(Math.max.apply(null, dates))
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
