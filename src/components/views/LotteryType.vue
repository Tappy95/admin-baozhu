<template>
  <div class="lotter-type-wrap">
    <div class="lotter-type-inner">
      <div class="lotter-type-header">
        <h3>运营管理/抽奖类型</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="类型名称">
            <el-input v-model="formInline.typeName" placeholder="请输入类型名称" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="lotter-type-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="抽奖编号：">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="每天次数限制：">
                    <span>{{ props.row.timesOneday }}</span>
                  </el-form-item>
                  <el-form-item label="每次所需金猪：">
                    <span>{{ props.row.expendPigCoin }}</span>
                  </el-form-item>
                  <el-form-item label="适用人群：">
                    <span v-if="props.row.applyCrowd==1">全部</span>
                    <span v-else>已停用</span>
                  </el-form-item>
                  <el-form-item label="抽奖分类：">
                    <span class="green" v-if="props.row.lotterySort==1">兑换</span>
                    <span class="blue" v-if="props.row.lotterySort==2">抽奖</span>
                  </el-form-item>
                  <el-form-item label="类型状态：">
                    <span class="green" v-if="props.row.status==1">已启用</span>
                    <span class="blue" v-if="props.row.status==2">已停用</span>
                  </el-form-item>
                  <el-form-item label="创建时间：">
                    <span>{{ props.row.createTime | dateFont}}</span>
                  </el-form-item>
                  <el-form-item label="类型名称：" style="width: 100%">
                    <span>{{ props.row.typeName }}</span>
                  </el-form-item>
                  <el-form-item label="类型描述："style="width:60%;">
                    <span>{{ props.row.remark }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" width="200px" prop="typeName" label="类型名称">
            </el-table-column>
            <el-table-column width="150px" prop="id" label="抽奖编号">
            </el-table-column>
            <el-table-column width="120px" prop="timesOneday" label="每天次数限制">
            </el-table-column>
            <el-table-column width="120px" prop="expendPigCoin" label="每次所需金猪">
            </el-table-column>
            <el-table-column width="300px" prop="remark" label="类型描述">
              <template slot-scope="scope">
                <span class="yichu">{{scope.row.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px" prop="applyCrowd" label="适用人群">
              <template slot-scope="scope">
                <span v-if="scope.row.applyCrowd==1">全部</span>
                <span v-else>已停用</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" prop="lotterySort" label="抽奖分类">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.lotterySort==1">兑换</span>
                <span class="blue" v-if="scope.row.lotterySort==2">抽奖</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" prop="status" label="类型状态">
              <template slot-scope="scope">
                <span class="green"  v-if="scope.row.status==1">已启用</span>
                <span class="red"  v-if="scope.row.status==2">已停用</span>
              </template>
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
        <el-dialog title="添加抽奖类型" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="抽奖分类:" prop="lotterySort" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.lotterySort" placeholder="">
                    <el-option label="兑换" value="1"></el-option>
                    <el-option label="抽奖" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="form.lotterySort==2">
                <el-form-item  label="每次所需金猪:" :label-width="formLabelWidth" prop="expendPigCoin">
                  <el-input :style="styleObject"  v-model.number="form.expendPigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="form.lotterySort==2">
                <el-form-item label="每天次数限制:" :label-width="formLabelWidth" prop="timesOneday">
                  <el-input :style="styleObject"  v-model.number="form.timesOneday" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="form.lotterySort==2">
                <el-form-item label="每天发放数量:" :label-width="formLabelWidth" prop="dayNum">
                  <el-input :style="styleObject"  v-model.number="form.dayNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="适用人群:" prop="applyCrowd" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.applyCrowd" placeholder="">
                    <el-option label="全部" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类型状态:" prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                  <el-input  v-model="form.typeName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改抽奖类型" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="24">
                <el-form-item label="抽奖分类:" prop="lotterySort" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.lotterySort" placeholder="">
                    <el-option label="兑换" :value="1"></el-option>
                    <el-option label="抽奖" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="formtwo.lotterySort==2">
                <el-form-item  label="每次所需金猪:" :label-width="formLabelWidth" prop="expendPigCoin">
                  <el-input :style="styleObject"  v-model.number="formtwo.expendPigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="formtwo.lotterySort==2">
                <el-form-item label="每天次数限制:" :label-width="formLabelWidth" prop="timesOneday">
                  <el-input :style="styleObject"  v-model.number="formtwo.timesOneday" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="formtwo.lotterySort==2">
                <el-form-item label="每天发放数量:" :label-width="formLabelWidth" prop="dayNum">
                  <el-input :style="styleObject"  v-model.number="formtwo.dayNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="适用人群:" prop="applyCrowd" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.applyCrowd" placeholder="">
                    <el-option label="全部" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型状态:" prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                  <el-input  v-model="formtwo.typeName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="类型描述" prop="remark" :label-width="formLabelWidth">
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="抽奖类型详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <div class="box_xinxi">
              <div class="wrap_da">
                <div class="header">
                  <span>详情信息</span>
                  <span></span>
                </div>
                <div class="body_list">
                  <div class="title">抽奖编号:</div>
                  <div class="name">
                    {{formtwoInfo.id}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">抽奖分类:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.lotterySort==1">兑换</span>
                    <span  v-if="formtwoInfo.lotterySort==2">抽奖</span>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">每天次数限制:</div>
                  <div class="name">
                   {{formtwoInfo.timesOneday}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">每天发放数量:</div>
                  <div class="name">{{formtwoInfo.dayNum}}</div>
                </div>
                <div class="body_list">
                  <div class="title">每次所需金猪:</div>
                  <div class="name">{{formtwoInfo.expendPigCoin}}</div>
                </div>
                <div class="body_list">
                  <div class="title">适用人群:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.applyCrowd==1">全部</span>
                    <span v-else>已停用</span>
                  </div>
                </div>
                <div class="body_list" style="width: 100%">
                  <div class="title">创建时间:</div>
                  <div class="name">{{formtwoInfo.createTime | dateFormat}}</div>
                </div>
                <div class="body_list" style="width: 100%" >
                  <div class="title">类型名称:</div>
                  <div class="name">
                    {{formtwoInfo.typeName}}
                  </div>
                </div>
                <div class="body_list dec" style="width: 100%" >
                  <div class="title">类型描述:</div>
                  <div class="name">
                    <span class="dec">  {{formtwoInfo.remark}}</span>
                  </div>
                </div>
              </div>
            </div>
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
        rules: {
            typeName: [{required: true, message: '请输入类型名称', trigger: 'blur'}],
            timesOneday: [
              {required: true, message: '请输入每天次数限制', trigger: 'blur'},
              { type: 'number', message: '请输入数字值'}],
            expendPigCoin: [
              {required: true, message: '请输入每次所需金猪', trigger: 'blur'},
              { type: 'number', message: '请输入数字值'}],
            remark: [{required: true, message: '请输入类型描述', trigger: 'blur'}],
            status: [{required: true, message: '请选择类型状态', trigger: 'change'}],
            applyCrowd: [{required: true, message: '请选择适用人群', trigger: 'change'}],
            lotterySort: [{required: true, message: '请选择抽奖分类', trigger: 'change'}],
            dayNum: [
                    {required: true, message: '请输入每天发放数量', trigger: 'blur'},
                    { type: 'number', message: '请输入数字值'}],
          },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        styleObject:{
          width:'200px'
        }
      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
    },
    filters: {
      dateFont: function (date){
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

  .yichu{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .lotter-type .box_xinxi{
    background-color: #fff;
    border-radius: 4px;
    /*box-shadow: 0 1px 7px rgba(150,150,150,0.3);*/
    padding: 10px;
    box-sizing: border-box;
  }

  .lotter-type .box_xinxi .title{
    color: #353535;
    font-size: 14px;
    /*margin-bottom: 20px;*/
  }


  .lotter-type .box_xinxi .header{
    width: 100%;
    height: 40px;
    background-color: #f6f8f9;
    color: #1fa67a;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .wrap_da{
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .lotter-type .box_xinxi .body_list{
    /*display: inline-block;*/
    /*float: left;*/
    width: 50%;
    height: auto;
    height: 50px;
    color: #353535;
    line-height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7eb;
    display: inline-block;
  }

  .lotter-type .box_xinxi .body_list.img{
    min-height: 50px;
    height: auto;
    line-height: 30px;
  }

  .lotter-type .box_xinxi .body_list.img img{
    max-width: 100px;
    max-height: 100px;
    width: auto;
    height: auto;
    margin: 10px;
    cursor: pointer;
    line-height: 1px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
  }

  .lotter-type .box_xinxi .body_list.img .title{
    padding-top: 10px;
  }
  .lotter-type .box_xinxi .body_list .title{
    width: 150px;
    float: left;
    padding-right: 30px;
    color: #a6a6a6;
    box-sizing: border-box;
    text-align: right;
  }

  .lotter-type .box_xinxi .body_list.dec{
    height: auto;
    /*padding: 5px 10px;*/
  }

  .lotter-type  .box_xinxi .body_list .name{
    float: left;
    color: #606266;
  }

  .lotter-type  .box_xinxi .body_list .name .dec{
    font-size: 14px;
    line-height: 30px;
    width: 500px;
    float: left;
    padding: 10px;
  }


  .el-icon-plus{
    line-height:0;
  }
  .bannerAvatar-uploader-icon{
    line-height: 148px !important;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }

  .red{
    color: #ff4d51;
  }
  .green{
    color: #13ce66;
  }
  .blue{
    color: #409EFF;
  }
  .lotter-type-wrap {
    width: 100%;
  }

  .lotter-type-wrap {
    width: 100%;
  }

  .lotter-type-inner {
    margin: auto;
    padding: 0 20px;
  }

  .lotter-type-header {
    margin-bottom: 20px;
  }

  .lotter-type-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .lotter-type-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
