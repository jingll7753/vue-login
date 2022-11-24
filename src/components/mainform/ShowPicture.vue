<template>
  <div>
    <div class="box">
      <carousel-3d
        :autoplay="true"
        :autoplayTimeout="3000"
        :perspective="35"
        :display="5"
        :animationSpeed="1000"
        :width="300"
        :height="270"
        controlsVisible
        :controlsHeight="60"
      >
        <slide v-for="(item, i) in slides" :index="i" :key="i">
          <template>
            <img :src="item.src" />
          </template>
        </slide>
      </carousel-3d>
    </div>
  </div>
</template>
 
<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
/* eslint-disable */
export default {
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      slides: [
        {
          title: "parent",
          slide: 23424234234234,
          src:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        },
        {
          title: "parent",
          slide: 23424234234234,
          src:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
        {
          title: "parent",
          slide: 23424234234234,
          src:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        },
      ],
    };
  },
  methods: {
    imgClick(data, obj) {
      console.log(data, obj);
    },
  },
};
</script>
 
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>