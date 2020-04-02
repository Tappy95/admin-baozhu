<template>
  <div class="wishxianwan-callback-wrap">
    <div class="wishxianwan-callback-inner">
      <div class="wishxianwan-callback-header">
        <h3>心愿值/闲玩回调</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户Id:" >
            <el-input placeholder="请输入用户Id"
                      v-model="formInline.accountId"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="游戏名称:" >
            <el-input placeholder="请输入游戏名称"
                      v-model="formInline.adname"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="订单号:" >
            <el-input placeholder="请输入订单号"
                      clearable></el-input>
          </el-form-item>

          <el-form-item v-if="channelCode=='baozhu'" label="渠道标识:">
            <el-input  v-model="formInline.channelCode" placeholder="请输入渠道标识" clearable></el-input>
          </el-form-item>

          <el-form-item label="状态:" >
            <el-select v-model="formInline.status " placeholder="请选择状态">
              <el-option label="失败" value="2"></el-option>
              <el-option label="成功" value="1"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="回调时间:">
            <el-date-picker
              v-model="selectTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="left">
            </el-date-picker>
          </el-form-item>

          <el-form-item >
            <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="wishxianwan-callback-table">
        <template>
          <!--:class="showW?'u':'a'"-->
          <el-table  :data="tableData" max-height="600">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="250" fixed="left" prop="ordernum" label="订单号">
            </el-table-column>
            <el-table-column min-width="120" prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column min-width="150" prop="channelCode" label="渠道号">
            </el-table-column>
            <!--<el-table-column min-width="120" prop="merid" label="用户注册游戏Id">-->
            <!--</el-table-column>-->
            <!--<el-table-column min-width="120" prop="adid" label="游戏Id">-->
            <!--</el-table-column>-->
            <el-table-column min-width="120" prop="adname" label="游戏名称">
            </el-table-column>
            <el-table-column min-width="150" prop="appid" label="开发者Id">
            </el-table-column>
            <el-table-column min-width="170" prop="deviceid" label="设备号">
            </el-table-column>
            <!--<el-table-column min-width="120" prop="dlevel"  label="奖励级别">-->
            <!--</el-table-column>-->
            <el-table-column min-width="120" prop="price" label="总奖励">
            </el-table-column>
            <el-table-column min-width="120" prop="money" label="用户奖励">
            </el-table-column>
            <el-table-column min-width="120" prop="xy" label="心愿值">
            </el-table-column>
            <!--<el-table-column min-width="250" prop="event"  label="奖励说明">-->
            <!--</el-table-column>-->
            <el-table-column min-width="120" prop="status"  label="状态">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.status==2">失败</span>
                <span class="green" v-if="scope.row.status==1">成功</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170" prop="createTime"  label="回调时间">
            </el-table-column>
          </el-table>
        </template>
      </div>

      <div class="sun_sty" v-if="tableData.length>0">
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
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { getSession } from '../../utils/cookie'
  import { formatDate } from '../../utils/date.js'
  export default {
    name: 'WishXwCallback',
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
        selectTime:'',
        channelCode:'',
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.accountList();
      this.channelCode=getSession("channelCode");
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
          accountId:this.formInline.accountId,
          adname:this.formInline.adname,
          status:this.formInline.status,
          ordernum:this.formInline.ordernum,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
          channelCode:this.formInline.channelCode,
        }
        this.$fetch('/api/XWCallback/xyzList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            this.successCount = res.data.successCount;
            this.priceSum = res.data.priceSum;
            this.moneySum = res.data.moneySum;
            this.smallSuccessCount = res.data.smallSuccessCount;
            this.smallPriceSum = res.data.smallPriceSum;
            this.smallMoneySum = res.data.smallMoneySum;
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
            this.$fetch('/api/XWCallback/reSend', parameterData).then(res => {
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
  .wishxianwan-callback-wrap .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .wishxianwan-callback-wrap .sun_sty .list{
    width: 100%;
    height: 30px;
    /*text-align: right;*/
  }
  .wishxianwan-callback-wrap .sun_sty .list .item.xiao:nth-child(1){
    width: 50px;
    min-width: 50px;
    max-width: 50px
  }
  .wishxianwan-callback-wrap .sun_sty .list .item.su{
    float: left;
    min-width: 150px;
    max-width: 200px;
    height: 30px;
  }
  .wishxianwan-callback-wrap .sun_sty .list .item{
    float: left;
    min-width: 240px;
    max-width: 300px;
    height: 30px;
  }

  .wishxianwan-callback-wrap .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .wishxianwan-callback-wrap .sun_sty p span{
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
  .wishxianwan-callback-wrap {
    width: 100%;
  }

  .wishxianwan-callback-inner {
    margin: auto;
    padding: 0 20px;
  }

  .wishxianwan-callback-header {
    margin-bottom: 20px;
  }

  .wishxianwan-callback-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .wishxianwan-callback-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
