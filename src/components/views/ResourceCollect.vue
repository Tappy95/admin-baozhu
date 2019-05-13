<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>游戏竞猜/资源采集</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="彩种名称:">
            <el-input  v-model="formInline.lotteryGroupName" auto-complete="off"  clearable>
            </el-input>
          </el-form-item>
          <el-button @click="search()">查询</el-button>
          <el-button @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column fixed="left" min-width="150px"  prop="lotteryGroupName" label="彩种名称">
            </el-table-column>
            <el-table-column min-width="150px" prop="name"  label="名称">
            </el-table-column>
            <el-table-column min-width="250px" prop="grabFunName" label="采集方法名">
            </el-table-column>
            <el-table-column min-width="150px" prop="lotteryGrabId" label="采集id">
            </el-table-column>
            <el-table-column min-width="250px" prop="url" label="采集地址">
            </el-table-column>
            <el-table-column min-width="150px" prop="postParam" label="提交参数">
            </el-table-column>
            <el-table-column min-width="150px" prop="displaysort" label="排序">
            </el-table-column>
            <el-table-column min-width="150px" prop="isEnable" label="是否可用">
            </el-table-column>
            <el-table-column min-width="150px" prop="type" label="类型">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
                <el-button @click="getOne(scope.row.id)" size="mini">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加资源采集" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种名称:" prop="lotteryGroupName"  :label-width="formLabelWidth">
                  <el-input  :style="styleObject"  v-model="form.lotteryGroupName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类型:" prop="type" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.type" placeholder="">
                    <el-option label="日期" value="1"></el-option>
                    <el-option label="备用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth"  prop="displaysort">
                  <el-input type="number" min="0" :style="styleObject"  v-model="form.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :style="styleObject"  v-model="form.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item  label="采集方法名:"  prop="grabFunName" :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="form.grabFunName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否可用:" prop="isEnable" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isEnable" placeholder="">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="采集id:" :label-width="formLabelWidth" prop="lotteryGrabId">
                  <el-input type="number" min="0"  v-model="form.lotteryGrabId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="提交参数:" :label-width="formLabelWidth" prop="postParam">
                  <el-input  v-model="form.postParam" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="采集地址:" :label-width="formLabelWidth" prop="url">
                  <el-input  v-model="form.url" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改资源采集" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种名称:" prop="lotteryGroupName"  :label-width="formLabelWidth">
                  <el-input  :style="styleObject"  v-model="formtwo.lotteryGroupName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类型:" prop="type" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.type" placeholder="">
                    <el-option label="日期" :value="1"></el-option>
                    <el-option label="备用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth"  prop="displaysort">
                  <el-input type="number" min="0" :style="styleObject"  v-model="formtwo.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :style="styleObject"  v-model="formtwo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item  label="采集方法名:"  prop="grabFunName" :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="formtwo.grabFunName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否可用:" prop="isEnable" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isEnable" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="采集id:" :label-width="formLabelWidth" prop="lotteryGrabId">
                  <el-input type="number" min="0"  v-model="formtwo.lotteryGrabId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="提交参数:" :label-width="formLabelWidth" prop="postParam">
                  <el-input  v-model="formtwo.postParam" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="采集地址:" :label-width="formLabelWidth" prop="url">
                  <el-input  v-model="formtwo.url" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="资源采集详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种名称:"  :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.lotteryGroupName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类型:"  :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.type" placeholder="">
                    <el-option label="日期" :value="1"></el-option>
                    <el-option label="备用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth">
                  <el-input :disabled="true" type="number" min="0" :style="styleObject"  v-model="formtwoInfo.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="名称:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item  label="采集方法名:"  :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.grabFunName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否可用:" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.isEnable" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="采集id:" :label-width="formLabelWidth">
                  <el-input type="number" min="0" :disabled="true" v-model="formtwoInfo.lotteryGrabId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="提交参数:" :label-width="formLabelWidth" >
                  <el-input :disabled="true"  v-model="formtwoInfo.postParam" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="采集地址:" :label-width="formLabelWidth">
                  <el-input :disabled="true"  v-model="formtwoInfo.url" auto-complete="off"  clearable>
                  </el-input>
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
    name: 'ResourceCollect',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        w_input:'200px',
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
        form: {},
        roles: {
          id: '',
          realname: ''
        },
        rules: {
          lotteryGrabId: [{
            required: true,
            message: '请输入采集id',
            trigger: 'blur'
          }],
          lotteryGroupName: [{
            required: true,
            message: '请选择彩种名称',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          grabFunName: [{
            required: true,
            message: '请输入采集方法名',
            trigger: 'blur'
          }],
          displaysort: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
          url: [{
            required: true,
            message: '请输入采集地址',
            trigger: 'blur'
          }],
          postParam: [{
            required: true,
            message: '请输入提交参数',
            trigger: 'blur'
          }],
          displaysort: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
          isEnable: [{
            required: true,
            message: '请选择是否可用',
            trigger: 'change'
          }],
          type: [{
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }],
        },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          lotteryPlayedTplId:1
        },
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        lotteryPlayed:[],
        PlayedGroup:[],
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      // this.playedList();
      this.queryBtns();
      this.accountList();
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
                this.optionW = '225px'
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
          lotteryGroupName: this.formInline.lotteryGroupName
        }
        this.$fetch('/guess/lotteryGrab/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].isEnable == '1') {
                res.data.list[i].isEnable = '可用'
              } else {
                res.data.list[i].isEnable = '不可用'
              }
              if(res.data.list[i].type == '1') {
                res.data.list[i].type = '日期'
              } else {
                res.data.list[i].type = '备用'
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
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      load() {
        this.form={};
        this.formInline ={};
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/guess/lotteryGrab/save', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false;
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
        this.$fetch('/guess/lotteryGrab/delete', parameterData).then(res => {
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
        //修改前查询基本信息
        this.dialogTableVisible = true
        this.$fetch('/guess/lotteryGrab/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
          }
        })
      },
      update(formtwo) {
        this.$put('/guess/lotteryGrab/update', this.formtwo).then(res => {
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
        this.$fetch('/guess/lotteryGrab/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            // res.data.createrTime =  formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss')
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
