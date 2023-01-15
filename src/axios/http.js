import axios from 'axios'
import { message } from 'ant-design-vue'
import httpErrorConfig from './httpErrorConfig'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 3000
})
// 请求拦截
instance.interceptors.request.use(function (config) {
  console.log('请求拦截')
  // config.headers.setContentType('application/x-www-form-urlencoded;charset:utf-8')
  config.headers.setContentType('application/json;charset:utf-8')
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  console.log('响应拦截')
  return response.data
}, function (error) {
  if (error.code === 'ECONNABORTED') {
    message.info(httpErrorConfig.ECONNABORTED)
  }
  return Promise.reject(error)
})
function post (url, params) {
  return instance.post(url, params)
}
function get (url, params) {
  return instance.get(url, {
    params: params
  })
}
export default {
  post: post,
  get: get
}
