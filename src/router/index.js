import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/home'
import LoginView from '../views/login'
import CategoryView from '../views/category'
import DetailView from '../views/category/detail'
import Account from '../views/account'
import AccountHome from '../views/account/home'
import AccountArticleList from '../views/account/article/list'
import AccountArticlePublish from '../views/account/article/publish'
import AccountCategory from '../views/account/category'
import AccountLabel from '../views/account/label'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:userName/category',
    name: 'category',
    component: CategoryView,
    children: [
      {
        path: '/:userName/category/:category',
        name: 'detail',
        component: DetailView
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    children: [
      {
        path: '/account',
        redirect: { name: 'accountHome' }
      },
      {
        name: 'accountHome',
        path: 'home',
        component: AccountHome
      },
      {
        name: 'accountArticleList',
        path: 'article/list',
        component: AccountArticleList
      },

      {
        name: 'accountCategory',
        path: 'category',
        component: AccountCategory
      },
      {
        name: 'accountLabel',
        path: 'label',
        component: AccountLabel
      }
    ]
  },
  {
    name: 'accountArticlePublish',
    path: '/article/publish/:blogId?',
    component: AccountArticlePublish
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  let userInfo = null
  if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }
  if (to.name !== 'login' && userInfo === null) {
    store.commit('setRouteStatus', {
      userName: '',
      routeName: 'login',
      category: ''
    })
    next({ name: 'login' })
  } else {
    store.commit('setRouteStatus', {
      userName: to.params.userName,
      routeName: to.name,
      category: to.params.category || ''
    })
    next()
  }
})

export default router
