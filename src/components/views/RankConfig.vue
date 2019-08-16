<template>
  <div class="rank-config-wrap">
    <div class="rank-config-inner">
      <div class="rank-config-header">
        <h3>运营管理/排行榜</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="状态:">
            <el-select  v-model="formInline.status" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排行榜类型:">
            <el-select  v-model="formInline.rankType" placeholder="请选择状态">
              <el-option label="金猪排行榜" value="1"></el-option>
              <el-option label="金币排行榜" value="2"></el-option>
              <el-option label="好友排行榜" value="3"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" v-if="add" plain @click="load()">添加</el-button>
        </el-form>
      </div>
      <div class="rank-config-table">
        <template>
          <el-table :data="tableData" height="578">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="120" prop="rankType" label="排行榜类型">
              <template slot-scope="scope">
                <span v-if="scope.row.rankType==1">金猪排行榜</span>
                <span v-if="scope.row.rankType==2">金币排行榜</span>
                <span v-if="scope.row.rankType==3">好友排行榜</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" prop="dataLogic" label="数据筛选逻辑">
              <template slot-scope="scope">
                <span v-if="scope.row.dataLogic==1">月榜</span>
                <span v-if="scope.row.dataLogic==2">总榜</span>
              </template>
            </el-table-column>
            <el-table-column width="170"  prop="rangeMin" label="随机范围(min)">
            </el-table-column>
            <el-table-column width="170" prop="rangeMax" label="随机范围(max)">
            </el-table-column>
            <el-table-column  width="170" prop="upNum" label="真实用户上榜数">
            </el-table-column>
            <el-table-column  prop="createTime" width="170" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column  prop="updateTime" width="170" :formatter="dateFormat" label="修改时间">
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
        <el-dialog title="添加排行榜" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                  <el-form-item label="排行榜类型:" :label-width="formLabelWidth" prop="rankType">
                    <el-select :style="styleObject"  v-model="form.rankType" placeholder="">
                      <el-option label="金猪排行榜" value="1"></el-option>
                      <el-option label="金币排行榜" value="2"></el-option>
                      <el-option label="好友排行榜" value="3"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据筛选逻辑:" :label-width="formLabelWidth" prop="dataLogic">
                  <el-select :style="styleObject"  v-model="form.dataLogic" placeholder="">
                    <el-option label="月榜" value="1"></el-option>
                    <el-option label="总榜" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="rangeMin" label="随机范围(min):"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model.number="form.rangeMin" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="rangeMax" label="随机范围(max):"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model.number="form.rangeMax" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="真实用户上榜数:"  prop="upNum" :label-width="formLabelWidth">
                  <el-input :style="styleObject" v-model.number="form.upNum" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:" :label-width="formLabelWidth" prop="status">
                  <el-select :style="styleObject"  v-model="form.status" placeholder="">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="2"></el-option>
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
        <el-dialog title="修改排行榜" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="排行榜类型:" :label-width="formLabelWidth" prop="rankType">
                  <el-select :style="styleObject"  v-model="formtwo.rankType" placeholder="">
                    <el-option label="金猪排行榜" :value="1"></el-option>
                    <el-option label="金币排行榜" :value="2"></el-option>
                    <el-option label="好友排行榜" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据筛选逻辑:" :label-width="formLabelWidth" prop="dataLogic">
                  <el-select :style="styleObject"  v-model="formtwo.dataLogic" placeholder="">
                    <el-option label="月榜" :value="1"></el-option>
                    <el-option label="总榜" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="rangeMin" label="随机范围(min):"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model.number="formtwo.rangeMin" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="rangeMax" label="随机范围(max):"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  v-model.number="formtwo.rangeMax" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="真实用户上榜数:"  prop="upNum" :label-width="formLabelWidth">
                  <el-input :style="styleObject" v-model.number="formtwo.upNum" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:" :label-width="formLabelWidth" prop="status">
                  <el-select :style="styleObject"  v-model="formtwo.status" placeholder="">
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
        <el-dialog title="排行榜详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <div class="box_xinxi">
              <div class="wrap_da">
                <div class="header">
                  <span>详情信息</span>
                  <span></span>
                </div>
                <div class="body_list">
                  <div class="title">排行榜类型:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.rankType==1">金猪排行榜</span>
                    <span  v-if="formtwoInfo.rankType==2">金币排行榜</span>
                    <span  v-if="formtwoInfo.rankType==3">好友排行榜</span>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">数据筛选逻辑:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.dataLogic==1">月榜</span>
                    <span  v-if="formtwoInfo.dataLogic==2">总榜</span>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">随机范围(min):</div>
                  <div class="name">
                    {{formtwoInfo.rangeMin}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">随机范围(max):</div>
                  <div class="name">
                    {{formtwoInfo.rangeMax}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">真实用户上榜数:</div>
                  <div class="name">{{formtwoInfo.upNum}}</div>
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
                <div class="body_list" >
                  <div class="title">修改时间:</div>
                  <div class="name">{{formtwoInfo.updateTime | datetime}}</div>
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
    name: 'RankConfig',
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
        rules: {
          status: [
            {required: true, message: '请选择状态', trigger: 'change' }
          ],
          dataLogic: [
            {required: true, message: '请选择数据筛选逻辑', trigger: 'change' }
          ],
          rankType: [
            {required: true, message: '请选择排行榜类型', trigger: 'change' }
          ],
          rangeMin: [
            { required: true, message: '请输入随机范围(min)', trigger: 'blur' },
            { type: 'number', message: '请输入数字值'}
          ],
          rangeMax: [
            { required: true, message: '请输入随机范围(max)', trigger: 'blur' },
            { type: 'number', message: '请输入数字值'}
          ],
          upNum: [
            { required: true, message: '真实用户上榜数', trigger: 'blur' },
            { type: 'number', message: '请输入数字值'}
          ],
        },
        styleObject:{
          width:'200px'
        }
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
          rankType:this.formInline.rankType,
          status:this.formInline.status
        }
        this.$fetch('/api/rankConfig/list', parameterData).then(res => {
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
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/api/rankConfig/add', this.form).then(res => {
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
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/api/rankConfig/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/api/rankConfig/queryOne', {
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
        this.$fetch('/api/rankConfig/remove', parameterData).then(res => {
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
          this.$put('/api/rankConfig/modify', this.formtwo).then(res => {
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

  .red{
    color: #ff4d51;
  }
  .green{
    color: #13ce66;
  }

  .yellow{
    color: #E6A23C;
  }


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
  .rank-config .box_xinxi .body_list{
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

  .rank-config .box_xinxi .body_list.img{
    min-height: 50px;
    height: auto;
    line-height: 30px;
  }

  .rank-config .box_xinxi .body_list.img img{
    max-width: 100px;
    max-height: 100px;
    width: auto;
    height: auto;
    margin: 10px;
    cursor: pointer;
    line-height: 1px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
  }

  .rank-config .box_xinxi .body_list.img .title{
    padding-top: 10px;
  }
  .rank-config .box_xinxi .body_list .title{
    width: 150px;
    float: left;
    padding-right: 30px;
    color: #a6a6a6;
    box-sizing: border-box;
    text-align: right;
  }

  .rank-config .box_xinxi .body_list.dec{
    height: auto;
    /*padding: 5px 10px;*/
  }

  .rank-config .box_xinxi .body_list .name{
    float: left;
    color: #606266;
  }

  .rank-config .box_xinxi .body_list .name .dec{
    font-size: 14px;
    line-height: 30px;
    width: 500px;
    float: left;
    padding: 10px;
  }



</style>
