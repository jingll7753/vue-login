<template>
  <div>
    <!-- <el-input v-model="inputvalue" pleaceholder="please input"></el-input> -->
    <el-row class="button-row">
      <el-button @click="incDialogForm">新增</el-button>
      <el-button @click="ediDialogForm">修改</el-button>
      <el-button @click="this.delDialogFormVisible = true">删除</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="currentPageData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column width="55" type="selection"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="120"> </el-table-column>
      <el-table-column prop="education" label="学历" width="120">
      </el-table-column>
      <el-table-column prop="university" label="毕业院校" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="120"> </el-table-column>
      <el-table-column label="毕业时间" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="hometown" label="籍贯" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div class="tabListPage">
      <el-pagination
        background
        @current-change="getCurrentPageData"
        @prev-click="getPrevPageData"
        @next-click="getNextPageData"
        layout=" total,prev, pager, next, jumper"
        :default-current-page="defaultCurrentPage"
        :page-size="PageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <div class="increase-form">
      <el-dialog title="新增" v-model="incDialogFormVisible">
        <el-form :model="form" label-position="right" :rules="rules">
          <el-form-item
            label="姓名"
            prop="username"
            required
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.username"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="性别"
            prop="sex"
            required
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="学历"
            prop="education"
            required
            :label-width="formLabelWidth"
          >
            <el-select v-model="form.education" placeholder="请选择">
              <el-option
                v-for="item in educationOptions"
                :value="item.value"
                :label="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="毕业院校"
            prop="university"
            required
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.university" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item
            label="毕业时间"
            required
            :label-width="formLabelWidth"
            prop="date"
          >
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item
            label="籍贯"
            prop="hometown"
            required
            :label-width="formLabelWidth"
          >
            <el-cascader
              :options="hometownOptions"
              v-model="form.hometown"
              placeholder="请选择"
              :props="{ expandTrigger: 'hover' }"
            />
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="phone"
            required
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.phone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
            <el-input v-model="form.email" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            prop="remarks"
            :label-width="formLabelWidth"
          >
            <el-input type="textarea" v-model="form.remarks"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="incDialogFormSubmit(form)"
            >确 定</el-button
          >
          <el-button @click="incDialogFormChanel(form)">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="delete-form">
      <el-dialog v-model="delDialogFormVisible" :show-close="false">
        <el-icon><CircleCloseFilled /></el-icon>
        确定要删除该条记录吗？
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="delDialogFormChanel()">取消</el-button>
            <el-button type="primary" @click="delDialogFormSubmit()"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ContentArea",
  components: {},
  data() {
    return {
      props: { searchForm: Object },
      // inputvalue: "",
      // 默认显示第几页
      defaultCurrentPage: 1,
      //当前显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      //总页数
      pageCount: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      //当前页面显示数据
      currentPageData: [],
      // 总数据
      form: {
        username: "",
        sex: "",
        education: "",
        university: "",
        phone: "",
        date: "",
        hometown: "",
      },
      educationOptions: [
        { value: "本科" },
        { value: "硕士研究生" },
        { value: "博士研究生" },
        { value: "其他" },
      ],
      hometownOptions: [],
      tableData: [],
      //被选中的数据
      selectedData: [],
      formLabelWidth: "100px",
      rules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/,
            message: "输入的手机号码格式不正确，请重新输入",
            trigger: "blur",
          },
        ],
        email: [
          {
            pattern: /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9_\\.\\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            message: "请输入正确的邮箱格式",
            trigger: "blur",
          },
        ],
      },

      incDialogFormVisible: false,
      delDialogFormVisible: false,
    };
  },
  mounted() {
    this.loadXs();
  },
  watch: {
    // inputvalue(value) {
    //   let reg = /(\d)(?=(?:\d{3})+$)/g;
    //   this.inputvalue = value.split(",").join("").replace(reg, "$1,");
    //   return this.inputvalue;
    // },
    searchForm() {
      //模糊查找
      this.getCurrentPageData();
      let showResultList = [];
      if (
        this.searchForm.username != undefined &&
        this.searchForm.username != ""
      ) {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].username == this.searchForm.username) {
            showResultList.push(this.tableData[i]);
          }
        }
        this.searchedData = JSON.parse(JSON.stringify(showResultList));
        showResultList.splice(0);
      }
      if (this.searchForm.sex != undefined && this.searchForm.sex != "") {
        for (var j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].sex == this.searchForm.sex) {
            showResultList.push(this.tableData[j]);
          }
        }
        this.searchedData = JSON.parse(JSON.stringify(showResultList));
        showResultList.splice(0);
      }
      if (
        this.searchForm.hometown != undefined &&
        this.searchForm.hometown != ""
      ) {
        for (var k = 0; k < this.tableData.length; k++) {
          if (this.tableData[k].hometown == this.searchForm.hometown) {
            showResultList.push(this.tableData[k]);
          }
        }
        this.searchedData = JSON.parse(JSON.stringify(showResultList));
        showResultList.splice(0);
      }
      if (this.searchForm.phone != undefined && this.searchForm.phone != "") {
        for (var l = 0; l < this.tableData.length; l++) {
          if (this.tableData[l].phone == this.searchForm.phone) {
            showResultList.push(this.tableData[l]);
          }
        }
        this.searchedData = JSON.parse(JSON.stringify(showResultList));
        showResultList.splice(0);
      }
    },
  },
  methods: {
    async loadXs() {
      await axios.all([
        axios
          .get("http://localhost:8080/datainfo/userinfo.json")
          .then((res) => {
            if (res.status === 200) {
              let userinfo = res.data.result;
              this.tableData = userinfo;
              this.totalCount = JSON.parse(JSON.stringify(userinfo)).length;
              this.pageCount = Math.ceil(this.totalCount / this.PageSize);
              this.pageCount = this.pageCount == 0 ? 1 : this.pageCount;
              this.getCurrentPageData();
            }
          }),
        axios.get("http://localhost:8080/datainfo/city.json").then((res) => {
          if (res.status === 200) {
            this.hometownOptions = res.data.results;
          }
        }),
      ]);
    },
    getCurrentPageData(number) {
      if (number) {
        this.currentPage = number;
      }
      let beginIndex = (this.currentPage - 1) * this.PageSize;
      let endIndex = this.currentPage * this.PageSize;
      this.currentPageData = this.tableData.slice(beginIndex, endIndex);
    },
    getPrevPageData() {
      if (this.currentPage == 1) {
        return false;
      } else {
        this.currentPage--;
        this.getCurrentPageData();
      }
    },
    getNextPageData() {
      if (this.currentPage == this.pageCount) {
        return false;
      } else {
        this.currentPage++;
        this.getCurrentPageData();
      }
    },
    //新增数据
    incDialogForm() {
      this.form = {};
      this.incDialogFormVisible = true;
    },
    //编辑数据
    ediDialogForm() {
      this.incDialogFormVisible = true;
      this.form.id = this.selectedData[0].id;
      this.form.username = this.selectedData[0].username;
      this.form.sex = this.selectedData[0].sex;
      this.form.education = this.selectedData[0].education;
      this.form.university = this.selectedData[0].university;
      this.form.phone = this.selectedData[0].phone;
      this.form.date = this.selectedData[0].date;
      this.form.hometownOptions = this.selectedData[0].hometown;
      this.delDialogForm();
    },
    //删除数据
    delDialogForm() {
      let selectLen = this.selectedData.length;
      let allLen = this.tableData.length;
      if (selectLen != 0 && allLen > selectLen) {
        for (let i = 0; i < selectLen; i++) {
          for (let j = 0; j < allLen; j++) {
            if (
              JSON.parse(JSON.stringify(this.selectedData[i])).id ==
              JSON.parse(JSON.stringify(this.tableData[j])).id
            ) {
              this.tableData.splice(j, 1);
              this.getCurrentPageData();
              break;
            }
          }
        }
      }
    },
    incDialogFormSubmit(form) {
      this.incDialogFormVisible = false;
      form.id = this.tableData[this.tableData.length - 1].id + 1;
      form = JSON.parse(JSON.stringify(form));
      this.tableData.unshift(form);
      this.getCurrentPageData();
    },
    incDialogFormChanel(form) {
      this.incDialogFormVisible = false;
      console.log(form);
    },
    delDialogFormSubmit() {
      this.delDialogFormVisible = false;
      this.delDialogForm();
    },
    delDialogFormChanel() {
      this.delDialogFormVisible = false;
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    deleteData() {
      // alert("确定要删除该条记录吗？");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
};
</script>
<style>
.button-row {
  margin: 20px auto 10px 15px;
}
.increase-form {
  padding-right: 30px;
}
.el-dialog__body {
  margin-right: 30px;
}
.dialog-footer {
  margin-left: 60%;
}
</style>