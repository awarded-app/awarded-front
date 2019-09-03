<template>
  <transition-group
    name="staggered-fade"
    appear
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </transition-group>
</template>

<script>
import Velocity from "velocity-animate";
export default {
  name: "ListTransition",
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      const delay = el.dataset.index * 25;
      setTimeout(() => {
        Velocity(el, { opacity: 1 }, { complete: done });
      }, delay);
    },
    leave(el, done) {
      const delay = el.dataset.index * 25;
      setTimeout(() => {
        Velocity(el, { opacity: 0 }, { complete: done });
      }, delay);
    }
  }
};
</script>
