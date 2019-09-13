<template>
  <div class="w-4 sm:w-6 inline-block cursor-pointer" @click="toggleOpen">
    <font-awesome-icon :icon="icon"></font-awesome-icon>
  </div>
</template>

<script>
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "PlusSign",
  components: {
    FontAwesomeIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon() {
      return this.isOpen ? faCaretDown : faCaretRight;
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
