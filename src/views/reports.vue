<template>
  <div class="box">
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 900px;height:400px;"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const sortModule = createNamespacedHelpers("sort");
const { mapState: sortState, mapActions: sortActions } = sortModule;
import echarts from "echarts";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    ...sortActions(["getReports"]),
  },
  mounted() {
    this.getReports();
  },
  watch: {
    Reports() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: this.Reports.legend.data,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.Reports.xAxis[0].data,
          },
        ],
        yAxis: [
          {
            type: this.Reports.yAxis[0].type,
          },
        ],
        series: this.Reports.series
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      
    },
  },
  computed: {
    // ...sortState(["legend", "yAxis", "xAxis"]),
    ...sortState(["Reports"]),
  },
};
</script>

<style scoped lang='scss'>
.box {
  width: 1020px;
  height: 480px;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  box-shadow: 0 0px 5px 2px rgb(226, 226, 226);
  margin: 10px 0 0 10px;
  padding: 10px;
  overflow: auto;
}
</style>