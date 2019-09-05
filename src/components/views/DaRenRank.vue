<template>
  <div class="daren-rank-wrap">
    <div class="daren-rank-inner">
      <div class="daren-rank-header">
        <h3>达人管理/达人排名</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户ID:">
            <el-input v-model="formInline.accountId"
                      placeholder="请输入用户ID"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="徒弟数量:">
            <el-input v-model="formInline.apprenticeCount"
                      placeholder="请输入徒弟数量"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="排名:">
            <el-input v-model="formInline.rank"
                      placeholder="请输入排名"
                      clearable></el-input>
          </el-form-item>
          <el-form-item   label="排行周期:" >
            <el-select v-model="formInline.rankCycle"  placeholder="请选择排行周期">
              <el-option v-for="(item,index ) in rankList" :label="item.rankCycle " :value="item.rankCycle" :key="index"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item   label="结算:" >
            <el-select v-model="formInline.status"  placeholder="请选择结算">
              <el-option label="未结算" value="1"></el-option>
              <el-option label="已结算" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item >
            <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="daren-rank-table">
        <template>
          <el-table :data="tableData" max-height="528">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column min-width="200px" fixed="left" prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column min-width="150px" prop="apprenticeCount" label="徒弟数量">
              <template slot-scope="scope">
                <span class="green" >{{scope.row.apprenticeCount | currencyCion}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px" prop="rank" label="排名">
            </el-table-column>
            <el-table-column min-width="150px" prop="rankCycle" label="排行周期">
            </el-table-column>
            <el-table-column min-width="120px" prop="reward" label="奖励金币">
              <template slot-scope="scope">
                <span class="green" >{{scope.row.reward | currencyCion}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120px" prop="status" label="结算">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.status==1">未结算</span>
                <span class="green" v-if="scope.row.status==2">已结算</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" prop="createDate"  label="排名时间">
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
    name: 'DaRenRank',
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
      currencyCion: function (num){
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
          apprenticeCount:this.formInline.apprenticeCount,
          rank:this.formInline.rank,
          status:this.formInline.status,
          rankCycle:this.formInline.rankCycle
        }
        this.$fetch('/api/rankDarenWeek/list', parameterData).then(res => {
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
        var pattern = /^[0-9]*$/;
        if(this.formInline.apprenticeCount){
          if (!pattern.test(this.formInline.apprenticeCount)) {
            this.$message({type: 'warning', message: '徒弟数量为正game-list', duration: 3000})
            return false
          }
        }
        if(this.formInline.rank){
          if (!pattern.test(this.formInline.rank)) {
            this.$message({type: 'warning', message: '排序为正整数', duration: 3000})
            return false
          }
        }
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
  .daren-rank-wrap {
    width: 100%;
  }

  .daren-rank-inner {
    margin: auto;
    padding: 0 20px;
  }

  .daren-rank-header {
    margin-bottom: 20px;
  }

  .daren-rank-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .daren-rank-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
