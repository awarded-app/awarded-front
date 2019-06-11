<template functional>
  <span class="h-full flex items-center ml-2">
    <span
      v-for="nomination in props.nominations"
      :key="nomination.id"
      class="h-full flex items-center"
    >
      <font-awesome-icon
        v-if="nomination.nominatedPeople.nodes[0].prize"
        icon="star"
        class="text-xs text-yellow-500"
      />
    </span>
  </span>
</template>
