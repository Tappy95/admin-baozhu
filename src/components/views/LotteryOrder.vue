<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/抽奖订单</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="抽奖编号：">
            <el-input v-model="formInline.id" placeholder="" clearable></el-input>
          </el-form-item>

          <el-form-item label="账户id：">
            <el-input v-model="formInline.accountId" placeholder="" clearable></el-input>
          </el-form-item>

          <el-form-item label="电话：">
            <el-input v-model="formInline.mobile" placeholder="" clearable></el-input>
          </el-form-item>

          <el-form-item label="状态:">
            <el-select  v-model="formInline.status" placeholder="">
              <el-option label="审核中" value="1"></el-option>
              <el-option label="拒绝" value="2"></el-option>
              <el-option label="待发货" value="3"></el-option>
              <el-option label="已发货" value="4"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-button @click="search()">查询</el-button>
          <!--<el-button @click="load()" v-if="add">添加</el-button>-->
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>

            <el-table-column prop="id" label="抽奖编号">
            </el-table-column>

            <el-table-column width="200px" prop="accountId" label="账户id">
            </el-table-column>

            <el-table-column width="200px" prop="goodsName" label="商品名称">
            </el-table-column>

            <el-table-column width="150px" prop="expendPigCoin" label="抽奖消耗金猪">
            </el-table-column>

            <el-table-column width="120px" prop="mobile" label="电话">
            </el-table-column>

            <el-table-column width="300px" prop="detailAddress" label="寄送地址">
            </el-table-column>

            <el-table-column width="200px" prop="createTime" :formatter="dateFormat" label="中奖时间">
            </el-table-column>

            <el-table-column width="120px" prop="status" label="状态">
            </el-table-column>

            <el-table-column min-width="300px" prop="remarks" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="getOne(scope.row.id)">查看</el-button>
                <el-button size="mini" v-if="scope.row.status!='拒绝'" @click="getInfo(scope.row.id)">审核</el-button>
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
        <el-dialog title="审核" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
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

              <el-col :span="20" v-if="formtwo.lotterySort==1 && formtwo.status==4">
                <el-form-item label="快递公司:" :label-width="formLabelWidth" prop="expressCompany">
                  <el-input  min="0" v-model="formtwo.expressCompany" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20" v-if="formtwo.lotterySort==1 && formtwo.status==4">
                <el-form-item label="快递单号:" :label-width="formLabelWidth" prop="expressNumbers">
                  <el-input  min="0" v-model="formtwo.expressNumbers" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20" v-if="formtwo.lotterySort==2 && formtwo.status==4">
                <el-form-item label="卡号:" :label-width="formLabelWidth" prop="expressCompany">
                  <el-input  min="0" v-model="formtwo.expressCompany" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20" v-if="formtwo.lotterySort==2 && formtwo.status==4">
                <el-form-item label="卡密:" :label-width="formLabelWidth" prop="expressNumbers">
                  <el-input  min="0" v-model="formtwo.expressNumbers" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
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
        <el-dialog title="抽奖详情" :visible.sync="dialogTableDetail" width="600px">
          <el-form :model="formtwoInfo">
            <el-row>
              <el-col :span="24">
                <el-form-item label="账户id:" :label-width="formLabelWidth" prop="accountId">
                  <el-input :disabled="true" v-model="formtwoInfo.accountId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
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
                  <el-select :disabled="true" v-model="formtwoInfo.lotterySort" placeholder="">
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="虚拟" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核状态:" :label-width="formLabelWidth" prop="status">
                  <el-select :disabled="true"  v-model="formtwoInfo.status" placeholder="">
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
                  <img v-if="formtwoInfo.imageUrl"
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
    name: 'LotteryOrder',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
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
        formInline: {},
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        imageUrl:''
      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
    },
    methods: {
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'exa') {
                this.powerTrue =true;
                this.optionW = '150px'
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
          id: this.formInline.id,
          accountId:this.formInline.accountId,
          mobile:this.formInline.mobile,
          status:this.formInline.status,
        }
        this.$fetch('/api/mLotteryOrder/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].status == '1') {
                res.data.list[i].status = '审核中'
              } else if(res.data.list[i].status == '2') {
                  res.data.list[i].status = '拒绝'
              }else if(res.data.list[i].status == '3') {
                res.data.list[i].status = '待发货'
              }else if(res.data.list[i].status == '4') {
                res.data.list[i].status = '已发货'
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
      search() {
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
      }
    },
  }
</script>
<style type="text/css">
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
</style>
