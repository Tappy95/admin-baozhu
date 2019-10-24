<template>
  <div class="rank-config-wrap">
    <div class="rank-config-inner">
      <div class="rank-config-header">
        <h3>运营管理/排行榜奖励配置</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="奖励类型:">
            <el-select  v-model="formInline.rewardType" placeholder="请选择状态">
              <el-option label="金币" value="1"></el-option>
              <el-option label="金猪" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属排行名称:" :label-width="formLabelWidth" prop="configId">
            <el-select :style="styleObject"  v-model="formInline.configId" placeholder="">
              <el-option v-for="(item,index) in rankNameList" :key="item" :label="item.rankName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="success" v-if="add" plain @click="load()">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="rank-config-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column width="170" prop="rankName" label="所属排行名称">
            </el-table-column>
            <!--<el-table-column width="170"  prop="configId" label="排行配置id">-->
            <!--</el-table-column>-->
            <el-table-column min-width="120" prop="rewardType" label="奖励类型">
              <template slot-scope="scope">
                <span v-if="scope.row.rewardType==1">金币</span>
                <span v-if="scope.row.rewardType==2">金猪</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" prop="rewardAmount" label="奖励金额">
            </el-table-column>
            <el-table-column width="170"  prop="rewardOrder" label="奖励排行">
            </el-table-column>
            <el-table-column width="170" prop="rewardRemark" label="奖励排行描述">
            </el-table-column>
            <el-table-column  width="170" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column width="120" prop="status" label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">已启用</span>
                <span class="red" v-if="scope.row.status==2">已停用</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="showT" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属排行名称:" :label-width="formLabelWidth" prop="configId">
                  <el-select :style="styleObject"  v-model="form.configId" placeholder="">
                    <el-option v-for="(item,index) in rankNameList" :key="item" :label="item.rankName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励类型:" :label-width="formLabelWidth" prop="rewardType">
                  <el-select :style="styleObject"  v-model="form.rewardType" placeholder="">
                    <el-option label="金币" value="1"></el-option>
                    <el-option label="金猪" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="rewardAmount" label="奖励金额:"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="form.rewardAmount" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="rewardOrder" label="奖励排行"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="form.rewardOrder" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="状态:" :label-width="formLabelWidth" prop="status">
                  <el-select :style="styleObject"  v-model="form.status" placeholder="">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item  prop="rewardRemark" label="奖励排行描述" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.rewardRemark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属排行名称:" :label-width="formLabelWidth" prop="configId">
                  <el-select :style="styleObject"  v-model="formtwo.configId" placeholder="">
                    <el-option v-for="(item,index) in rankNameList" :key="item" :label="item.rankName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--<el-col :span="12">-->
                <!--<el-form-item prop="configId" label="排行配置id:"  :label-width="formLabelWidth">-->
                  <!--<el-input :style="styleObject" v-model="formtwo.configId" auto-complete="off" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="12">
                <el-form-item label="奖励类型:" :label-width="formLabelWidth" prop="rewardType">
                  <el-select :style="styleObject"  v-model="formtwo.rewardType" placeholder="">
                    <el-option label="金币" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="rewardAmount" label="奖励金额:"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="formtwo.rewardAmount" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="rewardOrder" label="奖励排行"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model="formtwo.rewardOrder" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="状态:" :label-width="formLabelWidth" prop="status">
                  <el-select :style="styleObject"  v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item  prop="rewardRemark" label="奖励排行描述" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.rewardRemark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update('formtwo')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <div class="box_xinxi">
              <div class="wrap_da">
                <div class="header">
                  <span>详情信息</span>
                  <span></span>
                </div>
                <div class="body_list" style="width: 100%">
                  <div class="title">所属排行名称:</div>
                  <div class="name">
                    <el-select :style="styleObject"  :disabled="true" v-model="formtwoInfo.configId" placeholder="">
                      <el-option v-for="(item,index) in rankNameList" :key="item" :label="item.rankName" :value="item.id"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">奖励类型:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.rewardType==1">金币</span>
                    <span  v-if="formtwoInfo.rewardType==2">金猪</span>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">奖励金额:</div>
                  <div class="name">
                     {{formtwoInfo.rewardAmount}}
                  </div>
                </div>
                <div class="body_list" style="width: 100%">
                  <div class="title">奖励排行:</div>
                  <div class="name">
                    {{formtwoInfo.rewardOrder}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">状态:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.status==1">已启用</span>
                    <span  v-if="formtwoInfo.status==2">已停用</span>
                  </div>
                </div>
                <div class="body_list" >
                  <div class="title">创建时间:</div>
                  <div class="name">{{formtwoInfo.createTime | datetime}}</div>
                </div>
                <div class="body_list dec">
                  <div class="title">奖励排行描述:</div>
                  <div class="name" style="width: 560px" >
                    {{formtwoInfo.rewardRemark}}
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
    name: 'RankRewardConfig',
    data() {
      return {
        powerTrue:false,
        optionW:'75',
        menuId:'',
        upd:false,
        showT:false,
        add:false,
        del:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {},
        formLabelWidth: '140px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        rankNameList:[],
        rules: {
          configId: [
            { required: true, message: '请输入排行配置id', trigger: 'blur' },
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum1.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          rewardType: [
            {required: true, message: '请选择奖励类型', trigger: 'change' }
          ],
          rewardAmount: [
            { required: true, message: '请输入奖励金额', trigger: 'blur' },
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum1.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          rewardOrder: [
            { required: true, message: '请输入奖励排行', trigger: 'blur' },
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum1.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          status: [{required: true, message: '请选择状态', trigger: 'change' }],
          rewardRemark: [{ required: true, message: '请输入奖励排行描述', trigger: 'blur' }],
          rankName: [{ required: true, message: '请选择所属排行名称', trigger: 'change' }],
        },
        styleObject:{
          width:'200px'
        },
        isSubmit:false,
      }
    },
    filters: {
      datetime: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      this.getName();
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
                this.add=true;
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.optionW = '150'
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
                this.showT=true;
                this.optionW = '150'
              }
              if (this.del && this.upd) {
                this.optionW = '220'
              }else {
                this.showT= false
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
          rewardType:this.formInline.rewardType,
          configId:this.formInline.configId
        }
        this.$fetch('/api/rankConfigReward/list', parameterData).then(res => {
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
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
        this.isSubmit=false;
        this.getName();
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/rankConfigReward/add', this.form).then(res => {
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
      getInfo(id) {
        this.getName();
        this.dialogTableVisible = true;
        this.$fetch('/api/rankConfigReward/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })

      },
      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/api/rankConfigReward/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwoInfo = res.data
          }
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
        this.$fetch('/api/rankConfigReward/remove', parameterData).then(res => {
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
      update(formtwo) {
        this.$refs[formtwo].validate(valid => {
          if (valid) {
            this.$put('/api/rankConfigReward/modify', this.formtwo).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.dialogTableVisible = false
                this.accountList()
              }else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
          }
        })
      },


      //名称
      getName(){
        this.$fetch('/api/rankConfig/querySelect').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.rankNameList = res.data;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.accountList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.accountList();
      },
    },
  }
</script>
<style type="text/css">
  .rank-config-wrap {
    width: 100%;
  }

  .rank-config-inner {
    margin: auto;
    padding: 0 20px;
  }

  .rank-config-header {
    margin-bottom: 20px;
  }

  .rank-config-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .rank-config-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }


  .rank-config .box_xinxi{
    background-color: #fff;
    border-radius: 4px;
    /*box-shadow: 0 1px 7px rgba(150,150,150,0.3);*/
    padding: 10px;
    box-sizing: border-box;
  }

  .rank-config .box_xinxi .title{
    color: #353535;
    font-size: 14px;
    /*margin-bottom: 20px;*/
  }


  .rank-config .box_xinxi .header{
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
  /*.rank-config .box_xinxi .body_list{*/
    /*width: 50%;*/
    /*height: auto;*/
    /*height: 50px;*/
    /*color: #353535;*/
    /*line-height: 50px;*/
    /*box-sizing: border-box;*/
    /*border-bottom: 1px solid #e7e7eb;*/
    /*display: inline-block;*/
  /*}*/

  /*.rank-config .box_xinxi .body_list.img{*/
    /*min-height: 50px;*/
    /*height: auto;*/
    /*line-height: 30px;*/
  /*}*/

  /*.rank-config .box_xinxi .body_list.img img{*/
    /*max-width: 100px;*/
    /*max-height: 100px;*/
    /*width: auto;*/
    /*height: auto;*/
    /*margin: 10px;*/
    /*cursor: pointer;*/
    /*line-height: 1px;*/
    /*box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)*/
  /*}*/

  /*.rank-config .box_xinxi .body_list.img .title{*/
    /*padding-top: 10px;*/
  /*}*/
  /*.rank-config .box_xinxi .body_list .title{*/
    /*width: 150px;*/
    /*float: left;*/
    /*padding-right: 30px;*/
    /*color: #a6a6a6;*/
    /*box-sizing: border-box;*/
    /*text-align: right;*/
  /*}*/

  /*.rank-config .box_xinxi .body_list.dec{*/
    /*height: auto;*/
    /*!*padding: 5px 10px;*!*/
  /*}*/

  /*.rank-config .box_xinxi .body_list .name{*/
    /*float: left;*/
    /*color: #606266;*/
  /*}*/

  /*.rank-config .box_xinxi .body_list .name .dec{*/
    /*font-size: 14px;*/
    /*line-height: 30px;*/
    /*width: 500px;*/
    /*float: left;*/
    /*padding: 10px;*/
  /*}*/



</style>
