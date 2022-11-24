<template>
  <div id="app">
    <!-- <iframe-pdf></iframe-pdf> -->
    <!-- <title-bar />
    <main-form /> -->
    <test-code></test-code>
  </div>
</template>
<script>
// import IframePdf from "./components/IframePdf.vue";
// import MainForm from "./components/MainForm.vue";
import TestCode from "./components/TestCode.vue";
// import TitleBar from "./components/TitleBar.vue";
export default {
  // components: { TitleBar, MainForm,IframePdf },
  name: "App",
  components: { TestCode },
};
</script>

<style>
</style>
