<template>
  <div class="wish-box-wrap">
    <div class="wish-box-inner">
      <div class="wish-box-header">
        <h3>心愿猪/宝箱记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户Id:">
            <el-input v-model="formInline.accountId"
                      placeholder="请输入用户Id"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="期号:">
            <el-input v-model="formInline.issueNumber"
                      placeholder="请输入期号"
                      clearable></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="wish-box-table">
        <template>
          <el-table :data="tableData" max-height="528">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column min-width="120px" fixed="left" prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column min-width="120px" prop="boxType" label="宝箱类型">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.boxType==1">金币宝箱</span>
                <span class="green" v-if="scope.row.boxType==2">心愿宝箱</span>
                <span class="blue" v-if="scope.row.boxType==3">分红心</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px" prop="amount" label="奖励数量">
              <template slot-scope="scope">
                <span >{{scope.row.amount | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px" prop="issueNumber" label="获得时期号">
            </el-table-column>
            <el-table-column min-width="120px" prop="webType" label="平台类型">
              <template slot-scope="scope">
                <span  v-if="scope.row.webType==1">app</span>
                <span  v-if="scope.row.webType==2">小程序</span>
                <span  v-if="scope.row.webType==3">心愿猪app</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" :formatter="dateFormat" prop="createTime"  label="获得时间">
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
    name: 'WishBox',
    data() {
      return {
        channelNameList:[],
        menuId:'',
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        rankList:[]
      }
    },
    filters: {
      //每隔三位数字以逗号隔开
      currencyNum: function (num){
        // var dataval = parseInt(num);
        return num.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    created() {
      this.menuId=this.$route.query.id;
      //排行周期
      this.rankCycleList();
      this.accountList();
    },
    methods: {
      indexMethod(index) {
        return index * 1 + 1
      },
      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          accountId:this.formInline.accountId,
          issueNumber:this.formInline.issueNumber
        }
        this.$fetch('/wish/userBoxLog/page', parameterData).then(res => {
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
      search() {

        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      rankCycleList(){
        this.$fetch('/api/rankDarenWeek/cycle').then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.rankList = res.data;
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.accountList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.accountList()
      },
    },
  }
</script>
<style type="text/css">
  .mar_bottom{
    margin-bottom: 20px;
  }
  .wish-box-wrap {
    width: 100%;
  }

  .wish-box-inner {
    margin: auto;
    padding: 0 20px;
  }

  .wish-box-header {
    margin-bottom: 20px;
  }

  .wish-box-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .wish-box-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
