import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/app.less'

// import GlobalPrototype from './globalPrototype'
import Axios from './axios/http'

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

const app = createApp(App)

app.config.globalProperties.$http = Axios

app.use(store)

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
