//访问路径
import axios from '../utils/http'
import store from '../store'
export function fetchPermission() {
	return axios.get("/api/permission?user=" + store.state.UserToken)
}
//权限
export function login(user) {
	//跨域
	return axios.get("/api/login?user=" + user)
}