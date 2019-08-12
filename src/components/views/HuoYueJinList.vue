<template>
  <div class="huoyuejin-wrap">
    <div class="huoyuejin-inner">
      <div class="huoyuejin-header">
        <h3>运营管理/活跃金任务记录</h3>
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

          <el-form-item label="创建时间:">
            <el-date-picker
              v-model="formInline.createTime"
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
        <div class="no-tip">默认初始无数据，请输入用户Id和日期进行查询进行查询即可！</div>
      </div>
      <div class="huoyuejin-table">
        <template>
          <el-table class="table-th" :data="tableData"
                    style="width: 100%"
                    v-loading="loading"
                    height="560">
            <el-table-column fixed="left" label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80'>
            </el-table-column>
            <el-table-column min-width="140px"  fixed="left"  prop="accountId"
                             label="用户ID">
            </el-table-column>
            <el-table-column min-width="140px"  prop="gameId"
                             label="游戏Id">
            </el-table-column>
            <el-table-column min-width="140px"  prop="gameName"
                             label="游戏名称">
            </el-table-column>

            <el-table-column min-width="150px" prop="vipName"
                             label="vip名称">
            </el-table-column>
            <el-table-column min-width="120"  label="任务类型">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.taskType==1">活跃金</span>
                <span class="zi" v-if="scope.row.taskType==2">提现</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120"  label="状态">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.state==1">未完成</span>
                <span class="green" v-if="scope.row.state==2">完成</span>
              </template>
            </el-table-column>
            <el-table-column  width="170px"  prop="createTime"
                              label="创建时间">
            </el-table-column>
             <el-table-column fixed="right" label="操作" v-if="pass" width="75">
                  <template slot-scope="scope">
                    <el-button type="success" plain @click="passTap(scope.row.id)"  v-if="scope.row.state==1 && pass" size="mini">通过</el-button>
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
    name:'HuoYueJinList',
    data() {
      return {
        formInline:{
          createTime:'',
          accountId:''
        },
        qxW:'1px',
        pass:false,
        formLabelWidth: '150px',
        dialogFormVisible:false,
        menuId:'',
        tableData:[],
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
        loading:false
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      // this.accountList();
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
              if(res.data[i].btnCode == 'pass') {
                this.pass =true;
              }
            }
          } else {
          }
        })
      },
      search() {
        if (!this.formInline.createTime || !this.formInline.accountId) {
          this.$message({type: 'error', message: '请输入用户id和日期进行查询', duration: 3000})
          return
        }
        if (this.formInline.createTime) {
          this.formInline.createTime = formatDate(new Date(this.formInline.createTime), 'yyyy-MM-dd')
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
          createTime:this.formInline.createTime
        }
        this.$fetch('/api/userGameTask/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            if(res.data.list){
              this.loading = false
            }
          }else {
            this.$message({type: 'error', message: 'res.message', duration: 3000})
            this.loading = false;
          }
        })
      },

      passTap(id) {
        this.$confirm('此操作将通过该游戏, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$post('/api/userGameTask/update',{
              id:id,
              state:2
            }).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({ type: 'success', message: '操作成功！' })
                this.accountList()
              } else {
              }
            })
          })
          .catch(() => {
            this.$message({ type: 'info', message: '已取消通过' })
          })
      },
    }
  }
</script>
<style type="text/css">
  .huoyuejin .table-th th{
    padding: 12px 0;
  }
  .no-tip{
    margin-bottom: 10px;
    font-size: 14px;
    color: #ff4d51;
  }

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
  .huoyuejin-wrap {
    width: 100%;
  }
  .huoyuejin-inner {
    margin: auto;
    padding: 0 20px;
  }
  .huoyuejin-header {
    margin-bottom: 20px;
  }
  .huoyuejin-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .huoyuejin-table {
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
    width: 148px;
    height: 148px;
  }
  .information-three div{
    display: inline-grid;
    margin: 5px 30px;
  }
</style>
