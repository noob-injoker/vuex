<template>
  <div class="layout_All">
    <div class="top flex ac jsb">
      <div class="topOne" data-step="1" data-intro="这里是欢迎语!">欢迎来到UG后台管理系统</div>
      <div class="topTwo flex ac jsb">
        <div data-step="5" data-intro="这里是当前北京时间!">{{times}}</div>
        <!-- <div class="flex ac"> -->
        <div class="tianqi" data-step="2" data-intro="这里是天气!">
          <iframe
            scrolling="no"
            src="https://tianqiapi.com/api.php?style=tz&skin=pitaya"
            frameborder="0"
            width="100%"
            height="16"
            allowtransparency="true"
          ></iframe>
        </div>
        <!-- </div> -->
        <div data-step="3" data-intro="这里是您的用户名!">亲爱的,{{user.username}}</div>
        <div class="out" @click="goOut" data-step="4" data-intro="这里是退出!">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      user: {},
      times: "", //格式化之后的当前时间
      currentTime: new Date(), //当前时间
    };
  },
  created() {
    this.getTimes();
  },
  // 在Vue实例销毁前，清除我们的定时器
  beforeDestroy() {
    if (this.times) {
      clearInterval(this.getTimesInterval);
    }
  },
  methods: {
    getTimes() {
      setInterval(this.getTimesInterval, 1000);
    },
    getTimesInterval: function () {
      let _this = this;
      let year = new Date().getFullYear(); //获取当前时间的年份
      let month = new Date().getMonth() + 1; //获取当前时间的月份
      let day = new Date().getDate(); //获取当前时间的天数
      let hours = new Date().getHours(); //获取当前时间的小时
      let minutes = new Date().getMinutes(); //获取当前时间的分数
      let seconds = new Date().getSeconds(); //获取当前时间的秒数
      //当小于 10 的是时候，在前面加 0
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      //拼接格式化当前时间
      _this.times =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    },

    //退出系统
    goOut() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.$message({
        message: "欢迎下次光临",
        type: "success",
      });
    },
  
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.top {
  height: 1290px;
  height: 8vh;
  font-size: 13px;
  padding: 0 20px;
}
.tianqi {
  height: 17px;
  width: 123px;
}
.topOne {
  width: 150px;
}
.topTwo {
  width: 403px;
}
.out {
  color: rgb(64, 158, 255);
}
</style>