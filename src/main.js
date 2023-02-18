import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/app.less'
import '@surely-vue/table/dist/index.less'

// import GlobalPrototype from './globalPrototype'
import Axios from './axios/http'
import Api from './axios/api'
import baseConfig from './globalPrototype'

import VueParticles from 'vue-particles'
import {
  Button,
  Drawer,
  Menu,
  Dropdown,
  Form,
  Input,
  Checkbox,
  Collapse,
  Timeline,
  BackTop,
  Row,
  Col
} from 'ant-design-vue'
import STable from '@surely-vue/table'

const app = createApp(App)
app.config.globalProperties.$baseConfig = baseConfig
app.config.globalProperties.$http = Axios
app.config.globalProperties.$api = Api

app.use(store)
app.use(STable)
app.use(Button)
app.use(Drawer)
app.use(Menu)
app.use(Dropdown)
app.use(Form)
app.use(Input)
app.use(Checkbox)
app.use(Collapse)
app.use(Timeline)
app.use(BackTop)
app.use(Row)
app.use(Col)
app.use(VueParticles)

app.use(router)
app.mount('#app')
