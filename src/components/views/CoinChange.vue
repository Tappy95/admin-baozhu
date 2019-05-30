<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/金币记录</h3>
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
                  <el-option label="答题" value="1"></el-option>
                  <el-option label="签到" value="2"></el-option>
                  <el-option label="提现" value="3"></el-option>
                  <el-option label="推荐用户" value="4"></el-option>
                  <el-option label="徒弟贡献" value="5"></el-option>
                  <el-option label="VIP" value="6"></el-option>
                  <el-option label="游戏试玩" value="7"></el-option>
                  <el-option label="徒弟到达四级" value="8"></el-option>
                  <el-option label="新人注册" value="9"></el-option>
                  <el-option label="任务" value="10"></el-option>
                  <el-option label="出题" value="11"></el-option>
                  <el-option label="兑换金猪" value="12"></el-option>
                  <el-option label="阅读资讯" value="13"></el-option>
                  <el-option label="提现退回" value="14"></el-option>
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
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" plain @click="queryExport()">导出表格</el-button>
          </el-form-item>
        </el-form>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="100" fixed="left" prop="accountId" label="用户id">
            </el-table-column>
            <el-table-column min-width="120" prop="userName" label="姓名">
            </el-table-column>
            <el-table-column min-width="150" label="金币变动">
              <template slot-scope="scope">
                <p :class="scope.row.flowType==1?'amountred':'amountgreen'">
                  <span>{{scope.row.flowType==1?'+':'-'}}</span>{{scope.row.amount | currency}}
                </p>
              </template>
            </el-table-column>
            <!--</el-table-column>-->
            <!--"渠道关系">-->
            <!--</el-table-column>-->
            <el-table-column min-width="120" prop="roleType" label="身份标识">
            </el-table-column>
            <el-table-column prop="changedTime" min-width="170px" label="变更时间">
            </el-table-column>
            <el-table-column min-width="150" prop="remarks" label="备注">
            </el-table-column>
            <el-table-column fixed="right" v-if="exa" label="操作" :width="optionW">
              <template slot-scope="scope">
                <!--<el-button @click="getAuditingInfo(scope.row.id)" size="mini" ><span v-if="optionW='150px'"></span>审核</el-button>-->
                <el-button type="success" plain @click="getAuditingInfo(scope.row.id)" size="mini" v-if="exa && scope.row.changedType=='提现' && scope.row.status=='冻结'"><span v-if="optionW='150px'"></span>审核</el-button>
                <el-button type="info" plain @click="getInfo(scope.row.id)" size="mini" >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="详情" :visible.sync="dialogTable" width="800px">
          <el-form>
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="真实姓名:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="message.changedType==3" :span="12" style="margin-bottom: 10px">
                <el-form-item label="支付宝账号:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.aliNum" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币变动:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.amount | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="收支:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="message.flowType" :disabled="true"   placeholder="">
                    <el-option label="收入" :value="1"></el-option>
                    <el-option label="支出" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更原因:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="message.changedType" :disabled="true"   placeholder="">
                    <el-option label="答题" :value="1"></el-option>
                    <el-option label="签到" :value="2"></el-option>
                    <el-option label="提现" :value="3"></el-option>
                    <el-option label="推荐用户" :value="4"></el-option>
                    <el-option label="徒弟贡献" :value="5"></el-option>
                    <el-option label="VIP" :value="6"></el-option>
                    <el-option label="游戏试玩" :value="7"></el-option>
                    <el-option label="徒弟到达四级" :value="8"></el-option>
                    <el-option label="新人注册" :value="9"></el-option>
                    <el-option label="任务" :value="10"></el-option>
                    <el-option label="出题" :value="11"></el-option>
                    <el-option label="兑换金猪" :value="12"></el-option>
                    <el-option label="阅读资讯" :value="13"></el-option>
                    <el-option label="提现退回" :value="14"></el-option>
                    <el-option label="直属用户返利" :value="15"></el-option>
                    <el-option label="赠送运营总监" :value="16"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.changedTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="isNotAuditing" style="margin-bottom: 10px">
                <el-form-item label="审核时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.auditTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="isNotAuditing" style="margin-bottom: 10px">
                <el-form-item :style="styleObject" label="审核结果:" :label-width="formLabelWidth">
                  <el-select v-model="message.status" :disabled="true" @change="isAuditingChange(messageForm.status)"  placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="冻结" :value="2"></el-option>
                    <el-option label="拒绝" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col v-if="reasonMess" :span="20" style="margin-bottom: 10px">
                <el-form-item label="拒绝原因:" :label-width="formLabelWidth">
                  <el-input  :rows="4" :disabled="true"  type="textarea" v-model="message.reason"  auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTable=false">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="审核" :visible.sync="dialogTableVisible" width="800px">
          <el-form>
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="真实姓名:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col v-if="messageForm.changedType==3" :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付宝账号:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.account" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="提现金额（元）:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.amountM | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币余额:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.coin | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币变动:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.amount | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="收支:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="messageForm.flowType" :disabled="true"   placeholder="">
                    <el-option label="收入" :value="1"></el-option>
                    <el-option label="支出" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更原因:" :label-width="formLabelWidth">
                  <!--<el-input :value="messageForm.changedType" :disabled="true" auto-complete="off" style="" clearable></el-input>-->
                  <el-select :style="styleObject" v-model="messageForm.changedType" :disabled="true"   placeholder="">
                    <el-option label="答题" :value="1"></el-option>
                    <el-option label="签到" :value="2"></el-option>
                    <el-option label="提现" :value="3"></el-option>
                    <el-option label="推荐用户" :value="4"></el-option>
                    <el-option label="徒弟贡献" :value="5"></el-option>
                    <el-option label="VIP" :value="6"></el-option>
                    <el-option label="游戏试玩" :value="7"></el-option>
                    <el-option label="徒弟到达四级" :value="8"></el-option>
                    <el-option label="新人注册" :value="9"></el-option>
                    <el-option label="任务" :value="10"></el-option>
                    <el-option label="出题" :value="11"></el-option>
                    <el-option label="兑换金猪" :value="12"></el-option>
                    <el-option label="阅读资讯" :value="13"></el-option>
                    <el-option label="提现退回" :value="14"></el-option>
                    <el-option label="直属用户返利" :value="15"></el-option>
                    <el-option label="赠送运营总监" :value="16"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.changedTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="审核时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.auditTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="审核结果:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="messageForm.status" @change="isAuditingChange(messageForm.status)"  placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="冻结" :value="2"></el-option>
                    <el-option label="拒绝" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col v-if="reasonMess" :span="20" style="margin-bottom: 10px">
                <el-form-item label="拒绝原因:" :label-width="formLabelWidth">
                  <el-input :rows="4"  type="textarea" v-model="messageForm.reason"  auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible=false">取消</el-button>
            <el-button type="primary" @click="update(messageForm)">确 定</el-button>
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
    name: 'CoinChange',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        searchTrue:false,
        isNotAuditing:false,
        optionW:'75px',
        messageForm:{},
        reasonMess:false,
        dialogTableVisible:false,
        dialogTable:false,
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          userName:"",
          changedType:'',
          mobile:'',
          accountId:'',
          flowType:''
        },
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        message:{},
        exa:false
      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    methods: {
      //导出表格
      queryExport() {
          let userName=this.formInline.userName;
          let  changedType=this.formInline.changedType;
          let mobile=this.formInline.mobile;
          let  accountId=this.formInline.accountId;
          let  flowType=this.formInline.flowType;
          let token= getSession("token");
          let channel= getSession("channelCode")
          let relation= getSession("userRelation");

          let url = '/api/excl/exclCoinChange';
          let data = {url,userName,changedType,mobile,accountId,flowType,token,channel,relation};
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
          channel=obj.channel,
          relation=obj.relation

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
          http=http+'?token='+token+'&channel='+channel+'&relation='+relation
        }else{
          http=http+'&token='+token+'&channel='+channel+'&relation='+relation
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
            if(res.data[i].btnCode == 'exa') {
              this.powerTrue =true;
              this.exa=true
            }
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

        this.$fetch('/api/lCoinChange/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            res.data.list[i].changedTime=formatDate(new Date(res.data.list[i].changedTime), 'yyyy-MM-dd hh:mm:sss')
            // if(res.data.list[i].flowType == '1') {
            //   res.data.list[i].flowType = '收入'
            // } else {
            //   res.data.list[i].flowType = '支出'
            // }


            switch (res.data.list[i].changedType) {
              case 1:
                res.data.list[i].changedType = '答题';
                break;
              case 2:
                res.data.list[i].changedType = '签到';
                break;
              case 3:
                res.data.list[i].changedType = '提现';
                break;
              case 4:
                res.data.list[i].changedType = '推荐用户';
                break;
              case 5:
                res.data.list[i].changedType = '徒弟贡献';
                break;
              case 6:
                res.data.list[i].changedType = 'VIP';
                break;
              case 7:
                res.data.list[i].changedType = '游戏试玩';
                break;
              case 8:
                res.data.list[i].changedType = '徒弟到达四级';
                break;
              case 9:
                res.data.list[i].changedType = '新人注册';
                break;
              case 10:
                res.data.list[i].changedType = '任务';
                break;
              case 11:
                res.data.list[i].changedType = '出题';
                break;
              case 12:
                res.data.list[i].changedType = '兑换金猪';
                break;
              case 13:
                res.data.list[i].changedType = '阅读资讯';
                break;
              case 14:
                res.data.list[i].changedType = '提现退回';
                break;
              case 15:
                res.data.list[i].changedType = '直属用户返利';
                break;
              case 16:
                res.data.list[i].changedType = '赠送运营总监';
                break;
              // default:
            }
            // if(res.data.list[i].changedType == '1'){
            //   res.data.list[i].changedType = '答题'
            // }else if(res.data.list[i].changedType == '2'){
            //   res.data.list[i].changedType = '签到'
            // }else if(res.data.list[i].changedType == '3'){
            //   res.data.list[i].changedType = '提现'
            // } else if(res.data.list[i].changedType == '4'){
            //   res.data.list[i].changedType = '推荐用户'
            // } else if(res.data.list[i].changedType == '5'){
            //   res.data.list[i].changedType = '徒弟贡献'
            // }else if(res.data.list[i].changedType == '6'){
            //   res.data.list[i].changedType = 'VIP'
            // }else if(res.data.list[i].changedType == '7'){
            //   res.data.list[i].changedType = '游戏试玩'
            // }else if(res.data.list[i].changedType == '8'){
            //   res.data.list[i].changedType = '徒弟到达四级'
            // }else if(res.data.list[i].changedType == '9'){
            //   res.data.list[i].changedType = '新人注册'
            // }else if(res.data.list[i].changedType == '10'){
            //   res.data.list[i].changedType = '任务'
            // }else if(res.data.list[i].changedType == '11'){
            //   res.data.list[i].changedType = '出题'
            // }else if(res.data.list[i].changedType == '12'){
            //   res.data.list[i].changedType = '兑换金猪'
            // }else if(res.data.list[i].changedType == '13'){
            //   res.data.list[i].changedType = '阅读资讯'
            // }else if(res.data.list[i].changedType == '14'){
            //   res.data.list[i].changedType = '提现退回'
            // }else if(res.data.list[i].changedType == '15'){
            //   res.data.list[i].changedType = '直属用户返利'
            // }else if(res.data.list[i].changedType == '16'){
            //   res.data.list[i].changedType = '赠送运营总监'
            // }

            if(res.data.list[i].roleType == '1'){
              res.data.list[i].roleType = '小猪猪'
            }else if(res.data.list[i].roleType == '2'){
              res.data.list[i].roleType = '团队长'
            }else if(res.data.list[i].roleType == '3'){
              res.data.list[i].roleType = '超级合伙人'
            }

            if(res.data.list[i].status == '1'){
              res.data.list[i].status = '正常'
            }else if(res.data.list[i].status == '2'){
              res.data.list[i].status = '冻结'
            }else{
              res.data.list[i].status = '拒绝'
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
        this.reasonMess=false
        this.isNotAuditing=false
        this.dialogTable = true
        this.$fetch('/api/lCoinChange/info', {
          id: id
        }).then(res => {
           if ((res.statusCode+"").startsWith("2")) {
            if(res.data.status==3){
              this.reasonMess=true
            }
          res.data.changedTime=formatDate(new Date(res.data.changedTime), 'yyyy-MM-dd hh:mm:sss')
          res.data.auditTime=formatDate(new Date(res.data.auditTime), 'yyyy-MM-dd hh:mm:sss')
          this.message=res.data
         }
      })
      },
      getAuditingInfo(id){
        this.reasonMess=false
        this.dialogTableVisible = true
        this.$fetch('/api/lCoinChange/queryWithdrawalsInfo', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          if(res.data.status==3){
            this.reasonMess=true
          }
          res.data.changedTime=formatDate(new Date(res.data.changedTime), 'yyyy-MM-dd hh:mm:sss')
          res.data.auditTime=formatDate(new Date(res.data.auditTime), 'yyyy-MM-dd hh:mm:sss')
          this.messageForm=res.data
        }
       })
      },
      update(messageForm) {
        let parameterData = {
          id: this.messageForm.id,
          status:this.messageForm.status,
          reason:this.messageForm.reason
        }
        this.$fetch('/api/lCoinChange/audit', parameterData).then(res => {
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
      isAuditingChange(status){
        if(status==3){
          this.reasonMess=true
        }else{
          this.reasonMess=false
        }
      },
      search(){
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
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

  .amountred{
    color: #ff4d51;
  }
  .amountgreen{
    color: #13ce66;
  }
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
