<template>
  <div class="gyro-wrap">
    <div class="gyro-inner">
      <div class="gyro-header">
        <h3>运营管理/陀螺仪</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="用户Id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户Id" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain  @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="no-tip">默认初始无数据，请输入用户Id进行查询即可！</div>
      </div>
      <div class="gyro-table">
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
            <el-table-column min-width="140px"  fixed="left"  prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column min-width="120px"  prop="gyroX" label="陀螺仪x轴">
            </el-table-column>
            <el-table-column min-width="120" prop="gyroY" label="陀螺仪y轴">
            </el-table-column>
            <el-table-column min-width="120" prop="gyroZ" label="陀螺仪z轴">
            </el-table-column>
            <el-table-column min-width="120" prop="pageType" label="页面类型">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.pageType==1">主页</span>
                <span class="zi" v-if="scope.row.pageType==2">游戏列表</span>
                <span class="yellow" v-if="scope.row.pageType==3">游戏详情</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px" prop="number" label="次数">
            </el-table-column>
            <el-table-column  width="170px"  label="修改时间">
              <template slot-scope="scope">
                {{scope.row.updateTime | dateFont}}
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
    name:'Gyro',
    data() {
      return {
        formInline:{
          accountId:'',
        },
        upd:false,
        formLabelWidth: '150px',
        dialogFormVisible:false,
        menuId:'',
        tableData:[],
        loading:false,
      }
    },
    created() {
      this.menuId=this.$route.query.id;
    },
    filters:{
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      }
    },

    methods: {
      search() {
        if (!this.formInline.accountId) {
          this.$message({type: 'error', message: '请输入用户Id再查询', duration: 3000})
          return
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
        }
        this.$fetch('/api/userGyro/page', parameterData).then(res => {
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
    }
  }
</script>
<style type="text/css">
  .gyro .table-th th{
    padding: 12px 0;
  }
  .no-tip{
    margin-bottom: 10px;
    font-size: 14px;
    color: #ff4d51;
  }
  .gyro-wrap {
    width: 100%;
  }
  .gyro-inner {
    margin: auto;
    padding: 0 20px;
  }
  .gyro-header {
    margin-bottom: 20px;
  }
  .gyro-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .gyro-table {
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
