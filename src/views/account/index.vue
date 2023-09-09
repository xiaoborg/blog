<template>
  <div class="account">
    <Header class="header container"></Header>
    <div class="container container-content">
      <Sider></Sider>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import Header from './header.vue'
import Sider from './sider.vue'
</script>
<style lang="less">
.account {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  background-repeat: repeat;
  padding: 16px;
  position: relative;
  overflow: hidden;
}
.container-content {
  display: flex;
  height: 100%;
}
</style>
