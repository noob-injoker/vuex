<template>
  <!-- 子组件 -->
  <div>
    <el-table
      :data="tableData"
      v-loading="!tableData.length"
      :row-key="rowKey"
      :border="border"
      :stripe="stripe"
      @expand-change="expandChange"
    >
      <el-table-column :type="type" v-if="type !==''">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label>
              <div v-if="props.row.children.length > 0">
                <div v-for="item in props.row.children" :key="item.id" class="one flex ac">
                  <el-tag closable class="tag1" @close="closeTag(item)">{{item.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                  <div v-if="item.children">
                    <div v-for="item1 in item.children" :key="item1.id" class="two flex ac">
                      <el-tag closable type="success" class="tag2" @close="closeTag(item1)">{{item1.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                      <div v-if="item1.children" class="sanBox flex fwrap">
                        <div v-for="item2 in item1.children" :key="item2.id" class="san">
                          <el-tag closable type="warning" @close="closeTag(item2)">{{item2.authName}}</el-tag>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>暂无权限</div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <template v-for="(item,index) in columns">
        <el-table-column
          v-if="item.prop"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
          :tatol="tatol"
          :key="index"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot v-if="item.slots" :name="item.slots" :scope="scope"></slot>
            <template v-else>{{scope.row[item.prop]}}</template>
          </template>
        </el-table-column>
        <el-table-column v-else :label="item.label" :align="item.align" :key="index">
          <template slot-scope="scope">
            <slot name="action" :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showPagination" class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "",
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    tatol: {
      type: [String, Number],
      default: 0,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    type: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    expandChange(e){
      // console.log(e);
       this.$emit("expandChange", e);
    },
    closeTag(e){
      // console.log(e);
      this.$emit("close", e);
    }
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.pagination {
  width: 100%;
  display: flex;
  margin-top: 26px;
  position: relative;
  right: 50px;
  justify-content: flex-end;
}
// .tag1 {
// }
// .tag2 {
//   margin-right: 100px;
// }
.two {
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e2e2;
  padding: 20px 0;
}
.one {
  border-bottom: 1px solid #e2e2e2;
  padding: 20px 0;
}
.sanBox {
  width: 500px;
}
.san {
  margin-right: 20px;
  margin-bottom: 10px;
}
.el-icon-caret-right {
  margin-right: 100px;
}
</style>