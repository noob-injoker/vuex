<template>
  <div>
    <layoutTop></layoutTop>
    <div class="flex">
      <layoutSider></layoutSider>
      <div class="box">
        <div class="history flex ac">
          <div
            class="one flex ac"
            v-for="(item,index) in authList"
            :key="index"
            @click="enter(item,index)"
            :class="{'blue':fleg===index}"
          >
            <img src="../../image/yuan.png" alt class="yuan" v-if="fleg === index" />
            <div>{{item.authName}}</div>
            <img
              src="../../image/cha.png"
              alt
              class="cha"
              v-if="fleg === index"
              @click="del(item,index)"
            />
          </div>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import layoutTop from "../../components/Layout/layoutTop";
import layoutSider from "../../components/Layout/layoutSider";
export default {
  name: "",
  props: {},
  components: {
    layoutTop,
    layoutSider,
  },
  data() {
    return {
      authList: [], //点击过的侧边导航
      user: {}, //用户信息
      fleg: 0, //当前选中的导航
    };
  },
  methods: {
    enter(item, index) {
      // console.log(item, index);
      this.fleg = index;
      this.$router.push(`/${item.path}`);
    },
    del(item, index) {
      // console.log(item,index);
      this.authList.splice(index, 1);
      localStorage.setItem(
        `${this.user.username}Nav`,
        JSON.stringify(this.authList)
      );
      if (index < this.authList.length - 1) {
        this.fleg = index + 1;
      }
      if (index === this.authList.length - 1) {
        this.fleg = index - 1;
      }
    },
    getList(){
      if (localStorage.getItem(`${this.user.username}Nav`)) {
      this.authList = JSON.parse(
        localStorage.getItem(`${this.user.username}Nav`)
      );
    }
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getList()
  },
  watch: {
    // 深度监听路由跳转
    "$route.path": {
      handler() {
        this.getList()
        // this.currentPath = val; /al是路由跳转的path
      },
      immediate: true, //立即执行 监听
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  border-top: 1px solid #c9c9c9;
}
.history {
  border-bottom: 1px solid #c9c9c9;
  width: 1050px;
  margin-left: 10px;
  height: 40px;
}
.one {
  height: 18px;
  font-size: 12px;
  padding: 0 10px;
  border: 1px solid #c9c9c9;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
}
.blue {
  background: rgb(64, 158, 255);
  color: #fff;
}
.yuan {
  width: 8px;
  height: 8px;
  margin-right: 4px;
}
.cha {
  width: 12px;
  height: 12px;
  margin-left: 3px;
}
</style>