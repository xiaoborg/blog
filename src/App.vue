<template>
  <Header v-if="isShow"> </Header>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
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
  transition: opacity .5s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
