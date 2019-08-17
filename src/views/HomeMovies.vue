<template>
  <div>
    <p class="indented -mt-4 mb-8 text-gray-500">
      Keep track of the most important movie awards and festivals.<br />
      Find the next movie to watch.
    </p>
    <award-list />
  </div>
</template>

<script>
import AwardList from "@/components/AwardList";

export default {
  name: "HomeMovies",
  metaInfo: {
    title: `Awarded - Keep track of the most important film awards and festivals`,
    titleTemplate: ""
  },
  components: {
    AwardList
  }
};
</script>
