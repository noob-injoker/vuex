<template>
  <div>
    <div class="box">
      <div class="search">
        <el-input placeholder="请输入搜索内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" @click="addGoods">添加商品</el-button>
        <ug-table
          :tableData="goodsList"
          :columns="columns"
          :showPagination="false"
          :type="type"
          :border="true"
          :stripe="true"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        >
          <template v-slot:action="scope">
            <el-button type="primary" size="mini" @click="edit(scope.scope)" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="mini" @click="del(scope.scope)" icon="el-icon-delete"></el-button>
          </template>
        </ug-table>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[20, 40, 80, 120]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const GoodsModule = createNamespacedHelpers("goods");
const { mapState: goodsState, mapActions: goodsActions } = GoodsModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
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
          label: "商品名称",
          prop: "goods_name",
          align: "center",
          width: "370",
        },
        {
          label: "商品价格",
          prop: "goods_price",
          align: "center",
          width: "120",
        },
        {
          label: "商品重量",
          prop: "goods_weight",
          align: "center",
          width: "120",
        },
        {
          label: "创建时间",
          prop: "add_time",
          align: "center",
          width: "110",
        },
        {
          label: "下单时间",
          prop: "upd_time",
          align: "center",
          width: "110",
        },
        {
          label: "操作",
          align: "center",
        },
      ],
      formData: [
        {
          label: "角色名",
          // 表单元素的类型
          type: "input",
          // v-model绑定的值
          value: "",
          rule: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            {
              min: 2,
              max: 5,
              message: "长度在 2 到 5 个字符",
              trigger: "blur",
            },
          ],
          prop: "roleName",
          attrs: {
            placeholder: "请输入用户名",
            clearable: true,
          },
        },
        {
          label: "角色描述",
          // 表单元素的类型
          type: "input",
          // v-model绑定的值
          value: "",
          prop: "roleDesc",
        },
      ],
      type: "",
      pagenum: 1,
      pagesize: 20,
    };
  },
  methods: {
    ...goodsActions(["getGoods", "deleteGoods"]),

    // cancel(val) {
    //   this.$message.success("点击了取消");
    //   this.Visible = false;
    //   console.log(val);
    //   val.formRef.resetFields();
    // },
    // ok(val) {
    //   val.formRef.validate((valid) => {
    //     if (valid) {
    //       // this.$message.success("点击了确定");
    //       this.Visible = false;
    //       console.log(val);
    //       val.formRef.resetFields();
    //       if (this.formData[0].value === "") {
    //         this.$store.dispatch("goods/Addgoods", {
    //           goods_name,
    //           goods_cat,
    //           goods_price,
    //           goods_number,
    //           goods_weight,
    //           goods_introduce:'',
    //           pics:'',
    //           attrs:'',
    //           pagenum,
    //           pagesize,
    //           query:'',
    //         });
    //       }
    //       if (this.formData[0].value !== "") {
    //         console.log(this.id);
    //         this.putRoles({
    //           id: this.id,
    //           roleName: val.options.roleName,
    //           roleDesc: val.options.roleDesc,
    //         });
    //       }
    //     } else {
    //       this.$message.error("表单填写有误，请检查");
    //     }
    //   });
    // },
    edit(scope) {
      console.log(scope.row);
    },
    del(scope) {
      console.log(scope.row);
      this.deleteGoods({
        id:scope.row.goods_id,
        pagenum:this.pagenum,
        pagesize:this.pagesize,
        query: "",
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getGoods({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: "",
      });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getGoods({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: "",
      });
    },
    //打开添加商品路由
    addGoods() {
      this.$router.push("/addGoods");
    },
  },
  mounted() {
    this.getGoods({
      query: "",
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...goodsState(["goodsList", "total"]),
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