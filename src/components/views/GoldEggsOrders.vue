<template>
  <div class="gold-eggs-order-wrap">
    <div class="gold-eggs-order-inner">
      <div class="gold-eggs-order-header">
        <h3>砸金蛋/砸金蛋订单</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户Id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户Id" clearable></el-input>
          </el-form-item>

          <el-form-item label="使用者用户id:">
            <el-input v-model="formInline.exchangeAccountId" placeholder="请输入使用者用户id" clearable></el-input>
          </el-form-item>

          <el-form-item label="状态:">
            <el-select v-model="formInline.state" placeholder="请选择状态">
              <el-option label="未使用" value="1"></el-option>
              <el-option label="已使用" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间:">
            <el-date-picker
              v-model="createTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="left">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="使用时间:">
            <el-date-picker
              v-model="exchangTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="left">
            </el-date-picker>
          </el-form-item>

          <el-button class="mytest" type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="gold-eggs-order-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column prop="cardNumber" label="卡号">
            </el-table-column>
            <el-table-column prop="pigCoin" label="消耗金猪数">
              <template slot-scope="scope">
                <span >{{scope.row.pigCoin | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="obtainPigCoin" label="获得金猪">
              <template slot-scope="scope">
                <span >{{scope.row.obtainPigCoin | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.state==1">未使用</span>
                <span v-if="scope.row.state==2">已使用</span>
              </template>
            </el-table-column>
            <el-table-column prop="exchangeAccountId" label="使用者用户id">
            </el-table-column>
            <el-table-column prop="exchangeTime" label="使用时间">
              <template slot-scope="scope">
                <span v-if="scope.row.exchangeTime>0">{{scope.row.exchangeTime | datetime}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="isProhibit" label="是否禁用">
              <template slot-scope="scope">
                <span v-if="scope.row.isProhibit==1">否</span>
                <span v-if="scope.row.isProhibit==2">是</span>
              </template>
            </el-table-column>
            <el-table-column prop="creatorTime"  label="创建时间">
              <template slot-scope="scope">
                <span>{{scope.row.creatorTime | datetime}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="getInfo(scope.row.id)">详情</el-button>
                <el-button type="success" plain @click="edit(scope.row.id,1)" size="mini" v-if="upd && scope.row.isProhibit==2 && scope.row.state==1">启用</el-button>
                <el-button type="success" plain @click="edit(scope.row.id,2)" size="mini" v-if="upd && scope.row.isProhibit==1 && scope.row.state==1">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-dialog title="详情" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwoInfo">
            <el-row >
              <div class="box_xinxi">
                <div class="wrap_da">
                  <div class="body_list" style="width: 100%">
                    <div class="title">用户d:</div>
                    <div class="name">
                      {{formtwoInfo.accountId}}
                    </div>
                  </div>
                  <div class="body_list" style="width: 100%">
                    <div class="title">卡号:</div>
                    <div class="name">
                      {{formtwoInfo.cardNumber}}
                    </div>
                  </div>
                  <div class="body_list" style="width: 100%">
                    <div class="title">卡密:</div>
                    <div class="name">
                      {{formtwoInfo.cardPassword}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">消耗金猪数:</div>
                    <div class="name">
                      {{formtwoInfo.pigCoin | currencyNum}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">获得金猪:</div>
                    <div class="name">
                      {{formtwoInfo.obtainPigCoin | currencyNum}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">使用者用户id:</div>
                    <div class="name">
                      {{formtwoInfo.exchangeAccountId}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">使用时间:</div>
                    <div class="name">
                     <span v-if="formtwoInfo.exchangeTime>0">{{formtwoInfo.exchangeTime | datetime}}</span>
                      <span v-else>-</span>
                    </div>
                  </div>
                  <div class="body_list">
                    <div class="title">是否禁用:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.isProhibit==1">否</span>
                      <span v-if="formtwoInfo.isProhibit==2">是</span>
                    </div>
                  </div>

                  <div class="body_list">
                    <div class="title">状态:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.state==1">未使用</span>
                      <span v-if="formtwoInfo.state==2">已使用</span>
                    </div>
                  </div>
                  <div class="body_list" style="width: 100%">
                    <div class="title">创建时间:</div>
                    <div class="name">
                      {{formtwoInfo.creatorTime | datetime}}
                    </div>
                  </div>

                </div>
              </div>
            </el-row>
          </el-form>
        </el-dialog>
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
    name: 'GoldEggsOrders',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisible: false,
        formtwoInfo: {},
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          accountId:'',
          exchangeAccountId:'',
          state:'',
          startCreatorTime:'',
          endCreatorTime:'',
          startExchangeTime:'',
          endExchangeTime:'',
        },
      tableData: [],
        isSubmit:false,
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
        exchangTime:'',
        createTime:''
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
    },
    mounted(){
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currencyNum: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
      datetime: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
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
                this.upd=true;
                this.powerTrue =true;
                this.optionW = '150'
              }
            }
          } else {
          }
        })
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          accountId:this.formInline.accountId,
          state:this.formInline.state,
          exchangeAccountId:this.formInline.exchangeAccountId,
          startCreatorTime:this.formInline.startCreatorTime,
          endCreatorTime:this.formInline.endCreatorTime,
          startExchangeTime:this.formInline.startExchangeTime,
          endExchangeTime:this.formInline.endExchangeTime,
        }
        this.$fetch('/api/goleEggOrder/list', parameterData).then(res => {
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
        //创建起始时间
        if (this.createTime && this.createTime[0]) {
          this.formInline.startCreatorTime = this.createTime[0].getTime();
        }else {
          this.formInline.startCreatorTime = ''
        }
        //创建结束时间
        if (this.createTime && this.createTime[1]) {
          this.formInline.endCreatorTime = this.createTime[1].getTime();
        }else {
          this.formInline.endCreatorTime = ''
        }
        //使用时间起始
        if (this.exchangTime && this.exchangTime[0]) {
          this.formInline.startExchangeTime = this.exchangTime[0].getTime();
        }else {
          this.formInline.startExchangeTime = ''
        }
        //使用结束时间
        if (this.exchangTime && this.exchangTime[1]) {
          this.formInline.endExchangeTime = this.exchangTime[1].getTime();
        }else {
          this.formInline.endExchangeTime = ''
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      getInfo(id) {
        this.dialogTableVisible = true;
        this.$fetch('/api/goleEggOrder/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwoInfo = res.data
          }
        })
      },

      //启用禁用
      edit(id,types) {
        let tempType = '';
        tempType = types==1?'启用':'禁用';
        this.$confirm('此操作将'+tempType+'该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            let parameterData = {
              id: id,
              isProhibit:types
            }
            this.$post('/api/goleEggOrder/updateProhibit', parameterData).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: tempType+'成功！'
                })
                this.accountList()
              } else {
                this.$message({
                  type: 'error',
                  message: tempType+'失败！'
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
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

  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }

  .gold-eggs-order-wrap {
    width: 100%;
  }

  .gold-eggs-order-inner {
    margin: auto;
    padding: 0 20px;
  }

  .gold-eggs-order-header {
    margin-bottom: 20px;
  }

  .gold-eggs-order-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .gold-eggs-order-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
