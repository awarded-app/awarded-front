<template>
  <award-list />
</template>

<script>
import AwardList from "@/components/AwardList";

export default {
  name: "Home",
  metaInfo: {
    title: `Awarded - Keep track of the most important film awards and festivals`,
    titleTemplate: ""
  },
  components: {
    AwardList
  }
};
</script>
