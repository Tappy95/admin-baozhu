<template>
  <div class="punch-card-record-wrap">
    <div class="punch-card-record-inner">
      <div class="punch-card-record-header">
        <h3>早起打卡/打卡记录</h3>
        <hr />
      </div>
      <div>
        <el-form  :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户Id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户Id" clearable></el-input>
          </el-form-item>

          <el-form-item  label="状态:" >
            <el-select v-model="formInline.state"  placeholder="请选择状态">
              <el-option label="待打卡" value="1"></el-option>
              <el-option label="打卡成功" value="2"></el-option>
              <el-option label="打卡失败" value="3"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label-width="labelWidth" label="创建时间:">
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
          <el-form-item>
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
        </el-form>
      </div>
      <div class="punch-card-record-table">
        <template>
          <el-table :data="tableData" max-height="518">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="100" fixed="left" prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column label="状态" min-width="120px">
              <template slot-scope="scope">
                <span class="blue" v-if="scope.row.state==1">待打卡</span>
                <span class="green" v-if="scope.row.state==2">打卡成功</span>
                <span class="red" v-if="scope.row.state==3">打卡失败</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" prop="payCoin" label="支付金币">
              <template slot-scope="scope">
                <span class="amountyellow">
                 -{{scope.row.payCoin | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" coinBalance prop="rewardCoin" label="奖励金币">
              <template slot-scope="scope">
                <span class="amountgreen">
                 +{{scope.row.rewardCoin | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="isCoupon" min-width="170px" label="是否使用补签券">
              <template slot-scope="scope">
                <span v-if="scope.row.isCoupon==1">否</span>
                <span v-if="scope.row.isCoupon==2">是</span>
              </template>
            </el-table-column>
            <el-table-column  prop="createTime" :formatter="dateFormat" min-width="170px" label="创建时间">
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="sun_sty" v-if="tableData.length>0">
        <div class="list nolen">
          <div class="item" style="min-width: 40px"><p>小计:<span></span></p></div>
          <div class="item"><p> [ 支付金额： {{subPayCoin | currency}} ]</p></div>
          <div class="item"><p>[ 奖励金额：{{subRewardCoin | currency}} ]</p></div>
        </div>
        <div class="list nolen">
          <div class="item" style="min-width: 40px"><p>合计:<span></span></p></div>
          <div class="item"><p> [ 支付金额： {{payCoin | currency}} ]</p></div>
          <div class="item"><p>[ 奖励金额：{{rewardCoin | currency}} ]</p></div>
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
  export default {
    name: 'PunchCardRecord',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        searchTrue:false,
        exportExle:false,
        menuId:'',
        isNotAuditing:false,
        labelWidth:'80px',
        optionW:'1px',
        messageForm:{},
        reasonMess:false,
        dialogTableVisible:false,
        dialogTable:false,
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        subPayCoin:'',
        subRewardCoin:'',
        payCoin:'',
        rewardCoin:'',
      formInline: {
          startCreateTime:'',
          endCreateTime:'',
          accountId:'',
          state:'',
        },
        tableData: [],
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
      this.menuId=this.$route.query.id;
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
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          startCreateTime:this.formInline.startCreateTime,
          endCreateTime:this.formInline.endCreateTime,
          accountId:this.formInline.accountId,
          state:this.formInline.state,
        }
        this.$fetch('/api/checkinLog/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = parseInt(res.data.total);
            this.subPayCoin = res.data.subPayCoin;
            this.subRewardCoin = res.data.subRewardCoin;
            this.payCoin = res.data.payCoin;
            this.rewardCoin = res.data.rewardCoin;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },
      search(){
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startCreateTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startCreateTime ='';
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endCreateTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endCreateTime ='';
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
  .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .sun_sty .list{
    width: 100%;
    height: 30px;
  }
  .sun_sty .list.nolen .item:nth-child(1){
    width: 40px;
    /*max-width: 200px;*/
  }
  .sun_sty .list .item{
    float: left;
    width: 150px;
    height: 30px;
    max-width: 300px;
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

  .punch-card-record-wrap {
    width: 100%;
  }

  .punch-card-record-inner {
    margin: auto;
    padding: 0 20px;
  }

  .punch-card-record-header {
    margin-bottom: 20px;
  }

  .punch-card-record-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .punch-card-record-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
