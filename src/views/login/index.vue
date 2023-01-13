<template>
  <div class="login">
    <vue-particles class="particles" color="#ffffff" :particleOpacity="0.7" linesColor="#ffffff" :particlesNumber="80"
      shapeType="circle" :particleSize="5" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
      :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <LoginForm @doLogin="doLogin"></LoginForm>
  </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
import LoginForm from './LoginForm.vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// const store = useStore()
// const router = useRouter()

const { proxy } = getCurrentInstance()
const doLogin = (values) => {
  console.log(values)
  console.log(proxy.$http)
  proxy.$http.get('http://localhost:8080/api/v1/user/login', {
    userPhone: values.userPhone,
    userPassword: values.userPassword
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
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
  background-color: black;
  position: relative;
  overflow: hidden;
  background-image: url('../../assets/images/login-bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
