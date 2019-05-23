<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/金猪记录</h3>
        <hr />
      </div>
      <div>
        <el-form  :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item  label="用户姓名:">
            <el-input v-model="formInline.userName" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item  label="电话号码:">
            <el-input  v-model="formInline.mobile" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item  label="状态:" >
            <el-select v-model="formInline.changedType"  placeholder="">
              <el-option label="vip" value="1"></el-option>
              <el-option label="提现" value="2"></el-option>
              <el-option label="任务" value="3"></el-option>
              <el-option label="试玩" value="4"></el-option>
              <el-option label="金币兑换获得" value="5"></el-option>
              <el-option label="竞猜" value="6"></el-option>
              <el-option label="vip救济金猪" value="7"></el-option>
              <el-option label="金猪抽奖" value="8"></el-option>
              <el-option label="抽奖退回" value="9"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户id:">
            <el-input v-model="formInline.accountId" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item label="收支:" >
            <el-select v-model="formInline.flowType"  placeholder="">
              <el-option label="收入" value="1"></el-option>
              <el-option label="支出" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
             <el-button @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="queryExport()">导出表格</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" min-width="120" prop="accountId" label="用户id">
            </el-table-column>
            <el-table-column prop="userName" min-width="120" label="姓名">
            </el-table-column>
            <el-table-column  prop="amount" min-width="150" label="变更金额">
            </el-table-column>
            <el-table-column  prop="flowType" min-width="120" label="收支">
            </el-table-column>
            <el-table-column prop="changedType" min-width="150" label="变更原因">
            </el-table-column>
            <el-table-column prop="channelCode" min-width="120" label="渠道标识">
            </el-table-column>
            <el-table-column prop="channelRelation" min-width="120" label="渠道关系">
            </el-table-column>
            <el-table-column prop="roleType" min-width="120" label="角色类型">
            </el-table-column>
            <el-table-column prop="remarks" min-width="150" label="备注">
            </el-table-column>
            <el-table-column width="170px" prop="changedTime" label="变更时间">
            </el-table-column>
            <!--<el-table-column fixed="right" label="操作" width="75px">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button @click="getInfo(scope.row.id)" size="mini">查看</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </template>
        <el-dialog title="详情" :visible.sync="dialogTable" width="800px">
          <el-form>
            <el-row>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="真实姓名:" :label-width="formLabelWidth">
                  <el-input :value="message.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="变更金额:" :label-width="formLabelWidth">
                  <el-input :value="message.amount" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="收支:" :label-width="formLabelWidth">
                  <el-input :value="message.flowType" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="变更原因:" :label-width="formLabelWidth">
                  <el-input :value="message.changedType" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="变更时间:" :label-width="formLabelWidth">
                  <el-input :value="message.changedTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTable==false">确 定</el-button>
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
  import { getSession } from '../../utils/cookie'

  export default {
    name: 'PigChange',
    data() {
      return {
        dialogTable:false,
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        message:{},
        searchTrue:false,
        menuId:'',
        formInline: {
          userName:"",
          changedType:'',
          mobile:'',
          accountId:'',
          flowType:''
        },
      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns();
      this.accountList();
    },
    methods: {
      //导出表格
      queryExport() {
        // if (this.tableData.length<1){
        //   this.$message({
        //     type: 'error',
        //     message: '请选择要导出的数据',
        //     duration: 3000
        //   })
        //   return false;
        // }
        let userName=this.formInline.userName;
        let  changedType=this.formInline.changedType;
        let mobile=this.formInline.mobile;
        let  accountId=this.formInline.accountId;
        let  flowType=this.formInline.flowType;
        let token= getSession("token");
        let channel= getSession("channelCode");

        let url = '/api/excl/exclPigChange';
        let data = {url,userName,changedType,mobile,accountId,flowType,token,channel};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          userName=obj.userName,
          changedType=obj.changedType,
          mobile=obj.mobile,
          accountId=obj.accountId,
          flowType=obj.flowType,
          token= obj.token,
          channel=obj.channel

        let a1 = document.createElement('a');
        let http=url;
        if(http==url){
          if(userName!=null && userName!=''){
            http=http+'?userName=' + userName
          }
        }
        if(http==url){
          if(changedType!=null && changedType!=''){
            http=http+'?changedType=' + changedType
          }
        }else{
          if(changedType!=null && changedType!=''){
            http=http+'&changedType=' + changedType
          }
        }
        if(http==url){
          if(mobile!=null && mobile!=''){
            http=http+'?mobile=' + mobile
          }
        }else{
          if(mobile!=null && mobile!=''){
            http=http+'&mobile=' + mobile
          }
        }
        if(http==url){
          if(accountId!=null && accountId!=''){
            http=http+'?accountId=' + accountId
          }
        }else{
          if(accountId!=null && accountId!=''){
            http=http+'&accountId=' + accountId
          }
        }
        if(http==url){
          if(flowType!=null && flowType!=''){
            http=http+'?flowType=' + flowType
          }
        }else{
          if(flowType!=null && flowType!=''){
            http=http+'&flowType=' + flowType
          }
        }
        if(http==url){
          http=http+'?token='+token+'&channel='+channel
        }else{
          http=http+'&token='+token+'&channel='+channel
        }
        //a1.setAttribute('href',url + '?userName=' + userName +'&changedType='+changedType +'&mobile='+mobile +'&accountId='+accountId +'&flowType='+flowType+'&token='+token +'&channel='+channel);
        a1.setAttribute('href',http);
        let body = document.querySelector('body');
        body.appendChild(a1);
        a1.click();
        a1.remove();
      },
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'search') {
                this.searchTrue =true;
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
          userName:this.formInline.userName,
          changedType:this.formInline.changedType,
          mobile:this.formInline.mobile,
          accountId:this.formInline.accountId,
          flowType:this.formInline.flowType
        }

        this.$fetch('/api/lPigChange/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            res.data.list[i].changedTime=formatDate(new Date(res.data.list[i].changedTime), 'yyyy-MM-dd hh:mm:sss')
            if(res.data.list[i].flowType == '1') {
              res.data.list[i].flowType = '收入'
            } else {
              res.data.list[i].flowType = '支出'
            }

            if(res.data.list[i].changedType == '1'){
              res.data.list[i].changedType = 'vip'
            }else if(res.data.list[i].changedType == '2'){
              res.data.list[i].changedType = '提现'
            }else if(res.data.list[i].changedType == '3'){
              res.data.list[i].changedType = '任务'
            }else if(res.data.list[i].changedType == '4'){
              res.data.list[i].changedType = '游戏试玩'
            }else if(res.data.list[i].changedType == '5'){
              res.data.list[i].changedType = '金币兑换'
            }else if(res.data.list[i].changedType == '6'){
              res.data.list[i].changedType = '竞猜'
            }else if(res.data.list[i].changedType == '7'){
              res.data.list[i].changedType = 'vip救济金'
            }else if(res.data.list[i].changedType == '8'){
              res.data.list[i].changedType = '金猪抽奖'
            }else if(res.data.list[i].changedType == '9'){
              res.data.list[i].changedType = '抽奖退回'
            }

            if(res.data.list[i].roleType == '1'){
              res.data.list[i].roleType = '小猪猪'
            }else if(res.data.list[i].roleType == '2'){
              res.data.list[i].roleType = '团队长'
            }else if(res.data.list[i].roleType == '3'){
              res.data.list[i].roleType = '超级合伙人'
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
      getInfo(id) {
        this.dialogTable = true
        this.$fetch('/api/lPigChange/info', {
          id: id
        }).then(res => {
          if(res.data != null ){
          if(res.data.flowType == '1') {
            res.data.flowType = '收入'
          } else {
            res.data.flowType = '支出'
          }
          if(res.data.changedType == '1'){
            res.data.changedType = 'vip'
          }else if(res.data.changedType == '2'){
            res.data.changedType = '提现'
          }else if(res.data.changedType == '3'){
            res.data.changedType = '任务'
          }else if(res.data.changedType == '4'){
            res.data.changedType = '游戏试玩'
          }else if(res.data.changedType == '5'){
            res.data.changedType = '金币兑换'
          }else if(res.data.changedType == '6'){
            res.data.changedType = '竞猜'
          }else if(res.data.changedType == '7'){
            res.data.changedType = 'vip救济金'
          }else if(res.data.changedType == '8'){
            res.data.changedType = '金猪抽奖'
          }else if(res.data.changedType == '9'){
            res.data.changedType = '抽奖退回'
          }
          res.data.changedTime=formatDate(new Date(res.data.changedTime), 'yyyy-MM-dd hh:mm:sss')
          this.message=res.data
         }
      })
      },
      search(){
        this.currentPage=1;
        this.accountList();
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
