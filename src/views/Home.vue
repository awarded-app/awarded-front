<template>
  <div class="home">
    <award-list />
  </div>
</template>

<script>
import AwardList from "@/components/AwardList.vue";

export default {
  name: "home",
  components: {
    AwardList
  }
};
</script>
