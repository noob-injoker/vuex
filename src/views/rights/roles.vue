<template>
  <div>
    <div class="box">
      <el-button type="primary" @click="Addrole" class="btn">添加角色</el-button>
      <ug-form
        :Visible.sync="Visible"
        @cancel="cancel"
        @ok="ok"
        :formData="formData"
        :title="title"
      >
        <template v-slot:msg></template>
      </ug-form>
      <ug-table
        :tableData="rolesList"
        :columns="columns"
        :showPagination="false"
        :type="type"
        :border="true"
        :stripe="true"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @expandChange="expandChange"
        @close="closeTag"
      >
        <template v-slot:state="scope">
          <el-switch
            v-model="scope.scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
        <template v-slot:action="scope">
          <el-button type="primary" size="mini" @click="edit(scope.scope)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.scope)">删除</el-button>
          <el-button type="warning" size="mini" @click="plan(scope.scope)">分配权限</el-button>
        </template>
      </ug-table>

      <el-dialog title="分配权限" :visible.sync="dialogVisible" width="30%" @close="close">
        <!-- <div v-for="item in rolesList" :key="item.id">
        <div v-if="id === item.id">-->
        <el-tree
          ref="tree"
          :data="RightsList"
          show-checkbox
          node-key="id"
          @check="checkOne"
          :default-expanded-keys="[101, 102,103,125,145,104,115,121,107,111,112,110,146]"
          :default-checked-keys="idList"
          :props="defaultProps"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sures">确 定</el-button>
        </span>
        <!-- </div>
        </div>-->
      </el-dialog>
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
      id: 0, //角色的id
      cid: 0, //当前选择的权限id
      idLists: [],
      idList: [],
      idsList: [],
      Visible: false,
      dialogVisible: false,
      title: "添加角色",
      CheckedKeys: "", //选中的权限
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
      tableData: [],
      //表格的配置项
      columns: [
        {
          label: "#",
          prop: "num",
          align: "center",
          width: "50",
        },
        {
          label: "职位",
          prop: "roleName",
          align: "center",
          width: "300",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "300",
        },

        {
          label: "操作",
          align: "center",
          width: "180",
        },
      ],
      type: "expand",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    ...rolesActions([
      "getRoles",
      "deleteroles",
      "getRolesOne",
      "putRoles",
      "getRights",
      "postRights",
      "deleteRights",
    ]),
    close() {
      console.log(this.$refs.tree);
      this.$refs.tree.setCheckedKeys([]);
      this.idList = [];
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
            this.$store.dispatch("roles/Addroles", {
              roleName: val.options.roleName,
              roleDesc: val.options.roleDesc,
            });
          }
          if (this.formData[0].value !== "") {
            console.log(this.id);
            this.putRoles({
              id: this.id,
              roleName: val.options.roleName,
              roleDesc: val.options.roleDesc,
            });
          }
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    Addrole() {
      this.formData[0].value = "";
      this.Visible = true;
      this.title = "添加角色";
    },
    del(scope) {
      console.log(scope.row);
      this.deleteroles(scope.row.id);
    },
    edit(scope) {
      console.log(scope.row);
      this.Visible = true;
      this.title = "编辑角色";
      this.id = scope.row.id;
      let value = scope.row.roleName;
      this.formData[0].value = value;
      console.log(this.formData[0].value);
    },
    plan(scope) {
      let arr = [];
      this.idList = arr;
      this.idLists = arr;
      console.log(scope.row);
      this.dialogVisible = true;
      this.id = scope.row.id;
      // this.idList();
      console.log(this.RightsList);
      scope.row.children.map((item) => {
        if (item.children) {
          item.children.map((item1) => {
            if (item1.children) {
              item1.children.map((item2) => {
                console.log(item2);
                this.RightsList.map((itm) => {
                  if (itm.children) {
                    itm.children.map((itm1) => {
                      if (itm1.children) {
                        itm1.children.map((itm2) => {
                          // console.log(item1.children);
                          let arr = item1.children.filter((tm) => {
                            return tm.id == itm2.id;
                          });
                          // console.log(arr);
                          // console.log(itm2);
                          this.idLists.push(arr[0]);
                          this.idLists = this.idLists.filter(
                            (item, index, arr) => {
                              return arr.indexOf(item) === index;
                            }
                          );
                        });
                      }
                    });
                  }
                });
              });
            }
          });
        }
      });
      console.log(this.idLists);
      // this.idList.splice(0, this.idList.length);
      if (this.idLists.length > 0) {
        this.idLists.map((item) => {
          if (item !== undefined) {
            this.idList.push(item.id);
          }
        });
      }
      if (this.idLists.length === 0) {
        this.idList = [];
      }
      console.log(this.idList);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sures() {
      this.dialogVisible = false;
      this.postRights({ roleId: this.id, rids: this.CheckedKeys });
    },
    checkOne(e) {
      console.log(e);
      // console.log(this.$refs.tree.getCheckedKeys());
      console.log(this.$refs.tree.getHalfCheckedKeys());
      let arr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      this.CheckedKeys = arr.join(",");
      console.log(this.CheckedKeys);
    },
    expandChange(e) {
      console.log(e);
      this.id = e.id;
    },
    closeTag(e) {
      console.log(e);
      this.cid = e.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRights({roleId:this.id,rightId:this.cid})
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getRoles();
    this.getRights("tree");
    console.log(this.tableData);
  },
  watch: {},
  computed: {
    ...rolesState(["rolesList", "RolesOne", "RightsList"]),
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