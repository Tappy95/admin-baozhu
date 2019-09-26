<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/金猪账变明细</h3>
        <hr />
      </div>
      <div>
        <el-form  :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户id" clearable></el-input>
          </el-form-item>
          <el-form-item  label="电话号码:">
            <el-input  v-model="formInline.mobile" placeholder="请输入电话号码" clearable></el-input>
          </el-form-item>
          <el-form-item label="兑换时间:">
            <el-date-picker
              v-model="selectTime"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="状态:" >
            <el-select v-model="formInline.changedType"  placeholder="请选择状态">
              <el-option label="vip" value="1"></el-option>
              <el-option label="提现" value="2"></el-option>
              <el-option label="任务" value="3"></el-option>
              <el-option label="试玩" value="4"></el-option>
              <el-option label="金币兑换获得" value="5"></el-option>
              <el-option label="竞猜" value="6"></el-option>
              <el-option label="vip救济金猪" value="7"></el-option>
              <el-option label="金猪抽奖" value="8"></el-option>
              <el-option label="抽奖退回" value="9"></el-option>
              <el-option label="竞猜退回" value="10"></el-option>
              <el-option label="团队长赠送" value="11"></el-option>
              <el-option label="每日救济金" value="12"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="用户id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户id" clearable></el-input>
          </el-form-item>-->
          <!--<el-form-item label="收支:" >
            <el-select v-model="formInline.flowType"  placeholder="请选择收支">
              <el-option label="收入" value="1"></el-option>
              <el-option label="支出" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>-->

          <el-form-item>
             <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" plain @click="queryExport()" v-if="exportExle">导出表格</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" max-height="518">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="100" fixed="left" prop="accountId" label="用户id">
            </el-table-column>
            <el-table-column min-width="120" prop="userName" label="姓名">
            </el-table-column>
            <el-table-column sortable min-width="120" prop="level" label="成长等级">
            </el-table-column>
            <el-table-column prop="changedType" min-width="170px" label="类型">
            </el-table-column>
            <el-table-column sortable prop="revenue" min-width="150" label="收入">
              <template slot-scope="scope">
                <span class="amountred">
                   <span v-if="scope.row.revenue>0">+</span>{{scope.row.revenue | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column sortable min-width="150" label="支出">
              <template slot-scope="scope">
                <span class="amountgreen">
                   <span v-if="scope.row.expend>0">-</span>{{scope.row.expend | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column  prop="pigBalance" sortable min-width="150" label="金猪余额">
              <template  slot-scope="scope">
                <span class="amountyellow">
                 {{scope.row.pigBalance | currency}}
                </span>
              </template>
            </el-table-column>
            <!-- <el-table-column min-width="150" label="金币变动">
               <template slot-scope="scope">
                 <span :class="scope.row.flowType==1?'amountred':'amountgreen'">
                   <span>{{scope.row.flowType==1?'+':'-'}}</span>{{scope.row.amount | currency}}
                 </span>
               </template>
             </el-table-column>-->
            <!--<el-table-column min-width="120" prop="roleType" label="身份标识">
            </el-table-column>-->
            <el-table-column prop="changedTime" sortable min-width="170px" label="变更时间">
            </el-table-column>
            <el-table-column prop="registerTime" sortable :formatter="dateFormat" min-width="170px" label="注册时间">
            </el-table-column>
            <el-table-column min-width="150" prop="remarks" label="备注">
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
                <el-form-item label="金猪变动:" :label-width="formLabelWidth">
                  <el-input :value="message.amount | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="收支:" :label-width="formLabelWidth">
                  <el-input :value="message.flowType" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="变更原因:" :label-width="formLabelWidth">
                  <!--<el-input :value="message.changedType" :disabled="true" auto-complete="off" style="" clearable></el-input>-->
                  <el-select v-model="message.changedType" :disabled="true"  placeholder="">
                    <el-option label="vip" value="1"></el-option>
                    <el-option label="提现" value="2"></el-option>
                    <el-option label="任务" value="3"></el-option>
                    <el-option label="试玩" value="4"></el-option>
                    <el-option label="金币兑换获得" value="5"></el-option>
                    <el-option label="竞猜" value="6"></el-option>
                    <el-option label="vip救济金猪" value="7"></el-option>
                    <el-option label="金猪抽奖" value="8"></el-option>
                    <el-option label="抽奖退回" value="9"></el-option>
                    <el-option label="竞猜退回" value="10"></el-option>
                    <el-option label="团队长赠送" value="11"></el-option>
                    <el-option label="每日救济金" value="12"></el-option>
                  </el-select>

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
      <div class="sun_sty" v-if="tableData.length>0">
        <div class="list">
          <div class="item"><p>小计<span>({{tableData.length}}):</span></p></div>
          <div class="item"><p> [ 总收入： {{subRevenuePrice | currency}} ]</p></div>
          <div class="item"><p> [ 总支出：{{subExpendPrice | currency}} ]</p></div>
        </div>
        <div class="list">
          <div class="item"><p>合计<span>({{totalCount}}):</span></p></div>
          <div class="item"><p> [ 总收入： {{totalRevenuePrice | currency}} ]</p></div>
          <div class="item"><p>[ 总支出：{{totalExpendPrice | currency}} ]</p></div>
        </div>
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
        subRevenuePrice:'',
        subExpendPrice:'',
        pageCount:'',
        totalRevenuePrice:'',
        totalExpendPrice:'',
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        message:{},
        searchTrue:false,
        exportExle:false,
        menuId:'',
        formInline: {
          userName:"",
          changedType:'',
          mobile:'',
          accountId:'',
          flowType:''
        },
        fullscreenLoading:false,//导出弹层
        selectTime:'',
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
      }
    },
    created() {
      this.menuId=this.$route.query.id
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
    },
    methods: {
      //导出表格
      queryExport() {
        //开启正在导出弹层
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: '正在导出...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
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
        let userName=this.formInline.userName;
        let  changedType=this.formInline.changedType;
        let mobile=this.formInline.mobile;
        let  accountId=this.formInline.accountId;
        let  flowType=this.formInline.flowType;
        let  startTime=this.formInline.startTime;
        let  endTime=this.formInline.endTime;
        let token= getSession("token");
        let channel= getSession("channelCode");
        let relation= getSession("userRelation");

        let url = '/api/excl/exclPigChange';
        let data = {url,userName,changedType,mobile,accountId,flowType,startTime,endTime,token,channel,relation};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          userName=obj.userName,
          changedType=obj.changedType,
          mobile=obj.mobile,
          accountId=obj.accountId,
          flowType=obj.flowType,
          startTime=obj.startTime,
          endTime=obj.endTime,
          token= obj.token,
          channel=obj.channel,
          relation= obj.relation

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
          if(startTime!=null && startTime!=''){
            http=http+'?startTime=' + startTime
          }
        }else{
          if(startTime!=null && startTime!=''){
            http=http+'&startTime=' + startTime
          }
        }
        if(http==url){
          if(endTime!=null && endTime!=''){
            http=http+'?endTime=' + endTime
          }
        }else{
          if(endTime!=null && endTime!=''){
            http=http+'&endTime=' + endTime
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
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          /*userName:this.formInline.userName,*/
          changedType:this.formInline.changedType,
          mobile:this.formInline.mobile,
          accountId:this.formInline.accountId,
          /*flowType:this.formInline.flowType,*/
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime
        }

        this.$fetch('/api/lPigChange/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            res.data.list[i].changedTime=formatDate(new Date(res.data.list[i].changedTime), 'yyyy-MM-dd hh:mm:sss')
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
            }else if(res.data.list[i].changedType == '10'){
              res.data.list[i].changedType = '竞猜退回'
            }else if(res.data.list[i].changedType == '11'){
              res.data.list[i].changedType = '团队长赠送'
            }else if(res.data.list[i].changedType == '12'){
              res.data.list[i].changedType = '每日救济金'
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
          this.totalCount = parseInt(res.data.total)
          this.subRevenuePrice = res.data.subRevenuePrice
          this.subExpendPrice = res.data.subExpendPrice
          this.pageCount = res.data.pageCount
          this.totalRevenuePrice = res.data.totalRevenuePrice
          this.totalExpendPrice = res.data.totalExpendPrice
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
          if ((res.statusCode+"").startsWith("2")) {
          if(res.data.flowType == '1') {
            res.data.flowType = '收入'
          } else {
            res.data.flowType = '支出'
          }
          // if(res.data.changedType == '1'){
          //   res.data.changedType = 'vip'
          // }else if(res.data.changedType == '2'){
          //   res.data.changedType = '提现'
          // }else if(res.data.changedType == '3'){
          //   res.data.changedType = '任务'
          // }else if(res.data.changedType == '4'){
          //   res.data.changedType = '游戏试玩'
          // }else if(res.data.changedType == '5'){
          //   res.data.changedType = '金币兑换'
          // }else if(res.data.changedType == '6'){
          //   res.data.changedType = '竞猜'
          // }else if(res.data.changedType == '7'){
          //   res.data.changedType = 'vip救济金'
          // }else if(res.data.changedType == '8'){
          //   res.data.changedType = '金猪抽奖'
          // }else if(res.data.changedType == '9'){
          //   res.data.changedType = '抽奖退回'
          // }
          res.data.changedTime=formatDate(new Date(res.data.changedTime), 'yyyy-MM-dd hh:mm:sss')
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
  .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .sun_sty .list{
    width: 100%;
    height: 30px;
    /*text-align: right;*/
  }
  .sun_sty .list .item:nth-child(1){
    width: 100px;
    min-width: 100px;
    max-width: 150px;
  }
  .sun_sty .list .item{
    float: left;
    min-width: 200px;
    max-width: 300px;
    height: 30px;
    max-width: 200px;
  }

  .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .sun_sty p span{
    font-size: 12px;
  }

  .amountred{
    color: #ff4d51;
  }
  .amountgreen{
    color: #13ce66;
  }
  .amountyellow{
    color: #E6A23C;
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
