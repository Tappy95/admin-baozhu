<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>系统配置/ip黑名单</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="ip">
            <el-input v-model="formInline.ip" placeholder="" clearable></el-input>
          </el-form-item>
          <el-button @click="search()">查询</el-button>
          <el-button @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column prop="ip" label="ip">
            </el-table-column>
            <el-table-column width="200px" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加ip" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="ip" prop="ip" :label-width="formLabelWidth">
              <el-input style="width: 300px;"   v-model="form.ip" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>

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
    name: 'NewsNotice',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {
          contentType:'1',
          content:''
        },
        roles: {
          id: '',
          realname: ''
        },
        rules: {
          ip: [{
            required: true,
            message: '请输入ip',
            trigger: 'blur'
          }],
          id: [{
            required: true,
            message: '请输入id',
            trigger: 'blur'
          }],
        },
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
      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
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
                this.optionW = '75px'
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
          pageSize: this.pageSize,
          ip: this.formInline.ip
        }
        this.$fetch('/api/pIpBlacklist/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
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
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/api/pIpBlacklist/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.accountList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
          } else {}
        })
      },
      Delete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.delData(id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      delData(id) {
        let parameterData = {
          id: id
        }
        this.$fetch('/api/pIpBlacklist/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.accountList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！'
            })
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
