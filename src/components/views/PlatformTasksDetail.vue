<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/平台任务明细</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号:">
            <el-input v-model="formInline.orderNum" placeholder="请输入订单号" clearable></el-input>
          </el-form-item>
          <el-form-item label="任务名称:">
            <el-input v-model="formInline.name" placeholder="请输入任务名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户id:">
            <el-input v-model="formInline.userId" placeholder="请输入用户id" clearable></el-input>
          </el-form-item>
          <el-form-item label="审核结果:">
           <el-select v-model="formInline.resultCode" placeholder="请选择审核结果">
             <el-option label="通过" value="2"></el-option>
               <el-option label="拒绝" value="1"></el-option>
               <el-option label="全部" value=""></el-option>
           </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" min-width="180" prop="orderNum"  label="订单号">
            </el-table-column>
            <el-table-column prop="name" min-width="200" label="任务名称">
            </el-table-column>
            <el-table-column prop="userId" min-width="170" label="用户id">
            </el-table-column>
            <el-table-column prop="chReward" min-width="170" label="渠道奖励(￥)">
            </el-table-column>
            <el-table-column prop="totalCoin" min-width="170" label="实际用户获得金币数">
            </el-table-column>
            <el-table-column prop="userReward" min-width="170"  label="用户奖励(￥)">
            </el-table-column>
            <el-table-column min-width="170"  label="审核结果">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.resultCode==2">通过</span>
                <span class="red" v-if="scope.row.resultCode==1">拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" min-width="120" label="处理结果">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">成功</span>
                <span class="red" v-if="scope.row.status==2">失败</span>
                <span class="yellow" v-if="scope.row.status==3">重复发送</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" min-width="200"  label="审核结果描述">
            </el-table-column>
            <el-table-column prop="date" min-width="170" label="发送时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="createTime"  min-width="170" label="创建时间" :formatter="dateFormat">
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
  export default {
    name: 'PlatformTasksDetail',
    data() {
      return {
        menuId:'',
        dialogTableVisible: false,
        dialogTable:false,
        formtwo: {},
        dialogFormVisible: false,
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      // this.queryBtns();
      this.accountList();
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currencyFixed: function (num){
        var dataval = num;
        return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    methods: {
      //权限按钮
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
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
          orderNum:this.formInline.orderNum,
          name:this.formInline.name,
          userId:this.formInline.userId,
          resultCode:this.formInline.resultCode,
        }
        this.$fetch('/api/taskCallback/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
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
  .red{
    color: #ff4d51;
  }
  .green{
    color: #13ce66;
  }

  .yellow{
    color: #E6A23C;
  }

  .blue{
    color: #376eca;
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
