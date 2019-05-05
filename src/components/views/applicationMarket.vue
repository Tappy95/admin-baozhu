<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>系统配置/应用市场</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="市场名称">
            <el-input v-model="formInline.marketName" placeholder="" clearable></el-input>
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

            <el-table-column prop="marketName" label="市场名称">
            </el-table-column>

            <el-table-column prop="packageName" label="包名">
            </el-table-column>

            <el-table-column prop="editionNum"  label="版本号">
            </el-table-column>


            <el-table-column prop="state" label="状态">
            </el-table-column>

            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
                <el-button @click="getOne(scope.row.id)" size="mini">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-dialog title="添加市场" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="市场名称" :label-width="formLabelWidth" prop="marketName">
              <el-input v-model="form.marketName" auto-complete="off" style="width: 440px" clearable>
              </el-input>
            </el-form-item>

            <el-form-item label="包名" prop="packageName" :label-width="formLabelWidth">
              <el-input style="width: 440px;" v-model="form.packageName" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="版本号" prop="editionNum" :label-width="formLabelWidth">
              <el-input style="width: 440px;" v-model="form.editionNum" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
              <el-select v-model="form.state" placeholder="">
                <el-option label="下架" value="1"></el-option>
                <el-option label="审核中" value="2"></el-option>
                <el-option label="正常" value="3"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改市场" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-form-item label="市场名称" :label-width="formLabelWidth" prop="marketName">
              <el-input v-model="formtwo.marketName" auto-complete="off" style="width: 440px" clearable>
              </el-input>
            </el-form-item>

            <el-form-item label="包名" prop="packageName" :label-width="formLabelWidth">
              <el-input style="width: 440px;" v-model="formtwo.packageName" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="版本号" prop="editionNum" :label-width="formLabelWidth">
              <el-input style="width: 440px;" v-model="formtwo.editionNum" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
              <el-select v-model="formtwo.state" placeholder="">
                <el-option label="下架" :value="1"></el-option>
                <el-option label="审核中" :value="2"></el-option>
                <el-option label="正常" :value="3"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="市场详情" :visible.sync="dialogTableDetail" width="600px">
          <el-form :model="formtwoInfo">
            <el-form-item label="市场名称" :label-width="formLabelWidth" prop="marketName">
              <el-input :disabled="true" v-model="formtwoInfo.marketName" auto-complete="off" style="width: 440px" clearable>
              </el-input>
            </el-form-item>

            <el-form-item label="包名" prop="packageName" :label-width="formLabelWidth">
              <el-input :disabled="true" style="width: 440px;" v-model="formtwoInfo.packageName" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="版本号" prop="editionNum" :label-width="formLabelWidth">
              <el-input :disabled="true"style="width: 440px;" v-model="formtwoInfo.editionNum" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
              <el-select :disabled="true" v-model="formtwoInfo.state" placeholder="">
                <el-option label="下架" :value="1"></el-option>
                <el-option label="审核中" :value="2"></el-option>
                <el-option label="正常" :value="3"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
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
          noticeTitle: '',
          noticeContent: '',
          password: '',
          isRelease: '1'
        },
        roles: {
          id: '',
          realname: ''
        },
        rules: {
          marketName: [{
            required: true,
            message: '请输入市场名称',
            trigger: 'blur'
          }],
            packageName: [{
            required: true,
            message: '请输入包名',
            trigger: 'blur'
          }],
            editionNum: [{
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          }],
            state: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }]
        },
        formLabelWidth: '120px',
        /* 分页*/
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
          pageSize: this.pageSize,
          marketName: this.formInline.marketName
        }
        this.$fetch('/api/PApplicationMarket/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].state == 1) {
              res.data.list[i].state = '下架'
            } else if(res.data.list[i].state == 2) {
              res.data.list[i].state = '审核中'
            }else {
              res.data.list[i].state = '正常'
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
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/api/PApplicationMarket/add', this.form).then(res => {
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
          cancelButtonText: '取消',
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
        this.$fetch('/api/PApplicationMarket/remove', parameterData).then(res => {
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
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/api/PApplicationMarket/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.formtwo = res.data
        }
      })
      },
      update(formtwo) {
        this.$put('/api/PApplicationMarket/modify', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogTableVisible = false
          this.accountList()
        }
      })
      },
      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/api/PApplicationMarket/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.formtwoInfo = res.data
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
