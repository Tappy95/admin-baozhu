<template>
  <div class="bz-game-details-wrap">
    <div class="bz-game-details-inner">
      <div class="bz-game-details-header">
        <!--<h3>宝猪28/投资明细</h3>-->
        <div class="bz-detail-title">期数 {{nums}} 投资明细</div>
        <div class="bz-28-title">
           <span  @click="backReport"><i  class="el-icon-arrow-left"></i> 返回游戏报表</span>
          <!--<el-button @click="backReport" type="success" size="small" plain icon="el-icon-arrow-left">返回游戏报表</el-button>-->
        </div>
        <hr />
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户Id:">
          <el-input v-model="formInline.accountId" auto-complete="off" placeholder="请输入用户Id"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="formInline.mobile" auto-complete="off" placeholder="请输入电话"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" plain @click="search" >查询</el-button>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-button type="success" plain @click="queryExport" v-if="exportExle">导出表格</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
    <div class="bz-game-details-table">
      <template>
        <el-table :data="tableData" max-height="506">
          <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
          </el-table-column>
          <el-table-column fixed="left" min-width="100px" prop="accountId" label="用户Id">
          </el-table-column>
          <el-table-column  min-width="120px" prop="aliasName" label="姓名">
          </el-table-column>
          <el-table-column  min-width="120px" prop="mobile" label="电话">
          </el-table-column>
          <el-table-column  width="150px" prop="timeNo" label="期数">
          </el-table-column>
          <el-table-column  width="150px" prop="name" label="投资号码">
          </el-table-column>
          <el-table-column width="170px" label="投资金额">
            <template slot-scope="scope">
              <span >{{scope.row.amount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="200" label="中奖金额">
            <template slot-scope="scope">
              <span v-if="scope.row.zjAmount>0" class="red">+{{scope.row.zjAmount | currency}}</span>
              <span v-else-if="scope.row.zjAmount<0" class="green">-{{scope.row.zjAmount | currency}}</span>
              <span v-else>{{scope.row.zjAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="200"  label="预计中奖金额">
            <template slot-scope="scope">
              <span class="text_gree">{{scope.row.yjzjAmount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="120px">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">待揭晓</span>
              <span v-if="scope.row.status==2">已猜中</span>
              <span v-if="scope.row.status==3">未猜中</span>
              <span v-if="scope.row.status==4">退款</span>
            </template>
          </el-table-column>
          <el-table-column  width="170px"  label="账户余额">
            <template slot-scope="scope">
              <span>{{scope.row.pigCoin | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="200" prop="updateTime" :formatter="dateFormat" label="变更时间">
          </el-table-column>
          <el-table-column  width="170px" prop="regTime" :formatter="dateFormat" label="注册时间">
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="block" style="margin-left: 10px">
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
    name: 'BzGameDetail',
    data() {
      return {
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        exportExle:false,
        formInline: {},
        tableData: [],
        channelCode:'',
        days:'',
        minDays:'',
        maxDays:'',
        selectTime: '',
        selectTimeCash:'',
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
        detailId:'',
        nums:'',
      }
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    created() {
      this.menuId=this.$route.query.id;
      this.detailId = this.$route.query.detailId;
      this.nums = this.$route.query.num;

      this.channelCode = getSession("channelCode");
      this.queryBtns();
      this.accountList();
    },
    methods: {
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'exportExle') {
                this.exportExle=true
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
          timeId:this.detailId,
          accountId:this.formInline.accountId,
          mobile:this.formInline.mobile,
        }
        this.$fetch('/bz28/lotteryOrder/queryListByTime', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
          } else {
            this.$message({type: 'error', message: res.message, duration: 3000})
          }
        })
      },

      //返回游戏报表
      backReport(){
        this.$router.push({
          name: 'BzGameReport',
        })
      },

      search() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList()
      },

      //导出表格
      queryExport() {
        this.search();
        //开启正在导出弹层
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: '正在导出...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.formInline.token=getSession("token");
        this.formInline.channel=getSession("channelCode");
        this.formInline.relation= getSession("userRelation");
        let url ='/api/excl/exclUserCashLog';
        this.doDownload(this.formInline,url);
      },

      doDownload(from,url){
        let keys=[];
        let data=[];
        for (var i in from) {
          if(from[i]!=null && from[i]!='') {
            keys.push(i)
            data.push(from[i])
          }
        }
        let http=url;
        for(let i=0;i<keys.length;i++){
          if(http==url){
            http=http+'?'+keys[i]+'='+ data[i]
          }else{
            http=http+'&'+keys[i]+'='+ data[i]
          }
        }
        let a1 = document.createElement('a');
        a1.setAttribute('href',http);
        let body = document.querySelector('body');
        body.appendChild(a1);
        a1.click();
        a1.remove();
        //关闭正在导出弹层
        setTimeout(() => {
          this.fullscreenLoading.close();
        }, 9000);
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

  .bz-detail-title{
    color: #e6a23c;
    font-size: 18px;
    margin: 20px 0;
  }
  .bz-28-title{
    margin: 20px 0 10px 0;
    font-size: 14px;
    color: #67c23a;
    cursor: pointer;
  }
  .text_gree{
    color: #cccccc;
  }
  .bz-game-details-wrap {
    width: 100%;
  }

  .bz-game-details-inner {
    margin: auto;
    padding: 0 20px;
  }

  .bz-game-details-header {
    margin-bottom: 20px;
  }

  .bz-game-details-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .bz-game-details-table {
    border: 1px solid #e6e6e6;
    margin: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
