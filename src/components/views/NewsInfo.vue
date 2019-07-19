<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>消息管理/通知</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="公告标题">
            <el-input v-model="formInline.informTitle" placeholder="请输入公告标题" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="528">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column  min-width="200px" fixed="left" prop="informTitle" label="通知标题">
            </el-table-column>
            <el-table-column  min-width="300px" prop="informContent" label="通知内容">
            </el-table-column>
            <el-table-column prop="isRelease" min-width="120px" label="发布状态">
            </el-table-column>
            <el-table-column prop="informType" min-width="120px" label="通知类型">
            </el-table-column>
            <el-table-column prop="pushMode" min-width="120px" label="通知方式">
            </el-table-column>
            <el-table-column prop="pushObject" min-width="120px" label="推送对象">
            </el-table-column>
            <el-table-column width="200px" prop="createrTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column width="200px" :formatter="dateFormat" prop="pushTime" label="推送时间">
            </el-table-column>

            <el-table-column width="200px" :formatter="dateFormat" prop="pushTime" label="推送时间">
            </el-table-column>

            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button  type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加通知" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="推送对象" prop="pushObject"  :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.pushObject" @change="toTypesTap(form.pushObject)" placeholder="">
                    <el-option label="个人" value="1"></el-option>
                    <el-option label="所有人" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="toTypes" label="接收人"  :label-width="formLabelWidth" prop="mobile">
                  <el-input :style="styleObject" type="number" placeholder="请输入接收人的手机号码" v-model="form.mobile" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="通知方式" prop="pushMode" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.pushMode" placeholder="">
                    <!--<el-option label="短信" value="1"></el-option>-->
                    <el-option label="推送" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否发布" prop="isRelease" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isRelease" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="推送时间" :label-width="formLabelWidth" prop="pushTime">
                  <el-date-picker
                    v-model="form.pushTime"
                    type="datetime"  :style="styleObject"
                    placeholder="选择活动结束时间" >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="通知类型" prop="informType" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.informType" placeholder="" @change="changeType(form.informType)">
                    <el-option label="普通通知" value="1"></el-option>
                    <!--<el-option label="自定义通知" value="2"></el-option>-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item v-if="myhttps" label="自定义消息跳转链接" :label-width="formLabelWidth" prop="informUrl">
                  <el-input  v-model="form.informUrl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>

              </el-col>

              <el-col :span="22">
                <el-form-item label="通知标题" :label-width="formLabelWidth" prop="informTitle">
                  <el-input v-model="form.informTitle" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="通知内容" prop="informContent" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.informContent" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改通知" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="推送对象" prop="pushObject"  :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.pushObject" @change="toTypesTap(formtwo.pushObject)" placeholder="">
                    <el-option label="个人" :value="1"></el-option>
                    <el-option label="所有人" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="formtwo.pushObject==1" label="接收人" :label-width="formLabelWidth" prop="mobile">
                  <el-input type="number" v-model="formtwo.mobile" auto-complete="off" :style="styleObject"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="通知方式" prop="pushMode" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.pushMode" placeholder="">
                    <!--<el-option label="短信" :value="1"></el-option>-->
                    <el-option label="推送" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否发布" prop="isRelease" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isRelease" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="推送时间" :label-width="formLabelWidth" prop="pushTime">
                  <el-date-picker :style="styleObject"
                                  v-model="formtwo.pushTime"
                                  type="datetime"
                                  placeholder="选择活动结束时间" >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="通知类型" prop="informType" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.informType" placeholder="" >
                    <el-option label="普通通知" :value="1"></el-option>
                    <!--<el-option label="自定义通知" :value="2"></el-option>-->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item v-if="formtwo.informType==2" label="自定义消息跳转链接" :label-width="formLabelWidth" prop="informUrl">
                  <el-input  v-model="formtwo.informUrl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>


              <el-col :span="22">
                <el-form-item label="通知标题" :label-width="formLabelWidth" prop="informTitle">
                  <el-input v-model="formtwo.informTitle" auto-complete="off" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="通知内容" prop="informContent" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.informContent" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update('formtwo')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="通知详情" :visible.sync="dialogTableVisibleInfo" width="800px">
          <el-form :model="formtwoInfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="推送对象" prop="pushObject"  :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.pushObject" @change="toTypesTap(formtwoInfo.pushObject)" placeholder="">
                    <el-option label="个人" :value="1"></el-option>
                    <el-option label="所有人" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item v-if="formtwoInfo.pushObject==1" label="接收人" :label-width="formLabelWidth" prop="mobile">
                  <el-input :style="styleObject" :disabled="true" type="number" v-model="formtwoInfo.mobile"  auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="通知方式" prop="pushMode" :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.pushMode" placeholder="">
                    <el-option label="短信" :value="1"></el-option>
                    <el-option label="推送" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="通知类型" prop="informType" :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.informType" placeholder="" >
                    <el-option label="普通通知" :value="1"></el-option>
                    <el-option label="自定义通知" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item  label="是否发布" prop="isRelease" :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.isRelease" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="推送时间" :label-width="formLabelWidth" prop="pushTime">
                  <el-date-picker :disabled="true"
                                  v-model="formtwoInfo.pushTime"
                                  type="datetime" :style="styleObject"
                                  placeholder="选择活动结束时间" >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="通知标题" :label-width="formLabelWidth" prop="informTitle">
                  <el-input :disabled="true" v-model="formtwoInfo.informTitle" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item  v-if="formtwoInfo.informType==2" label="自定义消息跳转链接" :label-width="formLabelWidth" prop="informUrl">
                  <el-input  :disabled="true" v-model="formtwoInfo.informUrl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="通知内容" prop="informContent" :label-width="formLabelWidth">
                  <el-input :disabled="true" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.informContent" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisibleInfo = false">确定</el-button>
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
    name: 'NewsInfo',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        toTypes:false,
        myhttps:false,
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisibleInfo:false,
        formtwoInfo: {},
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        form: {
            informTitle: '',
            informContent: '',
            mobile: '',
           isRelease: '1'
        },
        rules: {
        informTitle: [{
              required: true,
              message: '请输入公告标题',
              trigger: 'blur'
            }],
        informContent: [{
            required: true,
            message: '请输入公告内容',
            trigger: 'blur'
          }],
          isRelease: [{
            required: true,
            message: '请选择是否发布',
            trigger: 'change'
          }],
            informType: [{
              required: true,
              message: '请选择通知类型',
              trigger: 'change'
            }],
           pushMode: [{
              required: true,
              message: '请选择通知方式',
              trigger: 'change'
            }],
            informUrl: [{
              required: true,
              message: '请输入自定义消息跳转链接',
              trigger: 'blur'
            }],
            isPush: [{
              required: true,
              message: '请选择是否推送',
              trigger: 'change'
            }],
            pushObject: [{
              required: true,
              message: '请选择推送对象',
              trigger: 'change'
            }],
            pushTime: [{
              required: true,
              message: '请输入选择推送时间',
              trigger: 'change'
            }],
           mobile: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '请输入11位手机号',
              trigger: 'blur'
            }
          ],
        },
        formLabelWidth: '160px',
        /* 分页*/
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
      changeType(types){
        if ((types ==2)) {
          this.myhttps = true
        }else {
          this.myhttps = false
        }
      },
      toTypesTap(types){
        if ((types ==1)) {
          this.toTypes = true
        }else {
          this.toTypes = false
        }

     },
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
              this.optionW = '160px'
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.powerTrue =true;
              this.optionW = '160px'
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
          informTitle: this.formInline.informTitle
        }
        this.$fetch('/api/appInform/getList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].isRelease == '1') {
              res.data.list[i].isRelease = '已发布'
            } else {
              res.data.list[i].isRelease = '未发布'
            }

            if(res.data.list[i].informType == '1') {
              res.data.list[i].informType = '普通通知'
            } else {
              res.data.list[i].informType = '自定义通知'
            }

            if(res.data.list[i].pushMode == '1') {
              res.data.list[i].pushMode = '短信'
            } else {
              res.data.list[i].pushMode = '推送'
            }

            if(res.data.list[i].pushObject == '1') {
              res.data.list[i].pushObject = '个人'
            } else {
              res.data.list[i].pushObject = '所有人'
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
        this.formInline = {};
        this.myhttps=false;
        this.toTypes=false;
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        if(this.form.informType==1){
          this.form.informUrl=1
        }
        this.$refs[form].validate(valid => {
          if(valid) {
            this.form.pushTime = new Date(this.form.pushTime).getTime();
            this.$post('/api/appInform/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '添加成功！'
              })
              this.accountList()
            } else {
                if (res.data==3){
                  this.$message({
                    type: 'error',
                    message: '接收人不存在'
                  })
                }else {
                  this.$message({
                    type: 'error',
                    type: 'error',
                    message: res.message
                  })
                }
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
        this.$fetch('/api/appInform/delete', parameterData).then(res => {
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
      //修改
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/api/appInform/appInfoBack', {
          id: id
        }).then(res => {
          if(res.data != null ){
          this.formtwo = res.data
        }
      })
      },
      update(formtwo) {
        if (this.formtwo.informType==1){
          this.formtwo.informUrl = 1
        }
        if (this.formtwo.pushObject==2){
          this.formtwo.mobile = ''
        }
        this.formtwo.pushTime = new Date(this.formtwo.pushTime).getTime();
        this.$refs[formtwo].validate(valid => {
          if(valid) {
            this.$put('/api/appInform/update', this.formtwo).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.dialogTableVisible = false
              this.accountList()
            }else{
              if (res.data==3){
                this.$message({
                  type: 'error',
                  message: '接收人不存在'
                })
              }else {
                this.$message({
                  type: 'error',
                  type: 'error',
                  message: res.message
                })
              }
            }
          })
          }})
      },
      getOne(id){
        this.dialogTableVisibleInfo = true
        this.$fetch('/api/appInform/info', {
          id: id
        }).then(res => {
          if(res.data != null ){
          res.data.createrTime =  formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss')
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
  .el-input--suffix .el-input__inner{
    padding-right: 0;
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
