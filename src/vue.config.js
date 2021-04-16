//跨域处理
module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3300',
				//允许跨域
				changeOrigin: true,
				//重写地址
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}