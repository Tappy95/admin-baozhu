<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>心愿猪/用户分红心列表</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="账户Id:">
            <el-input v-model="formInline.accountId"
                      placeholder="请输入账户Id"
                      clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <!-- <el-button type="success" plain @click="load()" v-if="add">添加</el-button> -->
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column prop="accountId" label="账户Id">
            </el-table-column>
            <el-table-column prop="fhxNum" label="分红型数量">
            </el-table-column>
            <el-table-column prop="changedType" label="变更类型">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="changedTime" label="变更时间" :formatter="dateFormat">
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain size="mini" @click="getInfo(scope.row.userId)">详情</el-button>
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </template>
        <!-- <el-dialog title="添加" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="条件心愿值" :label-width="formLabelWidth" prop="additionNum">
                  <el-input v-model="form.additionNum" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序号" :label-width="formLabelWidth" prop="orderId">
                  <el-input v-model="form.orderId" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励心愿值" :label-width="formLabelWidth" prop="rewardNum">
                  <el-input v-model="form.rewardNum" auto-complete="off" style="width: 200px" clearable>
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
        </el-dialog> -->
        <el-dialog title="详情" :visible.sync="dialogTableVisible" width="800px">
          
          <el-form :model="formtwo">

            <el-row>
              <el-col :span="12">
                <el-form-item label="分红心总数" :label-width="formLabelWidth" prop="fhxTotal">
                  <el-input v-model="formtwo.fhxTotal" auto-complete="off" style="width: 200px" clearable :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分红心-有效" :label-width="formLabelWidth" prop="fhxActive">
                  <el-input v-model="formtwo.fhxActive" auto-complete="off" style="width: 200px" clearable :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分红心-过期" :label-width="formLabelWidth" prop="fhxOverdue">
                  <el-input v-model="formtwo.fhxOverdue" auto-complete="off" style="width: 200px" clearable :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="幸运星总数" :label-width="formLabelWidth" prop="xyxTotal">
                  <el-input v-model="formtwo.xyxTotal" auto-complete="off" style="width: 200px" clearable :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="变更时间" :label-width="formLabelWidth" prop="updateTime">
                  <el-input v-model="formtwo.updateTime" auto-complete="off" style="width: 200px" clearable :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button> -->
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
          additionNum: [{
            required: true,
            message: '请输入条件心愿值',
            trigger: 'blur'
          }],
          orderId: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
          rewardNum: [{
            required: true,
            message: '请输入奖励心愿值',
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
          accountId: this.formInline.accountId
        }
        this.$fetch('/wish/userFhxLog/listB', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.count;
            for(var i = 0;i<res.data.list.length;i++){
              // 1-抽奖 2-邀请好友 3-试玩任务 4-系统任务
              if(res.data.list[i].changedType==1){
                res.data.list[i].changedType = '抽奖';
              }else if(res.data.list[i].changedType==2){
                res.data.list[i].changedType = '邀请好友';
              }else if(res.data.list[i].changedType==3){
                res.data.list[i].changedType = '试玩任务';
              }else{
                res.data.list[i].changedType = '系统任务';
              }

              if(res.data.list[i].status==1){
                res.data.list[i].status = '有效';
              }else{
                res.data.list[i].status = '失效';
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
            this.$post('/wish/xyzReward/add', this.form).then(res => {
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
      
      getInfo(userId) {
        this.dialogTableVisible = true;
        this.$fetch('/wish/userFhxXyx/info', {
          userId: userId
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
            this.formtwo.updateTime = formatDate(new Date(res.data.updateTime),'yyyy-MM-dd')
          }
        })
      },
      update(formtwo) {
        this.$put('/wish/xyzReward/modify', this.formtwo).then(res => {
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
