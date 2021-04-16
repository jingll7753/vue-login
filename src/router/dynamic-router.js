//所有页面的路由
const Goods = () => import('../pages/goods-manage')
// const GoodsList=()=>import ('../pages/goods-manage/goods-list')
// const GoodsClassify = () => import('../pages/goods-manage/goods-classify')
// 需要权限判断的路由
const dynamicRoutes = [
	{
		path: '/goods',
		component: Goods,
		name: 'goods',
		meta: {
			name: '产品管理',
			icon: 'icon-order-manage'
		},
		children: [
			{
				path: 'list',
				name: 'goods-list',
				component: GoodsList,
				meta: {
					name: '产品列表',
					icon: 'icon-home'
				}
			},
			{
				path: 'classify',
				name: 'goods-classify',
				component: GoodsClassify,
				meta: {
					name: '产品分类',
					icon: 'icon-product-manage'
				}
			}
		]

	}
]
export default dynamicRoutes