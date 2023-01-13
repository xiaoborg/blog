<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="inline"
    @click="handleClick"
  >
    <a-menu-item key="accountHome" class="mt0">首页</a-menu-item>
    <a-sub-menu key="sub1">
      <template #title>文章管理</template>
      <a-menu-item key="AccountArticlePublish">发布文章</a-menu-item>
      <a-menu-item key="accountArticleList">文章列表</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="accountCategory">分类管理</a-menu-item>
    <a-menu-item key="accountLabel">标签管理</a-menu-item>
  </a-menu>
</template>
<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  components: {},
  setup() {
    const selectedKeys = ref(['accountHome'])
    const openKeys = ref(['accountHome'])
    const $router = useRouter()
    const handleClick = (e) => {
      console.log(e.key)
      goView(e.key)
      selectedKeys.value[0] = e.key
      openKeys.value[0] = e.key
    }
    const goView = (routeName) => {
      $router.push({ name: routeName })
    }
    watch(
      () => openKeys,
      (val) => {
        console.log('openKeys', val)
      }
    )
    return {
      selectedKeys,
      openKeys,
      handleClick
    }
  }
}
</script>
<style lang="less" scoped></style>
