<template>
  <Header v-if="isShow"> </Header>
  <router-view></router-view>
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
<style lang="less"></style>
