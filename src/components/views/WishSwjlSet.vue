<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>心愿猪/试玩奖品概率设置</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="奖品类型:" >
            <el-select v-model="formInline.rewardType"  placeholder="请选择状态" clearable>
              <el-option label="现金" value="1"></el-option>
              <el-option label="分红心" value="2"></el-option>
            </el-select>
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
            <el-table-column prop="rewardType" label="奖品类型">
            </el-table-column>
            <el-table-column prop="rewardNum" label="奖励数量">
            </el-table-column>
            <el-table-column prop="rate" label="概率">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat">
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

            <el-form-item label="奖品类型" :label-width="formLabelWidth" prop="rewardType">
              <el-select v-model="form.rewardType" placeholder="">
                <el-option label="现金" value="1"></el-option>
                <el-option label="分红心" value="2"></el-option>
              </el-select>
            </el-form-item>
            <div>
              <p style="margin:-20px auto 2px 120px;color:red;font-size:12px;">如奖品类型为现金，则奖励数量请兑换成金币数</p>
            </div>

            <el-form-item label="奖励数量" :label-width="formLabelWidth" prop="rewardNum">
              <el-input v-model="form.rewardNum" auto-complete="off" style="width: 340px" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="概率" :label-width="formLabelWidth" prop="rate">
              <el-input v-model="form.rate" auto-complete="off" style="width: 340px" clearable>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogTableVisible" width="600px">
          
          <el-form :model="formtwo">
            <el-form-item label="奖品类型:" prop="rewardType" :label-width="formLabelWidth">
              <el-select  v-model="formtwo.rewardType" placeholder="">
                <el-option label="现金" :value="1"></el-option>
                <el-option label="分红心" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <div>
              <p style="margin:-20px auto 2px 120px;color:red;font-size:12px;">如奖品类型为现金，则奖励数量请兑换成金币数</p>
            </div>
            <el-form-item label="奖励数量" :label-width="formLabelWidth" prop="rewardNum">
              <el-input v-model="formtwo.rewardNum" auto-complete="off" style="width: 340px" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="概率" :label-width="formLabelWidth" prop="rate">
              <el-input v-model="formtwo.rate" auto-complete="off" style="width: 340px" clearable>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
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
    name: 'ResourceType',
    data() {
      return {
        powerTrue:false,
        optionW:'',
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
          noticeTitle: '',
          noticeContent: '',
          password: '',
          isRelease: '1'
        },
        roles: {
          id: '',
          realname: ''
        },
        rules: {
          rewardType: [{
            required: true,
            message: '请选择奖品类型',
            trigger: 'change'
          }],
          rewardNum: [{
            required: true,
            message: '请输入奖励数量',
            trigger: 'blur'
          }],
          rate: [{
            required: true,
            message: '请输入概率',
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
                this.optionW = '75px'
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '75px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '150px'
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
          rewardType: this.formInline.rewardType
        }
        this.$fetch('/wish/gameRewardRate/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            for(var i =0;i<res.data.list.length;i++){
              if(res.data.list[i].rewardType==1){
                res.data.list[i].rewardType = '现金';
              }else{
                res.data.list[i].rewardType = '分红心';
              }
            }
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
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/wish/gameRewardRate/add', this.form).then(res => {
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
        this.$post('/wish/gameRewardRate/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.formInline = {};
            this.accountList();
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
        this.$fetch('/wish/gameRewardRate/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        this.$put('/wish/gameRewardRate/modify', this.formtwo).then(res => {
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
        this.$fetch('/api/appNotice/info', {
          id: id
        }).then(res => {
          if(res.data != null ){
            if (res.data.staffType == '2') {
              this.isShow = false
            } else {
              this.isShow = true
            }          res.data.createrTime =  formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss')

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
