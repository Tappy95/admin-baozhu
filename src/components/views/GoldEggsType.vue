<template>
  <div class="gold-eggs-type-wrap">
    <div class="gold-eggs-type-inner">
      <div class="gold-eggs-type-header">
        <h3>砸金蛋/金蛋类型</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item >
            <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="gold-eggs-type-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" fixed="left" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column prop="name" min-width="150"  fixed="left" label="名称">
            </el-table-column>
            <el-table-column fixed="left" width="170" prop="pigCoin" label="消耗金猪数">
              <template slot-scope="scope">
                  {{scope.row.pigCoin | currenNum}}
              </template>
            </el-table-column>
            <el-table-column  min-width="200" prop="servicePigCoin"  label="手续费">
            </el-table-column>
            <el-table-column min-width="200"  prop="cardSign"  label="卡号标记">
            </el-table-column>
            <el-table-column width="120" prop="orders" label="排序">
            </el-table-column>
            <el-table-column width="170" prop="creatorTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="消耗金猪" :label-width="formLabelWidth" prop="pigCoin">
                  <el-input v-model="form.pigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="手续费" :label-width="formLabelWidth" prop="servicePigCoin">
                  <el-input v-model="form.servicePigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="卡号标记" :label-width="formLabelWidth" prop="cardSign">
                  <el-input v-model="form.cardSign" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="排序" :label-width="formLabelWidth" prop="orders">
                  <el-input  v-model="form.orders" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo" ref="formtwo" :rules="rules">
            <el-row>
              <el-col :span="22">
                <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="formtwo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="消耗金猪" :label-width="formLabelWidth" prop="pigCoin">
                  <el-input v-model="formtwo.pigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="手续费" :label-width="formLabelWidth" prop="servicePigCoin">
                  <el-input v-model="formtwo.servicePigCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="卡号标记" :label-width="formLabelWidth" prop="cardSign">
                  <el-input v-model="formtwo.cardSign" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="排序" :label-width="formLabelWidth" prop="orders">
                  <el-input  v-model="formtwo.orders" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update('formtwo')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  export default {
    name: 'GoldEggsType',
    data() {
      return {
        powerTrue:false,
        optionW:'1',
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
        imageUrl:'',
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
          pigCoin: [{required: true, message: '请输入消耗金猪', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          orders: [{required: true, message: '请输入排序', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          cardSign: [{required: true, message: '请输入卡号标记', trigger: 'blur'},],
          servicePigCoin: [{required: true, message: '请输入手续费', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
        },
        formLabelWidth: '120px',
        formInline: {},
        tableData: [],
        uploadData:{},
        selectTime: [],
        showImg:false,
        isSubmit:false,
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
    },
    filters: {
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
      currenNum: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
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
                this.optionW = '75'
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '75'
              }
              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '150'
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
        this.$fetch('/api/goldEggType/list').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
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
        this.imageUrl = "";
        this.selectTime=[];
        this.isSubmit=false;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/goldEggType/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false;
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.accountList();
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
        this.$fetch('/api/goldEggType/delete', parameterData).then(res => {
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
        this.$fetch('/api/goldEggType/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
          }
        })
      },
      update(formtwo) {
        this.$refs[formtwo].validate(valid => {
          if (valid) {
            this.$put('/api/goldEggType/update', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.dialogTableVisible = false
            this.accountList()
          }else {
            this.$message({
              type: 'danger',
              message: res.message
            })
          }
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
  .yichu{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
  .gold-eggs-type-wrap {
    width: 100%;
  }

  .gold-eggs-type-inner {
    margin: auto;
    padding: 0 20px;
  }

  .gold-eggs-type-header {
    margin-bottom: 20px;
  }

  .gold-eggs-type-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .gold-eggs-type-table {
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

  .img_loadBox{
    width: 148px;
    height: 148px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

  }

  .avatar {
    max-width: 148px;
    max-height: 148px;
    display: block;
  }
  .form {
    /*overflow-y: scroll;*/
    /*height: auto;*/
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
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>
