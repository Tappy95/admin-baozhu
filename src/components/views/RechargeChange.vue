<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/订单记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户姓名">
            <el-input v-model="formInline.userName" placeholder="" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column min-width="120" fixed="left" prop="userName" label="姓名">
            </el-table-column>
            <el-table-column min-width="180" prop="outTradeNo" label="订单号">
            </el-table-column>
            <el-table-column min-width="150" prop="balance" label="余额抵扣">
            </el-table-column>

            <el-table-column min-width="150" label="支付金额(￥)">
              <template slot-scope="scope">
                <span class="amountyellow">{{scope.row.price | currencyFixed}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="150" label="实际支付金额(￥)">
              <template slot-scope="scope">
                <span class="amountgreen">{{scope.row.actualPrice | currencyFixed}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="150" label="折扣金额(￥)">
              <template slot-scope="scope">
                <span class="amountblue">{{scope.row.discount | currencyFixed}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="descripte" label="支付描述">
            </el-table-column>
            <el-table-column min-width="120" prop="state" label="状态">
            </el-table-column>

            <el-table-column prop="creatorTime" width="170px" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="75">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getInfo(scope.row.id)" size="mini">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="详情" :visible.sync="dialogTable" width="800px">
          <el-form>
            <el-row>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="真实姓名:" :label-width="formLabelWidth">
                  <el-input :value="message.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="订单号:" :label-width="formLabelWidth">
                  <el-input :value="message.outTradeNo" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付金额:" :label-width="formLabelWidth">
                  <el-input :value="message.price" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="实际支付金额:" :label-width="formLabelWidth">
                  <el-input :value="message.actualPrice" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="折扣金额:" :label-width="formLabelWidth">
                  <el-input :value="message.price-message.actualPrice-message.balance" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付描述:" :label-width="formLabelWidth">
                  <el-input :value="message.descripte" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付方式" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="message.payMode" placeholder="">
                    <el-option label="支付宝" :value="1"></el-option>
                    <el-option label="微信" :value="2"></el-option>
                    <el-option label="余额" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付类型" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="message.payType" placeholder="">
                    <el-option label="app" :value="1"></el-option>
                    <el-option label="小程序" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="message.state" placeholder="">
                    <el-option label="待支付" :value="1"></el-option>
                    <el-option label="已支付" :value="2"></el-option>
                    <el-option label="已取消" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="余额抵扣:" :label-width="formLabelWidth">
                  <el-input :value="message.balance" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="创建时间:" :label-width="formLabelWidth">
                  <el-input :value="message.creatorTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="pTime" :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付时间:" :label-width="formLabelWidth">
                  <el-input :value="message.payTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="cTime" :span="10" style="margin-bottom: 10px">
                <el-form-item label="取消时间:" :label-width="formLabelWidth">
                  <el-input  :value="message.cancelTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTable=false">确 定</el-button>
          </div>
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
    name: 'RechargeChange',
    data() {
      return {
        pTime:false,
        cTime:false,
        dialogTable:false,
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        message:{}
      }
    },
    created() {
      this.accountList()
    },

    filters: {
      currencyFixed: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
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
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          userName:this.formInline.userName
        }
        this.$fetch('/api/pay/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            res.data.list[i].creatorTime=formatDate(new Date(res.data.list[i].creatorTime), 'yyyy-MM-dd hh:mm:sss')
            // res.data.list[i].discount=res.data.list[i].price-res.data.list[i].actualPrice
            if(res.data.list[i].payMode == '1') {
              res.data.list[i].payMode = '支付宝'
            } else {
              res.data.list[i].payMode = '微信'
            }
            if(res.data.list[i].payType == '1'){
              res.data.list[i].payType = 'app'
            }else{
              res.data.list[i].payType = '小程序'
            }
            if(res.data.list[i].state == '1'){
              res.data.list[i].state = '待支付'
            }else if(res.data.list[i].state == '2'){
              res.data.list[i].state = '已支付'
            }else{
              res.data.list[i].state = '已取消'
            }

          }
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
      getInfo(id) {
        this.dialogTable = true
        this.$fetch('/api/pay/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          res.data.creatorTime=formatDate(new Date(res.data.creatorTime), 'yyyy-MM-dd hh:mm:sss')
          if(res.data.payTime) {
            res.data.payTime=formatDate(new Date(res.data.payTime), 'yyyy-MM-dd hh:mm:sss')
            this.pTime=true
          }
          if(res.data.cancelTime) {
            res.data.cancelTime=formatDate(new Date(res.data.cancelTime), 'yyyy-MM-dd hh:mm:sss')
            this.cTime=true
          }
          res.data.payMode=parseInt(res.data.payMode)
          res.data.payType=parseInt(res.data.payType)
          this.message=res.data
         }
      })
      },
      search(){
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.accountList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.accountList()
      },
      toggle: function(value) {
        this.isShow = !this.isShow;
        console.log(this.isShow)
      }
    },

  }
</script>
<style type="text/css">

  .amountblue{
    color: #409eff;
  }
  .amountgreen{
    color: #13ce66;
  }
  .amountyellow{
    color: #e6a23c;
  }

  amountred{
    color: #fbc4c4;
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
