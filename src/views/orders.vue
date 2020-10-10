<template>
  <div>
    <div class="box">
      <div class="search">
        <el-input placeholder="请输入搜索内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <ug-table
          :tableData="ordersList"
          :columns="columns"
          :showPagination="false"
          :type="type"
          :border="true"
          :stripe="true"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        >
          <template v-slot:state="scope">
            <el-tag v-if="scope.scope.row.order_pay === '0'" type="danger">已付款</el-tag>
            <el-tag v-else type="warning">未付款</el-tag>
          </template>
          <template v-slot:action="scope">
            <el-button type="primary" size="mini" @click="edit(scope.scope)" icon="el-icon-edit"></el-button>
            <el-button type="success" size="mini" @click="car(scope.scope)" icon="el-icon-truck"></el-button>
          </template>
        </ug-table>
      </div>
    </div>

    <el-dialog title="编辑地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth">
          <el-cascader
            :options="cityOptions"
            :value="city"
            @change="changeProvince"
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureCity">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="物流信息" :visible.sync="dialogVisible" width="30%">
      <el-steps direction="vertical" :active="1">
        <el-step :title="item.context" v-for="item in kuaidi" :key="item.time" :description="item.time"></el-step>
        <!-- <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step> -->
      </el-steps>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const ordersModule = createNamespacedHelpers("orders");
const { mapState: ordersState, mapActions: ordersActions } = ordersModule;
import cityOptions from "@/js/city_data2017_element.js";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      cityOptions: cityOptions,
      city: "",
      input3: "",
      //表格的配置项
      columns: [
        {
          label: "#",
          prop: "num",
          align: "center",
          width: "50",
        },
        {
          label: "订单编号",
          prop: "order_number",
          align: "center",
          width: "180",
        },
        {
          label: "订单价格",
          prop: "order_price",
          align: "center",
          width: "120",
        },
        {
          label: "是否付款",
          prop: "order_pay",
          align: "center",
          slots: "state",
          width: "120",
        },
        {
          label: "是否发货",
          prop: "is_send",
          align: "center",
          width: "100",
        },
        {
          label: "下单时间",
          prop: "create_time",
          align: "center",
          width: "180",
        },
        {
          label: "操作",
          align: "center",
        },
      ],
      type: "",
      pagenum: 1,
      form: {},
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "180px",
    };
  },
  methods: {
    ...ordersActions(["getOrders", "getKuaidi"]),

    edit(scope) {
      console.log(scope.row);
      this.dialogFormVisible = true;
    },
    car(scope) {
      console.log(scope.row);
      this.dialogVisible = true;
      this.getKuaidi({ id: 804909574412544600 });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeProvince(e) {
      console.log(e);
    },
    sureCity() {
      this.dialogFormVisible = false;
      this.city = "";
    },
  },
  mounted() {
    this.getOrders({
      query: "",
      pagenum: this.pagenum,
      pagesize: "20",
      user_id: "",
      pay_status: "",
      is_send: "",
      order_fapiao_title: "",
      order_fapiao_company: "",
      order_fapiao_content: "",
      consignee_addr: "",
    });
  },
  watch: {},
  computed: {
    ...ordersState(["ordersList", "kuaidi"]),
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
.input-with-select {
  width: 300px;
  margin-right: 20px;
  margin-bottom: 15px;
}
</style>