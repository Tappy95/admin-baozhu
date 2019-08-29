<template>
  <div class="cash-dis-statistics-wrap">
    <div class="cash-dis-statistics-inner">
      <div class="cash-dis-statistics-header">
        <h3>运营管理/提现统计</h3>
        <hr />
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户ID:">
          <el-input v-model="formInline.accountId" auto-complete="off" placeholder="请输入用户ID"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item v-if="channelCode=='baozhu'" label="渠道标识:">
          <el-input v-model="formInline.channelCode" placeholder="请输入渠道标识" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="提现次数:">
          <el-input v-model="formInline.cashNum" placeholder="请输入提现次数" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="距离注册时间的天数:">
          <el-input v-model="days" placeholder="请输入距离注册时间的天数" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" plain @click="search" >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="queryExport" v-if="exportExle">导出表格</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div class="cash-dis-statistics-table">
      <template>
        <el-table :data="tableData" max-height="506">
          <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
          </el-table-column>
          <el-table-column fixed="left" min-width="100px" prop="accountId" label="用户id">
          </el-table-column>
          <el-table-column  min-width="100px" prop="channelCode" label="渠道标识">
          </el-table-column>
          <el-table-column  min-width="200px" prop="outTradeNo" label="订单号">
          </el-table-column>
          <el-table-column  width="210px" prop="cashCoin" label="提现金币">
            <template slot-scope="scope">
              <span>{{scope.row.cashCoin | currency}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="150px" prop="cashNum" label="提现次数">
          </el-table-column>
          <el-table-column width="170px" prop="createDate" label="注册时间">
          </el-table-column>
          <el-table-column  width="170px" prop="cashDate" label="提现时间">
          </el-table-column>
          <el-table-column  width="200" prop="days" label="距离注册时间的天数">
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
    name: 'CashDiscountStatistics',
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
          cashNum:'',
          days:'',
        },
        tableData: [],
        channelCode:'',
        days:''
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
      this.channelCode = getSession("channelCode")
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
          channelCode :this.formInline.channelCode,
          cashNum :this.formInline.cashNum,
          days:this.formInline.days,
        }
        this.$fetch('/api/userCashLog/list', parameterData).then(res => {
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

        if (this.days && this.days==0){
          this.formInline.days = -1;
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
  .cash-dis-statistics-wrap {
    width: 100%;
  }

  .cash-dis-statistics-inner {
    margin: auto;
    padding: 0 20px;
  }

  .cash-dis-statistics-header {
    margin-bottom: 20px;
  }

  .cash-dis-statistics-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .cash-dis-statistics-table {
    border: 1px solid #e6e6e6;
    margin: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
