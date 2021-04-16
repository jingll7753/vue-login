/**
 * 方法一 比对路由权限
 * Array userRouter 后台返回的路由权限json
 * Array allRouter 前端配置好的路由权限json
 * Array return realRouter 过滤之后返回条件的路由
 * 方法二 指定返回的默认路由
 */
export function recursionRouter(userRouter = [], allRouter = []) {
	var realRoutes = [];
	allRouter.forEach((v, i) => {
		userRouter.forEach((item, index) => {
			if (item.name === v.meta.name) {
				if (item.children && item.children.length > 0) {
					v.children = recursionRouter(item.children, v.children)
				}
				realRoutes.push(v)
			}
		})
	})
	return realRoutes
}
export function setDefaultRouter(routers) {
	routers.forEach((v, i) => {
		if (v.children && v.children.length > 0) {
			v.redirect = {
				name: v.children[0].name

			}
			setDefaultRouter(v.children)
		}
	})
}