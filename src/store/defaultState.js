export default {
	//处理token
	get UserToken() {
		return localStorage.getItem('token')
	},
	set UserToken(value) {
		localStorage.setItem('token', value)
	}
}