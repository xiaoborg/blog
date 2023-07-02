import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/app.less'

// import '@surely-vue/table/dist/index.less'

// import GlobalPrototype from './globalPrototype'
import Axios from './axios/http'
import Api from './axios/api'
import globalVars from './globalPrototype'
import VueParticles from 'vue-particles'
import commonFunc from './units/funcs'
import moment from 'moment'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

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
  Col,
  Table,
  Popconfirm,
  Modal,
  TreeSelect,
  Spin,
  Select
} from 'ant-design-vue'
// import STable from '@surely-vue/table'

VueMarkdownEditor.use(vuepressTheme, { Prism })

const app = createApp(App)
app.config.globalProperties.$globalVars = globalVars
app.config.globalProperties.$http = Axios
app.config.globalProperties.$api = Api
app.config.globalProperties.$commonFunc = commonFunc
app.config.globalProperties.$moment = moment

app.use(store)
// app.use(STable)
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
app.use(Table)
app.use(Popconfirm)
app.use(Modal)
app.use(TreeSelect)
app.use(Spin)
app.use(Select)
app.use(VueParticles)
app.use(VueMarkdownEditor)

app.use(router)
app.mount('#app')
