<template>
  <div class="bz-task-job-wrap">
    <div class="bz-task-job-inner">
      <div class="bz-task-job-header">
        <h3>定时任务/任务调度</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item  label="状态" >
            <el-select v-model="formInline.status" placeholder="请选择状态">
              <el-option label="启动" value="1"></el-option>
              <el-option label="停止" value="2"></el-option>
              <el<el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="bz-task-job-table">
        <template>
          <el-table :data="tableData" max-height="560">
            <el-table-column label="序号" fixed="left" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column width="150px" prop="jobName" label="job名称">
            </el-table-column>
            <el-table-column width="150px" prop="jobGroup" label="job组">
            </el-table-column>
            <el-table-column width="200px" prop="triggerName"  label="trigger名称">
            </el-table-column>
            <el-table-column width="200px" prop="triggerGroupName"  label="trigger组名称">
            </el-table-column>
            <el-table-column width="250px" prop="processClass"  label="处理类">
            </el-table-column>
            <el-table-column width="250px" prop="cronExpression"  label="cron表达式">
            </el-table-column>
            <el-table-column width="80px" prop="status"  label="状态">
            </el-table-column>
            <el-table-column width="300px" prop="remark" label="备注">
            </el-table-column>
            <el-table-column width="160px" :formatter="dateFormat" prop="createDate" label="创建时间">
            </el-table-column>
            <el-table-column width="160px" :formatter="dateFormat" prop="modifiedDate" label="修改时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加任务调度" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="22">
                <el-form-item label="job名称" :label-width="formLabelWidth" prop="jobName">
                  <el-input v-model="form.jobName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="trigger名称" prop="triggerName" :label-width="formLabelWidth">
                  <el-input v-model="form.triggerName" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="job组" prop="jobGroup" :label-width="formLabelWidth">
                  <el-input  v-model="form.jobGroup" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="trigger组名称" prop="triggerGroupName" :label-width="formLabelWidth">
                  <el-input  v-model="form.triggerGroupName" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="处理类" prop="processClass" :label-width="formLabelWidth">
                  <el-input  v-model="form.processClass" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="cron表达式" prop="cronExpression" :label-width="formLabelWidth">
                  <el-input v-model="form.cronExpression" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="描述" prop="remark" :label-width="formLabelWidth">
                  <el-input   type="textarea" :autosize="{ minRows: 4, maxRows: 8}"  v-model="form.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                  <el-select style="width: 210px" v-model="form.status" placeholder="">
                    <el-option label="启动" value="1"></el-option>
                    <el-option label="停止" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改任务" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="22">
                <el-form-item label="job名称" :label-width="formLabelWidth" prop="jobName">
                  <el-input v-model="formtwo.jobName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="trigger名称" prop="triggerName" :label-width="formLabelWidth">
                  <el-input v-model="formtwo.triggerName" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="job组" prop="jobGroup" :label-width="formLabelWidth">
                  <el-input  v-model="formtwo.jobGroup" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="trigger组名称" prop="triggerGroupName" :label-width="formLabelWidth">
                  <el-input  v-model="formtwo.triggerGroupName" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="处理类" prop="processClass" :label-width="formLabelWidth">
                  <el-input  v-model="formtwo.processClass" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="cron表达式" prop="cronExpression" :label-width="formLabelWidth">
                  <el-input v-model="formtwo.cronExpression" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="描述" prop="remark" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="formtwo.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                  <el-select style="width: 210px" v-model="formtwo.status" placeholder="">
                    <el-option label="启动" :value="1"></el-option>
                    <el-option label="停止" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="任务详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <div class="box_xinxi">
              <div class="wrap_da">
                <div class="header">
                  <span>详情信息</span>
                  <span></span>
                </div>
                <div class="body_list dec1">
                  <div class="title">job名称:</div>
                  <div class="name">
                    {{formtwoInfo.jobName}}
                  </div>
                </div>
                <div class="body_list dec1">
                  <div class="title">trigger名称:</div>
                  <div class="name">
                    {{formtwoInfo.triggerName}}
                  </div>
                </div>
                <div class="body_list dec1">
                  <div class="title">job组:</div>
                  <div class="name">{{formtwoInfo.jobGroup}}</div>
                </div>
                <div class="body_list dec1">
                  <div class="title">trigger组名称:</div>
                  <div class="name">{{formtwoInfo.triggerGroupName}}</div>
                </div>
                <div class="body_list dec1">
                  <div class="title">处理类:</div>
                  <div class="name">
                    <div class="name">{{formtwoInfo.processClass}}</div>
                  </div>
                </div>
                <div class="body_list dec1">
                  <div class="title">cron表达式:</div>
                  <div class="name">
                    <div class="name">{{formtwoInfo.cronExpression}}</div>
                  </div>
                </div>
                <div class="body_list dec1">
                  <div class="title">描述:</div>
                  <div class="name">{{formtwoInfo.remark}}</div>
                </div>
                <div class="body_list">
                  <div class="title">创建时间:</div>
                  <div class="name">{{formtwoInfo.createDate}}</div>
                </div>
                <div class="body_list">
                  <div class="title">修改时间:</div>
                  <div class="name">{{formtwoInfo.modifiedDate}}</div>
                </div>
                <div class="body_list dec1">
                  <div class="title">状态:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.status==1">已启用</span>
                    <span  v-if="formtwoInfo.status==2">已停用</span>
                  </div>
                </div>
              </div>
            </div>
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
    name: 'BzTaskJob',
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
        form: {},
        rules: {
          jobName: [{
            required: true,
            message: '请输入job名称',
            trigger: 'blur'
          }],
          jobGroup: [{
            required: true,
            message: '请输入job组',
            trigger: 'blur'
          }],
          triggerName: [{
            required: true,
            message: '请输入trigger名称',
            trigger: 'blur'
          }],
          triggerGroupName: [{
            required: true,
            message: '请输入trigger组名称',
            trigger: 'blur'
          }],
          processClass: [{
            required: true,
            message: '请输入处理类',
            trigger: 'blur'
          }],
          triggerName: [{
            required: true,
            message: '请输入trigger名称',
            trigger: 'blur'
          }],
          cronExpression: [{
            required: true,
            message: '请输入cron表达式',
            trigger: 'blur'
          }],
          remark: [{
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }]
        },
        formLabelWidth: '120px',
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
                this.optionW = '160px'
              }

              if (this.upd && this.del) {
                this.upd=true;
                this.del=true;
                this.powerTrue =true;
                this.optionW = '225px';
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
          status: this.formInline.status
        }
        this.$fetch('/bz28/lotteryTaskJob/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].status == 1) {
                res.data.list[i].status = '启动'
              }else {
                res.data.list[i].status = '停止'
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
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
        this.isSubmit=false;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/bz28/lotteryTaskJob/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.accountList()
              } else {
                this.isSubmit=false;
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
        this.$fetch('/bz28/lotteryTaskJob/remove', parameterData).then(res => {
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
        this.$fetch('/bz28/lotteryTaskJob/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        this.$put('/bz28/lotteryTaskJob/modify', this.formtwo).then(res => {
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
        this.$fetch('/bz28/lotteryTaskJob/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.createDate =  formatDate(new Date(res.data.createDate), 'yyyy-MM-dd hh:mm:sss')
            res.data.modifiedDate =  formatDate(new Date(res.data.modifiedDate), 'yyyy-MM-dd hh:mm:sss')
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
  .bz-task-job-wrap .body_list.dec1{
    width: 100%;
  }

  .bz-task-job-wrap {
    width: 100%;
  }
  .bz-task-job-inner {
    margin: auto;
    padding: 0 20px;
  }

  .bz-task-job-header {
    margin-bottom: 20px;
  }

  .bz-task-job-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .bz-task-job-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
