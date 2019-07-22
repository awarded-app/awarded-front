<template>
  <font-awesome-icon
    :icon="icon"
    class="h-full mr-2 flex items-center cursor-pointer hover:text-yellow-500"
    @click="toggleOpen"
  />
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
