<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/游戏任务</h3>
        <hr />
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户ID:">
            <el-input v-model="formInline.accountId" auto-complete="off" placeholder="请输入用户ID"  clearable>
            </el-input>
        </el-form-item>

        <el-form-item label="游戏方名称:">
          <el-input v-model="formInline.tpName" placeholder="请输入游戏方名称" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="游戏名称:">
          <el-input v-model="formInline.gameName" placeholder="请输入游戏名称" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>

        <el-form-item  label="创建时间:">
          <el-date-picker
            v-model="selectTime"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" plain @click="search" >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="queryExport" >导出表格</el-button>
        </el-form-item>
      </el-form>

      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="528">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" min-width="100px" prop="tpName" label="游戏方名称">
            </el-table-column>
            <el-table-column  min-width="100px" prop="gameId" label="游戏ID">
            </el-table-column>
            <el-table-column  min-width="100px" prop="gameName" label="游戏名称">
            </el-table-column>
            <el-table-column  min-width="210px" prop="orderNum" label="流水号">
            </el-table-column>
            <el-table-column  min-width="150px" prop="gameReward" label="游戏方奖励金币数">
            </el-table-column>
            <el-table-column  min-width="150px" prop="reward" label="总奖励金币数">
            </el-table-column>
            <!--<el-table-column  min-width="150px" prop="tpGameId" label="用户在游戏方的ID">-->
            <!--</el-table-column>-->
            <!--<el-table-column  min-width="120px" prop="mobile" label="用户手机号">-->
            <!--</el-table-column>-->
            <el-table-column  min-width="120px" prop="accountId" label="用户ID">
            </el-table-column>
            <el-table-column  min-width="150px" prop="channelCode" label="渠道标识">
            </el-table-column>
            <el-table-column width="170px" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
          </el-table>
        </template>
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
    name: 'GameSide',
    data() {
      return {
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        selectTime:'',
        pickerTime: {
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
              if(res.data[i].btnCode == 'add') {
                this.add=true
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
                this.powerTrue =true;
                this.optionW = '160px'
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '160px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '230px'
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
          accountId:this.formInline.accountId,
          gameName :this.formInline.gameName,
          tpName :this.formInline.tpName,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
        }
        this.$fetch('/api/tpCallback/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list
            this.totalCount = res.data.total
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

        // if (this.formInline.createTime) {
        //   this.formInline.createTime = this.formInline.createTime.getTime();
        // }

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
        let gameName=this.formInline.gameName;
        let tpName=this.formInline.tpName;
        let startTime=this.formInline.startTime;
        let endTime=this.formInline.endTime;
        let token= getSession("token");
        let channel= getSession("channelCode");
        let relation= getSession("userRelation");

        let url = '/api/excl/gameTeskExcl';
        let data = {url,accountId,gameName,tpName,startTime,endTime,token,channel,relation};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          accountId=obj.accountId,
          gameName=obj.gameName,
          tpName=obj.tpName,
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
          if(gameName){
            http=http+'?gameName=' + gameName
          }
        }else{
          if(gameName){
            http=http+'&gameName=' + gameName
          }
        }
        if(http==url){
          if(tpName){
            http=http+'?tpName=' + tpName
          }
        }else{
          if(tpName){
            http=http+'&tpName=' + tpName
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
