<template>
  <a-row justify="center" class="header">
    <div class="container header-container">
      <div class="section1">
        <span class="title">
          Borg 个人博客
        </span>
        <small class="motto">
          仰天大笑出门去，我辈岂是蓬蒿人。
        </small>
      </div>
      <div class="section2">
        <a-button class="menu-btn" type="link">
          <i class="iconfont blog-menu"></i>
        </a-button>
        <button class="account-btn" type="link">
          <i class="iconfont blog-gerenzhongxin"></i>
        </button>
      </div>
    </div>
  </a-row>
</template>
<script setup>
// import { defineEmits, ref } from 'vue'
// const searchValue = ref('')
// const emit = defineEmits(['doSearch'])
// const onSearch = (value) => {
//   emit('doSearch', value)
// }
</script>
<style lang="less" scoped>
.header{
  width: 100%;
  background-color: #333;
  .title{
    font-size: 25px;
    color: white;
    margin-right: 10px;
  }
  small{
    color: #DFDFDF;
    font-size: 12px;
    opacity: 0.7;
  }
  .header-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    max-width: 1400px;
    .section1{
      display: flex;
      flex-direction: column;
    }
    .section2{
      display: flex;
      align-items: center;
      .menu-btn{
        display: inline-block;
        color: white;
        &:hover{
          color: #1890ff;
        }
        @media (min-width: 768px) {
          display: none;
        }
      }
      .account-btn{
        background-color: transparent;
        border: 0;
        padding: 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        i{
          font-size: 30px;
          color: white;
        }
        &:hover{
          i{
            color: #40a9ff;
          }
        }
        @media (max-width: 767px) {
          display: none;
        }
      }
    }
  }
}
</style>
