<template>
  <div>
    <!-- 扁平化前：{{ originalArr }}
    <el-button @click="flattenOperation(originalArr)">扁平化</el-button>
    扁平化后：{{ flattenArr }} -->
    <div>{{ checkedNames }}</div>
    <!-- <input type="checkbox" v-model="checkedNames" id="1" value="John" /><label
      >John</label
    >
    <input type="checkbox" v-model="checkedNames" id="2" value="Rose" /><label
      >Rose</label
    >
    <input type="checkbox" v-model="checkedNames" id="3" value="LiMing" /><label
      >LiMing</label
    > -->
    <el-checkbox
      :indeterminate="IsIndeterminate"
      label="checkedAll"
      v-model="checkedAll"
      @change="changeMode"
    ></el-checkbox>
    <el-checkbox-group v-model="checkedNames" @change="checkedNamesChange">
      <el-checkbox
        v-for="item in allNames"
        :label="item"
        :key="item"
      ></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "TestCode",
  data() {
    return {
      originalArr: [
        1,
        2,
        3,
        [
          [9, 4, [3, 1]],
          [9, 8, 7],
        ],
        0,
      ],
      flattenArr: [],
      checkedNames: ["John"],
      IsIndeterminate: true,
      checkedAll: false,
      allNames: ["John", "Rose", "LiMing"],
    };
  },
  methods: {
    flattenOperation(arr) {
      // 1.递归

      let resultArr = [];
      arr.map((item) => {
        if (Array.isArray(item)) {
          resultArr = resultArr.concat(this.flattenOperation(item));
        } else {
          resultArr = resultArr.concat(item);
        }
      });
      this.flattenArr = resultArr;
      return this.flattenArr;

      //  2.reduce
      //   return arr.reduce(function (prev, next) {
      //     if (Array.isArray(next)) {
      //       return prev.concat(this.flattenOperation(next));
      //     } else {
      //       return prev.concat(next);
      //     }
      //   }, []);
    },
    changeMode(val) {
      this.checkedNames = val ? this.allNames : [];
      this.IsIndeterminate = false;
    },
    checkedNamesChange(val) {
      let len = val.length;
      if (len === this.allNames.length) {
        this.checkedAll = true;
        this.IsIndeterminate = false;
      } else {
        this.checkedAll = false;
        this.IsIndeterminate = true;
      }
    },
  },
};
</script>

<style>
</style>