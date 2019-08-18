<template>
  <div>
    <p
      class="-mt-4 mb-8 text-gray-500"
      :class="$route.name === 'homeBooks' ? 'indented' : ''"
    >
      Keep track of the most important book awards and festivals.<br />
      Find the next book to read.
    </p>
    <!-- <award-list /> -->
  </div>
</template>

<script>
//import AwardList from "@/components/AwardList";

export default {
  name: "HomeMovies",
  metaInfo: {
    title: `Awarded Books - Keep track of the most important book awards and festivals`,
    titleTemplate: ""
  }
};
</script>
