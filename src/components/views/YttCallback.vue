<template>
  <div class="pcdd-callback-wrap">
    <div class="pcdd-callback-inner">
      <div class="pcdd-callback-header">
        <h3>游戏回调/悦头条回调</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="账户Id:" >
            <el-input placeholder="请输入账户Id"
                      v-model="formInline.accountId"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="任务类型:" >
            <el-select v-model="formInline.adtype " placeholder="请选择状态" clearable>
              <el-option label="cpa安装" value="0"></el-option>
              <el-option label="cpa签到" value="1"></el-option>
              <el-option label="小程序" value="3"></el-option>
              <el-option label="高额任务/截图任务" value="7"></el-option>
              <el-option label="看看赚" value="9"></el-option>
            </el-select>
          </el-form-item>

           <el-form-item >
            <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="pcdd-callback-table">
        <template>
          <!--:class="showW?'u':'a'"-->
          <el-table :class="showW?'a':'u'" :data="tableData" max-height="600">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="80" fixed="left" prop="accountId" label="账户Id">
            </el-table-column>
            <el-table-column min-width="240" fixed="left" prop="ocode" label="订单号">
            </el-table-column>
            <el-table-column min-width="100" prop="cid" label="渠道Id">
            </el-table-column>
            <el-table-column min-width="160" prop="devid" label="用户设备码">
            </el-table-column>
            <el-table-column min-width="100" prop="adid" label="任务Id">
            </el-table-column>
            <el-table-column min-width="120" prop="adname" label="任务名称">
            </el-table-column>
            <el-table-column min-width="100" prop="adtype" label="任务类型">
            </el-table-column>
            <el-table-column min-width="200" prop="dprice" label="开发者收入（单位：元）">
            </el-table-column>
            </el-table-column>
            <el-table-column min-width="250" prop="createTime" label="回调时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column min-width="120" prop="status"  label="处理结果">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">成功</span>
                <span class="red" v-if="scope.row.status==2">失败</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作" v-show="showW" :width="optionW" >
              <template slot-scope="scope">
                <el-button  type="success" v-if="rep &&  scope.row.status==1" plain @click="repTap(scope.row.ordernum)" size="mini">
                  <span v-if="showW=true"></span>
                  <span v-else="showW=false"></span>
                  <span v-if="optionW='75'"></span>
                  <span v-else="optionW='1px'"></span>
                  重发
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!-- <div class="sun_sty xiao" v-if="tableData.length>0">
        <div class="list">
          <div class="item xiao"><p>小计：</p></div>
          <div class="item su"><p> [ 成功数： {{smallSuccessCount | currency}} ]</p></div>
          <div class="item"><p> [ 平台奖励：{{smallPriceSum | currency}} ]</p></div>
          <div class="item"><p> [ 用户奖励：{{smallMoneySum | currency}} ]</p></div>
        </div>
        <div class="list">
          <div class="item xiao"><p>合计：</p></div>
          <div class="item su"><p> [ 成功数： {{successCount | currency}} ]</p></div>
          <div class="item"><p> [ 平台奖励：{{priceSum | currency}} ]</p></div>
          <div class="item"><p> [ 用户奖励：{{moneySum | currency}} ]</p></div>
        </div>
      </div> -->
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
    name: 'PcddCallback',
    data() {
      return {
        channelNameList:[],
        menuId:'',
        formLabelWidth: '120px',
        exportExle:false,
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        successCount:'',
        priceSum:'',
        moneySum:'',
        smallSuccessCount:'',
        smallPriceSum:'',
        smallMoneySum:'',
        optionW:'1px',
        rep:false,
        showW:false,
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
        selectTime:''
       }
    },
    created() {
      this.menuId=this.$route.query.id;
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
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
      }
    },
    methods: {
      indexMethod(index) {
        return index * 1 + 1
      },
      //重发
      repTap(id) {
        this.$confirm('此操作将重发消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            let parameterData = {
              ordernum: id
            }
              this.$fetch('/api/PCDDCallback/reSend', parameterData).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: '重发成功！'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }

            this.accountList()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消重发操作'
            })
          })
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
          accountId:this.formInline.accountId,
          adtype:this.formInline.adtype
        }
        this.$fetch('/wish/mdtechCallback/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            for(var i=0;i<res.data.list.length;i++){
              // 任务类型0=CPA安装 1=CPA签到 2=唤醒广告 3=小程序广告 4=公众号 5=CPL广告,6=ASO广告,7=截图广告,9=看看赚
              if(res.data.list[i].adtype == 0){
                res.data.list[i].adtype = 'CPA安装';
              }else if(res.data.list[i].adtype == 1){
                res.data.list[i].adtype = 'CPA签到';
              }else if(res.data.list[i].adtype == 2){
                res.data.list[i].adtype = '唤醒广告';
              }else if(res.data.list[i].adtype == 3){
                res.data.list[i].adtype = '小程序广告';
              }else if(res.data.list[i].adtype == 4){
                res.data.list[i].adtype = '唤醒广告';
              }else if(res.data.list[i].adtype == 5){
                res.data.list[i].adtype = 'CPL广告';
              }else if(res.data.list[i].adtype == 6){
                res.data.list[i].adtype = 'ASO广告';
              }else if(res.data.list[i].adtype == 7){
                res.data.list[i].adtype = '截图广告';
              }else if(res.data.list[i].adtype == 9){
                res.data.list[i].adtype = '看看赚';
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
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'rep') {
                this.rep =true;
                // this.optionW = '75px'
              }else {
               this.showW = false
              }
            }
          } else {
          }
        })
      },
      search() {
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = new Date(this.selectTime[0]).getTime();
        }else {
          this.formInline.startTime = ''
        }
        //结束时间
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime =  new Date(this.selectTime[1]).getTime();
        }else {
          this.formInline.endTime = ''
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      //时间查询
      timePickeTap(){
        if (this.formInline.creatorTime){
          let times = this.formInline.creatorTime;
          this.formInline.creatorTime = formatDate(new Date(times), 'yyyy-MM-dd');
        }else {
          this.formInline.creatorTime = ''
        }
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
  .el-table.u th{
    padding: 0;
  }
  .el-table.a th{
    padding: 12px 0;
  }
  .pcdd-callback-wrap .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .pcdd-callback-wrap .sun_sty .list{
    width: 100%;
    height: 30px;
    /*text-align: right;*/
  }
  .pcdd-callback-wrap .sun_sty .list .item.xiao:nth-child(1){
    min-width: 50px;
    max-width: 50px
  }
  .pcdd-callback-wrap .sun_sty .list .item.su{
    float: left;
    min-width: 150px;
    max-width: 200px;
    height: 30px;
  }
  .pcdd-callback-wrap .sun_sty .list .item{
    float: left;
    min-width: 240px;
    max-width: 300px;
    height: 30px;
  }

  .pcdd-callback-wrap .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .pcdd-callback-wrap .sun_sty p span{
    font-size: 12px;
  }

  .blue{
    color: #409eff;
  }
  .green{
    color: #13ce66;
  }
  .yellow{
    color: #e6a23c;
  }

  .red{
    color: #ff4d51;
  }

  .zi{
    color: #d8b1ee;
  }

  .mar_bottom{
    margin-bottom: 20px;
  }
  .pcdd-callback-wrap {
    width: 100%;
  }

  .pcdd-callback-inner {
    margin: auto;
    padding: 0 20px;
  }

  .pcdd-callback-header {
    margin-bottom: 20px;
  }

  .pcdd-callback-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .pcdd-callback-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
