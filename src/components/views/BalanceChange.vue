<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/交易记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="电话:">
            <el-input v-model="formInline.mobile" placeholder="请输入电话" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column fixed="left" prop="mobile"  label="电话">
            </el-table-column>
            <el-table-column prop="userName"   label="真实姓名">
            </el-table-column>
            <el-table-column label="变更金额(￥)">
              <template slot-scope="scope">
                <span>{{scope.row.amount | currencyFixed}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="account"  label="账户号">
            </el-table-column>
            <el-table-column prop="accountType"  label="账号类型">
            </el-table-column>
            <el-table-column fixed="right"  label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="success" plain @click="getInfo(scope.row.logId,1)" size="mini" v-if="exa">审核</el-button>
                <el-button type="info" plain @click="getInfo(scope.row.logId,2)" size="mini">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="审核详情" :visible.sync="dialogTableVisible" width="800px">
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
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(message)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="提现详情" :visible.sync="dialogTable" width="800px">
          <el-form>
            <el-row>
              <el-col :span="20" style="margin-bottom: 10px">
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

              <el-col :span="10" style="margin-bottom: 10px" >
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
    name: 'BalanceChange',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        exa:false,
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
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currencyFixed: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    methods: {
      //权限按钮
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          // for(let i = res.data.length - 1; i >= 0; i--) {
          //   //审核
          //   if(res.data[i].btnCode == 'exa') {
          //     this.exa=true
          //   }
          //
          //   if (this.exa) {
          //     this.powerTrue =true;
          //     this.optionW = '150px'
          //   }
          // }
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
          // changedType:2,
          mobile:this.formInline.mobile
      }

        this.$fetch('/api/lBalanceChange/userWithdrawalslist', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].accountType == '1') {
              res.data.list[i].accountType = '微信'
            } else {
              res.data.list[i].accountType = '支付宝'
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
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      load() {
        this.form={}
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
            }else {
              res.data.changedType = "购买会员"
            }
            this.reasonMess = false
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
