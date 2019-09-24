<template>
  <div class="task-cash-order-wrap">
    <div class="task-cash-order-inner">
      <div class="task-cash-order-header">
        <h3>运营管理/任务提现订单</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="用户Id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户Id" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建时间:">
            <el-date-picker
              v-model="formInline.creatorDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain  @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="no-tip">默认初始无数据，请输入用户Id和订单号进行查询即可！</div>
      </div>
      <div class="task-cash-order-table">
        <template>
          <el-table class="table-th" :data="tableData"
                    style="width: 100%"
                    v-loading="loading"
                    max-height="560">
            <el-table-column fixed="left" label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80'>
            </el-table-column>
            <el-table-column min-width="140px"  fixed="left"  prop="accountId" label="用户ID">
            </el-table-column>
            <el-table-column min-width="240px"  prop="outTradeNo" label="订单号">
            </el-table-column>
            <el-table-column min-width="120" prop="mode" label="提现方式">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.mode==1">微信</span>
                <span class="zi" v-if="scope.row.mode==2">支付宝</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px" prop="money" label="提现金额(￥)">
            </el-table-column>
            <el-table-column min-width="120" prop="state"  label="状态">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.state==1">未完成</span>
                <span class="yellow" v-if="scope.row.state==2">已完成</span>
                <span class="bule" v-if="scope.row.state==3">审核中</span>
                <span class="green" v-if="scope.row.state==4">提现成功</span>
              </template>
            </el-table-column>
            <el-table-column  width="170px"  prop="creatorDate" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="upd" width="78">
              <template slot-scope="scope">
                <el-button type="success" plain @click="passTap(scope.row.id)"  v-if="scope.row.state==1 && upd && (timey == scope.row.creatorDate) " size="mini">完成</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  export default {
    name:'TaskCashOrder',
    data() {
      return {
        formInline:{
          creatorDate:'',
          outTradeNo:''
        },
        upd:false,
        formLabelWidth: '150px',
        dialogFormVisible:false,
        menuId:'',
        tableData:[],
        loading:false,
        timey:'',
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
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      let timea  = formatDate(new Date(), 'yyyy-MM-dd')
      this.timey = String(timea)
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        // var dataval = parseInt(num);
        return num.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
      currencyFixed: function (num){
        // var dataval = parseInt(num);
        return num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
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
              if(res.data[i].btnCode == 'upd') {
                this.upd =true;
              }
            }
          } else {
          }
        })
      },
      search() {
        if (!this.formInline.creatorDate || !this.formInline.accountId) {
          this.$message({type: 'error', message: '请输入用户id和日期进行查询', duration: 3000})
          return
        }
        if (this.formInline.creatorDate) {
          this.formInline.creatorDate = formatDate(new Date(this.formInline.creatorDate), 'yyyy-MM-dd')
        }
        this.accountList();
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      accountList() {
        this.loading = true;
        let parameterData = {
          accountId:this.formInline.accountId,
          creatorDate:this.formInline.creatorDate
        }
        this.$fetch('/api/userCash/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            if(res.data.list){
              this.loading = false
            }
          }else {
            this.$message({type: 'error', message: res.message, duration: 3000})
            this.loading = false;
          }
        })
      },

      passTap(id) {
        this.$confirm('此操作将通过该订单, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$post('/api/userCash/updateState',{
              id:id
            }).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({ type: 'success', message: '操作成功！' })
                this.accountList()
              } else {
                this.$message({ type: 'error', message:  res.message })
              }
            })
          })
          .catch(() => {
            this.$message({ type: 'info', message: '已取消操作' })
          })
      },
    }
  }
</script>
<style type="text/css">
  .task-cash-order .table-th th{
    padding: 12px 0;
  }
  .no-tip{
    margin-bottom: 10px;
    font-size: 14px;
    color: #ff4d51;
  }
  .task-cash-order-wrap {
    width: 100%;
  }
  .task-cash-order-inner {
    margin: auto;
    padding: 0 20px;
  }
  .task-cash-order-header {
    margin-bottom: 20px;
  }
  .task-cash-order-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .task-cash-order-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }
  .el-table th {
    background-color: #e6e6e6;
  }

  .information div,
  .information-two div {
    margin-right: 20px;
  }
  .information div span,
  .information-two div span {
    color: red;
  }
  .information-three div{
    display: inline-grid;
    margin: 5px 30px;
  }
</style>
