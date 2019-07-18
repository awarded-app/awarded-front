<template functional>
  <font-awesome-icon
    :icon="props.winner ? 'star' : ['far', 'star']"
    :class="[
      data.class,
      data.staticClass,
      props.winner ? 'text-yellow-500' : 'text-gray-800'
    ]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  />
</template>
