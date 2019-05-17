<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/游戏任务</h3>
        <hr />
      </div>
      <div>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column fixed="left" min-width="200px" prop="tpName" label="游戏方名称">
            </el-table-column>
            <el-table-column  min-width="150px" prop="gameId" label="游戏id">
            </el-table-column>

            <el-table-column  min-width="200px" prop="orderNum" label="流水号">
            </el-table-column>
            <el-table-column  min-width="150px" prop="gameReward" label="游戏方奖励金币数">
            </el-table-column>
            <el-table-column  min-width="150px" prop="reward" label="总奖励金币数">
            </el-table-column>
            <el-table-column  min-width="150px" prop="tpGameId" label="用户在游戏方的id">
            </el-table-column>
            <el-table-column  min-width="120px" prop="mobile" label="用户手机号">
            </el-table-column>

            <el-table-column  min-width="150px" prop="channelCode" label="渠道标识">
            </el-table-column>
            <el-table-column  min-width="150px" prop="channelName" label="渠道名称">
            </el-table-column>
            <el-table-column  min-width="150px" prop="gameReward" label="游戏方奖励金币数">
            </el-table-column>
            <el-table-column min-width="120px" prop="status" label="状态">
            </el-table-column>
            <el-table-column width="170px" prop="createTime" :formatter="dateFormat" label="创建时间">
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
    name: 'GameSide',
    data() {
      return {
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
    },
    methods: {
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'add') {
                this.add=true
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
                this.powerTrue =true;
                this.optionW = '160px'
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '160px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '230px'
              }
            }
          } else {
          }
        })
      },
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
          pageSize: this.pageSize
        }
        this.$fetch('/api/tpCallback/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].status == '1') {
                res.data.list[i].status = '成功'
              } else if (res.data.list[i].status == '2'){
                res.data.list[i].status = '失败'
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
      search() {
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
    },
  }
</script>
<style type="text/css">
  .administratormanage-wrap {
    width: 100%;
  }

  .administratormanage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .administratormanage-header {
    margin-bottom: 20px;
  }

  .administratormanage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .administratormanage-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
