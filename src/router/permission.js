import router from "./index"
import store from '../store/index'

router.beforeEach((to, from, next) => {
	// to and from are both route objects. must call `next`.
	if (!store.state.UserToken) {
		//用户未登录
		//页面是否需要登录
		if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		//用户已经登录
		//处理路由的访问权限 当前页面是否出现对应用户权限的页面
		// 路由权限业务==》定义好全部的路由地址；通过用户不同向后台请求不同的用户权限数据；对用户权限作对比：请求数据==全部的路由 取出来作为路由配置
		next()
	}
})