<template>
  <div class="main-page-container">
    <div class="pdf_container">
      <iframe
        :src="`pdf/web/viewer.html?file=${pdfUrl}`"
        class="pdf-window"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: "IframePdf",
  data() {
    return {
      pdfUrl: "",
    };
  },
};
</script>
<style scoped>
.pdf_container {
  width: 100%;
  height: calc(100% - 90px);
}
</style>