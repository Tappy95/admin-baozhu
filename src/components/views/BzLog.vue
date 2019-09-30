<template>
  <div class="bz-log-wrap">
    <div class="bz-log-inner">
      <div class="bz-log-header">
        <h3>宝猪28/数据统计</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="电话号码:">
            <el-input v-model="formInline.adminMobile"
                      placeholder="请输入电话号码"
                      clearable></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bz-log-table">
        <template>
          <el-table :data="tableData" max-height="528">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column width="200px" prop="adminMobile" label="管理员号码">
            </el-table-column>
            <el-table-column min-width="150px" prop="events" label="事件">
            </el-table-column>
            <el-table-column width="170px" :formatter="dateFormat" prop="createTime" label="发生时间">
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  export default {
    name: 'BzLog',
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
      }
    },
    created() {
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
          adminMobile:this.formInline.adminMobile,
        }
        this.$fetch('/bz28/operationAdminLog/list', parameterData).then(res => {
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
        if(!this.formInline.adminMobile){
          this.$message({
            type: 'warning',
            message: '请输入电话号码查询',
            duration: 3000
          })

          return false
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
  .mar_bottom{
    margin-bottom: 20px;
  }
  .bz-log-wrap {
    width: 100%;
  }

  .bz-log-inner {
    margin: auto;
    padding: 0 20px;
  }

  .bz-log-header {
    margin-bottom: 20px;
  }

  .bz-log-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .bz-log-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
