<template>
  <div class="login">
    <div class="title">登录</div>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="70px"
             class="demo-ruleForm">
      <el-form-item label="用户名"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"></el-input>
      </el-form-item>
      <div class="phoneCode">
        手机验证码快速登录
      </div>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">登录</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">注册</el-button> -->
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Select,
  Input,
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Cascader
} from 'element-ui';
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Radio.name, Radio);
Vue.component(Cascader.name, Cascader);
export default {
  name: 'query',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  components: {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  margin: auto;
  background-color: #dedede;
  padding: 20px;
  .phoneCode {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
