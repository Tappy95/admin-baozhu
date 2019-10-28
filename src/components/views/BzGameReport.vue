<template>
  <div class="bz-game-report-wrap">
    <div class="bz-game-report-inner">
      <div class="bz-game-report-header">
        <h3>宝猪28/游戏报表</h3>
        <hr />
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="期号:">
          <el-input v-model="formInline.timeNo" auto-complete="off" placeholder="请输入期号"  clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="预计开奖时间">
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
          <el-button type="primary" plain @click="search" >查询</el-button>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button type="success" plain @click="queryExport" v-if="exportExle">导出表格</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
    <div class="bz-game-report-table">
      <template>
        <el-table :data="tableData" max-height="556">
          <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
          </el-table-column>
          <el-table-column  min-width="100px" prop="timeNo" label="期号">
          </el-table-column>
          <el-table-column  width="170px" :formatter="dateFormat" prop="endDate" label="预计开奖时间">
          </el-table-column>
          <el-table-column  min-width="200px" label="实际竞猜人数">
            <template slot-scope="scope">
              <span>{{scope.row.sjjcCount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="210px" label="实际竞猜金猪">
            <template slot-scope="scope">
              <span>{{scope.row.sjjcAmount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="150px" label="实际中奖金猪">
            <template slot-scope="scope">
              <span>{{scope.row.sjzjAmount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="170px" label="实际盈亏金猪">
            <template slot-scope="scope">
              <span v-if="scope.row.sjykAmount>0" class="red">+{{scope.row.sjykAmount | currency}}</span>
              <span v-else-if="scope.row.sjykAmount<0" class="green">{{scope.row.sjykAmount | currency}}</span>
              <span v-else>{{scope.row.sjykAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="170px"  label="机器人竞猜人数">
            <template slot-scope="scope">
              <span>{{scope.row.robotCount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="170" label="机器人竞猜金猪">
            <template slot-scope="scope">
              <span>{{scope.row.robotAmount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="170"  label="机器人中奖金猪">
            <template slot-scope="scope">
              <span>{{scope.row.robotzjAmount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="200" prop="resultNum" label="开奖结果">
          </el-table-column>
          <el-table-column label="状态" min-width="120px">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">未开始</span>
              <span v-if="scope.row.status==2">已开奖</span>
              <span v-if="scope.row.status==3">已截止投注</span>
              <span v-if="scope.row.status==4">已锁定</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作"  width="175" >
            <template slot-scope="scope">
              <el-button type="info" plain @click="getOne(scope.row.id,scope.row.timeNo)" size="mini">查看</el-button>
              <el-button size="mini" type="warning" plain @click="getDetail(scope.row.id,scope.row.timeNo)">投资明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <el-dialog title="查看" :visible.sync="dialogTableDetail" width="1150px">
      <div class="timeN_title">期号：{{this.timeNoDetail}}</div>
      <template>
        <el-table :data="tableDetail" max-height="506">
          <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
          </el-table-column>
          <el-table-column  width="80px" prop="name" label="玩法">
          </el-table-column>
          <el-table-column  width="100px" prop="odds" label="赔率(%)">
          </el-table-column>
          <el-table-column  width="150px"  label="实际竞猜人数">
            <template slot-scope="scope">
              <span>{{scope.row.sjjcCount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="150px"  label="实际竞猜金猪">
            <template slot-scope="scope">
              <span>{{scope.row.sjjcAmount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="150px" label="预计中奖金猪">
            <template slot-scope="scope">
              <span>{{scope.row.yjzAmount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="150px" label="实际中奖金猪">
            <template slot-scope="scope">
              <span>{{scope.row.sjzjAmount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="150px" label="机器人竞猜人数">
            <template slot-scope="scope">
              <span>{{scope.row.robotjcCount | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  min-width="150px"  label="机器人竞猜金猪">
            <template slot-scope="scope">
              <span>{{scope.row.robotjcAmount | currency}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>

    <div class="sun_sty report" v-if="tableData.length>0">
      <div class="list">
        <div class="item"><p>小计<span>({{tableData.length}}):</span></p></div>
        <div class="item"><p> [ 实际竞猜金猪： {{xjsjjcAmount | currency}} ]</p></div>
        <div class="item"><p> [ 实际中奖金猪：{{xjsjzjAmount | currency}} ]</p></div>
      </div>
      <div class="list">
        <div class="item"><p>合计<span>({{totalCount}}):</span></p></div>
        <div class="item"><p> [ 实际竞猜金猪： {{zjsjjcAmount | currency}} ]</p></div>
        <div class="item"><p>[ 实际中奖金猪：{{zjsjzjAmount | currency}} ]</p></div>
      </div>
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
    name: 'BzGameReport',
    data() {
      return {
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        exportExle:false,
        formInline: {
          timeNo:'',
          startTime:'',
          endTime:'',
        },
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
        dialogTableDetail:false,
        tableDetail:[],
        timeNoDetail:'',
        xjsjjcAmount:'',
        xjsjzjAmount:'',
        zjsjjcAmount:'',
        zjsjzjAmount:'',
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
          timeNo:this.formInline.timeNo,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
        }
        this.$fetch('/bz28/lotteryTime/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
              this.tableData = res.data.list;
              this.totalCount = res.data.total;

              this.xjsjjcAmount=res.data.xjsjjcAmount;
              this.xjsjzjAmount=res.data.xjsjzjAmount;
              this.zjsjjcAmount=res.data.zjsjjcAmount;
              this.zjsjzjAmount=res.data.zjsjzjAmount;
          } else {
            this.$message({type: 'error', message: res.message, duration: 3000})
          }
        })
      },
      search() {
        // const [first, second] = arr;
        //起始注册时间
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = new Date(this.selectTime[0]).getTime();
        }else {
          this.formInline.startTime = ''
        }
        //结束注册时间
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = new Date(this.selectTime[1]).getTime();
        }else {
          this.formInline.endTime = ''
        }

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
        let url ='/bz28/excl/exclUserCashLog';
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

      getOne(id,timeNoDetail){
        this.dialogTableDetail = true;
        this.timeNoDetail = timeNoDetail;
        this.$fetch('/bz28/lotteryTime/timeDetail', {
          id: id,
          lotteryId:1
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            // res.data.createTime =  formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
            this.tableDetail = res.data
          }
        })
      },

      //跳转投资明细
      getDetail(id,num){
        this.$router.push({
          name: 'BzGameDetail',
          query:{
            detailId:id,
            num:num
          }
        })
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

  .timeN_title{
    font-size: 16px;
    margin-bottom: 20px;
    color: #ff4d51;
  }

  .bz-game-report-wrap {
    width: 100%;
  }

  .bz-game-report-inner {
    margin: auto;
    padding: 0 20px;
  }

  .bz-game-report-header {
    margin-bottom: 20px;
  }

  .bz-game-report-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .bz-game-report-table {
    border: 1px solid #e6e6e6;
    margin: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }

.report {
  margin-left: 20px;
}
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
  .sun_sty.report .list .item:nth-child(1){
    width: 100px;
    min-width: 100px;
    max-width: 150px;
  }
  .sun_sty .list .item{
    float: left;
    width: 200px;
    min-width: 250px;
    max-width: 300px;
    height: 30px;
  }

  .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .sun_sty p span{
    font-size: 12px;
  }


</style>
