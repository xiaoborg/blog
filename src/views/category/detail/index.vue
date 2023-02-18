<template>
  <div>
   {{ $route.params.category}}
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
const $route = useRoute()
const $store = useStore()
// 监听路由变化
const routeStatus = computed(() => {
  return $store.getters.getRouteStatus
})
watch(routeStatus, (newVal) => {
  console.log(newVal.userName)
  console.log(newVal.category)
  // 根据category获取不同内容
})
</script>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
