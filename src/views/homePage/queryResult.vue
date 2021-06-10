<template>
  <div class="queryResult">
    <el-table :data="professionalInfo"
              :span-method="objectSpanMethod"
              border
              style="width: 100%; margin-top: 20px">
      <el-table-column prop="id"
                       label="校徽"
                       width="180">
      </el-table-column>
      <el-table-column prop="professionalName"
                       label="专业名">
      </el-table-column>
      <el-table-column prop="year"
                       label="年份">
      </el-table-column>
      <el-table-column prop="minimum"
                       label="最低录取分数线">
      </el-table-column>
      <el-table-column prop="average"
                       label="平均分数线">
      </el-table-column>
      <el-table-column prop="schoolName"
                       label="学校名称">
      </el-table-column>
      <el-table-column prop="schoolType"
                       label="学校类型">
      </el-table-column>
      <el-table-column prop="ranking"
                       label="学校排名">
      </el-table-column>
      <el-table-column prop=""
                       label="学校地址">
      </el-table-column>
      <el-table-column prop="follow"
                       label="关注">
      </el-table-column>
    </el-table>
    <ul>
      <li class="result-top">
        <div>
          校徽
        </div>
        <div>专业名</div>
        <div>年份</div>
        <div>最低录取分数线</div>
        <div>平均分数线</div>
        <div>学校名称</div>
        <div>学校类型</div>
        <div>学校排名</div>
        <div>学校地址</div>
        <div>关注</div>
      </li>
      <div class="result-top result-bottom">
        <li v-for="item in tableData"
            :key="item.id">
          <!-- 校徽 -->
          <div>
            {{item.id}}
          </div>
          <!-- 专业名 -->
          <div>
            {{item.professionalName}}
          </div>
          <!-- 年份 -->
          <div class="yearList">
            <span v-for="itempro in item.professionalInfo"
                  :key="itempro.year">
              {{itempro.year}}
            </span>
          </div>
          <!-- 最低录取分数线 -->
          <div class="yearList">
            <span v-for="(itempro,index) in item.professionalInfo"
                  :key="item.professionalInfo[index].minimum">
              {{itempro.minimum}}
            </span>
          </div>
          <!-- 平均分数线 -->
          <div class="yearList">
            <span v-for="(itempro,index) in item.professionalInfo"
                  :key="item.professionalInfo[index].average">
              {{itempro.average}}
            </span>
          </div>
          <!-- 学校名称 -->
          <div>
            {{item.schoolName}}
          </div>
          <!-- 学校类型 -->
          <div>
            {{item.schoolType}}
          </div>
          <!-- 学校排名 -->
          <div class="yearList">
            <span v-for="(itempro,index) in item.professionalInfo"
                  :key="item.professionalInfo[index].ranking">
              {{itempro.ranking}}
            </span>
          </div>
          <!-- 学校地址 -->
          <div>
            <!-- {{item.schoolAdress}} -->
            <i class="el-icon-map-location"></i>
          </div>
          <!-- 关注 -->
          <div>
            {{item.follow}}
          </div>
        </li>
      </div>
    </ul>
    <div class="pagin">
      <el-pagination layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import {
  Table,
  TableColumn,
  Pagination
} from 'element-ui';
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Pagination.name, Pagination);
export default {
  name: 'home',
  data () {
    return {
      tableData: [{
        id: '12987122',
        professionalName: '计算机',
        schoolName: '河南经贸职业学院',
        schoolType: '二本院校',
        schoolAdress: '经二路',
        follow: '关注',
        professionalInfo: [{
          year: '2020',
          minimum: '600',
          average: '621',
          ranking: '10'
        }, {
          year: '2019',
          minimum: '598',
          average: '611',
          ranking: '17'
        }, {
          year: '2018',
          minimum: '657',
          average: '620',
          ranking: '9'
        }]
      },
      {
        id: '12987',
        professionalName: '计算机',
        schoolName: '河南经贸职业学院',
        schoolType: '二本院校',
        schoolAdress: '经二路',
        follow: '关注',
        professionalInfo: [{
          year: '2020',
          minimum: '600',
          average: '621',
          ranking: '10'
        }, {
          year: '2019',
          minimum: '598',
          average: '611',
          ranking: '17'
        }, {
          year: '2018',
          minimum: '657',
          average: '620',
          ranking: '9'
        }]
      }, {
        id: '129879',
        professionalName: '计算机',
        schoolName: '河南经贸职业学院',
        schoolType: '二本院校',
        schoolAdress: '经二路',
        follow: '关注',
        professionalInfo: [{
          year: '2020',
          minimum: '600',
          average: '621',
          ranking: '10'
        }, {
          year: '2019',
          minimum: '598',
          average: '611',
          ranking: '17'
        }, {
          year: '2018',
          minimum: '657',
          average: '620',
          ranking: '9'
        }]
      }]
    };
  },
  components: {
  },
  methods: {
    objectSpanMethod ({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }

};
</script>

<style lang="scss" scoped>
.result-top {
  overflow: hidden;
  margin: auto;
  border-top: 1px solid #ddd;
  div {
    width: 130px;
    float: left;
    line-height: 40px;
    text-align: center;
    margin-left: -1px;
    font-size: 16px;
  }
}
.queryResult ul {
  margin-left: 10px;
}
.yearList {
  span {
    display: block;
  }
}
.result-bottom {
  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .el-icon-map-location {
    font-size: 30px;
  }
}
.pagin {
  margin: 20px auto;
  display: flex;
  justify-content: center;
}
</style>
