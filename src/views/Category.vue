<template>
  <div class="pl-6 lg:pl-8">
    <breadcrumbs :prevScreenParams="prevScreenParams">{{
      categoryName
    }}</breadcrumbs>
    <div class="flex sm:items-center">
      <div class="-ml-6 pr-2 lg:-ml-8 lg:pr-4">
        <back-arrow :to="prevScreen" />
      </div>
      <h2 class="flex items-center flex-wrap">
        <span class="mr-2">{{ categoryName }}</span>
        <span class="text-gray-500 leading-none mt-0">{{ nameShort }}</span>
      </h2>
    </div>
    <section>
      winners and nominations
    </section>
  </div>
</template>

<script>
export default {
  name: "CategoryView",
  props: {
    categoryName: {
      type: String,
      required: true
    },
    nameShort: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      prevScreen: "",
      prevScreenParams: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevScreen = from.fullPath || "/";
      vm.prevScreenParams = from.params || null;
    });
  }
};
</script>

<style lang="scss" scoped></style>
