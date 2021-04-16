<template>
  <div class="main-container">
    <TopSide />
    <Content />
  </div>
</template>
<script>
import TopSide from "./top-side";
import Content from "./content";
export default {
  data() {
    return {};
  },
  computed: {},
  components: {
    TopSide,
    Content,
  },
};
</script>
