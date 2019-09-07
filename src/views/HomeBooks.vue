<template>
  <layout name="BooksLayout">
    <div>
      <p class="-mt-4 mb-8 text-faded" :class="$route.name === 'homeBooks' ? 'indented' : ''">
        Keep track of the most important book awards and festivals.<br />
        Find the next book to read.
      </p>
      <award-list award-type="books" />
    </div>
  </layout>
</template>

<script>
import AwardList from "@/components/AwardList";
import Layout from "@/layouts/Layout";

export default {
  name: "HomeBooks",
  metaInfo: {
    title: `Awarded Books - Keep track of the most important book awards and festivals`,
    titleTemplate: ""
  },
  components: {
    Layout,
    AwardList
  }
};
</script>
