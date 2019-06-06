<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>游戏竞猜/竞猜记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="投注人账号:">
            <el-input :style="styleObject" placeholder="请输入投注人账号"  v-model="formInline.username" auto-complete="off"  clearable>
            </el-input>
          </el-form-item>
          <el-button type="primary" plain style="margin-bottom: 30px" @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>

            <el-table-column fixed="left" min-width="150px" prop="orderId" label="订单号">
            </el-table-column>

            <el-table-column min-width="120px" prop="username"  label="投注人帐号">
            </el-table-column>

            <el-table-column min-width="100px" prop="actionNo" label="投注期号">
            </el-table-column>

            <el-table-column min-width="150px" :formatter="dateFormat" prop="actionTime" label="投注时间">
            </el-table-column>

            <el-table-column min-width="150px" prop="actionData" label="投注号码">
            </el-table-column>

            <el-table-column min-width="150px" prop="amount" label="购买金额">
            </el-table-column>

            <el-table-column min-width="150px" prop="odds" label="奖金比例">
            </el-table-column>

            <el-table-column min-width="150px" prop="lotteryNo" label="开奖号码">
            </el-table-column>

            <el-table-column min-width="150px" :formatter="dateFormat"  prop="kjTime" label="官方开奖时间">
            </el-table-column>

            <el-table-column min-width="150px" prop="status" label="状态">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="exa">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="竞猜详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo" >
            <el-row>
              <el-col :span="23">
                <el-form-item label="订单号:" :label-width="formLabelWidth" >
                  <el-input :disabled="true"   v-model="formtwoInfo.orderId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="彩种名称:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.lotteryName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="玩法组名称:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.playedGroupName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="玩法名称:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.playedName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否官方:" :label-width="formLabelWidth" >
                  <el-select :disabled="true"  :style="styleObject" :label-width="formLabelWidth"  v-model="formtwoInfo.isOfficial" placeholder="">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="不是" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注人帐号:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.username" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注期号:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionNo" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注时间:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注IP:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionIp" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注注数:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注号码:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.actionData" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="购买金额:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.amount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="返点:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.rebate" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖金比例:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.odds/1000" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开奖号码:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.lotteryNo" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="官方开奖时间:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.kjTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖注数:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.winNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖金额*1000:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.bonus" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="状态:" :label-width="formLabelWidth">
                  <el-select :disabled="true"  :style="styleObject" :label-width="formLabelWidth"  v-model="formtwoInfo.status" placeholder="">
                    <el-option label="撤单" :value="0"></el-option>
                    <el-option label="未开奖" :value="1"></el-option>
                    <el-option label="开奖中" :value="2"></el-option>
                    <el-option label="未中奖" :value="3"></el-option>
                    <el-option label="已派奖" :value="4"></el-option>
                    <el-option label="退款" :value="5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
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
    name: 'GameOrder',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        w_input:'200px',
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        exa:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
        },
        tableData: [],
        formtwoInfo:{}
      }
    },

    created() {
      this.accountList();
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
          username:this.formInline.username,
        }
        this.$fetch('/guess/order/pageList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {

              if (res.data.list[i].odds){
                res.data.list[i].odds = res.data.list[i].odds/1000
              }

              if (res.data.list[i].isOfficial == false){
                res.data.list[i].isOfficial = '不是'
              } else if(res.data.list[i].isOfficial == true) {
                res.data.list[i].isOfficial = '是'
              }

              if (res.data.list[i].status == '0'){
                res.data.list[i].status = '撤单'
              } else if(res.data.list[i].status == '1') {
                res.data.list[i].status = '未开奖'
              } else if(res.data.list[i].status == '2') {
                res.data.list[i].status = '开奖中'
              }else if(res.data.list[i].status == '3') {
                res.data.list[i].status = '未中奖'
              }else if(res.data.list[i].status == '4') {
                res.data.list[i].status = '已派奖'
              }else if(res.data.list[i].status == '10') {
                res.data.list[i].status = '退款'
              }
            }
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
        this.accountList()
      },

      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/guess/order/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.kjTime =  formatDate(new Date(res.data.kjTime), 'yyyy-MM-dd hh:mm:sss');
            res.data.actionTime =  formatDate(new Date(res.data.actionTime), 'yyyy-MM-dd hh:mm:sss');
            this.formtwoInfo = res.data;
          }
        })
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
  .box_img{
    width: 560px;
    height: 178px;
    padding: 10px;
    border: 1px solid #dcdfe6;
    float: left;
    background-color: #f5f7fa;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: self-start;
  }

  .box_img .box_min{
    max-width:178px;
    max-height:178px;
    float: left;
    margin-right: 10px;
  }
  .box_img img{
    max-width:178px;
    max-height:178px;
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
  .bannerAvatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bannerAvatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .bannerAvatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    max-width: 178px;
    max-height: 178px;
    display: block;
    cursor: pointer;
  }

</style>
