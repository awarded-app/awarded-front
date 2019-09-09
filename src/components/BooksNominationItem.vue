<template>
  <component :is="tag">
    <article class="sm:flex">
      <figure class="mt-1 mb-2 flex-none" :class="showDetails ? 'mr-2' : 'mr-4'">
        <book-link :book-id="nomination.book.id" :book-title="nomination.book.title"
          ><book-cover
            :image-url="nomination.book.imageUrl"
            :isbn="nomination.book.isbn13 || nomination.book.isbn10"
        /></book-link>
      </figure>
      <main v-if="showDetails">
        <h4>
          <book-link :book-id="nomination.book.id" :book-title="nomination.book.title">{{
            nomination.book.title
          }}</book-link>
        </h4>
        <p class="author-list">
          by
          <span
            v-for="{ author } in nomination.book.booksBookAuthors.nodes"
            :key="author.id"
            class="font-semibold"
            >{{ author.name }}</span
          >
        </p>
        <ul v-if="isWinner">
          <li
            v-for="{ prize } in nomination.booksNominationPrizes.nodes"
            :key="prize.id"
            class="flex items-center"
          >
            <star />{{ prize.name }}
          </li>
        </ul>
        <p v-if="isShortlisted"><star :is-winner="false" />Shortlisted</p>
      </main>
    </article>
  </component>
</template>

<script>
import BookCover from "@/components/BookCover";
import BookLink from "@/components/BookLink";

export default {
  name: "BooksNominationItem",
  components: {
    BookCover,
    BookLink
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    nomination: {
      type: Object,
      required: true
    },
    showDetails: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isWinner: this.nomination.isWinner,
      isShortlisted: !this.nomination.isWinner && this.nomination.isShortlisted
    };
  }
};
</script>

<style lang="scss" scoped></style>
