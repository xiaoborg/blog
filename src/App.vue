<template>
  <vue-particles
    class="particles"
    color="#ffffff"
    :particleOpacity="0.7"
    linesColor="#ffffff"
    :particlesNumber="80"
    shapeType="circle"
    :particleSize="5"
    :linesWidth="2"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
  >
  </vue-particles>
  <div class="app-container">
    <Header v-if="isShow"> </Header>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup>
import Header from './components/header'
import { useStore } from 'vuex'
import { computed } from 'vue'
import headerShowConfig from './assets/json/excludeRouteNames.json'
const $store = useStore()
const routeStatus = computed(() => {
  return $store.getters.getRouteStatus
})
const excludeRouteNames = headerShowConfig
const isShow = computed(() => {
  return (
    excludeRouteNames.findIndex((v) => v === routeStatus.value.routeName) === -1
  )
})
</script>
<script>
export default {
  created() {}
}
</script>
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.app-container {
  position: relative;
  z-index: 2;
  min-height: 100%;
  width: 100%;
  overflow: auto;
}
.particles {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
