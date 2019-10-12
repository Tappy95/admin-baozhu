<template>
  <div class="bz-game-manage-wrap">
    <div class="bz-game-manage-inner">
      <div class="bz-game-manage-header">
        <h3>宝猪28/游戏管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="所属竞猜:" prop="lotteryId" >
              <el-select v-model="formInline.lotteryId" placeholder="请输入所属竞猜">
                <el-option v-for="(item,index) in jcIdList" :key="index" :label="item.name" :value="item.id"></el-option>
                <el-option  label="全部" value=""></el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="状态:" prop="status" >
            <el-select  v-model="formInline.status" placeholder="请输入状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="2"></el-option>
              <el-option  label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bz-game-manage-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" width="120px" prop="lotteryName" label="所属竞猜">
            </el-table-column>
            <el-table-column min-width="150px" prop="name" label="玩法名称">
            </el-table-column>
            <el-table-column min-width="120px" prop="baseOdds" label="基本赔率">
            </el-table-column>
            <el-table-column min-width="120px" prop="probability" label="中奖概率">
            </el-table-column>
            <el-table-column min-width="120px" prop="openProbability" label="开奖概率">
            </el-table-column>
            <el-table-column min-width="170px" prop="basePig" label="基准金猪">
              <template slot-scope="scope">
                <span>{{scope.row.basePig | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170px" prop="pigMin" label="最小投注">
              <template slot-scope="scope">
                <span>{{scope.row.pigMin | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170px" prop="pigMax" label="最大投注">
              <template slot-scope="scope">
              <span>{{scope.row.pigMax | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" prop="status" label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">已启用</span>
                <span class="blue" v-if="scope.row.status==2">已停用</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" prop="createTime" :formatter="dateFormat" label="创建时间">
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
        <el-dialog title="添加游戏" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属竞猜:" prop="lotteryId" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.lotteryId" placeholder="">
                    <el-option v-for="(item,index) in jcIdList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item  label="玩法名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :style="styleObject"  v-model="form.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="基本赔率:" :label-width="formLabelWidth" prop="baseOdds">
                  <el-input :style="styleObject"  v-model="form.baseOdds" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="基准金猪:" prop="basePig" :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="form.basePig" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="最小投注:" :label-width="formLabelWidth" prop="pigMin">
                  <el-input :style="styleObject" v-model="form.pigMin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大投注:" :label-width="formLabelWidth" prop="pigMax">
                  <el-input :style="styleObject" v-model="form.pigMax" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖概率:" :label-width="formLabelWidth" prop="probability">
                  <el-input :style="styleObject"  v-model="form.probability" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开奖概率:" :label-width="formLabelWidth" prop="openProbability">
                  <el-input :style="styleObject"  v-model="form.openProbability" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
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
        <el-dialog title="修改抽奖类型" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属竞猜:" prop="lotteryId" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.lotteryId" placeholder="">
                    <el-option v-for="(item,index) in jcIdList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item  label="玩法名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :style="styleObject"  v-model="formtwo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="基本赔率:" :label-width="formLabelWidth" prop="baseOdds">
                  <el-input :style="styleObject"  v-model="formtwo.baseOdds" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="基准金猪:" prop="basePig" :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="formtwo.basePig" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="最小投注:" :label-width="formLabelWidth" prop="pigMin">
                  <el-input :style="styleObject" v-model="formtwo.pigMin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大投注:" :label-width="formLabelWidth" prop="pigMax">
                  <el-input :style="styleObject" v-model="formtwo.pigMax" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖概率:" :label-width="formLabelWidth" prop="probability">
                  <el-input :style="styleObject"  v-model="formtwo.probability" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开奖概率:" :label-width="formLabelWidth" prop="openProbability">
                  <el-input :style="styleObject"  v-model="formtwo.openProbability" auto-complete="off"  clearable>
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
            <el-button type="primary" @click="update('formtwo')">确 定</el-button>
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
                  <div class="title">所属竞猜:</div>
                  <div class="name">
                    {{formtwoInfo.lotteryId}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">玩法名称:</div>
                  <div class="name">
                    {{formtwoInfo.name}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">基本赔率:</div>
                  <div class="name">{{formtwoInfo.baseOdds}}</div>
                </div>
                <div class="body_list">
                  <div class="title">基准金猪:</div>
                  <div class="name">{{formtwoInfo.basePig | currencyNum}}</div>
                </div>
                <div class="body_list">
                  <div class="title">最小投注:</div>
                  <div class="name">
                    <div class="name">{{formtwoInfo.pigMin | currencyNum}}</div>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">最大投注:</div>
                  <div class="name">
                    <div class="name">{{formtwoInfo.pigMax | currencyNum}}</div>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">中奖概率:</div>
                  <div class="name">
                    <div class="name">{{formtwoInfo.probability}}</div>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">开奖概率:</div>
                  <div class="name">
                    <div class="name">{{formtwoInfo.openProbability}}</div>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">创建时间:</div>
                  <div class="name">{{formtwoInfo.createTime | dateFormat}}</div>
                </div>
                <div class="body_list">
                <div class="title">状态:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.status==1">已启用</span>
                    <span  v-if="formtwoInfo.status==2">已停用</span>
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
    name: 'BzGameManage',
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
          lotteryId: [{required: true, message: '请选择所属竞猜', trigger: 'change'}],
          name: [{required: true, message: '请输入玩法名称', trigger: 'blur'}],
          baseOdds: [
            {required: true, message: '请输入基本赔率', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^(0|[1-9][0-9]*)(\.\d+)?$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          probability: [
            {required: true, message: '请输入中奖概率', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                let a2 = value,
                  a1 =0;
                if(typeof a2 !== 'string'){
                  a2 = a2.toString();
                }
                if (a2.includes('.')) {
                  a1 = a2.split('.')[1].length;
                }
                if ((value>1 || value<0) || a1>3) {
                  callback(new Error("请输入0至1之间的数(只保留小数点后3位)"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          openProbability: [{required: true, message: '请输入开奖概率', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                let a2 = value,
                  a1 =0;
                if(typeof a2 !== 'string'){
                  a2 = a2.toString();
                }
                if (a2.includes('.')) {
                  a1 = a2.split('.')[1].length;
                }
                if ((value>1 || value<0) || a1>3) {
                  callback(new Error("请输入0至1之间的数(只保留小数点后3位)"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],

          basePig: [
            {required: true, message: '请输入基准金猪', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          pigMin: [
            {required: true, message: '请输入最小投注', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          pigMax: [
            {required: true, message: '请输入最大投注', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          status: [{required: true, message: '请选择状态', trigger: 'change'}],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        styleObject:{
          width:'200px'
        },
        isSubmit:false,
        jcIdList:[]
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      this.getJcId();
    },
    filters: {
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
      currencyNum: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    methods: {
      //所属id
      getJcId(){
        this.$fetch('/bz28/lotteryInfo/querySelect').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.jcIdList = res.data;
          }
        })
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
          lotteryId: this.formInline.lotteryId,
          status: this.formInline.status
        }
        this.$fetch('/bz28/lotteryType/queryList', parameterData).then(res => {
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
        this.isSubmit=false;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/bz28/lotteryType/add', this.form).then(res => {
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
                this.isSubmit =false
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
        this.$fetch('/bz28/lotteryType/remove', parameterData).then(res => {
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
        this.dialogTableVisible = true;
        this.$fetch('/bz28/lotteryType/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        this.$refs[formtwo].validate(valid => {
          if (valid) {
            this.$put('/bz28/lotteryType/modify', this.formtwo).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogTableVisible = false;
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.accountList()
              }else {
                this.$message({
                  type: 'error',
                  message: '修改失败！'
                })
              }
            })
          }
        })
      },
      getOne(id){
        this.dialogTableDetail = true;
        this.$fetch('/bz28/lotteryType/queryOne', {
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

  .bz-game-manage .box_xinxi{
    background-color: #fff;
    border-radius: 4px;
    /*box-shadow: 0 1px 7px rgba(150,150,150,0.3);*/
    padding: 10px;
    box-sizing: border-box;
  }

  .bz-game-manage .box_xinxi .title{
    color: #353535;
    font-size: 14px;
    /*margin-bottom: 20px;*/
  }


  .bz-game-manage .box_xinxi .header{
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
  .bz-game-manage .box_xinxi .body_list{
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

  .bz-game-manage .box_xinxi .body_list.img{
    min-height: 50px;
    height: auto;
    line-height: 30px;
  }

  .bz-game-manage .box_xinxi .body_list.img img{
    max-width: 100px;
    max-height: 100px;
    width: auto;
    height: auto;
    margin: 10px;
    cursor: pointer;
    line-height: 1px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
  }

  .bz-game-manage .box_xinxi .body_list.img .title{
    padding-top: 10px;
  }
  .bz-game-manage .box_xinxi .body_list .title{
    width: 150px;
    float: left;
    padding-right: 30px;
    color: #a6a6a6;
    box-sizing: border-box;
    text-align: right;
  }

  .bz-game-manage .box_xinxi .body_list.dec{
    height: auto;
    /*padding: 5px 10px;*/
  }

  .bz-game-manage  .box_xinxi .body_list .name{
    float: left;
    color: #606266;
  }

  .bz-game-manage  .box_xinxi .body_list .name .dec{
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
  .bz-game-manage-wrap {
    width: 100%;
  }

  .bz-game-manage-wrap {
    width: 100%;
  }

  .bz-game-manage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .bz-game-manage-header {
    margin-bottom: 20px;
  }

  .bz-game-manage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .bz-game-manage-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
