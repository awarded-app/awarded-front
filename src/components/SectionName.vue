<template functional>
  <span class="text-gray-500 uppercase">{{ props.path.split("/")[1] }}</span>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    }
  }
};
</script>
