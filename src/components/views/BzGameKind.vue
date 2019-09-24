<template>
  <div class="bz-game-kind-wrap">
    <div class="bz-game-kind-inner">
      <div class="bz-game-kind-header">
        <h3>宝猪28/彩种</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bz-game-kind-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" min-width="200px" prop="name" label="名称">
            </el-table-column>
            <el-table-column min-width="150px" prop="intro" label="介绍">
              <template slot-scope="scope">
                <div class="yichu">
                  {{scope.row.intro}}
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="120px" prop="logo" label="logo">
              <template slot-scope="scope">
                <img :src='scope.row.logo'
                     style="max-width: 45px;max-height: 45px;"
                     @click="clickImg(scope.row.logo)">
              </template>
            </el-table-column>
            <el-table-column width="120px" prop="isOfficial" label="是否官方">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.isOfficial==1">是</span>
                <span class="blue" v-if="scope.row.isOfficial==2">否</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px" prop="robotStatus" label="是否启用机器人">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.robotStatus==1">是</span>
                <span class="blue" v-if="scope.row.robotStatus==2">否</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200px" prop="periods" label="同时开放投注期数">
            </el-table-column>
            <el-table-column width="170px" prop="tzTime" label="投注时长(s)">
            </el-table-column>
            <el-table-column width="170px" prop="waitTime" label="暂停时长(s)">
            </el-table-column>
            <el-table-column width="120px" prop="status" label="是否可用">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">可用</span>
                <span class="blue" v-if="scope.row.status==2">不可用</span>
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
        <el-dialog title="添加彩种" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="22" >
                <el-form-item  label="名称:" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否官方:" prop="isOfficial" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isOfficial" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否启用机器人:" prop="robotStatus" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.robotStatus" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="同时开放投注期数:" :label-width="formLabelWidth" prop="periods">
                  <el-input :style="styleObject"  v-model="form.periods" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="返奖率:" :label-width="formLabelWidth" prop="returnRate">
                  <el-input :style="styleObject"  v-model="form.returnRate" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注时长(s):" prop="tzTime" :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="form.tzTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="暂停时长(s):" :label-width="formLabelWidth" prop="waitTime">
                  <el-input :style="styleObject" v-model="form.waitTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可用:" prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.status" placeholder="">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="22" >
                <el-form-item label="logo:"
                              :label-width="formLabelWidth">
                  <el-upload class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl"
                         :src="imageUrl"
                         class="avatar">
                    <i v-else
                       class="el-icon-plus bannerAvatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="22" >
                <el-form-item label="介绍:"  prop="intro" :label-width="formLabelWidth">
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.intro" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改彩种" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="22" >
                <el-form-item  label="名称:" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="formtwo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否官方:" prop="isOfficial" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isOfficial" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否启用机器人:" prop="robotStatus" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.robotStatus" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="同时开放投注期数:" :label-width="formLabelWidth" prop="periods">
                  <el-input :style="styleObject"  v-model="formtwo.periods" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="返奖率:" :label-width="formLabelWidth" prop="returnRate">
                  <el-input :style="styleObject"  v-model="formtwo.returnRate" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="投注时长(s):" prop="tzTime" :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="formtwo.tzTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="暂停时长(s):" :label-width="formLabelWidth" prop="waitTime">
                  <el-input :style="styleObject" v-model="formtwo.waitTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可用:" prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.status" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="22" >
                <el-form-item label="logo:"
                              :label-width="formLabelWidth">
                  <el-upload class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl"
                         :src="imageUrl"
                         class="avatar">
                    <i v-else
                       class="el-icon-plus bannerAvatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="22" >
                <el-form-item label="介绍:"  prop="intro" :label-width="formLabelWidth">
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.intro" auto-complete="off" clearable></el-input>
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
                <div class="body_list dec1" style="width: 100%" >
                  <div class="title">名称:</div>
                  <div class="name">
                    {{formtwoInfo.name}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">是否官方:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.isOfficial==1">是</span>
                    <span  v-if="formtwoInfo.isOfficial==2">否</span>
                  </div>
                </div>

                <div class="body_list">
                  <div class="title">是否启用机器人:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.robotStatus==1">已启用</span>
                    <span  v-if="formtwoInfo.robotStatus==2">已停用</span>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">同时开放投注期数:</div>
                  <div class="name">{{formtwoInfo.periods}}</div>
                </div>
                <div class="body_list">
                  <div class="title">投注时长(s):</div>
                  <div class="name">{{formtwoInfo.tzTime}}</div>
                </div>
                <div class="body_list">
                  <div class="title">暂停时长(s):</div>
                  <div class="name">
                    <div class="name">{{formtwoInfo.waitTime}}</div>
                  </div>
                </div>

                <div class="body_list">
                  <div class="title">是否可用:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.status==1">可用</span>
                    <span  v-if="formtwoInfo.status==2">不可用</span>
                  </div>
                </div>

                <div class="body_list">
                  <div class="title">返奖率:</div>
                  <div class="name">
                    <div class="name">{{formtwoInfo.returnRate}}</div>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">创建时间:</div>
                  <div class="name">{{formtwoInfo.createTime}}</div>
                </div>

                <div class="body_list dec" style="width: 100%"  >
                  <div class="title">介绍:</div>
                  <div class="name"  style="width:560px;">
                    <span class="dec" style="line-height: 30px;">  {{formtwoInfo.intro}}</span>
                  </div>
                </div>

                <div  class="body_list img" style="width: 100%;height:140px;border: none" >
                  <div class="title" style="float: left;">logo:</div>
                  <div class="img_box" v-if="formtwoInfo.logo" style="width: 500px;float: left;">
                    <div @click="clickImg(formtwoInfo.logo)"   class="more_img">
                      <img  :src="formtwoInfo.logo"  />
                    </div>
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

      <big-img v-if="showImg"
               @clickit="viewImg"
               :imgSrc="imgSrc"></big-img>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  import { getSession } from '../../utils/cookie'
  import BigImg from './BigImg'
  export default {
    name: 'BzGameKind',
    data() {
      return {
        showImg:false,
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
          imageUrl:'',
          logo:'',
        },
        rules: {
          imageUrl: [{required: true, message: '请选择logo', trigger: 'change'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          intro: [{required: true, message: '请输入介绍', trigger: 'blur'}],
          isOfficial: [{required: true, message: '请选择是否官方', trigger: 'change'}],
          robotStatus: [{required: true, message: '请选择是否启用机器人', trigger: 'change'}],
          periods: [{required: true, message: '请输入同时开放投注期数', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          tzTime: [
            {required: true, message: '请输入投注时长', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^(0|[1-9][0-9]*)(\.\d+)?$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          waitTime: [
            {required: true, message: '请输入暂停时长', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^(0|[1-9][0-9]*)(\.\d+)?$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          status: [{required: true, message: '请选择是否可用', trigger: 'change'}],
          returnRate: [
            {required: true, message: '请输入返奖率', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
        },
        formLabelWidth: '140px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        styleObject:{
          width:'200px'
        },
        isSubmit:false,
        imageUrl:'',
        uploadData:{},
      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      this.uploadData={
        token:getSession("token")
      }
    },
    filters: {
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
      currencyNum: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    methods: {
      clickImg(img) {
        this.showImg = true;
        this.imgSrc =img;
      },
      viewImg() {
        this.showImg = false;
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
          pageSize: this.pageSize
        }
        this.$fetch('/bz28/lotteryInfo/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
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
        this.accountList();
      },
      load() {
        this.formInline = {};
        this.form={};
        this.dialogFormVisible = true;
        this.isSubmit=false;
      },
      addBtn(form) {
        this.form.logo =  this.imageUrl;
        this.$refs[form].validate(valid => {
          if(valid) {
            if (!this.form.logo){
              this.$message({type: 'error', message: '请上传logo！'})
              return
            }
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/bz28/lotteryInfo/add', this.form).then(res => {
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
        this.$post('/bz28/lotteryInfo/remove', parameterData).then(res => {
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
        this.$fetch('/bz28/lotteryInfo/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
             this.imageUrl = res.data.logo;
            this.formtwo = res.data;

          }
        })
      },
      update(formtwo) {
        this.$refs[formtwo].validate(valid => {
          if (valid) {
            if (!this.formtwo.logo){
              this.$message({type: 'error', message: '请上传logo！'})
              return
            }
            this.$put('/bz28/lotteryInfo/modify', this.formtwo).then(res => {
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
        this.$fetch('/bz28/lotteryInfo/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.createTime =  formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
            this.formtwoInfo = res.data
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {
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

  .bz-game-kind .box_xinxi{
    background-color: #fff;
    border-radius: 4px;
    /*box-shadow: 0 1px 7px rgba(150,150,150,0.3);*/
    padding: 10px;
    box-sizing: border-box;
  }

  .bz-game-kind .box_xinxi .title{
    color: #353535;
    font-size: 14px;
    /*margin-bottom: 20px;*/
  }


  .bz-game-kind .box_xinxi .header{
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
  .bz-game-kind .box_xinxi .body_list{
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

  .bz-game-kind .box_xinxi .body_list.img{
    min-height: 50px;
    height: auto;
    line-height: 30px;
  }

  .bz-game-kind .box_xinxi .body_list.img img{
    max-width: 100px;
    max-height: 100px;
    width: auto;
    height: auto;
    margin: 10px;
    cursor: pointer;
    line-height: 1px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
  }

  .bz-game-kind .box_xinxi .body_list.img .title{
    padding-top: 10px;
  }
  .bz-game-kind .box_xinxi .body_list .title{
    width: 150px;
    float: left;
    padding-right: 30px;
    color: #a6a6a6;
    box-sizing: border-box;
    text-align: right;
  }

  .bz-game-kind .box_xinxi .body_list.dec{
    height: auto;
    /*padding: 5px 10px;*/
  }

  .bz-game-kind  .box_xinxi .body_list .name{
    float: left;
    color: #606266;
  }

  .bz-game-kind  .box_xinxi .body_list .name .dec{
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
  .bz-game-kind-wrap {
    width: 100%;
  }

  .bz-game-kind-wrap {
    width: 100%;
  }

  .bz-game-kind-inner {
    margin: auto;
    padding: 0 20px;
  }

  .bz-game-kind-header {
    margin-bottom: 20px;
  }

  .bz-game-kind-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .bz-game-kind-table {
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
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }

  .avatar{
    width: 148px;
    height: 148px;
    display: block;
  }

</style>
