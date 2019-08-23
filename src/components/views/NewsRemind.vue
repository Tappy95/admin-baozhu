<template>
  <div class="news-remind-wrap">
    <div class="news-remind-inner">
      <div class="news-remind-header">
        <h3>消息管理/消息提醒</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户Id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户Id" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="news-remind-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column fixed="left" prop="accountId"  label="用户Id">
            </el-table-column>
            <el-table-column label="提醒类型">
              <template slot-scope="scope">
                <span v-if="scope.row.noticeType==1">每日红包提醒</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="createTime" :formatter="dateFormat" label="创建时间">
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
    name: 'NewsRemind',
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
      }
    },
    created() {
      this.menuId=this.$route.query.id;
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
          accountId:this.formInline.accountId
        }

        this.$fetch('/api/noticeReady/list', parameterData).then(res => {
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
  .news-remind-wrap {
    width: 100%;
  }

  .news-remind-inner {
    margin: auto;
    padding: 0 20px;
  }

  .news-remind-header {
    margin-bottom: 20px;
  }

  .news-remind-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .news-remind-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
