<template>
  <div class="version-manage-wrap">
    <div class="version-manage-inner">
      <div class="version-manage-header">
        <h3>第三方/版本管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="渠道标识:">
            <el-input  v-model="formInline.channelCode" placeholder="请输入渠道标识" auto-complete="off"  clearable>
            </el-input>
          </el-form-item>
          <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          <el-button type="success" plain class="mar_bottom" @click="load()" v-if="add">添加版本</el-button>
        </el-form>
      </div>
      <div class="version-manage-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column min-width="200px" fixed="left" prop="channelCode" label="渠道标识">
            </el-table-column>
            <!--<el-table-column min-width="100px" prop="open28" label="发布状态">-->
            <!--</el-table-column>-->
            <el-table-column width="150px" prop="channelUpdate" label="是否独立更新">
              <template slot-scope="scope">
                <span v-if="scope.row.channelUpdate==1">是</span>
                <span v-if="scope.row.channelUpdate==2">否</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120px" prop="open28" label="开启28">
            </el-table-column>
            <el-table-column min-width="120px" prop="status" label="状态">
            </el-table-column>
            <el-table-column min-width="150px" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加版本" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="渠道标识:" :label-width="formLabelWidth" prop="channelCode">
                  <el-select  :style="styleObject" v-model="form.channelCode" placeholder="">
                    <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelCode" :value="item.channelCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否开启28:" prop="open28" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.open28" placeholder="">
                    <el-option label="开启" value="1"></el-option>
                    <el-option label="关闭" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开启新手引导:" prop="openNoviceTask" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.openNoviceTask" placeholder="">
                    <el-option label="开启" value="1"></el-option>
                    <el-option label="关闭" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否独立更新:" prop="channelUpdate" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.channelUpdate" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.status" placeholder="">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改版本" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo">
            <el-row>
              <!--<el-col :span="12">-->
                <!--<el-form-item label="渠道标识:" :label-width="formLabelWidth" prop="channelCode">-->
                  <!--<el-input  :style="styleObject"  v-model="formtwo.channelCode" auto-complete="off"  clearable>-->
                  <!--</el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->

              <el-col :span="12">
                <el-form-item label="开启新手引导:" prop="openNoviceTask" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.openNoviceTask" placeholder="">
                    <el-option label="开启" :value="1"></el-option>
                    <el-option label="关闭" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="是否开启28:" prop="open28" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.open28" placeholder="">
                    <el-option label="开启" :value="1"></el-option>
                    <el-option label="关闭" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="是否独立更新:" prop="channelUpdate" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.channelUpdate" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formtwo.channelUpdate==1">
                <el-form-item label="安卓版本号:" prop="versionNo" :label-width="formLabelWidth" >
                  <el-input :style="styleObject"  min="0" v-model="formtwo.versionNo" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formtwo.channelUpdate==1">
                <el-form-item label="ios版本号:" prop="iosVersionNo" :label-width="formLabelWidth" >
                  <el-input :style="styleObject"  min="0" v-model="formtwo.iosVersionNo" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>


              <el-col :span="22" v-if="formtwo.channelUpdate==1">
                <el-form-item  label="安卓更新地址:" prop="updateUrl" :label-width="formLabelWidth" >
                  <el-input spellcheck="false"   min="0" v-model="formtwo.updateUrl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22" v-if="formtwo.channelUpdate==1">
                <el-form-item  label="ios更新地址:" prop="iosUpdateUrl" :label-width="formLabelWidth" >
                  <el-input spellcheck="false"   min="0" v-model="formtwo.iosUpdateUrl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22" v-if="formtwo.channelUpdate==1">
                <el-form-item label="更新描述:"  :label-width="formLabelWidth" >
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 12}" v-model="formtwo.updateRemark" auto-complete="off" clearable></el-input>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="版本详情" :visible.sync="dialogTableDetail" width="1000px">
          <el-form :model="formtwoInfo">
            <el-row >
              <div class="box_xinxi">
                <div class="wrap_da">
                  <div class="header">
                    <span>详情信息</span>
                    <span></span>
                  </div>
                  <div class="body_list">
                    <div class="title">渠道标识:</div>
                    <div class="name">
                      {{formtwoInfo.channelCode}}
                    </div>
                  </div>

                  <div class="body_list">
                    <div class="title">开启新手引导:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.openNoviceTask==1">已开启</span>
                      <span v-if="formtwoInfo.openNoviceTask==2">已关闭</span>
                    </div>
                  </div>

                  <div class="body_list">
                    <div class="title">是否开启28:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.open28==1">已开启</span>
                      <span v-if="formtwoInfo.open28==2">已关闭</span>
                    </div>
                  </div>


                  <div class="body_list">
                    <div class="title">是否独立更新:</div>
                        <div class="name">
                      <span v-if="formtwoInfo.channelUpdate==1">是</span>
                      <span v-if="formtwoInfo.channelUpdate==2">否</span>
                    </div>
                  </div>

                  <div class="body_list" v-if="formtwoInfo.channelUpdate==1">
                    <div class="title">安卓版本号:</div>
                    <div class="name">
                      {{formtwoInfo.versionNo}}
                    </div>
                  </div>

                  <div class="body_list" v-if="formtwoInfo.channelUpdate==1">
                    <div class="title">ios版本号:</div>
                    <div class="name">
                      {{formtwoInfo.iosVersionNo}}
                    </div>
                  </div>

                  <div class="body_list">
                    <div class="title">状态:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.status==1">已启用</span>
                      <span v-if="formtwoInfo.status==2">已停用</span>
                    </div>
                  </div>
                  <div class="body_list">
                    <div class="title">创建时间:</div>
                    <div class="name">
                      {{formtwoInfo.createTime}}
                    </div>
                  </div>

                  <div v-if="formtwoInfo.channelUpdate==1">
                      <div class="header">
                        <span>更新</span>
                        <span></span>
                      </div>
                      <div class="body_list dec"  style="width: 100%" >
                        <div class="title">安卓更新地址:</div>
                        <div class="name">
                          <span class="dec">{{formtwoInfo.updateUrl}}</span>
                        </div>
                      </div>
                    <div class="body_list dec"  style="width: 100%" >
                      <div class="title">ios更新地址:</div>
                      <div class="name">
                        <span class="dec">{{formtwoInfo.iosUpdateUrl}}</span>
                      </div>
                    </div>
                    <div class="body_list dec"  style="width: 100%" >
                        <div class="title">更新描述:</div>
                        <div class="name">
                          <span class="dec" v-html="formtwoInfo.updateRemark"></span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
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
    name: 'VersionManage',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
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
          needUpdate:2, // 是否需要更新（1-需要 2-不需要）
          updateUrl:'', // 更新地址
        },
        rules: {
          openNoviceTask: [{
            required: true,
            message: '请选择是否开启新手引导',
            trigger: 'change'
          }],
          needUpdate: [{
            required: true,
            message: '请选择是否需要更新',
            trigger: 'change'
          }],
          channelCode: [{
            required: true,
            message: '请输入渠道标识',
            trigger: 'blur'
          }],
            versionNo: [{
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          }],
            open28: [{
            required: true,
            message: '请选择是否开启28',
            trigger: 'change'
          }],
            status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
          channelUpdate: [{
            required: true,
            message: '请选择是否独立更新',
            trigger: 'change'
          }],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isSubmit:false,
        channelNameList:[]
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      this.channelList();
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
          channelCode:this.formInline.channelCode
        }
        this.$fetch('/api/pVersion/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].open28 == '1') {
                res.data.list[i].open28 = '已开启'
              } else {
                res.data.list[i].open28 = '已关闭'
              }
              if(res.data.list[i].status == '1') {
                res.data.list[i].status = '已启用'
              } else {
                res.data.list[i].status = '已停用'
              }
              if(res.data.list[i].needUpdate == '1') {
                res.data.list[i].needUpdate = '需要'
              } else {
                res.data.list[i].needUpdate = '不需要'
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
        this.form={};
        this.form.needUpdate = 2;
        this.formInline = {};
        this.dialogFormVisible = true;
        this.isSubmit=false;
        this.channelList();
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/pVersion/add', this.form).then(res => {
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
                this.isSubmit=false;
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
        this.$fetch('/api/pVersion/remove', parameterData).then(res => {
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
        this.$fetch('/api/pVersion/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        // if (this.formtwo.needUpdate==2){
        //   this.formtwo.updateUrl='';
        //   this.formtwo.updateRemark='';
        // }
        this.$put('/api/pVersion/modify', this.formtwo).then(res => {
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
        this.$fetch('/api/pVersion/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.createTime =  formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss');
            if (res.data.updateRemark){
              res.data.updateRemark = res.data.updateRemark.replace(/\n/g,'<br/>')
            }
            this.formtwoInfo = res.data;
          }
        })
      },

      //调取名称列表
      channelList(){
        this.$fetch('/api/mChannelInfo/versionDownList',{
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.channelNameList = res.data;
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
  .mar_bottom{
    margin-bottom: 20px;
  }
  .version-manage-wrap {
    width: 100%;
  }

  .version-manage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .version-manage-header {
    margin-bottom: 20px;
  }

  .version-manage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .version-manage-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
