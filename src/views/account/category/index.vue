<template>
  <div class="account-categoy">
    <div class="content">
      <div class="category-box" v-for="category in categoryList" :key="category.categoryId">
        <div>{{ category.categoryName }}</div>
        <div >

        </div>
      </div>
      <div class="btn-add">
        <a-button class="" shape="circle">
          <span class="iconfont blog-add"></span>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryList: [
        {
          categoryName: '技术',
          categoryId: '1',
          children: [
            {
              categoryName: 'Vue',
              categoryId: '2',
              categoryParentId: 1
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="less">
  .account-categoy{
    padding-left: 20px;
    flex: 1;
    position: relative;
  }
  .btn-add{
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    button{
      width: 50px;
      height: 50px;
      border-color: #096dd9;
      >span::before{
        color: #096dd9;
      }
    }
  }
</style>
