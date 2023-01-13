<template>
  <Header></Header>
  <Nav :defaultSelectKey="category"></Nav>
</template>
<script setup>
import Header from './Header.vue'
import Nav from './Nav.vue'
</script>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    category: function () {
      return this.$store.getters.getRouteStatus.category
    }
  }
}
</script>
<style lang="less">
</style>
