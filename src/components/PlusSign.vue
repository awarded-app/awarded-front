<template>
  <div
    class="h-full w-4 sm:w-6 inline-block cursor-pointer hover:text-yellow-500"
    @click="toggleOpen"
  >
    <font-awesome-icon :icon="icon" />
  </div>
</template>

<script>
export default {
  name: "PlusSign",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    icon() {
      return this.isOpen ? "caret-down" : "caret-right";
    }
  },
  methods: {
    toggleOpen() {
      this.$emit("click", open);
    }
  }
};
</script>

<style lang="scss" scoped></style>
