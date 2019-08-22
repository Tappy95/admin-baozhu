<template>
  <div class="fighting-info-wrap">
    <div class="fighting-info-inner">
      <div class="fighting-info-header">
        <h3>答题对战/对战记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="对战状态">
            <el-select v-model="formInline.state" placeholder="请选择对战状态">
              <el-option label="全部" value=""></el-option>
              <el-option label="发起" value="1"></el-option>
              <el-option label="开始" value="2"></el-option>
              <el-option label="进行中" value="3"></el-option>
              <el-option label="结束" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="fighting-info-table">
        <template>
          <el-table :data="tableData" height="506">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" min-width="150px" prop="initiatorName" label="发起人">
            </el-table-column>
            <el-table-column prop="defenseName" min-width="150px" label="参与人">
            </el-table-column>
            <el-table-column prop="initiatorCoin" min-width="180px" label="发起人支付金币数">
            </el-table-column>
            <el-table-column prop="defenseCoin" min-width="180px" label="参与人支付金币">
            </el-table-column>
            <el-table-column prop="fightingTime" :formatter="dateFormat" width="200px" label="对战时间">
            </el-table-column>
            <el-table-column prop="winnerName" min-width="150px" label="胜利者">
            </el-table-column>
            <el-table-column prop="victoryScore"  min-width="150px" label="胜利分数">
            </el-table-column>
            <el-table-column prop="failureScore" min-width="150px" label="失败分数">
            </el-table-column>
            <el-table-column prop="useTime" width="100px" label="对战总时间">
            </el-table-column>
            <el-table-column prop="state" label="对战状态">
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
    name: 'FightingInfo',
    data() {
      return {
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        message:{}
      }
    },
    created() {
      this.accountList()
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
          state:this.formInline.state
        }
        this.$fetch('/api/mFightingInfo/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            res.data.list[i].fightingTime=formatDate(new Date(res.data.list[i].fightingTime), 'yyyy-MM-dd hh:mm:sss')
            if(res.data.list[i].state ==1){
              res.data.list[i].state = "发起"
            }else if(res.data.list[i].state ==2){
              res.data.list[i].state = "开始"
            }else if(res.data.list[i].state ==3){
              res.data.list[i].state = "进行中"
            }else {
              res.data.list[i].state = "结束"
            }
          }
          this.tableData = res.data.list
          this.totalCount = res.data.total
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
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.accountList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.accountList()
      },
      toggle: function(value) {
        this.isShow = !this.isShow;
        console.log(this.isShow)
      }
    },

  }
</script>
<style type="text/css">
  .fighting-info-wrap {
    width: 100%;
  }

  .fighting-info-inner {
    margin: auto;
    padding: 0 20px;
  }

  .fighting-info-header {
    margin-bottom: 20px;
  }

  .fighting-info-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .fighting-info-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
