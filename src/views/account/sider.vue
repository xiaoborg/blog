<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    :open-keys="openKeys"
    style="width: 256px"
    mode="inline"
    @click="onClick"
  >
    <a-menu-item key="accountHome" class="mt0">首页</a-menu-item>
    <a-sub-menu key="accoutArticle">
      <template #title>文章管理</template>
      <a-menu-item key="accountArticlePublish">发布文章</a-menu-item>
      <a-menu-item key="accountArticleList">文章列表</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="accountCategory">分类管理</a-menu-item>
    <a-menu-item key="accountLabel">标签管理</a-menu-item>
  </a-menu>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  components: {},
  setup() {
    const $route = useRoute()
    const $router = useRouter()
    const state = reactive({
      openKeys: [
        $route.name === 'accountArticleList' ? 'accoutArticle' : $route.name
      ],
      selectedKeys: [$route.name]
    })
    const onClick = (item) => {
      state.openKeys = [
        item.key === 'accountArticleList' ? 'accoutArticle' : item.key
      ]
      $router.push({
        name: item.key
      })
    }
    return {
      ...toRefs(state),
      onClick
    }
  }
}
</script>
<style lang="less" scoped></style>
