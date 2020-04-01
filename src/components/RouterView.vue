<template>
  <transition name="fade" mode="out-in">
    <keep-alive v-if="keepAlive">
      <slot></slot>
    </keep-alive>
    <slot v-else></slot>
  </transition>
</template>
<script>
export default {
  name: "ContainerRouter",
  props: {
    keepAlive: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
