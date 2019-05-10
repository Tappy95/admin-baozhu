<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>第三方/游戏列表</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="游戏id">
            <el-input v-model="formInline.gameId" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态:" >
            <el-select v-model="formInline.status"   placeholder="">
              <el-option label="正常" value="1"></el-option>
              <el-option label="下架" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>

            <el-table-column width="170px" fixed="left" prop="gameId" label="游戏id">
            </el-table-column>

            <el-table-column prop="gameTitle" width="200px"  label="游戏标题">
            </el-table-column>

            <el-table-column prop="gameGold" label="奖励金额(￥)">
            </el-table-column>

            <el-table-column prop="packageName" label="游戏包名">
            </el-table-column>

            <el-table-column prop="status" label="状态">
            </el-table-column>

            <el-table-column prop="status"  label="操作" :width="optionW">
            <template slot-scope="scope">
              <el-button size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
              <el-button size="mini" @click="getStatus(scope.row.id,2)" v-if="scope.row.status=='正常' && UpperShelf">下架</el-button>
              <el-button size="mini" @click="getStatus(scope.row.id,1)" v-if="scope.row.status=='下架' && UpperShelf">上架</el-button>
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
    name: 'SignList',
    data() {
      return {
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        message:{},
        menuId:'',
        del:false,
        UpperShelf:false,
        optionW:'0px',
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
              if(res.data[i].btnCode == 'del') {
                this.optionW = '75px';
                this.del=true;
              }
              if(res.data[i].btnCode == 'UpperShelf') {
                this.optionW = '75px';
                this.UpperShelf=true;
              }

              if( this.del && this.UpperShelf) {
                this.optionW = '150px';

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
            pageSize: this.pageSize,
            gameId:this.formInline.gameId,
            status:this.formInline.status
          }

          this.$fetch('/api/tpGame/queryBList', parameterData).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if (res.data.list[i].status==1) {
                res.data.list[i].status='正常'
              }else {
                res.data.list[i].status='下架'
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
      getStatus(id,status){
        let parameterData = {
            id:id,
            status:status
        }
        this.$post('/api/tpGame/modify', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: res.message });
            this.accountList();
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
         }
        })
      },

      Delete(id) {
        this.$confirm('此操作将永久删除游戏, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.delData(id)
          })
          .catch(() => {
            this.$message({ type: 'info', message: '已取消删除' })
          })
      },
      delData(id) {
        this.$fetch('/api/tpGame/remove', {
          id: id
        }).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.$message({type: 'success', message: '删除成功！'})
            this.accountList()
          } else {
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
      }
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
