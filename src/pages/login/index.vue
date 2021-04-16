<template>
  <div class="clearfix" id="login_wrap">
    <h2 class="title">登录页面</h2>
    <div id="login">
      <div class="login--account">
        <span>账号：</span>
        <input
          type="text"
          placeholder="请输入账号"
          name="account"
          v-model.trim="account"
        />
      </div>
      <div class="login--password">
        <span>密码：</span>
        <input
          type="password"
          placeholder="请输入密码"
          name="password"
          v-model.trim="password"
          @keyup.enter="login"
        />
      </div>
      <p class="login--btn">
        <button id="loginBtn" @click="login">登录</button>
      </p>
    </div>
  </div>
</template>
<script>
import {} from "../../api";

export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    async login() {
      //网络请求
      let data = await login(this.account);
      let token = data.token;
      console.log(token);
      //存储
      //本地 判断下次用户登录需不需要处理
      //vuex
      this.$store.commit("LOGIN_IN", token);
      this.$router.replace("/");
    },
  },
  mounted() {},
};
</script>
<style>
</style>