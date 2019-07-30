<template>
  <div class="h-full w-6 inline-block cursor-pointer hover:text-yellow-500">
    <font-awesome-icon :icon="icon" @click="toggleOpen" />
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
  data() {
    return {
      open: this.isOpen
    };
  },
  computed: {
    icon() {
      return this.open ? "caret-down" : "caret-right";
    }
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
      this.$emit("click", open);
    }
  }
};
</script>

<style lang="scss" scoped></style>
