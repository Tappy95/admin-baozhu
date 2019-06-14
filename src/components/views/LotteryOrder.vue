<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>财务流水/礼品兑换管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!--<el-form-item label="抽奖编号：">
            <el-input v-model="formInline.id" placeholder="请输入抽奖编号" clearable></el-input>
          </el-form-item>-->

          <el-form-item label="用户id：">
            <el-input v-model="formInline.accountId" placeholder="请输入账户id" clearable></el-input>
          </el-form-item>

          <!--<el-form-item label="电话：">
            <el-input v-model="formInline.mobile" placeholder="请输入电话" clearable></el-input>
          </el-form-item>-->
          <el-form-item :label-width="labelWidth"  label="礼品金额:">
            <el-input type="number" min="0" v-model="formInline.minPrice" placeholder="请输入最小金额" clearable></el-input>
          </el-form-item>
          <el-form-item  label="至">
            <el-input type="number" min="0" v-model="formInline.maxPrice" placeholder="请输入最大金额" clearable></el-input>
          </el-form-item>

          <el-form-item :label-width="labelWidth" label="兑换时间:">
            <el-date-picker
              v-model="selectTime"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="状态:">
            <el-select  v-model="formInline.status" placeholder="请选择状态">
              <el-option label="审核中" value="1"></el-option>
              <el-option label="拒绝" value="2"></el-option>
              <el-option label="待发货" value="3"></el-option>
              <el-option label="已发货" value="4"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain style="margin-bottom: 30px" @click="search()">查询</el-button>

          <el-form-item v-if="exportExle" >
            <el-button type="success"  plain @click="queryExport()">导出表格</el-button>
          </el-form-item>

          <el-form-item v-if="lockAll">
            <el-button type="warning" plain @click="lockAllTap()">全部锁定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="528" :row-class-name="tableRowClassName">
            <el-table-column label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>

            <el-table-column min-width="200" prop="id" label="订单号">
            </el-table-column>

            <el-table-column min-width="150px" prop="accountId" label="用户id">
            </el-table-column>

            <el-table-column min-width="120px" prop="channelCode" label="渠道">
            </el-table-column>

            <el-table-column width="150px" prop="expendPigCoin" label="消耗金猪">
            </el-table-column>

            <el-table-column min-width="200px" prop="goodsName" label="商品名称">
            </el-table-column>

            <el-table-column min-width="150px" prop="price" label="礼品对等价格(元)">
            </el-table-column>

            <el-table-column width="170px" prop="createTime" :formatter="dateFormat" label="兑换时间">
            </el-table-column>

            <el-table-column min-width="120px" prop="operatorName" label="财务操作人">
            </el-table-column>

            <el-table-column width="170px" prop="updateTime" :formatter="dateFormat" label="财务处理时间">
            </el-table-column>

            <el-table-column min-width="120px" prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">待审核</span>
                <span v-if="scope.row.status==2">拒绝</span>
                <span v-if="scope.row.status==3">待发货</span>
                <span v-if="scope.row.status==4">已发货</span>
              </template>
            </el-table-column>

            <el-table-column min-width="120px" prop="receiver" label="邮寄人姓名">
            </el-table-column>

            <el-table-column min-width="120px" prop="mobile" label="邮寄人电话">
            </el-table-column>

            <el-table-column min-width="300px" prop="detailAddress" label="邮寄地址">
            </el-table-column>

            <el-table-column min-width="300px" prop="remarks" label="备注">
            </el-table-column>

            <el-table-column fixed="right" v-if="powerTrue" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain v-if="lock && scope.row.status!=2 && scope.row.isLocking==2 && scope.row.locking!=2"  @click="lockTap(scope.row.id)" size="mini" >锁定</el-button>
                <el-button type="primary"  plain v-if="lock && scope.row.status!=2 && scope.row.isLocking==1 && scope.row.locking==2" @click="unlockTap(scope.row.id)" size="mini" >解锁</el-button>
                <span style="text-align: center" class="pla-span amountred" v-if="scope.row.status!=2 && scope.row.isLocking==1 && scope.row.locking!=2">已被{{scope.row.admin}}锁定<span v-if="optionW='150px'"></span></span>
                <!--<el-button type="info" plain size="mini" @click="getOne(scope.row.id)">详情</el-button>-->
                <el-button size="mini" type="success" plain v-if="exa && scope.row.status!=2 && exa && scope.row.isLocking==1 && scope.row.locking==2" @click="getInfo(scope.row.id)"><span v-if="optionW='150px'"></span>处理</el-button>

              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加抽奖类型" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                  <el-input v-model="form.typeName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每天次数限制:" :label-width="formLabelWidth" prop="timesOneday">
                  <el-input  type="number" min="0" v-model="form.timesOneday" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每次所需金猪:" :label-width="formLabelWidth" prop="expendPigCoin">
                  <el-input type="number" min="0" v-model="form.expendPigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="适用人群" prop="applyCrowd" :label-width="formLabelWidth">
                  <el-select v-model="form.applyCrowd" placeholder="">
                    <el-option label="全部" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="抽奖分类" prop="lotterySort" :label-width="formLabelWidth">
                  <el-select v-model="form.lotterySort" placeholder="">
                    <el-option label="抽奖" :value="1"></el-option>
                    <el-option label="兑奖" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="类型描述" prop="remark" :label-width="formLabelWidth">
                  <el-input style="width: 440px;" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型状态" prop="status" :label-width="formLabelWidth">
                  <el-select v-model="form.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="兑换请求处理" :visible.sync="dialogTableVisible" width="700px">
          <el-form :model="formtwo">
            <!--<el-row>-->
                <!--<div class="change_box">-->
                  <!--<div class="status_list">-->
                    <!--<div class="item">-->
                      <!--<el-radio v-model="formtwo.status" :label="1" border>备选项1</el-radio>-->
                    <!--</div>-->
                    <!--<div class="item">-->
                      <!--<el-radio v-model="formtwo.status" :label="2" border>备选项2</el-radio>-->
                    <!--</div>-->
                    <!--<div class="item">-->
                      <!--<el-radio v-model="formtwo.status" :label="3" border>备选项2</el-radio>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
            <!--</el-row>-->
            <el-row>
              <el-col :span="14">
                <el-form-item label="审核状态:" :label-width="formLabelWidth" prop="status">
                  <el-select  v-model="formtwo.status" placeholder="">
                    <el-option label="审核中" :value="1"></el-option>
                    <el-option label="拒绝" :value="2"></el-option>
                    <el-option label="待发货" :value="3"></el-option>
                    <el-option label="已发货" :value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="22" v-if="formtwo.lotterySort==1 && formtwo.status==4">
                <el-form-item label="快递公司:" :label-width="formLabelWidth" prop="expressCompany">
                  <el-input  min="0" v-model="formtwo.expressCompany" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22" v-if="formtwo.lotterySort==1 && formtwo.status==4">
                <el-form-item label="快递单号:" :label-width="formLabelWidth" prop="expressNumbers">
                  <el-input  min="0" v-model="formtwo.expressNumbers" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22" v-if="formtwo.lotterySort==2 && formtwo.status==4">
                <el-form-item label="卡号:" :label-width="formLabelWidth" prop="expressCompany">
                  <el-input  min="0" v-model="formtwo.expressCompany" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22" v-if="formtwo.lotterySort==2 && formtwo.status==4">
                <el-form-item label="卡密:" :label-width="formLabelWidth" prop="expressNumbers">
                  <el-input  min="0" v-model="formtwo.expressNumbers" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="备注:" prop="remarks" :label-width="formLabelWidth">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.remarks" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="抽奖详情" :visible.sync="dialogTableDetail" width="700px">
          <el-form :model="formtwoInfo">
            <el-row>
                <el-col :span="18"  v-if="formtwoInfo.lotterySort==1 && formtwo.status==4">
                <el-form-item label="快递公司:"  :label-width="formLabelWidth">
                  <el-input :disabled="true"   v-model="formtwoInfo.expressCompany" auto-complete="off"  clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18"  v-if="formtwoInfo.lotterySort==1 && formtwo.status==4">
                <el-form-item label="快递单号:"  :label-width="formLabelWidth">
                  <el-input :disabled="true"   v-model="formtwoInfo.expressNumbers" auto-complete="off"  clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18"  v-if="formtwoInfo.lotterySort==2 && formtwo.status==4">
                <el-form-item label="卡号:"  :label-width="formLabelWidth">
                  <el-input :disabled="true"   v-model="formtwoInfo.expressCompany" auto-complete="off"  clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18"  v-if="formtwoInfo.lotterySort==2 && formtwo.status==4">
                <el-form-item label="卡密:"  :label-width="formLabelWidth">
                  <el-input :disabled="true"  v-model="formtwoInfo.expressNumbers" auto-complete="off"  clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="抽奖分类:" prop="status" :label-width="formLabelWidth">
                  <el-select style="width:210px" :disabled="true" v-model="formtwoInfo.lotterySort" placeholder="">
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="虚拟" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核状态:" :label-width="formLabelWidth" prop="status">
                  <el-select style="width:210px" :disabled="true"  v-model="formtwoInfo.status" placeholder="">
                    <el-option label="审核中" :value="1"></el-option>
                    <el-option label="拒绝" :value="2"></el-option>
                    <el-option label="待发货" :value="3"></el-option>
                    <el-option label="已发货" :value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item label="电话:"  :label-width="formLabelWidth">
                  <el-input :disabled="true"  v-model="formtwoInfo.mobile" auto-complete="off"  clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="中奖时间:" :label-width="formLabelWidth" >
                  <el-input  :disabled="true"  min="0" v-model="formtwoInfo.createTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="账户id:" :label-width="formLabelWidth" prop="accountId">
                  <el-input :disabled="true" v-model="formtwoInfo.accountId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="商品名称:" :label-width="formLabelWidth" prop="expendPigCoin">
                  <el-input  :disabled="true"  min="0" v-model="formtwoInfo.goodsName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>


              <!--imageUrl-->
              <el-col :span="24">
                <el-form-item label="地址" prop="lotterySort" :label-width="formLabelWidth">
                  <el-input :disabled="true" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.detailAddress" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注:" prop="lotterySort" :label-width="formLabelWidth">
                  <el-input :disabled="true" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.remarks" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="奖品图片:"
                              prop="imageUrl"
                              action=""
                              :label-width="formLabelWidth">
                  <img style="max-width:178px;max-height:178px;"  v-if="formtwoInfo.imageUrl"
                       :src="formtwoInfo.imageUrl"
                       class="avatar">
                  <i v-else
                     class="el-icon-plus bannerAvatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="sun_sty" v-if="tableData.length>0">
        <p>小计<span>({{pageCount}})：</span>[ 实际提现金额：{{subTotalPrice}} ]</p>
        <p>合计<span>({{totalPriceCount}})：</span>[ 实际提现金额：{{totalPrice }} ]</p>
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
    name: 'LotteryOrder',
    data() {
      return {
        powerTrue:false,
        lockAll:false,
        lock:false,
        exa:false,
        exportExle:false,
        labelWidth:'80px',
        optionW:'75px',
        menuId:'',
        selectTime:'',
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {
        },
        roles: {
          id: '',
          realname: ''
        },

      rules: {
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        pageCount:'',
        subTotalPrice:'',
        totalPrice:'',
        totalPriceCount:'',
        formInline: {},
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        imageUrl:'',
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
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
    },
    methods: {
      //锁定样式
      tableRowClassName({row, rowIndex}) {
        //自己锁定的
        if (row.status!=2 && row.isLocking==1 && row.locking==2) {
          return 'mine-row';
        }
        //别人锁定的
        if(row.status!=2 && row.isLocking==1 && row.locking!=2){
          return 'else-row';
        }
      },
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'exa') {
                this.powerTrue =true;
                this.exa=true;
              }
              if(res.data[i].btnCode == 'lockAll'){
                this.powerTrue =true;
                this.lockAll=true;
              }
              if(res.data[i].btnCode == 'lock'){
                this.powerTrue =true;
                this.lock=true;
              }
              if(res.data[i].btnCode == 'exportExle') {
                this.exportExle =true;
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
          status:this.formInline.status,
          minPrice:this.formInline.minPrice,
          maxPrice:this.formInline.maxPrice,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime
        }
        this.$fetch('/api/mLotteryOrder/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            /*for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].status == '1') {
                res.data.list[i].status = '审核中'
              } else if(res.data.list[i].status == '2') {
                  res.data.list[i].status = '拒绝'
              }else if(res.data.list[i].status == '3') {
                res.data.list[i].status = '待发货'
              }else if(res.data.list[i].status == '4') {
                res.data.list[i].status = '已发货'
              }
            }*/

            this.tableData = res.data.list
            this.totalCount = parseInt(res.data.total)
            this.pageCount=res.data.pageCount
            this.subTotalPrice=res.data.subTotalPrice
            this.totalPriceCount=res.data.totalPriceCount
            this.totalPrice=res.data.totalPrice
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
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startTime ='';
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endTime ='';
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      load() {
        this.formInline = {};
        this.form={}
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/api/mLotteryType/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.accountList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
          } else {}
        })
      },
      Delete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.delData(id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      delData(id) {
        let parameterData = {
          id: id
        }
        this.$fetch('/api/mLotteryType/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.accountList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！'
            })
          }
        })
      },
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/api/mLotteryOrder/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        this.$put('/api/mLotteryOrder/modify', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.dialogTableVisible = false
            this.accountList()
          }
        })
      },
      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/api/mLotteryOrder/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.createTime =  formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
            this.formtwoInfo = res.data;
          }
        })
      },
      //锁定
      lockTap(id) {
        this.$fetch('/api/mLotteryOrder/updateLocking', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '锁定成功！'
          })
          this.accountList()
        }else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },
      //全部锁定
      lockAllTap(){
        let  tempArr  = [];
        let pardata = ''
        for(let i =this.tableData.length - 1; i >= 0; i--) {
          tempArr.push(this.tableData[i].id)
        }
        pardata = tempArr.join(',')

        this.$fetch('/api/mLotteryOrder/updateLockingList', {
          ids: pardata
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '锁定成功！'
          })
          this.accountList()
        }else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },
      //解锁
      unlockTap(id) {
        this.$fetch('/api/mLotteryOrder/relieveLocking', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '解锁成功！'
          })
          this.accountList()
        }else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },
      //导出表格
      queryExport() {
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: '正在导出....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startTime = ''
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endTime =''
        }

        let accountId= this.formInline.accountId;
        let status= this.formInline.status;
        let minPrice= this.formInline.minPrice;
        let maxPrice= this.formInline.maxPrice;
        let startTime= this.formInline.startTime;
        let endTime= this.formInline.endTime;
        let token= getSession("token");
        let channel= getSession("channelCode");
        let relation= getSession("userRelation");
        let url = '/api/excl/lotteryOrderExcl';
        let data = {url,accountId,status,minPrice,maxPrice,startTime,endTime,token,channel,relation};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          accountId=obj.accountId,
          status=obj.status,
          minPrice=obj.minPrice,
          maxPrice=obj.maxPrice,
          startTime=obj.startTime,
          endTime=obj.endTime,
          token= obj.token,
          channel=obj.channel,
          relation=obj.relation

        let a1 = document.createElement('a');

        let http=url;
        if(http==url){
          if(accountId){
            http=http+'?accountId=' + accountId
          }
        }
        if(http==url){
          if(status){
            http=http+'?status=' + status
          }
        }else{
          if(status){
            http=http+'&status=' + status
          }
        }
        if(http==url){
          if(minPrice){
            http=http+'?minPrice=' + minPrice
          }
        }else{
          if(minPrice){
            http=http+'&minPrice=' + minPrice
          }
        }
        if(http==url){
          if(maxPrice){
            http=http+'?maxPrice=' + maxPrice
          }
        }else{
          if(maxPrice){
            http=http+'&maxPrice=' + maxPrice
          }
        }
        if(http==url){
          if(startTime){
            http=http+'?startTime=' + startTime
          }
        }else{
          if(startTime){
            http=http+'&startTime=' + startTime
          }
        }
        if(http==url){
          if(endTime){
            http=http+'?endTime=' + endTime
          }
        }else{
          if(endTime){
            http=http+'&endTime=' + endTime
          }
        }
        if(http==url){
          http=http+'?token='+token+'&channel='+channel+'&relation='+relation
        }else{
          http=http+'&token='+token+'&channel='+channel+'&relation='+relation
        }
        a1.setAttribute('href',http);
        let body = document.querySelector('body');
        body.appendChild(a1);
        a1.click();
        a1.remove();
        //关闭导出弹层
        setTimeout(() => {
          this.fullscreenLoading.close();
      }, 5000);
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
  .change_box{
    width: 100%;
    height: auto;
    border: 1px salmon solid;
  }

  .change_box .status_list{
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-content: center;
    height: 30px;
    /*border: 1px solid violet;*/
  }

  .change_box .status_list .item{
    width: 33.3%;
    height: 30px;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
  }

  .amountred{
    color: #ff4d51;
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
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
  .el-table .mine-row {
    background: #ebfbf7;
  }

  .el-table .else-row {
    background: #fceeed;
  }
  .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .sun_sty p span{
    font-size: 12px;
  }
</style>
