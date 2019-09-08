<template>
  <div class="w-4 sm:w-6 inline-block cursor-pointer" @click="toggleOpen">
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

<style scoped>
div:hover {
  color: var(--mainColor);
}
</style>
