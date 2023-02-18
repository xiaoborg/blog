<template>
  <a-row
    class="home-sub-header"
    type="flex"
    justify="center"
  >
    <a-row
      class="container"
      justify="space-between"
      align="middle"
    >
      <a-menu
        @select="select"
        :selectedKeys="currentKeys.length === 0 ? defaultSelectKeys : currentKeys"
        mode="horizontal"
        class="nav-header"
      >
        <a-menu-item key="home">
          首页
        </a-menu-item>
        <a-sub-menu
          key="category/1"
          popupClassName="nav-header-sub">
          <template #title>技术类</template>
          <a-menu-item key="vue">Vue</a-menu-item>
          <a-menu-item key="docker">Docker</a-menu-item>
        </a-sub-menu>
        <a-sub-menu
          key="category/2"
          popupClassName="nav-header-sub">
          <template #title>生活情感</template>
          <a-menu-item key="qinggan1">情感1</a-menu-item>
          <a-menu-item key="qinggan2">情感2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="category/xx">
          关于我
        </a-menu-item>
        <a-menu-item key="me">
          关于我
        </a-menu-item>
      </a-menu>
      <div class="search-content">
        <a-input-search
          v-model:value="searchVal"
          placeholder="请输入你想要的"
          enter-button
          @search="onSearch"
        />
      </div>
    </a-row>
  </a-row>
</template>
<script>
export default {
  props: {
    defaultSelectKey: String
  },
  data () {
    return {
      searchVal: '',
      currentKeys: []
    }
  },
  methods: {
    onSearch: function () {
    },
    select: function (val) {
      this.currentKeys[0] = val.key
      this.$router.push({
        path: `/${this.$route.params.userName}/${this.formatKeyPath(val.keyPath)}`
      })
    },
    formatKeyPath: function (paths) {
      const res = []
      const regs = /^[0-9]*$/
      paths = paths.join('/').split('/')
      paths.forEach(item => {
        if (!regs.test(item)) {
          res.push(item)
        }
      })
      return res.join('/')
    }
  },
  computed: {
    defaultSelectKeys: function () {
      return [this.defaultSelectKey]
    }
  }
}
</script>
<script setup>
// import { reactive, ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
// const $router = useRouter()
// const $route = useRoute()
// const props = defineProps({
//   defaultSelectKey: String
// })
// const searchVal = ref('')
// const onSearch = () => {
// }
// const select = (val) => {
//   currentKeys[0] = val.key
//   switch (val.key) {
//     case 'home':
//       $router.push({
//         path: `/${$route.params.userName}`
//       })
//       break
//     default:
//       $router.push({
//         path: `/${$route.params.userName}/category/detail/${val.key}`
//       })
//       break
//   }
// }
// const currentKeys = reactive([props.defaultSelectKey])
</script>
<style lang="less">
.home-sub-header {
  background-color: #f8f8f8;
  border-color: #e7e7e7;
  width: 100%;
  position: sticky;
  top: 0;
  .nav-header {
    border: 0;
    background-color: rgba(0, 0, 0, 0);
  }
  .search-content {
    padding: 0 20px;
    input {
      border-radius: 5px;
    }
  }
}
</style>
