<template>
  <div>
    <search-area @searchFormData="getSearchFormData"></search-area>
    <!-- <content-area :searchForm="searchForm"></content-area> -->
    <show-picture></show-picture>
  </div>
</template>
<script>
import SearchArea from "./mainform/SearchArea";
// import ContentArea from "./mainform/ContentArea";
import ShowPicture from "./mainform/ShowPicture.vue";
export default {
  name: "MainForm",
  components: {
    SearchArea,
    // ContentArea
    ShowPicture,
  },

  data() {
    return {
      searchForm: {},
    };
  },
  methods: {
    getSearchFormData(form) {
      this.searchForm = form;
    },
  },
};
</script>
