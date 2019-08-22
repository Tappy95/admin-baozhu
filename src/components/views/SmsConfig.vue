<template>
  <div class="sms-config-wrap">
    <div class="sms-config-inner">
      <div class="sms-config-header">
        <h3>系统配置 / 短信配置</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="配置名称:">
            <el-input v-model="formInline.name" placeholder="请输入配置名称" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" v-if="add" plain @click="load()">添加</el-button>
        </el-form>
      </div>
      <div class="sms-config-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column min-width="300" prop="name" label="配置名称">
            </el-table-column>
            <el-table-column min-width="200" prop="maxValue" label="值">
            </el-table-column>
            <el-table-column min-width="300" prop="memo" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="showT" :width="optionW">
              <template slot-scope="scope">
                <!--<el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>-->
                <!--<el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>-->
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加短信配置" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="maxValue" label="值:"  :label-width="formLabelWidth">
              <el-input  style="width: 200px"   v-model="form.maxValue" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="配置名称:" prop="name" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off" style="" clearable></el-input>
            </el-form-item>
            <el-form-item label="备注:"  :label-width="formLabelWidth">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.memo" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改短信配置" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-form-item label="值:"  :label-width="formLabelWidth">
              <el-input style="width: 200px" v-model="formtwo.maxValue" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="配置名称:" :label-width="formLabelWidth">
            <el-input v-model="formtwo.name" auto-complete="off" style="" clearable></el-input>
          </el-form-item>
            <el-form-item label="备注:"  :label-width="formLabelWidth">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.memo" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
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
    name: 'SmsConfig',
    data() {
      return {
        powerTrue:false,
        optionW:'1px',
        menuId:'',
        upd:false,
        showT:false,
        add:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {},
        formLabelWidth: '100px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isSubmit:false,
        rules: {
          name: [{required: true, message: '请输入配置名称', trigger: 'blur'}],
          maxValue: [
            {required: true, message: '请输入值', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
            ],
        },
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
                this.add=true;
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
                this.showT=true;
                this.optionW = '75px'
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
          name:this.formInline.name
        }
        this.$fetch('/push/smsParamConf/list', parameterData).then(res => {
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
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
        this.isSubmit =false;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/push/smsParamConf/add', this.form).then(res => {
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
                this.isSubmit=false;
              }
            })
          } else {}
        })
      },
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/push/smsParamConf/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        this.$put('/push/smsParamConf/update', this.formtwo).then(res => {
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
  .sms-config-wrap {
    width: 100%;
  }

  .sms-config-inner {
    margin: auto;
    padding: 0 20px;
  }

  .sms-config-header {
    margin-bottom: 20px;
  }

  .sms-config-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .sms-config-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
