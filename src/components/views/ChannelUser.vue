<template>
  <div class="userloanInformation-wrap">
    <div class="userloanInformation-inner">
      <div class="userloanInformation-header">
        <h3>用户管理/渠道用户</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="用户id:">
            <el-input v-model="formInline.accountId"
                      placeholder="请输入用户id"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="累计赚取金币数:">
            <el-input v-model="formInline.minCoin"
                      placeholder="请输入最小值"
                      clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="formInline.maxCoin"
                    placeholder="请输入最大值"
                    clearable></el-input>
          </el-form-item>

          <el-form-item label="注册时间:">
              <el-date-picker
                @change="timeChang"
                v-model="selectTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button class="le-bottom" @click="search()">查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button @click="queryExport()">导出表格</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="userloanInformation-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    height="640">
            <el-table-column fixed="left" label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80'>
            </el-table-column>

            <el-table-column min-width="140px"  fixed="left"  prop="accountId"
                             label="用户ID">
            </el-table-column>
            <el-table-column min-width="140px"  prop="mobile"
                             label="手机">
            </el-table-column>
            <el-table-column min-width="150px" prop="channelCode"
                             label="渠道标识">
            </el-table-column>

            <el-table-column min-width="150px" prop="sumRecharge"
                             label="累计充值(￥)">
            </el-table-column>
            <el-table-column min-width="150px" prop="sumCash"
                             label="累计提现(￥)">
            </el-table-column>
            <el-table-column  width="200px" prop="sumCoin"
                              label="累计赚取金币数">
            </el-table-column>
            <el-table-column min-width="200px" prop="coin"
                             label="剩余金币"
                             >
            </el-table-column>
            <el-table-column min-width="300px" prop="pigCoin"
                             label="剩余金猪"
                             >
            </el-table-column>

            <el-table-column  width="170px" :formatter="dateFormat" prop="createTime"
                              label="注册时间"
            >
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 70]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  import { getSession } from '../../utils/cookie'
  export default {
    name: 'ChannelUser',
    data() {
      return {
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData:[],
        formInline:{
          accountId:'',
          startTime:'',
            endTime:'',
            minCoin:'',
            maxCoin:''
        },
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
      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.accountList()
    },
    methods: {
      //导出表格
      queryExport() {
        // if (this.tableData.length<1){
        //   this.$message({
        //     type: 'error',
        //     message: '请选择要导出的数据',
        //     duration: 3000
        //   })
        //   return false;
        // }

        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }

        let accountId=this.formInline.accountId;
        let startTime=this.formInline.startTime;
        let endTime=this.formInline.endTime;
        let minCoin=this.formInline.minCoin;
        let maxCoin=this.formInline.maxCoin;
        let token= getSession("token");
        let channel= getSession("channelCode");

        let url = '/api/excl/channelExclUser';
        let data = {url,accountId,startTime,endTime,minCoin,maxCoin,token,channel};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          accountId=obj.accountId,
          startTime=obj.startTime,
          endTime=obj.endTime,
          minCoin=obj.minCoin,
          maxCoin=obj.maxCoin,
          token= obj.token,
          channel=obj.channel

        let a1 = document.createElement('a');
        console.log(url + '?accountId=' + accountId +'&startTime='+startTime +'&endTime='+endTime +'&minCoin='+minCoin +'&maxCoin='+maxCoin)

        a1.setAttribute('href',url + '?accountId=' + accountId +'&startTime='+startTime +'&endTime='+endTime +'&minCoin='+minCoin +'&maxCoin='+maxCoin+'&token='+token+'&channel='+channel);
        // a1.setAttribute('href',url + '?ids=' + ids);

        let body = document.querySelector('body');
        body.appendChild(a1);
        a1.click();
        a1.remove();
      },

      timeChang(){

      },
      search() {
        this.currentPage = 1;
        this.pageSize = 10;
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }
        this.accountList();
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
          accountId:this.formInline.accountId,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
          minCoin:this.formInline.minCoin,
          maxCoin:this.formInline.maxCoin
        }
        this.$fetch('/api/userInfo/channelList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].digitalNumType == 1) {
                res.data.list[i].digitalNumType = "身份证号"
              } else {
                res.data.list[i].digitalNumType = "驾驶证"
              }
            }
            this.tableData = res.data.list
            this.totalCount = res.data.total
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.accountList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.accountList()
      },
    }
  }
</script>
<style type="text/css">

  .le-bottom{
    margin-left: 20px;
  }
  .time_zhuce{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .userloanInformation-wrap {
    width: 100%;
  }
  .userloanInformation-inner {
    margin: auto;
    padding: 0 20px;
  }
  .userloanInformation-header {
    margin-bottom: 20px;
  }
  .userloanInformation-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .userloanInformation-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }
  .el-table th {
    background-color: #e6e6e6;
  }
  .information-wrap {
    margin-top: -30px;
    margin-bottom: 20px;
  }
  .information {
    display: flex;
  }
  .information div,
  .information-two div {
    margin-right: 20px;
  }
  .information div span,
  .information-two div span {
    color: red;
  }
  .information-two {
    display: flex;
    flex-wrap: wrap;
    width: 680px;
    line-height: 25px;
  }
  .informationImg{
    width: 178px;
    height: 178px;
  }
  .information-three div{
    display: inline-grid;
    margin: 5px 30px;
  }
</style>
