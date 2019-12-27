<template>
  <div class="user-trial-wrap">
    <div class="user-trial-inner">
      <div class="user-trial-header">
        <h3>运营管理/用户试玩数据</h3>
        <hr />
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户ID:" style="margin-right: 20px">
          <el-input v-model="formInline.accountId" auto-complete="off" placeholder="请输入用户ID"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item v-if="channelCode=='baozhu'" label="渠道标识:">
          <el-input v-model="formInline.channelCode" placeholder="请输入渠道标识" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="注册当日完成游戏个数:">
          <el-input v-model="formInline.minZcYxCount" style="width: 100px" placeholder="最少个数" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="至">
          <el-input v-model="formInline.maxZcYxCount" style="width: 100px" placeholder="最多个数" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="累计完成游戏个数:">
          <el-input v-model="formInline.minYxCount" style="width: 100px" placeholder="最小个数" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="至:">
          <el-input v-model="formInline.maxYxCount" style="width: 100px" placeholder="最大个数" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="注册时间:">
          <el-date-picker
            v-model="selectTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="起始注册时间"
            end-placeholder="结束注册时间"
            align="left">
          </el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" plain @click="search" >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="queryExport" v-if="exportExle">导出表格</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-trial-table">
      <template>
        <el-table :data="tableData" max-height="506">
          <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
          </el-table-column>
          <el-table-column fixed="left" min-width="100px" prop="accountId" label="用户ID">
          </el-table-column>
          <el-table-column  min-width="100px" prop="channelCode" label="渠道标识">
          </el-table-column>
          <el-table-column  min-width="200px" prop="zcYxGame" label="注册当日完成游戏个数">
          </el-table-column>
          <el-table-column  min-width="200px" prop="yxGame" label="累计完成游戏个数">
          </el-table-column>
          <el-table-column width="170px" prop="createTime" label="注册时间">
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
    name: 'UserTrial',
    data() {
      return {
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        exportExle:false,
        formInline: {
          accountId:'',
          channelCode:'',
          minZcYxCount:'',
          maxZcYxCount:'',
          minYxCount:'',
          maxYxCount:'',
          startTime:'',
          endTime:'',
        },
        tableData: [],
        channelCode:'',
        selectTime: '',
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
          accountId:this.formInline.accountId,
          channelCode:this.formInline.channelCode,
          minZcYxCount:this.formInline.minZcYxCount,
          maxZcYxCount:this.formInline.maxZcYxCount,
          minYxCount:this.formInline.minYxCount,
          maxYxCount:this.formInline.maxYxCount,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
        }

        this.$fetch('/api/userStatistic/userList', parameterData).then(res => {
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
        this.accountList();
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
        let url ='/excl/userGameStatisticExcl';
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
  .user-trial-wrap {
    width: 100%;
  }

  .user-trial-inner {
    margin: auto;
    padding: 0 20px;
  }

  .user-trial-header {
    margin-bottom: 20px;
  }

  .user-trial-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .user-trial-table {
    border: 1px solid #e6e6e6;
    margin: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
