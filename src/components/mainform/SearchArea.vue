<template>
  <div class="main-form">
    <el-form :inline="true" :model="formContent" class="form-content">
      <el-form-item label="姓名:" class="form-content-username">
        <el-input
          v-model="formContent.username"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别:" class="form-content-sex">
        <el-select v-model="formContent.sex" placeholder="请输入">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="famale"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="籍贯:" class="form-content-hometown">
        <el-cascader
          :options="hometownOptions"
          v-model="formContent.hometown"
          :show-all-levels="false"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="手机:" class="form-content-phone">
        <el-input v-model="formContent.phone" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SearchArea",
  data() {
    return {
      hometownOptions: [],
      formContent: {
        username: "",
        sex: "",
        hometown: "",
        phone: "",
      },
      numberValidateForm: {
        age: "",
      },
    };
  },
  mounted() {
    this.loadCity();
  },
  methods: {
    async loadCity() {
      await axios
        .get("http://localhost:8080/datainfo/city.json")
        .then((res) => {
          if (res.status === 200) {
            this.hometownOptions = res.data.results;
          }
        });
    },
    searchForm() {
      if (this.formContent) {
        this.$emit("searchFormData", this.formContent);
      }
    },
    resetForm() {
      this.formContent.username = "";
      this.formContent.sex = "";
      this.formContent.hometown = "";
      this.formContent.phone = "";
      this.searchForm();
    },
  },
};
</script>
<style>
.form-content {
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
}
.form-content-username,
.form-content-sex,
.form-content-hometown,
.form-content-phone {
  /* width: 40%; */
  display: inline;
}
.el-input__wrapper {
  width: 100%;
}
</style>