<template>
  <div class="flex">
    <figure class="mr-2 mt-1 flex-none">
      <template v-if="winners.length > 0">
        <book-link
          v-for="{ book } in winners"
          :key="book.id"
          :book-id="book.id"
          :book-title="book.title"
          ><book-cover :image-url="book.imageUrl" :isbn="book.isbn10 || book.isbn13"
        /></book-link>
      </template>
      <template v-else>
        <book-cover :placeholder="true" />
      </template>
    </figure>

    <div>
      <h3 class="text-faded font-mono">
        <edition-link
          :edition-official-year="edition.officialYear"
          :award-name-short="edition.award.nameShort"
          award-type="books"
          >{{ edition.officialYear }}</edition-link
        >
      </h3>
      <div v-if="winners.length > 0" class="mb-2 flex">
        <div v-for="{ book } in winners" :key="book.id" class="text-lg">
          <p class="font-semibold">
            <star />
            <book-link :book-id="book.id" :book-title="book.title">{{ book.title }}</book-link>
          </p>
          <p class="indented flex">
            by&nbsp;
            <book-authors :authors="book.booksBookAuthors.nodes" class="font-semibold" />
          </p>
        </div>
      </div>
      <div v-else>
        <p class="font-semibold text-lg mb-2"><star :is-winner="false" />No winners</p>
      </div>
      <template v-if="shortlist.length || longlist.length">

        <div class=" flex items-center mb-2" @click="showNominations = !showNominations">
          <plus-sign :is-open="showNominations" />
          <p>
            <a class="text-faded title-link cursor-pointer">
              Other Nominees
            </a>
          </p>
        </div>

        <ul v-if="showNominations" class="mb-4 indented">
          <li v-if="shortlist.length > 0">
            <span class="a-uppercase-info text-faded">Shortlist</span>
            <ul>
              <li v-for="{ book } in shortlist" :key="book.id" class="flex flex-wrap">
                <p class="-mr-6">
                  <star :is-winner="false" /><book-link :book-id="book.id" :book-title="book.title">{{
                    book.title
                  }}</book-link
                  >&nbsp;
                </p>
                <book-authors :authors="book.booksBookAuthors.nodes" class="text-faded ml-6" />
              </li>
            </ul>
          </li>
          <li v-if="longlist.length > 0">
            <span class="a-uppercase-info text-faded">Longlist</span>
            <ul>
              <li v-for="{ book } in longlist" :key="book.id" class="flex flex-wrap">
                <p class="-mr-6">
                  <star :is-winner="false" /><book-link :book-id="book.id" :book-title="book.title">{{
                    book.title
                  }}</book-link
                  >&nbsp;
                </p>
                <book-authors :authors="book.booksBookAuthors.nodes" class="text-faded ml-6" />
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import EditionLink from "@/components/EditionLink";
import BookLink from "@/components/BookLink";
import BookCover from "@/components/BookCover";
import BookAuthors from "@/components/BookAuthors";
export default {
  name: "BooksCategoryEditionNominations",
  components: {
    BookAuthors,
    BookCover,
    BookLink,
    EditionLink
  },
  props: {
    edition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      winners: this.edition.booksNominations.nodes.filter(nomination => nomination.isWinner),
      shortlist: this.edition.booksNominations.nodes.filter(
        nomination => nomination.isShortlisted && !nomination.isWinner
      ),
      longlist: this.edition.booksNominations.nodes.filter(
        nomination => !nomination.isWinner && !nomination.isShortlisted
      ),
      showNominations: false
    };
  }
};
</script>

<style lang="scss" scoped></style>
