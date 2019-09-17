<template>
  <div>
    <header class="flex items-center mb-2">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" />
      <h3>
        <category-link
          :award-name-short="category.award.nameShort"
          :category-name="category.name"
          award-type="books"
          >{{ category.name }}</category-link
        >
      </h3>
    </header>
    <div v-if="isOpen" class="indented mb-4">
      <!-- WINNERS -->
      <div class="mb-4">
        <p v-if="winners.length > 0" class="a-uppercase-info">
          WINNER<span v-if="winners.length > 1">s</span>
        </p>
        <p v-else-if="isFutureEdition">
          No winners yet. Results on <strong>{{ editionDate | formatDate("MMMM do") }}</strong
          >.
        </p>
        <p v-else>NO WINNERS</p>

        <ul v-if="winners.length > 0">
          <list-transition>
            <books-nomination-item
              v-for="(nomination, index) in winners"
              :key="nomination.id"
              :data-index="index"
              :nomination="nomination"
              tag="li"
            />
          </list-transition>
        </ul>
      </div>
      <!-- SHORTLIST -->
      <div v-if="shortlist.length > 0" class="mb-4">
        <h4 class="a-uppercase-info">SHORTLIST</h4>
        <ul class="flex flex-wrap">
          <books-nomination-item
            v-for="(nomination, index) in shortlist"
            :key="nomination.id"
            :data-index="index"
            :nomination="nomination"
            tag="li"
            :show-details="false"
          />
        </ul>
      </div>
      <!-- LONGLIST -->
      <div v-if="longlist.length > 0" class="mb-4">
        <h4 class="a-uppercase-info">LONGLIST</h4>
        <ul class="flex flex-wrap">
          <books-nomination-item
            v-for="(nomination, index) in longlist"
            :key="nomination.id"
            :data-index="index"
            :nomination="nomination"
            tag="li"
            :show-details="false"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const orderBy = require("lodash.orderby");
import BooksNominationItem from "../components/BooksNominationItem";
import CategoryLink from "../components/CategoryLink";
import ListTransition from "../components/ListTransition";

export default {
  name: "Category",
  components: {
    BooksNominationItem,
    CategoryLink,
    ListTransition
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    isFutureEdition: {
      type: Boolean,
      default: false
    },
    editionDate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: true,
      nominations: this.category.booksNominations.nodes
    };
  },
  computed: {
    winners() {
      return orderBy(this.nominations.filter(nomination => nomination.isWinner), "book.title");
    },
    shortlist() {
      return orderBy(
        this.nominations.filter(nomination => !nomination.isWinner && nomination.isShortlisted),
        "book.title"
      );
    },
    longlist() {
      return orderBy(
        this.nominations.filter(nomination => !nomination.isWinner && !nomination.isShortlisted),
        "book.title"
      );
    }
  }
};
</script>

<style scoped></style>
