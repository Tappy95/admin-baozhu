<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/抽奖类型</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="类型名称">
            <el-input v-model="formInline.typeName" placeholder="" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>

            <el-table-column width="200px" prop="typeName" label="类型名称">
            </el-table-column>

            <el-table-column width="150px" prop="id" label="抽奖编号">
            </el-table-column>

            <el-table-column width="120px" prop="timesOneday" label="每天次数限制">
            </el-table-column>
            <el-table-column width="120px" prop="expendPigCoin" label="每次所需金猪">
            </el-table-column>
            <el-table-column width="300px" prop="remark" label="类型描述">
            </el-table-column>
            <el-table-column width="200px" prop="applyCrowd" label="适用人群">
            </el-table-column>
            <el-table-column width="120px" prop="lotterySort" label="抽奖分类">
            </el-table-column>
            <el-table-column width="120px" prop="status" label="类型状态">
            </el-table-column>
            <el-table-column width="200px" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button size="mini" type="warning" plain @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
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
                <el-form-item label="每天发放数量:" :label-width="formLabelWidth" prop="dayNum">
                  <el-input  type="number" min="0" v-model="form.dayNum" auto-complete="off"  clearable>
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
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="虚拟" :value="2"></el-option>
                  </el-select>
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
              <el-col :span="24">
                <el-form-item label="类型描述" prop="remark" :label-width="formLabelWidth">
                  <el-input style="width: 440px;" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改抽奖类型" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="24">
                <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                  <el-input v-model="formtwo.typeName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每天次数限制:" :label-width="formLabelWidth" prop="timesOneday">
                  <el-input  type="number" min="0" v-model="formtwo.timesOneday" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每天发放数量:" :label-width="formLabelWidth" prop="dayNum">
                  <el-input  type="number" min="0" v-model="formtwo.dayNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每次所需金猪:" :label-width="formLabelWidth" prop="expendPigCoin">
                  <el-input type="number" min="0" v-model="formtwo.expendPigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="适用人群" prop="applyCrowd" :label-width="formLabelWidth">
                  <el-select v-model="formtwo.applyCrowd" placeholder="">
                    <el-option label="全部" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="抽奖分类" prop="lotterySort" :label-width="formLabelWidth">
                  <el-select v-model="formtwo.lotterySort" placeholder="">
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="虚拟" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类型状态" prop="status" :label-width="formLabelWidth">
                  <el-select v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="类型描述" prop="remark" :label-width="formLabelWidth">
                  <el-input style="width: 440px;" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>

            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="抽奖类型详情" :visible.sync="dialogTableDetail" width="600px">
          <el-form :model="formtwoInfo">
            <el-row>
              <el-col :span="24">
                <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                  <el-input :disabled="true" v-model="formtwoInfo.typeName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="每天次数限制:" :label-width="formLabelWidth" prop="timesOneday">
                  <el-input  :disabled="true" type="number" min="0" v-model="formtwoInfo.timesOneday" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每天发放数量:" :label-width="formLabelWidth" prop="dayNum">
                  <el-input :disabled="true" type="number" min="0" v-model="formtwoInfo.dayNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每次所需金猪:" :label-width="formLabelWidth" prop="expendPigCoin">
                  <el-input  :disabled="true" type="number" min="0" v-model="formtwoInfo.expendPigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="适用人群" prop="applyCrowd" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="formtwoInfo.applyCrowd" placeholder="">
                    <el-option label="全部" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="抽奖分类" prop="lotterySort" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="formtwoInfo.lotterySort" placeholder="">
                    <el-option label="实物" :value="1"></el-option>
                    <el-option label="虚拟" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类型状态" prop="status" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="formtwoInfo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="创建时间" prop="remark" :label-width="formLabelWidth">
                  <el-input :disabled="true"  v-model="formtwoInfo.createTime" auto-complete="off"  clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="抽奖编号" prop="抽奖编号" :label-width="formLabelWidth">
                  <el-input :disabled="true"  style="width: 160px" v-model="formtwoInfo.id" auto-complete="off"  clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="类型描述" prop="remark" :label-width="formLabelWidth">
                  <el-input :disabled="true" style="width: 440px;" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.remark" auto-complete="off" clearable></el-input>
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
    name: 'LotteryType',
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
            typeName: [{
              required: true,
              message: '请输入类型名称',
              trigger: 'blur'
            }],
            timesOneday: [{
            required: true,
            message: '请输入每天次数限制',
            trigger: 'blur'
            }],
            expendPigCoin: [{
            required: true,
            message: '请输入每次所需金猪',
            trigger: 'blur'
            }],
            remark: [{
            required: true,
            message: '请输入类型描述',
            trigger: 'blur'
          }],
            status: [{
            required: true,
            message: '请选择类型状态',
            trigger: 'change'
          }],
           applyCrowd: [{
              required: true,
              message: '请选择适用人群',
              trigger: 'change'
            }],
            lotterySort: [{
              required: true,
              message: '请选择抽奖分类',
              trigger: 'change'
            }],
          dayNum: [{
            required: true,
            message: '请输入每天发放数量',
            trigger: 'blur'
          }],
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
              if(res.data[i].btnCode == 'add') {
                this.add=true
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
                this.powerTrue =true;
                this.optionW = '150px'
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '150px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '220px'
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
          typeName: this.formInline.typeName
        }
        this.$fetch('/api/mLotteryType/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].status == '1') {
                res.data.list[i].status = '已启用'
              } else {
                res.data.list[i].status = '已停用'
              }
              if(res.data.list[i].applyCrowd == '1') {
                res.data.list[i].applyCrowd = '全部'
              } else {
                res.data.list[i].applyCrowd = '已停用'
              }
              if(res.data.list[i].lotterySort == '1') {
                res.data.list[i].lotterySort = '实物'
              } else if (res.data.list[i].lotterySort == '2') {
                res.data.list[i].lotterySort = '虚拟'
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
        this.form={};
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
        this.$fetch('/api/mLotteryType/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        this.$put('/api/mLotteryType/modify', this.formtwo).then(res => {
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
        this.$fetch('/api/mLotteryType/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.createTime =  formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
            this.formtwoInfo = res.data
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

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
