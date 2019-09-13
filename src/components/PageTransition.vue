<template>
  <div>
    <transition :name="transition" :mode="mode">
      <slot></slot>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PageTransition",
  props: ["name"],
  data() {
    return {
      transition: "fade",
      mode: "out-in"
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.transition = to.meta.transition ? to.meta.transition : this.$props.name;

      next();
    });
  }
};
</script>

<style scoped>
@keyframes fadeInRight {
  from {
    transform: translate3d(40px, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
.fade-in-right-leave-to {
  opacity: 0;
  transition: opacity 0.3s;
}
.fade-in-right-enter {
  opacity: 0;
  transform: translate3d(40px, 0, 0);
}
.fade-in-right-enter-to {
  opacity: 0;
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: fadeInRight;
}
</style>
