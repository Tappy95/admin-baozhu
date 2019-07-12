<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/提现管理</h3>
        <hr />
      </div>
      <div>
        <el-form  :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item  label="提现订单:" :label-width="labelWidth">
            <el-input v-model="formInline.outTradeNo" placeholder="请输入提现订单" clearable></el-input>
          </el-form-item>
          <el-form-item  label="用户ID:" :label-width="labelWidth">
            <el-input  v-model="formInline.accountId" placeholder="请输入用户ID" clearable></el-input>
          </el-form-item>
          <el-form-item :label-width="labelWidth"  label="提现状态:" >
            <el-select v-model="formInline.state"  placeholder="请选择提现状态">
              <el-option label="审核中" value="1"></el-option>
              <el-option label="提现成功" value="2"></el-option>
              <el-option label="提现失败" value="3"></el-option>
              <el-option label="提现异常" value="4"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="labelWidth"  label="锁定状态:" >
            <el-select v-model="formInline.isLocking"  placeholder="请选择锁定状态">
              <el-option label="锁定" value="1"></el-option>
              <el-option label="未锁定" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  :label-width="labelWidth" label="银行卡号:">
            <el-input  v-model="formInline.bankNum" placeholder="请输入银行卡号" clearable></el-input>
          </el-form-item>

          <el-form-item v-if="channelCode=='baozhu'" :label-width="labelWidth" label="渠道标识:">
            <el-input  v-model="formInline.channelCode" placeholder="请输入渠道标识" clearable></el-input>
          </el-form-item>

          <el-form-item :label-width="labelWidth"  label="提现金额:">
            <el-input type="number" style="width: 150px" min="0" v-model="formInline.coinMin" placeholder="最小金额" clearable></el-input>
          </el-form-item>
          <el-form-item  label="至">
            <el-input type="number" style="width: 150px" min="0" v-model="formInline.coinMax" placeholder="最大金额" clearable></el-input>
          </el-form-item>
          <el-form-item :label-width="labelWidth"  label="第">
            <el-input type="number" style="width: 120px" min="0" v-model="formInline.days" placeholder="请输入天数" clearable></el-input>
            <span class="day-title">天提现</span><span class="day-tip">(相对注册时间而言 注册当天算第一天)</span>
          </el-form-item>
          <el-form-item :label-width="labelWidth" label="提现时间:">
            <el-date-picker
              v-model="selectTime"
              type="datetimerange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label-width="labelWidth" label="审核时间:">
            <el-date-picker
              v-model="examineSelectTime"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

          <el-form-item :label-width="labelWidth">
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item v-if="exportExle" :label-width="labelWidth">
            <el-button type="success"  plain @click="queryExport()" >导出表格</el-button>
          </el-form-item>
          <el-form-item :label-width="labelWidth">
            <el-button  v-if="lockAll" type="warning" plain @click="lockAllTap()">全部锁定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="548" :row-class-name="tableRowClassName">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="220" fixed="left" prop="outTradeNo" label="订单号">
            </el-table-column>
            <el-table-column min-width="120" prop="accountId" label="用户id">
            </el-table-column>
            <el-table-column min-width="150" prop="channelCode" label="渠道号">
            </el-table-column>
            <el-table-column  min-width="150px" label="提现金币">
              <template slot-scope="scope">
                <span class="amountred">
                 {{scope.row.coin | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column min-width="130" prop="actualAmount" label="实际提现金额(￥)">
            </el-table-column>
            <el-table-column min-width="130px" prop="serviceCharge"  label="提现服务费(￥)">
            </el-table-column>
            <el-table-column  min-width="120"  label="兑换比例">
              <template slot-scope="scope">
                <span>
                  1:{{scope.row.coinToMoney}}
                </span>
              </template>
            </el-table-column>
            <el-table-column  min-width="150px" label="金币余额">
              <template slot-scope="scope">
                <span class="amountgreen">
                {{scope.row.coinBalance | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="bankName" min-width="120"  label="银行名称">
            </el-table-column>
            <el-table-column prop="bankNum" min-width="150px" label="银行卡号">
            </el-table-column>
            <el-table-column prop="userName" min-width="150"  label="用户真实姓名">
            </el-table-column>
            <el-table-column prop="registerTime" min-width="170"  label="注册时间">
              <template slot-scope="scope">
                <span v-if="scope.row.registerTime">
                  {{scope.row.registerTime | dateForm}}
                </span>
                <span v-else> </span>
              </template>
            </el-table-column>
            <el-table-column  min-width="160px" label="用户提现时间">
              <template slot-scope="scope">
                <span v-if="scope.row.creatorTime">
                  {{scope.row.creatorTime | dateForm}}
                </span>
                <span v-else> </span>
              </template>
            </el-table-column>
            <el-table-column prop="operatorName" min-width="150"  label="操作人姓名">
            </el-table-column>
            <el-table-column  min-width="160px" label="审核时间">
              <template slot-scope="scope">
                <span v-if="scope.row.examineTime">
                  {{scope.row.examineTime | dateForm}}
                </span>
                <span v-else> </span>
              </template>
            </el-table-column>
            <el-table-column prop="remarks" min-width="220"  label="备注">
            </el-table-column>
            <el-table-column  min-width="120px" label="状态">
              <template slot-scope="scope">
                <span class="blue" v-if="scope.row.state==1">审核中</span>
                <span class="amountgreen" v-if="scope.row.state==2">提现成功</span>
                <span class="amountred" v-if="scope.row.state==3">提现失败</span>
                <span class="amountred" v-if="scope.row.state==4">提现异常</span>
              </template>
            </el-table-column>
            <el-table-column  min-width="120px" label="是否锁定">
              <template slot-scope="scope">
                <span v-if="scope.row.isLocking==1">是</span>
                <span v-if="scope.row.isLocking==2">否</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" v-if="powerTrue" :width="optionW" label="操作" >
              <template slot-scope="scope">
                <el-button type="warning" plain v-if="lock && (scope.row.state==1 || scope.row.state==4) && scope.row.isLocking==2 && scope.row.locking!=2"  @click="lockTap(scope.row.id)" size="mini" ><span v-if="optionW='150px'"></span>锁定</el-button>
                <el-button type="primary"  plain v-if="lock && (scope.row.state==1 || scope.row.state==4) && scope.row.isLocking==1 && scope.row.locking==2" @click="unlockTap(scope.row.id)" size="mini" ><span v-if="optionW='150px'"></span>解锁</el-button>
                <el-button type="success" plain v-if="exa && (scope.row.state==1 || scope.row.state==4) && scope.row.isLocking==1 && scope.row.locking==2"  @click="getAuditingInfo(scope.row.id)" size="mini" ><span v-if="optionW='150px'"></span>处理</el-button>
                <span style="text-align: center" class="pla-span amountred" v-if="(scope.row.state==1 || scope.row.state==4) && scope.row.isLocking==1 && scope.row.locking!=2">已被{{scope.row.admin}}锁定<span v-if="optionW='150px'"></span></span>
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
                    <el-option label="每日签到" :value="2"></el-option>
                    <el-option label="提现" :value="3"></el-option>
                    <el-option label="推荐用户" :value="4"></el-option>
                    <el-option label="徒弟贡献" :value="5"></el-option>
                    <el-option label="VIP" :value="6"></el-option>
                    <el-option label="游戏试玩" :value="7"></el-option>
                    <el-option label="好友升级奖励" :value="8"></el-option>
                    <el-option label="新人注册" :value="9"></el-option>
                    <el-option label="任务" :value="10"></el-option>
                    <el-option label="出题" :value="11"></el-option>
                    <el-option label="兑换金猪" :value="12"></el-option>
                    <el-option label="阅读资讯" :value="13"></el-option>
                    <el-option label="提现退回" :value="14"></el-option>
                    <el-option label="直属用户返利" :value="15"></el-option>
                    <el-option label="赠送运营总监" :value="16"></el-option>
                    <el-option label="间接用户返利" :value="17"></el-option>
                    <el-option label="居间返利" :value="18"></el-option>
                    <el-option label="阅读广告奖励" :value="19"></el-option>
                    <el-option label="分享资讯" :value="20"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.changedTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="message.changedType==3" style="margin-bottom: 10px">
                <el-form-item label="审核时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.auditTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"  v-if="message.changedType==3" style="margin-bottom: 10px">
                <el-form-item  label="审核结果:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="message.status" :disabled="true" @change="isAuditingChange(messageForm.status)"  placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="冻结" :value="2"></el-option>
                    <el-option label="拒绝" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col v-if="reasonMess" :span="20" style="margin-bottom: 10px">
                <el-form-item label="拒绝原因:" :label-width="formLabelWidth">
                  <el-input  :rows="4" spellcheck="false" :disabled="true"  type="textarea" v-model="message.reason"  auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTable=false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="处理" :visible.sync="dialogTableVisible" width="700px">
          <el-form label-position="left"   inline class="demo-table-expand ev">
            <el-form-item label="提现订单号">
              <span class="tex_ali">{{messageForm.outTradeNo}}</span>
            </el-form-item>
            <el-form-item label="银行类型">
              <span class="tex_ali">{{messageForm.bankName}}</span>
            </el-form-item>
            <el-form-item label="开户名">
              <span class="tex_ali">{{messageForm.userName}}</span>
            </el-form-item>
            <el-form-item label="银行账号">
              <span class="tex_ali">{{messageForm.bankNum}}</span>
            </el-form-item>
            <el-form-item label="提现货币">
              <span class="tex_ali">{{messageForm.coin | currency}}</span>
            </el-form-item>
            <el-form-item label="实际提现金额/元">
              <span class="tex_ali">{{messageForm.actualAmount}}</span>
            </el-form-item>
            <el-form-item label="提现服务费/元">
              <span class="tex_ali">{{messageForm.serviceCharge}}</span>
            </el-form-item>

            <div class="exa_box">
              <el-radio-group v-model="messageForm.state">
                <el-radio :label="2">提现成功</el-radio>
                <el-radio :label="3">提现失败</el-radio>
              </el-radio-group>
            </div>

            <el-input
               style="border: none;outline: none"
              class="textareaClass"
              type="textarea"
              :rows="4" spellcheck="false"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入内容"
              v-model="messageForm.remarks">
            </el-input>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible=false">取消</el-button>
            <el-button type="primary" @click="update(messageForm)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="sun_sty" v-if="tableData">
        <p>小计<span>({{pageCount}})：</span>[ 实际提现金额：{{subTotalPrice}} ]</p>
        <p>合计<span>({{count}})：</span>[ 实际提现金额：{{totalPrice }} ]</p>
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
    name: 'CashManage',
    data() {
      return {
        textarea:'',
        checked1: false,
        checked2: true,
        labelWidth:'80px',
        styleObject: {
          width: '200px',
        },
        searchTrue:false,
        isNotAuditing:false,
        optionW:'1px',
        messageForm:{},
        reasonMess:false,
        dialogTableVisible:false,
        dialogTable:false,
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        pageCount:0,
        subTotalPrice:'',
        totalPrice:'',
        formInline: {
          channelCode:''
        },
        tableData: [],
        message:{},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        selectTime: '',
        examineSelectTime:'',
        fullscreenLoading:false,
        powerTrue:false,
        exportExle:false,
        lockAll:false,
        exa:false,
        lock:false,
        count:'',
        menuId:'',
        channelCode:''
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.channelCode=getSession("channelCode");
      this.queryBtns();
      this.accountList();
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
      dateForm:function(data){
        return formatDate(new Date(data), 'yyyy-MM-dd hh:mm:sss')
      }
    },
    methods: {
      //锁定样式
      tableRowClassName({row, rowIndex}) {
        //自己锁定的
        if (row.state==1 && row.isLocking==1 && row.locking==2) {
          return 'mine-row';
        }
        //别人锁定的
        if(row.state==1 && row.isLocking==1 && row.locking!=2){
          return 'else-row';
        }
      },
      //导出表格
      queryExport() {
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: '正在导出....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startTime = ''
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endTime =''
        }

        if (this.examineSelectTime && this.examineSelectTime[0]) {
          this.formInline.examineStartTime = this.examineSelectTime[0].getTime();
        }else {
          this.formInline.examineStartTime ='';
        }
        if (this.examineSelectTime && this.examineSelectTime[1]) {
          this.formInline.examineEndTime = this.examineSelectTime[1].getTime();
        }else {
          this.formInline.examineEndTime ='';
        }

        let outTradeNo=this.formInline.outTradeNo
        let accountId=this.formInline.accountId;
        let  state=this.formInline.state;
        let  isLocking=this.formInline.isLocking;
        let bankNum=this.formInline.bankNum;
        let  startTime=this.formInline.startTime;
        let  endTime=this.formInline.endTime;
        let  examineStartTime=this.formInline.examineStartTime;
        let  examineEndTime=this.formInline.examineEndTime;
        let  coinMin=this.formInline.coinMin;
        let  coinMax=this.formInline.coinMax;
        let  channelCode=this.formInline.channelCode;
        let  days=this.formInline.days;

        let token= getSession("token");
        let channel= getSession("channelCode")
        let relation= getSession("userRelation");
        let url = '/api/excl/exclCash';
        let data = {url,outTradeNo,accountId,state,isLocking,bankNum,startTime,endTime,examineStartTime,examineEndTime,coinMin,coinMax,channelCode,days,token,channel,relation};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          outTradeNo=obj.outTradeNo,
          accountId=obj.accountId,
          state=obj.state,
          isLocking=obj.isLocking,
          bankNum=obj.bankNum,
          startTime=obj.startTime,
          endTime=obj.endTime,
          examineStartTime=obj.examineStartTime,
          examineEndTime=obj.examineEndTime,
          coinMin=obj.coinMin,
          coinMax=obj.coinMax,
          days=obj.days,
          token= obj.token,
          channel=obj.channel,
          relation=obj.relation,
          channelCode=obj.channelCode

        let a1 = document.createElement('a');

        let http=url;
        if(http==url){
          if(accountId){
            http=http+'?accountId=' + accountId
          }
        }
        if(http==url){
          if(outTradeNo){
            http=http+'?outTradeNo=' + outTradeNo
          }
        }else{
          if(outTradeNo){
            http=http+'&outTradeNo=' + outTradeNo
          }
        }
        if(http==url){
          if(state){
            http=http+'?state=' + state
          }
        }else{
          if(state){
            http=http+'&state=' + state
          }
        }
        if(http==url){
          if(isLocking){
            http=http+'?isLocking=' + isLocking
          }
        }else{
          if(isLocking){
            http=http+'&isLocking=' + isLocking
          }
        }
        if(http==url){
          if(bankNum){
            http=http+'?bankNum=' + bankNum
          }
        }else{
          if(bankNum){
            http=http+'&bankNum=' + bankNum
          }
        }
        if(http==url){
          if(startTime){
            http=http+'?startTime=' + startTime
          }
        }else{
          if(startTime){
            http=http+'&startTime=' + startTime
          }
        }
        if(http==url){
          if(endTime){
            http=http+'?endTime=' + endTime
          }
        }else{
          if(endTime){
            http=http+'&endTime=' + endTime
          }
        }

        if(http==url){
          if(examineStartTime){
            http=http+'?examineStartTime=' + examineStartTime
          }
        }else{
          if(examineStartTime){
            http=http+'&examineStartTime=' + examineStartTime
          }
        }
        if(http==url){
          if(examineEndTime){
            http=http+'?examineEndTime=' + examineEndTime
          }
        }else{
          if(examineEndTime){
            http=http+'&examineEndTime=' + examineEndTime
          }
        }
        if(http==url){
          if(coinMin){
            http=http+'?coinMin=' + coinMin
          }
        }else{
          if(coinMin){
            http=http+'&coinMin=' + coinMin
          }
        }
        if(http==url){
          if(coinMin){
            http=http+'?coinMin=' + coinMin
          }
        }else{
          if(coinMax){
            http=http+'&coinMax=' + coinMax
          }
        }

        if(http==url){
          if(channelCode){
            http=http+'?channelCode=' + channelCode
          }
        }else{
          if(channelCode){
            http=http+'&channelCode=' + channelCode
          }
        }

        if(http==url){
          if(days){
            http=http+'?days=' + days
          }
        }else{
          if(days){
            http=http+'&days=' + days
          }
        }

        if(http==url){
          http=http+'?token='+token+'&channel='+channel+'&relation='+relation
        }else{
          http=http+'&token='+token+'&channel='+channel+'&relation='+relation
        }
        a1.setAttribute('href',http);
        let body = document.querySelector('body');
        body.appendChild(a1);
        a1.click();
        a1.remove();
        //关闭导出弹层
        setTimeout(() => {
          this.fullscreenLoading.close();
        }, 5000);
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
              if(res.data[i].btnCode == 'lockAll') {
                this.lockAll =true;
              }
              if(res.data[i].btnCode == 'lock') {
                this.powerTrue =true;
                this.lock =true;
              }
              if(res.data[i].btnCode == 'exportExle') {
                this.exportExle =true;
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

      //列表
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          outTradeNo:this.formInline.outTradeNo,
          accountId:this.formInline.accountId,
          state:this.formInline.state,
          isLocking:this.formInline.isLocking,
          bankNum:this.formInline.bankNum,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
          examineStartTime:this.formInline.examineStartTime,
          examineEndTime:this.formInline.examineEndTime,
          coinMin:this.formInline.coinMin,
          coinMax:this.formInline.coinMax,
          channelCode:this.formInline.channelCode,
          days:this.formInline.days
        }
        this.$fetch('/api/lUserExchangeCash/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            this.subTotalPrice =  res.data.subTotalPrice;
            this.totalPrice =  res.data.totalPrice;
            this.pageCount=res.data.pageCount;
            this.count = res.data.count;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },
      //全部锁定
      lockAllTap(){
        let  tempArr  = [];
        let pardata = ''
        for(let i =this.tableData.length - 1; i >= 0; i--) {
          tempArr.push(this.tableData[i].id)
        }
        pardata = tempArr.join(',')

        this.$fetch('/api/lUserExchangeCash/updateLockingList', {
          ids: pardata
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '锁定成功！'
            })
            this.accountList()
          }else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },

      //锁定
      lockTap(id) {
        this.$fetch('/api/lUserExchangeCash/updateLocking', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '锁定成功！'
            })
            this.accountList()
          }else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },

      //解锁
      unlockTap(id) {
        this.$fetch('/api/lUserExchangeCash/relieveLocking', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '解锁成功！'
            })
            this.accountList()
          }else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },
      //处理
      getAuditingInfo(id){
        this.dialogTableVisible = true
        this.$fetch('/api/lUserExchangeCash/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.messageForm=res.data
          }
        })
      },

      //处理确定按钮
      update(messageForm) {
        this.$fetch('/api/lUserExchangeCash/update', this.messageForm).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '处理成功！'
            })
            this.dialogTableVisible = false
            this.accountList()
          }else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
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
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startTime ='';
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endTime ='';
        }

        if (this.examineSelectTime && this.examineSelectTime[0]) {
          this.formInline.examineStartTime = this.examineSelectTime[0].getTime();
        }else {
          this.formInline.examineStartTime ='';
        }
        if (this.examineSelectTime && this.examineSelectTime[1]) {
          this.formInline.examineEndTime = this.examineSelectTime[1].getTime();
        }else {
          this.formInline.examineEndTime ='';
        }

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
  .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }
  .sun_sty p span{
    transform: scale(0.5);
    font-size: 12px;
  }
  .el-table .mine-row {
    background: #ebfbf7;
  }

  .el-table .else-row {
    background: #fceeed;
  }
  .pla-span{
    text-align: center;
  }
  .exa_box{
    width: 100%;
    height: 50px;
    border-right:1px solid #dcdfe6;
    /*border-bottom:1px solid #dcdfe6;*/
     display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

  }
  .demo-table-expand.ev {
    font-size: 0;
    width: 80%;
    margin: 0 auto;
    border-top: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;
  }

  .demo-table-expand.ev label {
    width: 150px;
    color: #99a9bf;
    padding-left: 20px;
  }
  .demo-table-expand.ev .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
  }

  .demo-table-expand.ev .el-form-item span.tex_ali{
    padding-left: 30px;
    border-left: 1px solid #dcdfe6;
    display: inline-block;
  }

  .amountred{
    color: #ff4d51;
  }
  .amountgreen{
    color: #13ce66;
  }
  .blue{
    color: #409EFF;
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

  .day-tip{
    font-size: 12px;
    color: #ff4d51;
  }

  .day-title{
    color: #606266;
    margin-right: 5px;
    font-size: 14px;
  }
</style>
