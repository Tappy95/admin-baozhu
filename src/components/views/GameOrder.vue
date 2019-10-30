<template>
  <div class="game-order-wrap">
    <div class="game-order-inner">
      <div class="game-order-header">
        <h3>财务流水/乐园竞猜明细</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户ID:">
            <el-input placeholder="请输入用户ID"  v-model="formInline.accountId" auto-complete="off"  clearable>
            </el-input>
          </el-form-item>

          <el-form-item  label="投注时间:">
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

          <el-form-item  label="请选择游戏:">
            <el-select  v-model="formInline.lotteryId" placeholder="">
              <el-option v-for="item in gameList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="期号:">
            <el-input  placeholder="请输入期号"  v-model="formInline.actionNo" auto-complete="off"  clearable>
            </el-input>
          </el-form-item>

          <el-form-item  label="请选择状态:">
            <el-select   v-model="formInline.status" placeholder="">
              <el-option label="撤单" value="0"></el-option>
              <el-option label="未开奖" value="1"></el-option>
              <el-option label="开奖中" value="2"></el-option>
              <el-option label="未中奖" value="3"></el-option>
              <el-option label="已派奖" value="4"></el-option>
              <el-option label="退款" value="10"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain style="margin-bottom: 30px;margin-left: 10px" @click="search()">查询</el-button>
          <el-button type="success" plain style="margin-bottom: 20px;margin-left: 10px" v-if="exportExle" @click="queryExport()">导出表格</el-button>
        </el-form>
      </div>
      <div class="game-order-table">
        <template>
          <el-table :data="tableData" height="528" style="overflow-y: auto">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column fixed="left" min-width="150px" prop="accountId" label="用户ID">
            </el-table-column>
            <el-table-column min-width="120px" prop="uName"  label="姓名">
            </el-table-column>
            <el-table-column width="170px" :formatter="dateFormat" prop="actionTime" label="投注时间">
            </el-table-column>
            <el-table-column min-width="150px"  prop="lotteryName" label="游戏名称">
            </el-table-column>
            <el-table-column min-width="150px" prop="actionNo" label="期号">
            </el-table-column>
            <el-table-column min-width="150px" prop="actionData" label="竞猜号码">
            </el-table-column>
            <el-table-column min-width="150px"  label="竞猜金额">
              <template slot-scope="scope">
                <span class="amountgreen">
                  {{scope.row.amount | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"  label="中奖金额">
              <template slot-scope="scope">
                <span class="amountyellow">
                  {{scope.row.bonus | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column min-width="120px" prop="status" label="状态">
            </el-table-column>

            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <!--<el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="exa">审核</el-button>-->
              </template>
            </el-table-column>

          </el-table>
        </template>

        <el-dialog title="竞猜详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo" >
            <el-row>
              <el-col :span="23">
                <el-form-item label="订单号:" :label-width="formLabelWidth" >
                  <el-input :disabled="true"   v-model="formtwoInfo.orderId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="彩种名称:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.lotteryName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="玩法组名称:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.playedGroupName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="玩法名称:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.playedName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否官方:" :label-width="formLabelWidth" >
                  <el-select :disabled="true"  :style="styleObject" :label-width="formLabelWidth"  v-model="formtwoInfo.isOfficial" placeholder="">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="不是" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注人帐号:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.username" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注期号:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionNo" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注时间:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注IP:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionIp" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注注数:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注号码:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionData" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="购买金额:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.amount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="返点:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.rebate" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖金比例:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.odds/1000" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开奖号码:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.lotteryNo" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="官方开奖时间:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.kjTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖注数:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.winNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖金额*1000:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.bonus" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="状态:" :label-width="formLabelWidth">
                  <el-select :disabled="true"  :style="styleObject" :label-width="formLabelWidth"  v-model="formtwoInfo.status" placeholder="">
                    <el-option label="撤单" :value="0"></el-option>
                    <el-option label="未开奖" :value="1"></el-option>
                    <el-option label="开奖中" :value="2"></el-option>
                    <el-option label="未中奖" :value="3"></el-option>
                    <el-option label="已派奖" :value="4"></el-option>
                    <el-option label="退款" :value="5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="sun_sty" v-if="tableData.length>0">
        <div class="list">
          <div class="item"><p>小计<span>({{tableData.length}})：</span></p></div>
          <div class="item"><p> [ 总游戏竞猜： {{subAmountSum | currency}} ]</p></p></div>
          <div class="item"><p>[ 总游戏中奖：{{subBonusSum | currency}} ]</p></div>
        </div>
        <div class="list">
          <div class="item"><p>合计<span>({{totalCount}})：</span></p></div>
          <div class="item"><p> [ 总游戏竞猜： {{amountSum | currency}} ]</p></div>
          <div class="item"><p>[ 总游戏中奖：{{bonusSum | currency}} ]</p></p></div>
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
    name: 'GameOrder',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        w_input:'200px',
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        exa:false,
        exportExle:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        formtwoInfo:{},
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
        gameList:[],
        fullscreenLoading:false,
        subAmountSum:'',
        subBonusSum:'',
        amountSum:'',
        bonusSum:'',
      }
    },

    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      this.gameData();
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = num;
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
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
          lotteryId:this.formInline.lotteryId,
          actionNo:this.formInline.actionNo,
          status:this.formInline.status,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime
        }
        this.$fetch('/guess/order/pageList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {

              if (res.data.list[i].odds){
                res.data.list[i].odds = res.data.list[i].odds/1000
              }

              if (res.data.list[i].isOfficial == false){
                res.data.list[i].isOfficial = '不是'
              } else if(res.data.list[i].isOfficial == true) {
                res.data.list[i].isOfficial = '是'
              }

              if (res.data.list[i].status == '0'){
                res.data.list[i].status = '撤单'
              } else if(res.data.list[i].status == '1') {
                res.data.list[i].status = '未开奖'
              } else if(res.data.list[i].status == '2') {
                res.data.list[i].status = '开奖中'
              }else if(res.data.list[i].status == '3') {
                res.data.list[i].status = '未中奖'
              }else if(res.data.list[i].status == '4') {
                res.data.list[i].status = '已派奖'
              }else if(res.data.list[i].status == '10') {
                res.data.list[i].status = '退款'
              }
            }
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            this.subAmountSum =res.data.subAmountSum;
            this.subBonusSum =res.data.subBonusSum;
            this.amountSum =res.data.amountSum;
            this.bonusSum =res.data.bonusSum;
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

        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList()
      },

      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/guess/order/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.kjTime =  formatDate(new Date(res.data.kjTime), 'yyyy-MM-dd hh:mm:sss');
            res.data.actionTime =  formatDate(new Date(res.data.actionTime), 'yyyy-MM-dd hh:mm:sss');
            this.formtwoInfo = res.data;
          }
        })
      },

      gameData(){
        this.$fetch('/guess/lottery/page', {
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.gameList = res.data
          }
        })
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
          this.formInline.endTime = ''
        }

        let accountId=this.formInline.accountId;
        let lotteryId=this.formInline.lotteryId;
        let actionNo=this.formInline.actionNo;
        let status=this.formInline.status;
        let startTime=this.formInline.startTime;
        let endTime=this.formInline.endTime;
        let token= getSession("token");
        let channel= getSession("channelCode");
        let relation= getSession("userRelation");

        let url = '/api/excl/orderExcl';
        let data = {url,accountId,lotteryId,actionNo,status,startTime,endTime,token,channel,relation};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          accountId=obj.accountId,
          lotteryId=obj.lotteryId,
          actionNo=obj.actionNo,
          status=obj.status,
          startTime=obj.startTime,
          endTime=obj.endTime,
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
          if(lotteryId){
            http=http+'?lotteryId=' + lotteryId
          }
        }else{
          if(lotteryId){
            http=http+'&lotteryId=' + lotteryId
          }
        }
        if(http==url){
          if(actionNo){
            http=http+'?actionNo=' + actionNo
          }
        }else{
          if(actionNo){
            http=http+'&actionNo=' + actionNo
          }
        }

        if(http==url){
          if(status){
            http=http+'?status=' + status
          }
        }else{
          if(status){
            http=http+'&status=' + status
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
        //关闭正在导出弹层
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
  .amountblue{
    color: #409eff;
  }
  .amountgreen{
    color: #13ce66;
  }
  .amountyellow{
    color: #e6a23c;
  }

  amountred{
    color: #fbc4c4;
  }
  .game-order-wrap .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .game-order-wrap .sun_sty .list{
    width: 100%;
    height: 30px;
  }
  .game-order-wrap .sun_sty .list .item:nth-child(1){
    min-width: 120px;
    max-width: 180px;
  }
  .game-order-wrap .sun_sty .list .item{
    float: left;
    min-width: 280px;
    height: 30px;
    max-width: 350px;
  }

  .game-order-wrap .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .game-order-wrap .sun_sty p span{
    font-size: 12px;
  }

  .box_img{
    width: 560px;
    height: 148px;
    padding: 10px;
    border: 1px solid #dcdfe6;
    float: left;
    background-color: #f5f7fa;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: self-start;
  }

  .box_img .box_min{
    max-width:148px;
    max-height:148px;
    float: left;
    margin-right: 10px;
  }
  .box_img img{
    max-width:148px;
    max-height:148px;
  }
  .game-order-wrap {
    width: 100%;
  }

  .game-order-inner {
    margin: auto;
    padding: 0 20px;
  }

  .game-order-header {
    margin-bottom: 20px;
  }

  .game-order-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .game-order-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
  .bannerAvatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bannerAvatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .bannerAvatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    max-width: 148px;
    max-height: 148px;
    display: block;
    cursor: pointer;
  }

</style>
