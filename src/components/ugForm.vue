<template>
  <div>
    <el-dialog :title="title" :visible.sync="Visible" width="30%" :before-close="handleClose">
      <slot name="msg"></slot>
      <el-form :model="formOptions" :rules="rules" ref="form">
        <template v-for="(item,index) in formData">
          <el-form-item :label="item.label" :prop="item.prop" :key="index" v-if="!item.children">
            <!-- 动态渲染组件 -->
            <template v-if="item.prop !==''">
              <component
                :is="`el-${item.type}`"
                v-model="formOptions[item.prop]"
                v-bind="item.attrs"
                v-if="item.type ==='cascader'"
                :options="options"
                :props="{ checkStrictly: true }"
                :disabled="disabled"
                @change="handleChange"
              ></component>
              <component
                :is="`el-${item.type}`"
                v-model="formOptions[item.prop]"
                v-bind="item.attrs"
                v-else
                @input="input"
              ></component>
            </template>
          </el-form-item>
          <el-form-item v-else :label="item.label" :key="index">
            <component :is="`el-${item.type}`" v-bind="item.attrs" v-model="formOptions[item.prop]">
              <component
                :is="`el-${child.type}`"
                :label="child.label"
                :value="child.value"
                v-for="(child,idx) in item.children"
                :key="idx"
              ></component>
            </component>
          </el-form-item>
        </template>
      </el-form>
      <slot name="footer" v-if="$slots.footer"></slot>
      <span slot="footer" v-else>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    Visible: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: "这是标题",
    },
    options: {
      type: Array,
      // required: true,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  data() {
    return {
      formOptions: {},
      rules: {},
    };
  },
  methods: {
    setInitvalue() {
      let options = {};
      let rules = {};
      this.formData.map((item) => {
        rules[item.prop] = item.rule;
        options[item.prop] = item.value;
        console.log(item);
      });
      //   只需要拿父组件传过来的初始值
      this.formOptions = JSON.parse(JSON.stringify(options));
      this.rules = JSON.parse(JSON.stringify(rules));
    },
    handleClose() {
      this.$emit("update:Visible", false);
    },
    cancel() {
      let options = JSON.parse(JSON.stringify(this.formOptions));
      this.$emit("cancel", {
        options: options,
        formRef: this.$refs.form,
      });
      this.formData.map((item) => {
        if (item.children) {
          this.formOptions[item.prop] = "";
        }
      });
    },
    ok() {
      // 改变之后的值又发给父组件
      let options = JSON.parse(JSON.stringify(this.formOptions));
      this.$emit("ok", {
        options: options,
        formRef: this.$refs.form,
      });
      this.formData.map((item) => {
        if (item.children) {
          this.formOptions[item.prop] = "";
        }
      });
    },
    handleChange(value) {
      console.log(value);
      this.$emit("handleChange", value);
    },
    input(val) {
      console.log(val);
      this.$emit("input", val);
    },
  },
  mounted() {
    this.setInitvalue();
  },
  watch: {
    //监听数据，更新数据
    formData: {
      // 深度监听
      handler() {
        this.setInitvalue();
      },
      deep: true,
    },
  },
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>