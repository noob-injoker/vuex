<template>
  <div class="home flex ac jc">
    <div class="fw7">欢迎来到UG后台管理系统</div>
  </div>
</template>

<script>
import introJs from "intro.js";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    guide() {
      introJs()
        .setOptions({
          prevLabel: "上一步",
          nextLabel: "下一步",
          skipLabel: "跳过",
          doneLabel: "结束",
        })
        .oncomplete(function () {
          //点击跳过按钮后执行的事件
        })
        .onexit(function () {
          //点击结束按钮后， 执行的事件
        })
        .start();
    },
  },
  mounted() {
    this.guide();
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.home {
  height: 70vh;
  font-size: 24px;
}
</style>