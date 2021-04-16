import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login'
import Home from '../pages/home'
import NotFound from '../pages/error/404'
import Layout from '../pages/layout'
Vue.use(VueRouter)

//初始化路由
const routes = [
  // {
  //   path: '',
  //   redirect: 'login'
  // },
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login,
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]
/**
 * 根据用户的权限不同所能看到的页面和可操作性也不同
 * admin -- 所有页面都可看到
 * user -- 只能看到属于user权限部分的页面
 * 
 * addRouter()后期一个一个添加
 */
//准备动态加载的路由
export const DynamicRoutes = [
  {
    path: '',
    component: Layout,
    name: 'container',
    redirect: 'home',
    meta: {
      //是否需要登录注册之后才能进入
      requiresAuth: true,
      name: '首页',

    },
    children: [
      {
        path: 'home',
        component: Home,
        name: 'home',
        meta: {
          //匹配规则
          name: '首页',
          //图标
          icon: 'icon-name'
        }
      }
    ]
  },
  {
    //404
    path: '*',
    component: NotFound,

  }
]


const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
