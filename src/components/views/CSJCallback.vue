<template>
  <div class="csj-wrap">
    <div class="csj-inner">
      <div class="csj-header">
        <h3>第三方回调/穿山甲回调</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户Id:" >
            <el-input placeholder="请输入用户Id"
                      v-model="formInline.accountId"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="订单号:" >
            <el-input style="width: 300px"  placeholder="请输入订单号"
                      v-model="formInline.trans_id"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="视频用途:" >
            <el-select v-model="formInline.operateType" placeholder="请选择视频用途">
              <el-option label="每日红包" value="1"></el-option>
              <el-option label="首页视频" value="2"></el-option>
              <el-option label="补签卡" value="3"></el-option>
              <el-option label="首页弹窗" value="4"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:" >
            <el-select v-model="formInline.state" placeholder="请选择状态">
              <el-option label="成功" value="1"></el-option>
              <el-option label="验签失败" value="2"></el-option>
              <el-option label="异常" value="3"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间:">
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
      <div class="csj-table">
        <template>
          <el-table  :data="tableData" max-height="600">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="100" prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column width="270" prop="trans_id" label="订单号">
            </el-table-column>
            <el-table-column width="150" prop="operateType"  label="视频用途">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.operateType==1">每日红包</span>
                <span class="green" v-if="scope.row.operateType==2">首页视频</span>
                <span class="yellow" v-if="scope.row.operateType==3">补签卡</span>
                <span class="yellow" v-if="scope.row.operateType==4">首页弹窗</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" prop="reward_amount" label="奖励金币数量">
              <template slot-scope="scope">
                <span>{{scope.row.reward_amount |  currency}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170" :formatter="dateFormat" prop="creatorTime" label="创建时间">
            </el-table-column>
            <el-table-column width="150" prop="state"  label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.state==1">成功</span>
                <span class="red" v-if="scope.row.state==2">验签失败</span>
                <span class="zi" v-if="scope.row.state==3">异常</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200" prop="remarks" label="备注">
            </el-table-column>
          </el-table>
        </template>
      </div>

      <div class="sun_sty" v-if="tableData.length>0">
        <div class="list">
          <div class="item xiao"><p>小计：</p></div>
          <div class="item su"><p> [ 成功数： {{smallSuccessCount | currency}} ]</p></div>
          <div class="item"><p> [ 用户奖励：{{smallMoneySum | currency}} ]</p></div>
        </div>
        <div class="list">
          <div class="item xiao"><p>合计：</p></div>
          <div class="item su"><p> [ 成功数： {{successCount | currency}} ]</p></div>
          <div class="item"><p> [ 用户奖励：{{moneySum | currency}} ]</p></div>
        </div>
      </div>
      <div class="block mar-bottom">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  export default {
    name: 'CSJCallback',
    data() {
      return {
        menuId:'',
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        smallSuccessCount:'',
        smallMoneySum:'',
        successCount:'',
        moneySum:'',
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
      this.accountList();
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseFloat(num);
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
          trans_id:this.formInline.trans_id,
          operateType:this.formInline.operateType,
          state:this.formInline.state,
          startCreatorTime:this.formInline.startCreatorTime,
          endCreatorTime:this.formInline.endCreatorTime
        }
        this.$fetch('/api/video/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            this.smallSuccessCount = res.data.smallSuccessCount;
            this.smallMoneySum = res.data.smallMoneySum;
            this.successCount = res.data.successCount;
            this.moneySum = res.data.moneySum;
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
          this.formInline.startCreatorTime = new Date(this.selectTime[0]).getTime();
        }else {
          this.formInline.startCreatorTime = ''
        }

        //结束时间
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endCreatorTime =  new Date(this.selectTime[1]).getTime();
        }else {
          this.formInline.endCreatorTime = ''
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.accountList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.accountList();
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
  .csj-wrap .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .csj-wrap .sun_sty .list{
    width: 100%;
    height: 30px;
    /*text-align: right;*/
  }
  .csj-wrap .sun_sty .list .item.xiao:nth-child(1){
    min-width: 50px;
    max-width: 50px
  }
  .csj-wrap .sun_sty .list .item.su{
    float: left;
    min-width: 150px;
    max-width: 200px;
    height: 30px;
  }
  .csj-wrap .sun_sty .list .item{
    float: left;
    width: 240px;
    min-width: 240px;
    max-width: 300px;
    height: 30px;
  }

  .csj-wrap .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .csj-wrap .sun_sty p span{
    font-size: 12px;
  }
  .mar-bottom{
    margin-bottom: 20px;
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
  .csj-wrap {
    width: 100%;
  }

  .csj-inner {
    margin: auto;
    padding: 0 20px;
  }

  .csj-header {
    margin-bottom: 20px;
  }

  .csj-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .csj-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
