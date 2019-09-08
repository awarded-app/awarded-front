<template functional>
  <p class="text-2xl pl-4 sm:pl-0 text-faded">
    {{ props.edition.name }}
  </p>
</template>

<script>
export default {
  props: {
    edition: {
      type: Object,
      required: true
    }
  }
};
</script>
