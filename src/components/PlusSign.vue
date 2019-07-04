<template>
  <div
    class="w-6 lg:w-8 cursor-pointer hover:text-yellow-500"
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
  data() {
    return {
      open: this.isOpen
    };
  },
  computed: {
    icon() {
      return this.open ? "minus" : "plus";
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
