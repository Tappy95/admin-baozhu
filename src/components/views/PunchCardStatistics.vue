<template>
  <div class="punch-card-record-wrap">
    <div class="punch-card-record-inner">
      <div class="punch-card-record-header">
        <h3>早起打卡/打卡统计</h3>
        <hr />
      </div>
      <div>
        <el-form  :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item  label="日期:">
            <el-date-picker
              v-model="formInline.createDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
        </el-form>
      </div>
      <div class="punch-card-record-table">
        <template>
          <el-table :data="tableData" max-height="518">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="170" fixed="left" prop="createDate" label="日期">
            </el-table-column>
            <el-table-column min-width="170" label="奖金池">
              <template slot-scope="scope">
                 {{scope.row.bonusPool | currency}}
              </template>
            </el-table-column>
            <el-table-column min-width="170" coinBalance prop="successNumber" label="成功人数">
            </el-table-column>
            <el-table-column prop="failNumber" min-width="170px" label="失败人数">
            </el-table-column>
            <el-table-column prop="successRealNumber" min-width="170px" label="真实成功人数">
            </el-table-column>
            <el-table-column prop="failRealNumber" min-width="170px" label="真实失败人数">
            </el-table-column>
            <el-table-column  prop="actualBonus" min-width="200"  label="真实奖金池">
              <template slot-scope="scope">
                {{scope.row.actualBonus | currency}}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
         <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  export default {
    name: 'PunchCardStatistics',
    data() {
      return {
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          createDate:''
        },
        tableData: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.accountList();
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    methods: {
      indexMethod(index) {
        return index * 1 + 1
      },
      dateFormat(row, column) {
        let date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      },
      accountList() {
        let parameterData = {
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          createDate:this.formInline.createDate,
        }
        this.$fetch('/api/checkinResult/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },
      search(){
        if (this.formInline.createDate){
          this.formInline.createDate = formatDate(new Date(this.formInline.createDate), 'yyyy-MM-dd');
        } else {
          this.formInline.createDate = '';
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.accountList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.accountList();
      },

    },

  }
</script>
<style type="text/css">

  .punch-card-record-wrap {
    width: 100%;
  }

  .punch-card-record-inner {
    margin: auto;
    padding: 0 20px;
  }

  .punch-card-record-header {
    margin-bottom: 20px;
  }

  .punch-card-record-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .punch-card-record-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
