<template>
  <div class="ip-white-wrap">
    <div class="ip-white-inner">
      <div class="ip-white-header">
        <h3>系统配置/ip白名单</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="白名单内容类型" prop="contentType" :label-width="formLabelWidth">
            <el-select v-model="formInline.contentType" placeholder="请选择类型">
              <el-option label="电话" value="1"></el-option>
              <el-option label="Ip" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="白名单内容">
            <el-input style="width: 300px;" v-model="formInline.content" placeholder="请输入白名单内容" clearable></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ip-white-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column prop="contentType" label="白名单内容类型">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.contentType==1">电话</span>
                <span class="zi" v-if="scope.row.contentType==2">Ip</span>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="白名单内容">
            </el-table-column>
            <el-table-column width="200px" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加Ip" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="白名单内容类型" prop="contentType" :label-width="formLabelWidth">
              <el-select v-model="form.contentType" placeholder="">
                <el-option label="电话" value="1"></el-option>
                <el-option label="Ip" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="白名单内容" prop="content" :label-width="formLabelWidth">
              <el-input spellcheck="false" style="width: 320px;" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.content" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
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
        optionW:'78px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {},
        rules: {
          contentType: [{
            required: true,
            message: '请选择白名单内容类型',
            trigger: 'change'
          }],
          content: [{
            required: true,
            message: '请输入白名单内容',
            trigger: 'blur'
          }],
        },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isSubmit:false,
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
                this.optionW = '78px'
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
          contentType: this.formInline.contentType,
          content: this.formInline.content
        }
        this.$fetch('/api/pWhitelist/list', parameterData).then(res => {
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
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
        this.isSubmit =false;
      },
      addBtn(form) {
        if (this.form.contentType==1){
          let pattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
          if(!pattern.test(this.form.content)){
            this.$message({type: 'warning', message: '请输入正确的手机号'})
            return false;
          }
        }
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/pWhitelist/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false;
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
                this.isSubmit=false;
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
        this.$fetch('/api/pWhitelist/remove', parameterData).then(res => {
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
  .ip-white-wrap {
    width: 100%;
  }

  .ip-white-inner {
    margin: auto;
    padding: 0 20px;
  }

  .ip-white-header {
    margin-bottom: 20px;
  }

  .ip-white-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .ip-white-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
