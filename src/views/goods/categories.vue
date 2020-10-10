<template>
  <div class="sort_All">
    <div class="box">
      <el-button type="primary" class="btn" @click="toVisible">添加分类</el-button>
      <ug-form
        :Visible.sync="Visible"
        :options="sortLists"
        @cancel="cancel"
        @ok="ok"
        @input="input"
        :formData="formData"
        :disabled="disabled"
        :title="title"
        @handleChange="handleChange"
      ></ug-form>
      <ug-table
        :tableData="sortList"
        :columns="columns"
        :showPagination="false"
        :type="type"
        :border="true"
        :rowKey="cat_id"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template v-slot:state="scope">
          <i
            class="el-icon-success"
            v-if="scope.scope.row.cat_deleted === false"
            style="color:rgb(135,206,235)"
          ></i>
          <i class="el-icon-error" v-if="scope.scope.row.cat_deleted !== false"></i>
        </template>

        <template v-slot:action="scope">
          <el-tag v-if="scope.scope.row.cat_level ===0">一级</el-tag>
          <el-tag type="success" v-if="scope.scope.row.cat_level ===1">二级</el-tag>
          <el-tag type="warning" v-if="scope.scope.row.cat_level ===2">三级</el-tag>
        </template>
        <template v-slot:edit="scope">
          <el-button type="primary" size="mini" @click="edit(scope.scope)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.scope)" icon="el-icon-delete">删除</el-button>
        </template>
      </ug-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const sortModule = createNamespacedHelpers("sort");
const { mapState: sortState, mapActions: sortActions } = sortModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "cat_name",
      },
      //表格的配置项
      columns: [
        {
          label: "#",
          prop: "num",
          align: "center",
          width: "80",
        },
        {
          label: "分类名称",
          prop: "cat_name",
          align: "center",
          // slots: "goodsName",
          width: "180",
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          align: "center",
          slots: "state",
          width: "180",
        },
        {
          label: "排序",
          align: "center",
          width: "80",
        },
        {
          label: "操作",
          prop: "cat_deleted",
          align: "center",
          slots: "edit",
          width: "280",
        },
      ],
      type: "",
      types: [1, 2, 3],
      title: "",
      pagenum: 1,
      pagesize: 5,
      num: 1,
      Visible: false,
      disabled: true,
      cat_id: "cat_id",
      id: "",
      value: "",
      formData: [
        {
          label: "分类名称",
          // 表单元素的类型
          type: "input",
          // v-model绑定的值
          value: "",
          rule: [{ required: true, message: "请输入名称", trigger: "blur" }],
          prop: "cat_name",
          attrs: {
            placeholder: "请输入名称",
            clearable: true,
          },
        },
        {
          label: "父级分类",
          // 表单元素的类型
          type: "cascader",
          // v-model绑定的值
          value: "",
          prop: "cat_pid",
          attrs: {
            placeholder: "请选择",
            clearable: true,
          },
        },
      ],
      cat_pid: 0,
      cat_level: 0,
    };
  },
  methods: {
    ...sortActions([
      "getCategories",
      "Addcategories",
      "deleteCategories",
      "putcategories",
    ]),

    toVisible() {
      this.formData[0].value = "";
      this.formData[1].prop = "cat_pid";
      this.formData[1].label = "父级分类";
      this.Visible = true;
      this.title = "添加分类";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getCategories({
        type: this.types,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getCategories({
        type: this.types,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    handleNodeClick(data, scope) {
      console.log(data, scope);
    },
    edit(scope) {
      console.log(scope.row);
      this.id = scope.row.cat_id;
      this.Visible = true;
      this.title = "编辑分类";
      let value = scope.row.cat_name;
      this.formData[0].value = value;
      this.formData[1].prop = "";
      this.formData[1].label = "";
      console.log(this.formData);
    },
    del(scope) {
      console.log(scope.row);
      this.deleteCategories({
        id: scope.row.cat_id,
        type: this.types,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    cancel(val) {
      this.$message.success("点击了取消");
      this.Visible = false;
      console.log(val);
      val.formRef.resetFields();
    },
    ok(val) {
      val.formRef.validate((valid) => {
        if (valid) {
          // this.$message.success("点击了确定");
          this.Visible = false;
          console.log(val);
          val.formRef.resetFields();
          if (this.formData[0].value === "") {
            if (val.options.cat_pid === "") {
              this.cat_pid = "0";
              this.cat_level = "0";
            }
            if (val.options.cat_pid.length > 0) {
              this.cat_pid = val.options.cat_pid[0];
              this.cat_level = "1";
            }
            if (val.options.cat_pid.length > 1) {
              this.cat_pid = val.options.cat_pid[1];
              this.cat_level = "2";
            }
            this.Addcategories({
              cat_pid: this.cat_pid,
              cat_name: val.options.cat_name,
              cat_level: this.cat_level,
              type: this.types,
              pagenum: this.pagenum,
              pagesize: this.pagesize,
            });
            val.options.cat_name = "";
          }
          if (this.formData[0].value !== "") {
            console.log(this.value);
            this.putcategories({
              id: this.id,
              cat_name: this.value,
              type: this.types,
              pagenum: this.pagenum,
              pagesize: this.pagesize,
            });
          }
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    input(val) {
      console.log(val);
      this.value = val;
      if (val !== "") {
        this.disabled = false;
        this.getCategories({
          type:'',
          pagenum: "",
          pagesize: "",
        });
      } else {
        this.disabled = true;
      }
    },
  },
  mounted() {
    this.getCategories({
      type: this.types,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...sortState(["sortList", "total", "arr","sortLists"]),
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
.btn {
  margin-bottom: 15px;
}
</style>