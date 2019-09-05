<template>
  <div class="sys-task-log-wrap">
    <div class="sys-task-log-inner">
      <div class="sys-task-log-header">
        <h3>系统任务/系统任务记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="用户Id:">
            <el-input v-model="formInline.accountId"
                      placeholder="请输入用户Id"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain  @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="no-tip">默认初始无数据，请输入用户Id查询即可！</div>
      </div>
      <div class="sys-task-log-table">
        <template>
          <el-table class="table-th" :data="tableData"
                    style="width: 100%"
                    v-loading="loading"
                    max-height="560">
            <el-table-column fixed="left" label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80'>
            </el-table-column>
            <el-table-column width="200px" fixed="left"  prop="accountId"
                             label="用户Id">
            </el-table-column>
            <el-table-column width="200px" prop="taskId"
                             label="任务Id">
            </el-table-column>
            <el-table-column min-width="240px" prop="taskName"
                             label="任务名称">
            </el-table-column>
            <el-table-column  width="170px" :formatter="dateFormat" prop="createTime"
                              label="创建时间">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  export default {
    name:'SysTaskLog',
    data() {
      return {
        formInline:{
          accountId:''
        },
        menuId:'',
        tableData:[],
        loading:false
      }
    },
    created() {
      this.menuId=this.$route.query.id;
    },
    methods: {
      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      },
      search() {
        if (!this.formInline.accountId) {
          this.$message({type: 'warning', message: '请输入用户Id进行查询', duration: 3000})
          return
        }
        this.accountList();
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      accountList() {
        this.loading = true;
        let parameterData = {
          accountId:this.formInline.accountId
        }
        this.$fetch('/api/lUserTask/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            if(res.data.list){
              this.loading = false
            }
          }else {
            this.$message({type: 'error', message: res.message, duration: 3000})
            this.loading = false;
          }
        })
      },
    }
  }
</script>
<style type="text/css">
  .sys-task-log .table-th th{
    padding: 12px 0;
  }
  .no-tip{
    margin-bottom: 10px;
    font-size: 14px;
    color: #ff4d51;
  }

  .le-bottom{
    margin-left: 20px;
  }
  .time_zhuce{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .sys-task-log-wrap {
    width: 100%;
  }
  .sys-task-log-inner {
    margin: auto;
    padding: 0 20px;
  }
  .sys-task-log-header {
    margin-bottom: 20px;
  }
  .sys-task-log-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .sys-task-log-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }
  .el-table th {
    background-color: #e6e6e6;
  }
  .information-wrap {
    margin-top: -30px;
    margin-bottom: 20px;
  }
  .information {
    display: flex;
  }
  .information div,
  .information-two div {
    margin-right: 20px;
  }
  .information div span,
  .information-two div span {
    color: red;
  }
  .information-two {
    display: flex;
    flex-wrap: wrap;
    width: 680px;
    line-height: 25px;
  }
  .informationImg{
    width: 148px;
    height: 148px;
  }
  .information-three div{
    display: inline-grid;
    margin: 5px 30px;
  }
</style>
