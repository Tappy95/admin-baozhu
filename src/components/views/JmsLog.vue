<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>系统配置/jms日志</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="状态:" >
            <el-select v-model="formInline.state" placeholder="请选择状态">
              <el-option label="失败" value="2"></el-option>
              <el-option label="成功" value="1"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <!--:class="showW?'u':'a'"-->
          <el-table :data="tableData" max-height="600">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="150" fixed="left" prop="jmsDestination" label="队列名称">
            </el-table-column>
            <el-table-column min-width="200"  prop="jmsException" label="异常原因">
            </el-table-column>
            <el-table-column width="120"  label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.state==1">成功</span>
                <span class="red" v-if="scope.row.state==2">失败</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="createrTime" label="创建时间" :formatter="dateFormat">
            </el-table-column>
            <!--<el-table-column fixed="right"-->
                             <!--label="操作" v-show="showW" :width="optionW" >-->
              <!--<template slot-scope="scope">-->
                <!--<el-button  type="success" v-if="rep &&  scope.row.state==2" plain @click="repTap(scope.row.id)" size="mini">-->
                  <!--<span v-if="showW=true"></span>-->
                  <!--<span v-else="showW=false"></span>-->
                  <!--<span v-if="optionW='75'"></span>-->
                  <!--<span v-else="optionW='1px'"></span>-->
                  <!--重发-->
                <!--</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
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
    name: 'JmsLog',
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
        showW:false
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
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
      repTap(id) {
        this.$confirm('此操作将重发消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            let parameterData = {
              id: id
            }
            this.$fetch('/api/persion/remove', parameterData).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: '重发成功！'
                })
                this.accountList()
              } else {
                this.$message({
                  type: 'error',
                  message: '重发失败！'
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消重发操作'
            })
          })
      },

      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          state:this.formInline.state
        }
        this.$fetch('/api/jmsLog/list', parameterData).then(res => {
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
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'rep') {
                this.rep =true;
              }else {
                this.showW = false
              }
            }
          } else {
          }
        })
      },
      search() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
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
