const express = require("express")
const app = express()
//获取数据 写死
const userLogin = require('./data/user_login.json')
const adminLogin = require('./data/admin_login.json')

const adminPermission = require('./data/admin_permission.json')
const userPermission = require('./data/user_permission.json')
const url = require("url")

//根据用户参数不同，返回数据
app.get("/login", (req, res) => {
	const user = url.parse(req.url, true).query.user;
	//用户不同 拿到的数据不同
	if (user === 'admin') {
		res.send(adminLogin)
	} else {
		res.send(userLogin)
	}

})

app.get("/permission", (req, res) => {
	const user = url.parse(req.url, true).query.user;
	//用户不同 拿到的数据不同
	if (user === 'admin') {
		res.send(adminPermission)
	} else {
		res.send(userPermission)
	}
})

//服务器
app.listen(3300, () => {
	console.log('服务器运行在3300上')
})