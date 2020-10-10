<template>
  <div>
    <div class="box">
      <ug-table
        :tableData="RightsList"
        :columns="columns"
        :showPagination="false"
        :type="type"
        :border="true"
        :stripe="true"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template v-slot:state="scope">
          <el-switch
            v-model="scope.scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
        <template v-slot:action="scope">
          <el-tag v-if="scope.scope.row.level ==='0'">一级</el-tag>
          <el-tag type="success" v-if="scope.scope.row.level ==='1'">二级</el-tag>
          <el-tag type="warning" v-if="scope.scope.row.level ==='2'">三级</el-tag>
        </template>
      </ug-table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const rolesModule = createNamespacedHelpers("roles");
const { mapState: rolesState, mapActions: rolesActions } = rolesModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      //表格的配置项
      columns: [
        {
          label: "#",
          prop: "num",
          align: "center",
          width: "80",
        },
        {
          label: "权限名称",
          prop: "authName",
          align: "center",
          width: "480",
        },
        {
          label: "权限等级",
          align: "center",
          width: "180",
        },
      ],
      type: "",
      types: "list",
    };
  },
  methods: {
    ...rolesActions(["getRights"]),

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {
    this.getRights(this.types);
  },
  watch: {},
  computed: {
    ...rolesState(["RightsList"]),
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