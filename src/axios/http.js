import axios from 'axios'
import { message } from 'ant-design-vue'
import httpErrorConfig from './httpErrorConfig'
import globalVars from '../globalPrototype'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 3000
})
// 请求拦截
instance.interceptors.request.use(function (config) {
  // config.headers.setContentType('application/x-www-form-urlencoded;charset:utf-8')
  config.headers.setContentType('application/json;charset:utf-8')
  config.headers.token = JSON.parse(localStorage.getItem('token'))
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use(function (response) {
  if (globalVars.$CurrentEnvIsDev) {
    console.log('response:', response)
  }
  if (response.data.status === true) {
    response.data.data = JSON.parse(response.data.data)
    return response.data
  } else {
    return Promise.reject(response.data.msg)
  }
}, function (error) {
  if (error.code === 'ECONNABORTED') {
    message.info(httpErrorConfig.ECONNABORTED)
  }
  return Promise.reject(error)
})
function post (url, params) {
  return instance.post(url, params)
}
function get(url, params) {
  return instance.get(url, {
    params: params
  })
}
export default {
  post: post,
  get: get
}
