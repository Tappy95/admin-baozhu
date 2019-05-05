<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/交易记录xs</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="电话">
            <el-input v-model="formInline.mobile" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item label="审核状态" :label-width="formLabelWidth">
            <el-select v-model="formInline.isAuditing" placeholder="">
              <el-option label="待审核" value="1"></el-option>
              <el-option label="审核中" value="2"></el-option>
              <el-option label="拒绝" value="3"></el-option>
              <el-option label="通过" value="4"></el-option>
              <el-option label="全部" value="-1"></el-option>
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
            <el-table-column fixed="left" width="150px" prop="mobile" label="电话">
            </el-table-column>
            <el-table-column prop="userName" label="真实姓名">
            </el-table-column>
            <el-table-column prop="flowType" label="收支">
            </el-table-column>
            <el-table-column prop="amount" width="150px" label="变更金额(元)">
            </el-table-column>
            <el-table-column prop="account" width="200px" label="账户号">
            </el-table-column>
            <el-table-column prop="accountType" label="账号类型">
            </el-table-column>
            <el-table-column prop="changedType" label="变更类型">
            </el-table-column>
            <el-table-column prop="isAuditing" label="审核状态">
            </el-table-column>
            <el-table-column prop="reviewTime" width="200px" label="审核时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="getInfo(scope.row.logId,2)" size="mini">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="提现详情" :visible.sync="dialogTable" width="800px">
          <el-form>
            <el-row>
              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item label="用户id:" :label-width="formLabelWidth">
                  <el-input :value="message.userId" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="真实姓名:" :label-width="formLabelWidth">
                  <el-input :value="message.mobile" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="手机号:" :label-width="formLabelWidth">
                  <el-input :value="message.mobile" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="账户号:"  :label-width="formLabelWidth">
                  <el-input :value="message.account" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="账号类型:" :label-width="formLabelWidth">
                  <el-input :value="message.accountType" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="变更金额:" :label-width="formLabelWidth">
                  <el-input :value="'￥'+message.amount" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="变更时间:" :label-width="formLabelWidth">
                  <el-input :value="message.changedTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="变更类型:" :label-width="formLabelWidth">
                  <el-input :value="message.changedType" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="流水类型:" :label-width="formLabelWidth">
                  <el-input :value="message.flowType " :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="审核时间:" :label-width="formLabelWidth">
                  <el-input :value="message.reviewTime " :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="审核结果:" :label-width="formLabelWidth">
                  <el-input :value="message.isAuditing " :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="reasonMess" :span="20" style="margin-bottom: 10px">
                <el-form-item label="拒绝原因:" :label-width="formLabelWidth">
                  <el-input :rows="4"  type="textarea" :value="message.reason" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTable = false">取 消</el-button>
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
    name: 'TransactionChange',
    data() {
      return {
        dialogTableVisible: false,
        dialogTable:false,
        formtwo: {},
        dialogFormVisible: false,
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
        reasonMess:false,
        rules: {
          noticeTitle: [{
            required: true,
            message: '请输入公告标题',
            trigger: 'blur'
          }],
          noticeContent: [{
            required: true,
            message: '请输入公告内容',
            trigger: 'blur'
          }],
          isRelease: [{
            required: true,
            message: '请选择是否发布',
            trigger: 'change'
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
        message:{}
      }
    },
    created() {
      this.accountList()
    },
    methods: {
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
          mobile:this.formInline.mobile,
          isAuditing:this.formInline.isAuditing
      }
        this.$fetch('/api/lBalanceChange/userWithdrawalslist', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].accountType == '1') {
              res.data.list[i].accountType = '微信'
            } else {
              res.data.list[i].accountType = '支付宝'
            }
            if(res.data.list[i].isAuditing == '1'){
              res.data.list[i].isAuditing = '待审核'
            }else if(res.data.list[i].isAuditing == '2'){
              res.data.list[i].isAuditing = '审核中'
            }else if(res.data.list[i].isAuditing == '3'){
              res.data.list[i].isAuditing = '拒绝'
            }else if(res.data.list[i].isAuditing == '4'){
              res.data.list[i].isAuditing = '成功'
            }else {
              res.data.list[i].isAuditing = '无需审核'
            }
            if(res.data.list[i].changedType == '1'){
              res.data.list[i].changedType = '充值'
            }else if(res.data.list[i].changedType == '2'){
              res.data.list[i].changedType = '提现'
            }else if(res.data.list[i].changedType == '3'){
              res.data.list[i].changedType = '推荐好友'
            }else if(res.data.list[i].changedType == '4'){
              res.data.list[i].changedType = '参与打卡'
            }else {
              res.data.list[i].changedType = '打卡奖励'
            }
            if(res.data.list[i].flowType == '1'){
              res.data.list[i].flowType = '收入'
            }else {
              res.data.list[i].flowType = '支出'
            }
             if(res.data.list[i].account == '' || res.data.list[i].account ==null){
               res.data.list[i].account = "-"
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
          if(this.formInline.isAuditing == -1){
            this.formInline.isAuditing = ''
          }

        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
      },
      getInfo(id,types) {
        if (types==1){
          this.dialogTableVisible = true
        }else {
          this.dialogTable = true
        }
        this.$fetch('/api/lBalanceChange/queryOne', {
          logId: id
        }).then(res => {
          if(res.data != null ){
          if (res.data.staffType == '2') {
            this.isShow = false
          } else {
            this.isShow = true
          }
            if(res.data.flowType ==1){
              res.data.flowType = "收入"
            }else{
              res.data.flowType = "支出"
            }
            if(res.data.accountType ==1){
              res.data.accountType = "微信"
            }else{
              res.data.accountType = "支付宝"
            }
            if(res.data.changedType ==1){
              res.data.changedType = "充值"
            }else if(res.data.changedType ==2){
              res.data.changedType = "提现"
            }else if(res.data.changedType ==3){
              res.data.changedType = "推荐好友"
            }else if(res.data.changedType ==4){
              res.data.changedType = "参与打卡"
            }else if(res.data.changedType ==5){
              res.data.changedType = "打卡奖励"
            }
            this.reasonMess = false
            if(!this.dialogTableVisible){
              if (res.data.isAuditing ==1) {
                res.data.isAuditing ='待审核'
              }else if (res.data.isAuditing ==2){
                res.data.isAuditing ='审核中'
              }else if (res.data.isAuditing ==3){
                res.data.isAuditing ='拒绝'
                this.reasonMess = true
              }else if (res.data.isAuditing ==4){
                res.data.isAuditing ='通过'
              }else {
                res.data.isAuditing ='无需审核'
              }
            }else {
              if (res.data.isAuditing ==3) {
                this.reasonMess = true
              }
            }
            res.data.reviewTime =  formatDate(new Date(res.data.reviewTime), 'yyyy-MM-dd hh:mm:sss')
            res.data.changedTime =  formatDate(new Date(res.data.changedTime), 'yyyy-MM-dd hh:mm:sss')
            this.message = res.data
        }
      })
      },
      isAuditingChange(isAuditing){
         if(isAuditing==3){
           this.reasonMess=true
         }else{
           this.reasonMess=false
         }
      },
      update(message) {
        let parameterData = {
          logId: this.message.logId,
          isAuditing:this.message.isAuditing,
          reason:this.message.reason
        }
        this.$put('/api/lBalanceChange/modify', parameterData).then(res => {
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
        console.log(this.isShow)
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
