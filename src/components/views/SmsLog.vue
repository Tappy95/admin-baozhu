<template>
  <div class="sms-log-wrap">
    <div class="sms-log-inner">
      <div class="sms-log-header">
        <h3>运营管理/验证码记录</h3>
        <hr />
      </div>
      <div >
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="手机号:" >
            <el-input placeholder="请输入手机号"
                      v-model="formInline.accountNum"
                      clearable></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
        <div style="margin-bottom: 10px" class="no-tip red f-size">默认无数据，请输入手机号查询</div>
      </div>
      <div class="sms-log-table">
        <template>
          <el-table  :data="tableData" max-height="600">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="250" fixed="left" prop="accountNum" label="手机号">
            </el-table-column>
            <el-table-column min-width="120" prop="code" label="验证码">
            </el-table-column>
            <el-table-column min-width="120" prop="ip" label="请求ip">
            </el-table-column>
            <el-table-column min-width="170" prop="createDate" label="发送时间">
            </el-table-column>
            <el-table-column min-width="120" prop="isValid"  label="是否使用">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.isValid==2">是</span>
                <span class="green" v-if="scope.row.isValid==1">否</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
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
  import { getSession } from '../../utils/cookie'
  export default {
    name: 'SmsLog',
    data() {
      return {
        menuId:'',
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        del:true,
        powerTrue:false,
        optionW:'75px',
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
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
                console.log(del)
                this.del=true;
                this.powerTrue =true;
                this.optionW = '75px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '160px'
              }
            }
          } else {
          }
        })
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      accountList() {
        if(this.formInline.accountNum==null || this.formInline.accountNum==''){
          this.$message({type: 'error', message: '请输入手机号码查询', duration: 3000})
          return;
        }
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          accountNum:this.formInline.accountNum,
        }
        this.$fetch('/push/validateCode/page', parameterData).then(res => {
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
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'rep') {
                this.rep =true;
              }else {
                this.showW = false
              }
            }
          } else {
          }
        })
      },
      search() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },

      Delete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
        this.$fetch('/push/validateCode/remove',{
          id: id
        } ).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: '删除成功！' })
            this.accountList()
          } else {
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
  .el-table.u th{
    padding: 0;
  }
  .el-table.a th{
    padding: 12px 0;
  }
  .f-size{
    font-size: 12px;
    margin-bottom: 20px;

  }


  .blue{
    color: #409eff;
  }
  .green{
    color: #13ce66;
  }
  .yellow{
    color: #e6a23c;
  }

  .red{
    color: #ff4d51;
  }

  .zi{
    color: #d8b1ee;
  }

  .mar_bottom{
    margin-bottom: 20px;
  }
  .sms-log-wrap {
    width: 100%;
  }

  .sms-log-inner {
    margin: auto;
    padding: 0 20px;
  }

  .sms-log-header {
    margin-bottom: 20px;
  }

  .sms-log-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .sms-log-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
