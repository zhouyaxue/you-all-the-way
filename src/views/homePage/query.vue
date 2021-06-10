<template>
  <div class="querybox">
    <div class="query-top">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               class="demo-ruleForm">
        <div class="top">
          <el-form-item label=""
                        prop="region">
            <el-select v-model="ruleForm.region"
                       placeholder="请选择省份">
              <el-option label="上海"
                         value="shanghai"></el-option>
              <el-option label="河南"
                         value="henan"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分数"
                        prop="fraction">
            <el-input v-model="ruleForm.fraction"></el-input>
          </el-form-item>
        </div>
        <div class="check">
          <el-form-item label="">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="按分数查询"></el-radio>
              <el-radio label="按排名查询"></el-radio>
              <el-radio label="高级查询"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 如果是高级查询则显示 -->
        <div class="advanced"
             v-show="ruleForm.resource === '高级查询'">
          <el-form-item label="学校所在城市">
            <el-cascader v-model="ruleForm.city"
                         :options="ruleForm.cityOptions"></el-cascader>
          </el-form-item>
          <el-form-item label="学校名">
            <el-input v-model="ruleForm.schoolName"></el-input>
          </el-form-item>
          <el-form-item label="专业名">
            <el-input v-model="ruleForm.professionalName"></el-input>
          </el-form-item>
        </div>
        <div class="bottom">
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">立即查询</el-button>
          </el-form-item>
        </div>

      </el-form>

    </div>
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
    return {
      ruleForm: {
        fraction: '',
        region: '北京',
        resource: '按分数查询',
        city: '河南/新乡',
        cityOptions: [{
          value: 'henan',
          label: '河南',
          children: [{
            value: 'xinxiang',
            label: '新乡'
          }, {
            value: 'zhengzhou',
            label: '郑州'
          }]
        }, {
          value: 'beijing',
          label: '北京',
          children: [{
            value: 'haidian',
            label: '海淀'
          }, {
            value: 'chaoyang',
            label: '朝阳'
          }]
        }],
        schoolName: '',
        professionalName: ''
      },
      rules: {
        fraction: [
          { required: true, message: '分数不能为空哦' },
          { type: 'number', message: '分数必须是数字' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    };
  },
  components: {
    // eHeader: () => import('@/components/header')
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
    }
  }
};
</script>

<style lang="scss" scoped>
.querybox {
  width: 60%;
  margin: auto;
  padding: 20px 0;
  .top {
    display: flex;
    justify-content: center;
    .el-form-item {
      display: flex;
      justify-content: space-between;
    }
  }
  .check {
    display: flex;
    justify-content: center;
  }
  .bottom {
    display: flex;
    justify-content: center;
  }
  .advanced {
    display: flex;
    flex-direction: column;
    width: 55%;
    margin: auto;
    .el-form-item {
      display: flex;
      justify-content: space-between;
      label {
        width: 150px;
      }
    }
  }
}
</style>
