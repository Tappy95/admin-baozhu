<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>心愿猪/阶段任务奖励管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="阶段名称:">
            <el-input  v-model="formInline.levelName" placeholder="请输入阶段名称" auto-complete="off"  clearable>
            </el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='60'>
            </el-table-column>
            <el-table-column prop="levelName" label="阶段名称">
            </el-table-column>
            <el-table-column prop="orderId" label="排序id">
            </el-table-column>
            <el-table-column prop="apprenticeNum" label="徒子徒孙数量">
            </el-table-column>
            <el-table-column prop="apprenticeIncome" label="徒子徒孙贡献收益(单位:元)">
            </el-table-column>
            <el-table-column prop="rewardFhxNum" label="奖励分红心数量">
            </el-table-column>
            <el-table-column prop="rewardXyxPercent" label="奖励幸运星百分比">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="阶段名称" :label-width="formLabelWidth" prop="levelName">
                  <el-input v-model="form.levelName" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序id" :label-width="formLabelWidth" prop="orderId">
                  <el-input v-model="form.orderId" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="徒子徒孙数量" :label-width="formLabelWidth" prop="apprenticeNum">
                  <el-input v-model="form.apprenticeNum" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="徒子徒孙贡献收益(单位:元)" :label-width="formLabelWidth" prop="apprenticeIncome">
                  <el-input v-model="form.apprenticeIncome" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励分红心数量" :label-width="formLabelWidth" prop="rewardFhxNum">
                  <el-input v-model="form.rewardFhxNum" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励幸运星百分比" :label-width="formLabelWidth" prop="rewardXyxPercent">
                  <el-input v-model="form.rewardXyxPercent" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                  <el-select v-model="form.status" placeholder="">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogTableVisible" width="800px">
          
          <el-form :model="formtwo">

            <el-row>
              <el-col :span="12">
                <el-form-item label="阶段名称" :label-width="formLabelWidth" prop="levelName">
                  <el-input v-model="formtwo.levelName" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序id" :label-width="formLabelWidth" prop="orderId">
                  <el-input v-model="formtwo.orderId" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="徒子徒孙数量" :label-width="formLabelWidth" prop="apprenticeNum">
                  <el-input v-model="formtwo.apprenticeNum" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="徒子徒孙贡献收益(单位:元)" :label-width="formLabelWidth" prop="apprenticeIncome">
                  <el-input v-model="formtwo.apprenticeIncome" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励分红心数量" :label-width="formLabelWidth" prop="rewardFhxNum">
                  <el-input v-model="formtwo.rewardFhxNum" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励幸运星百分比" :label-width="formLabelWidth" prop="rewardXyxPercent">
                  <el-input v-model="formtwo.rewardXyxPercent" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                  <el-select v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
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
    name: 'ResourceType',
    data() {
      return {
        powerTrue:false,
        optionW:'',
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
          levelName: [{
            required: true,
            message: '请输入阶段名称',
            trigger: 'blur'
          }],
          orderId: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
          apprenticeNum: [{
            required: true,
            message: '请输入徒子徒孙数量',
            trigger: 'blur'
          }],
          apprenticeIncome: [{
            required: true,
            message: '请输入徒子徒孙贡献收益',
            trigger: 'blur'
          }],
          rewardFhxNum: [{
            required: true,
            message: '请输入奖励分红心数量',
            trigger: 'blur'
          }],
          rewardXyxPercent: [{
            required: true,
            message: '请输入奖励幸运星百分比',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
        },
        formLabelWidth: '140px',
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
                this.optionW = '75px'
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '75px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '150px'
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
          levelName: this.formInline.levelName
        }
        this.$fetch('/wish/stageReward/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            for(var i =0;i<res.data.list.length;i++){
              if(res.data.list[i].status==1){
                res.data.list[i].status = '启用';
              }else{
                res.data.list[i].status = '停用';
              }
            }
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
            this.$post('/wish/stageReward/add', this.form).then(res => {
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
        this.$post('/wish/stageReward/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.formInline = {};
            this.accountList();
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！'
            })
          }
        })
      },
      getInfo(id) {
        this.dialogTableVisible = true;
        this.$fetch('/wish/stageReward/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        this.$put('/wish/stageReward/modify', this.formtwo).then(res => {
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
        this.$fetch('/api/appNotice/info', {
          id: id
        }).then(res => {
          if(res.data != null ){
            if (res.data.staffType == '2') {
              this.isShow = false
            } else {
              this.isShow = true
            }          res.data.createrTime =  formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss')

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
