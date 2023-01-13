<template>
  <div class="login-content">
    <h4>用户登录</h4>
    <a-form class="login-form" :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
      autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="账号" name="userPhone" :rules="[{ required: true, message: '请输入你的手机号' }]">
        <a-input v-model:value="formState.userPhone" />
      </a-form-item>

      <a-form-item label="密码" name="userPassword" :rules="[{ required: true, message: '请输入你的密码' }]">
        <a-input-password v-model:value="formState.userPassword" />
      </a-form-item>

      <a-form-item class="checkbox-remember" name="remember"
        :wrapper-col="{ xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } }">
        <a-checkbox v-model:checked="formState.remember">记住我！</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ xs: { span: 16, offset: 8 }, sm: { span: 8, offset: 12 } }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
</script>
<script setup>
import { reactive, defineEmits } from 'vue'

const emit = defineEmits(['doLogin'])

const formState = reactive({
  userPhone: '18428369049',
  userPassword: '123456',
  remember: true
})

// 点击登录
const onFinish = values => {
  emit('doLogin', { ...values })
}
// 登录失败
const onFinishFailed = errorInfo => { }
</script>

<style lang="less">
.login-content {
  position: relative;
  z-index: 2;
  color: red;
  width: 100%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;

  h4 {
    font-size: 20px;
    color: white;
    margin-bottom: 40px;
  }

  .login-form {
    width: 100%;
    max-width: 400px;

    .ant-form-item-required {
      color: white;
    }

    .ant-checkbox-wrapper {
      color: white;
    }
  }
}
</style>
