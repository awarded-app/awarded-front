<template>
  <li class="mb-2 block">
    <article class="mb-2">
      <header class="sm:flex sm:items-center sm:flex-wrap mb-2">
        <div class="flex items-center flex-wrap">
          <plus-sign
            :is-open="showNominations"
            class="text-base"
            @click="showNominations = !showNominations"
          />
          <h3 class="mr-2 font-mono">
            <edition-link
              :award-name-short="edition.award.nameShort"
              :edition-official-year="edition.officialYear"
              :award-type="awardType"
              >{{ edition.officialYear }}</edition-link
            >
          </h3>
        </div>
        <component :is="`${AwardType}EditionListItemDetails`" :edition="edition" />
      </header>
      <section class="w-full">
        <component :is="`${AwardType}NominationList`" v-if="showNominations" :edition="edition" />
      </section>
    </article>
  </li>
</template>

<script>
import MoviesNominationList from "./MoviesNominationList";
import BooksNominationList from "./BooksNominationList";
import EditionLink from "@/components/EditionLink";
import MoviesEditionListItemDetails from "@/components/MoviesEditionListItemDetails";
import BooksEditionListItemDetails from "@/components/BooksEditionListItemDetails";

export default {
  name: "EditionListItem",
  components: {
    BooksNominationList,
    MoviesNominationList,
    EditionLink,
    BooksEditionListItemDetails,
    MoviesEditionListItemDetails
  },
  props: {
    edition: {
      type: Object,
      required: true
    },
    awardType: {
      type: String,
      required: true
    },
    dataIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showNominations: this.dataIndex === 0,
      AwardType: this.$options.filters.capitalize(this.awardType)
    };
  }
};
</script>

<style lang="scss" scoped></style>
