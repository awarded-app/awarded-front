<template functional>
  <font-awesome-icon
    :icon="props.winner ? 'star' : ['far', 'star']"
    class="text-xs"
    :class="props.winner ? 'text-yellow-500' : 'text-gray-800'"
  />
</template>
