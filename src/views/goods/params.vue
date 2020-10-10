<template>
  <div class="box">
    <el-alert title type="warning" icon="el-icon-warning" :closable="false">
      <div class="flex ac">
        <i class="el-icon-warning"></i>
        <div>注意:只允许为第三级分类设置相关参数!</div>
      </div>
    </el-alert>
    <div class="choice flex ac">
      <div class="name">选择商品分类:</div>
      <el-cascader v-model="value" :options="sortLists" @change="handleChange"></el-cascader>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" size="small" disabled v-if="id===''">添加参数</el-button>
        <el-button type="primary" size="small" @click="addAttributes" v-else>添加参数</el-button>
        <el-table :data="attributes" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item>
                  <!-- 标签 -->
                  <el-tag
                    closable
                    :disable-transitions="false"
                    @close="handleClose(props)"
                    v-for="item in props.row.attr_vals"
                    :key="item"
                  >{{item}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="#" prop="num" align="center"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="静态属性" name="second">
        <el-button type="primary" size="small" disabled v-if="id===''">添加属性</el-button>
        <el-button type="primary" size="small" @click="addAttributes" v-else>添加属性</el-button>
        <el-table :data="attributes" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item>
                  <!-- 标签 -->
                  <el-tag
                    closable
                    :disable-transitions="false"
                    @close="handleClose(props)"
                     v-for="item in props.row.attr_vals"
                    :key="item"
                  >{{item}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible === true"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="#" prop="num" align="center"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <ug-form
      :Visible.sync="Visible"
      @cancel="cancel"
      @ok="ok"
      :formData="formData"
      @input="input"
      :title="title"
    ></ug-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const AttributesModule = createNamespacedHelpers("attributes");
const {
  mapState: AttributesState,
  mapActions: AttributesActions,
} = AttributesModule;
const sortModule = createNamespacedHelpers("sort");
const { mapState: sortState, mapActions: sortActions } = sortModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      value: "",
      val: "",
      activeName: "first",
      Visible: false,
      attr_vals: "a,b,c",
      id: "", //被选后的分类id
      attrId: "", //被选后的分类属性id
      sel: "many", //默认为动态参数
      dynamicTags: ["标签一啊啊啊啊啊啊啊啊啊啊啊", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      formData: [
        {
          label: "动态参数",
          // 表单元素的类型
          type: "input",
          // v-model绑定的值
          value: "",
          rule: [
            { required: true, message: "参数名不能为空", trigger: "blur" },
          ],
          prop: "username",
          attrs: {
            placeholder: "请输入",
            clearable: true,
          },
        },
      ],
      title: "",
    };
  },
  methods: {
    ...AttributesActions([
      "getAttributes",
      "Addattributes",
      "putAttributes",
      "deleteAttributes",
    ]),
    ...sortActions(["getCategories"]),

    handleClick(tab) {
      console.log(tab);
      if (tab.index === "0") {
        this.sel = "many";
        if (this.id !== "") {
          this.getAttributes({ id: this.id, sel: this.sel });
        }
      }
      if (tab.index === "1") {
        this.sel = "only";
        if (this.id !== "") {
          this.getAttributes({ id: this.id, sel: this.sel });
        }
      }
    },
    handleChange(e) {
      console.log(e);
      e.map((item, index) => {
        if (index === 2) {
          this.id = item;
        }
      });
      // console.log(this.id);
      this.getAttributes({ id: this.id, sel: this.sel });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.Visible = true;
      this.attrId = row.attr_id;
      if (this.sel === "many") {
        this.title = "编辑动态属性";
      }
      if (this.sel === "only") {
        this.title = "编辑静态属性";
      }
      let value = row.attr_name;
      this.formData[0].value = value;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteAttributes({
        id: this.id,
        attrid: row.attr_id,
        sel: this.sel,
      });
    },
    handleClose(props) {
      console.log(props);
      this.dynamicTags.splice(this.dynamicTags.indexOf(props), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    addAttributes() {
      this.formData[0].value = "";
      this.Visible = true;
      if (this.sel === "many") {
        this.title = "添加动态参数";
      }
      if (this.sel === "only") {
        this.title = "添加静态属性";
        this.formData[0].label = "静态属性";
        this.attr_vals = "";
      }
    },
    cancel(val) {
      // this.$message.success("点击了取消");
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
          if (this.attrId === "") {
            this.Addattributes({
              id: this.id,
              attr_name: this.val,
              attr_sel: this.sel,
              attr_vals: this.attr_vals,
              sel: this.sel,
            });
          }
          if (this.attrId !== "") {
            this.putAttributes({
              id: this.id,
              attrId: this.attrId,
              attr_name: this.val,
              attr_sel: this.sel,
              attr_vals: this.attr_vals,
              sel: this.sel,
            });
          }
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    input(val) {
      console.log(val);
      this.val = val;
    },
  },
  mounted() {
    this.getCategories({
      type: "",
      pagenum: "",
      pagesize: "",
    });
  },
  watch: {},
  computed: {
    ...AttributesState(["attributes"]),
    ...sortState(["sortLists"]),
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
.el-icon-warning {
  margin-right: 10px;
}
.choice {
  margin-top: 20px;
  margin-bottom: 20px;
}
.name {
  margin-right: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>