<template>
  <div class="rechargr-change-wrap">
    <div class="rechargr-change-inner">
      <div class="rechargr-change-header">
        <h3>财务流水/入款记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item  label="用户ID:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户ID" clearable></el-input>
          </el-form-item>
          <el-form-item  label="订单号:">
            <el-input style="width: 250px" v-model="formInline.outTradeNo" placeholder="请输入订单号" clearable></el-input>
          </el-form-item>
          <el-form-item  label="渠道标识:">
            <el-input  v-model="formInline.channelCode" placeholder="请输入渠道标识" clearable></el-input>
          </el-form-item>
          <el-form-item  label="状态:" >
            <el-select v-model="formInline.state" placeholder="请选择状态">
              <el-option label="待支付" value="1"></el-option>
              <el-option label="已支付" value="2"></el-option>
              <el-option label="已取消" value="3"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="labelWidth" label="订单时间:">
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

          <el-form-item :label-width="labelWidth" label="支付时间:">
            <el-date-picker
              v-model="selectTimePay"
              type="datetimerange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="queryExport()" v-if="exportExle">导出表格</el-button>
        </el-form>
        <div>
          <p class="sun_sty">1元=10000金币=100000金猪</p>
        </div>
      </div>
      <div class="rechargr-change-table">
        <template>
          <el-table :data="tableData" height="555" max-height="518">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="200" fixed="left" prop="outTradeNo" label="订单号">
            </el-table-column>
            <el-table-column min-width="120" fixed="left" prop="userName" label="姓名">
            </el-table-column>
            <el-table-column min-width="120" fixed="left"  label="用户id">
              <template slot-scope="scope">
                <span :class="formInline.accountId?amountyellow:''">{{scope.row.accountId}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" fixed="left" prop="userChannelCode" label="渠道标识">
            </el-table-column>
            <el-table-column min-width="150" prop="purposeName" label="购买类型">
            </el-table-column>
            <el-table-column min-width="150" prop="typeName" label="支付类型">
            </el-table-column>
            <el-table-column min-width="150"  label="订单金额(￥)">
              <template slot-scope="scope">
                <span class="amountyellow">{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150"  label="实际支付金额(￥)">
              <template slot-scope="scope">
                <span class="amountgreen">{{scope.row.actualPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150"  label="折扣金额(￥)">
              <template slot-scope="scope">
                <span class="amountblue">{{scope.row.discount}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150" sortable prop="balance" label="余额抵扣">
            </el-table-column>
            <el-table-column prop="payTime" sortable :formatter="dateFormat" width="170px" label="支付时间">
                <template slot-scope="scope">
                <span v-if="scope.row.payTime>0">{{scope.row.payTime | dateFont}}</span>
                <span v-else>-</span>
             </template>
            </el-table-column>
            <el-table-column prop="creatorTime" sortable :formatter="dateFormat" width="170px" label="创建时间">
            </el-table-column>
            <el-table-column min-width="100" prop="state" label="状态">
              <template slot-scope="scope">
                <span class="amountblue" v-if="scope.row.state==1">待支付</span>
                <span class="amountgreen" v-if="scope.row.state==2">已支付</span>
                <span class="amountyellow" v-if="scope.row.state==3">已取消</span>
              </template>
            </el-table-column>
            <!--<el-table-column fixed="right" label="操作" width="75">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button type="info" plain @click="getInfo(scope.row.id)" size="mini">查看</el-button>-->
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
                <el-form-item label="订单号:" :label-width="formLabelWidth">
                  <el-input :value="message.outTradeNo" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="订单金额:" :label-width="formLabelWidth">
                  <el-input :value="message.price" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="实际支付金额:" :label-width="formLabelWidth">
                  <el-input :value="message.actualPrice" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="折扣金额:" :label-width="formLabelWidth">
                  <el-input :value="message.price-message.actualPrice-message.balance" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付描述:" :label-width="formLabelWidth">
                  <el-input :value="message.descripte" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付方式" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="message.payMode" placeholder="">
                    <el-option label="支付宝" :value="1"></el-option>
                    <el-option label="微信" :value="2"></el-option>
                    <el-option label="余额" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付类型" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="message.payType" placeholder="">
                    <el-option label="app" :value="1"></el-option>
                    <el-option label="小程序" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="message.state" placeholder="">
                    <el-option label="待支付" :value="1"></el-option>
                    <el-option label="已支付" :value="2"></el-option>
                    <el-option label="已取消" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="余额抵扣:" :label-width="formLabelWidth">
                  <el-input :value="message.balance" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="创建时间:" :label-width="formLabelWidth">
                  <el-input :value="message.creatorTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="pTime" :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付时间:" :label-width="formLabelWidth">
                  <el-input :value="message.payTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="cTime" :span="10" style="margin-bottom: 10px">
                <el-form-item label="取消时间:" :label-width="formLabelWidth">
                  <el-input  :value="message.cancelTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTable=false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="sun_sty" v-if="formInline.state!=1 && formInline.state!=3">
        <p>小计<span>({{pageTotal}})：</span>[ 总入款金额：{{subTotalPrice}} ]</p>
        <p>合计<span>({{count}})：</span>[ 总入款金额：{{totalPrice }} ]</p>
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
    name: 'RechargeChange',
    data() {
      return {
        pageTotal:'',
        count:'',
        pTime:false,
        cTime:false,
        exportExle:false,
        dialogTable:false,
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        message:{},
        labelWidth:'80px',
        selectTime:'',
        selectTimePay:'',
        subTotalPrice:'',
        totalPrice:'',
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
        fullscreenLoading:false,
        menuId:''
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
    },
    filters: {
      currencyFixed: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
      dateFont:function (time) {
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm:sss')
      }
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
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'exportExle') {
                this.exportExle =true;
              }
            }
          } else {
          }
        })
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          accountId:this.formInline.accountId,
          outTradeNo:this.formInline.outTradeNo,
          state:this.formInline.state,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
          startPayTime:this.formInline.startPayTime,
          endPayTime:this.formInline.endPayTime,
          channelCode:this.formInline.channelCode
        }
        this.$fetch('/api/pay/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.tableData = res.data.list;
          this.totalCount = res.data.total;
          this.subTotalPrice =  res.data.subTotalPrice;
          this.totalPrice =  res.data.totalPrice;
            this.pageTotal =  res.data.pageTotal;
          this.count =  res.data.count;

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
        this.$fetch('/api/pay/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          res.data.creatorTime=formatDate(new Date(res.data.creatorTime), 'yyyy-MM-dd hh:mm:sss')
          if(res.data.payTime) {
            res.data.payTime=formatDate(new Date(res.data.payTime), 'yyyy-MM-dd hh:mm:sss')
            this.pTime=true
          }
          if(res.data.cancelTime) {
            res.data.cancelTime=formatDate(new Date(res.data.cancelTime), 'yyyy-MM-dd hh:mm:sss')
            this.cTime=true
          }
          res.data.payMode=parseInt(res.data.payMode)
          res.data.payType=parseInt(res.data.payType)
          this.message=res.data
         }
      })
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

        if (this.selectTimePay && this.selectTimePay[0]) {
          this.formInline.startPayTime = this.selectTimePay[0].getTime();
        }else {
          this.formInline.startPayTime ='';
        }
        if (this.selectTimePay && this.selectTimePay[1]) {
          this.formInline.endPayTime = this.selectTimePay[1].getTime();
        }else {
          this.formInline.endPayTime ='';
        }

        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },

      //导出表格
      queryExport() {
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: '正在导出...',
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

        if (this.selectTimePay && this.selectTimePay[0]) {
          this.formInline.startPayTime = this.selectTimePay[0].getTime();
        }else {
          this.formInline.startPayTime ='';
        }
        if (this.selectTimePay && this.selectTimePay[1]) {
          this.formInline.endPayTime = this.selectTimePay[1].getTime();
        }else {
          this.formInline.endPayTime ='';
        }


        let accountId=this.formInline.accountId;
        let  outTradeNo=this.formInline.outTradeNo;
        let  state=this.formInline.state;
        let  channelCode=this.formInline.channelCode;
        let  startTime=this.formInline.startTime;
        let  endTime=this.formInline.endTime;
        let  startPayTime=this.formInline.startPayTime;
        let  endPayTime=this.formInline.endPayTime;
        let token= getSession("token");
        let channel= getSession("channelCode")
        let relation= getSession("userRelation");
        let url = '/excl/payExcl';
        let data = {url,accountId,state,channelCode,startTime,endTime,startPayTime,endPayTime,outTradeNo,token,channel,relation};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          accountId=obj.accountId,
          outTradeNo=obj.outTradeNo,
          state=obj.state,
          channelCode=obj.channelCode,
          startTime=obj.startTime,
          endTime=obj.endTime,
          startPayTime=obj.startPayTime,
          endPayTime=obj.endPayTime,
          token= obj.token,
          channel=obj.channel,
          relation=obj.relation

        let a1 = document.createElement('a');
        let http=url;
        if(http==url){
          if(accountId){
            http=http+'?accountId=' + accountId
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
          if(channelCode){
            http=http+'?channelCode=' + channelCode
          }
        }else{
          if(channelCode){
            http=http+'&channelCode=' + channelCode
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
          if(startPayTime){
            http=http+'?startPayTime=' + startPayTime
          }
        }else{
          if(startPayTime){
            http=http+'&startPayTime=' + startPayTime
          }
        }
        if(http==url){
          if(endPayTime){
            http=http+'?endPayTime=' + endPayTime
          }
        }else{
          if(endPayTime){
            http=http+'&endPayTime=' + endPayTime
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
        //关闭导出弹层
        setTimeout(() => {
          this.fullscreenLoading.close();
        }, 5000);
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
.rechargr-change-wrap .sun_sty{
  font-size: 14px;
  color: #13ce66;
  margin-bottom: 20px;
}
.rechargr-change-wrap .sun_sty p{
  margin: 0;
  padding: 0;
  line-height: 30px;
}
.rechargr-change-wrap .sun_sty p span{
  font-size: 12px;
  margin-right: 10px;
}
  .amountblue{
    color: #409eff;
  }
  .amountgreen{
    color: #13ce66;
  }
  .amountyellow{
    color: #e6a23c;
  }

  .red{
    color: #ff4d51;
  }

  amountred{
    color: #fbc4c4;
  }

  .rechargr-change-wrap {
    width: 100%;
  }

  .rechargr-change-inner {
    margin: auto;
    padding: 0 20px;
  }

  .rechargr-change-header {
    margin-bottom: 20px;
  }

  .rechargr-change-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .rechargr-change-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
