<template>
  <div class="login">
    <LoginForm @doLogin="doLogin"></LoginForm>
  </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
import LoginForm from './LoginForm.vue'
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
// const store = useStore()
const router = useRouter()
const { proxy } = getCurrentInstance()
const doLogin = (values) => {
  proxy.$http
    .get(proxy.$api.user.login, {
      userPhone: values.userPhone,
      userPassword: values.userPassword
    })
    .then((res) => {
      if (proxy.$globalVars.$CurrentEnvIsDev) console.log(res)
      if (res.status) {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        localStorage.setItem('token', JSON.stringify(res.token))
        message.success(res.msg)
        router.push({ path: '/account' })
      } else {
        message.info(res.msg)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  // store.commit('setIsAuthenticated', true)
  // localStorage.setItem('userInfo', JSON.stringify(values))
  // router.push({ path: `/${values.userName}/home` })
}
</script>
<style lang="less">
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .particles {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>
