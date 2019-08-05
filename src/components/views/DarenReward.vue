<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/达人奖励</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item :label-width="labelWidth"  label="是否完成任务:" >
            <el-select v-model="formInline.rewardType"  placeholder="请选择状态">
              <el-option label="首个任务" value="1"></el-option>
              <el-option label="后续任务" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="528">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>

            <el-table-column min-width="120" prop="rewardType"  label="奖励类型">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.rewardType==1">首个任务</span>
                <span class="green" v-if="scope.row.rewardType==2">后续任务</span>
              </template>
            </el-table-column>

            <el-table-column prop="rewardName" label="奖励名称">
            </el-table-column>

            <el-table-column prop="coin" label="奖励金币数">
            </el-table-column>

            <el-table-column prop="orders" label="排序">
            </el-table-column>

            <el-table-column min-width="120" prop="state"  label="状态">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.state==1">启用</span>
                <span class="green" v-if="scope.row.state==2">禁用</span>
                <span class="green" v-if="scope.row.state==3">已删除</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del && scope.row.state!=3">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加达人奖励" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="奖励类型:" prop="rewardType" :label-width="formLabelWidth">
              <el-select :style="styleObject" v-model="form.rewardType" placeholder="">
                <el-option label="首个任务" :value="1"></el-option>
                <el-option label="后续任务" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="奖励名称" :label-width="formLabelWidth" prop="rewardName">
              <el-input v-model="form.rewardName" auto-complete="off" style="width: 300px" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="奖励金币数" prop="coin" :label-width="formLabelWidth">
              <el-input v-model="form.coin" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="orders" :label-width="formLabelWidth">
              <el-input v-model="form.orders" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>

            <el-form-item label="状态:" prop="state" :label-width="formLabelWidth">
              <el-select :style="styleObject" v-model="form.state" placeholder="">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改提现规则" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-form-item label="奖励类型:" prop="rewardType" :label-width="formLabelWidth">
              <el-select :style="styleObject" v-model="formtwo.rewardType" placeholder="">
                <el-option label="首个任务" :value="1"></el-option>
                <el-option label="后续任务" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="奖励名称" :label-width="formLabelWidth" prop="rewardName">
              <el-input v-model="formtwo.rewardName" auto-complete="off" style="width: 300px" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="奖励金币数" prop="coin" :label-width="formLabelWidth">
              <el-input v-model="formtwo.coin" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="orders" :label-width="formLabelWidth">
              <el-input v-model="formtwo.orders" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>

            <el-form-item label="状态:" prop="state" :label-width="formLabelWidth">
              <el-select :style="styleObject" v-model="formtwo.state" placeholder="">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update('formtwo')">确 定</el-button>
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
  export default {
    name: 'DarenReward',
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
        form: {
          price: '',
          orders: '',
          isTask: '2'
        },
        roles: {
          id: '',
          realname: ''
        },
        rules: {
          rewardType: [{
            required: true,
            message: '请选择奖励类型',
            trigger: 'change'
          }],
          rewardName: [{
            required: true,
            message: '请输入奖励名称',
            trigger: 'blur'
          }],
          coin: [{required: true, message: '请输入提现金额', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
              var pattern = /^[0-9]*$/;
              if (!pattern.test(value)) {
                callback(new Error("请输入正整数"));
              }else{
                callback();
              }
            }, trigger:'blur'}
          ],
         orders: [{required: true, message: '请输入排序值', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
              var pattern = /^[0-9]*$/;
              if (!pattern.test(value)) {
                callback(new Error("请输入正整数"));
              }else{
                callback();
              }
            }, trigger:'blur'}
          ],
      state: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
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
              this.optionW = '160px'
            }
          }
        } else {
        }
      })
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          rewardType: this.formInline.rewardType
        }
        this.$fetch('/api/darenReward/list', parameterData).then(res => {
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
          this.$post('/api/darenReward/add', this.form).then(res => {
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
        this.$fetch('/api/darenReward/delete', parameterData).then(res => {
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
        this.$fetch('/api/darenReward/queryOne', {
          id: id
        }).then(res => {
        if(res.data != null ){
          if (res.data.staffType == '2') {
            this.isShow = false
          } else {
            this.isShow = true
          }
          this.formtwo = res.data
        }
      })
      },
      update(formtwo) {
        this.$refs[formtwo].validate(valid => {
          if(valid) {
            this.$put('/api/darenReward/update', this.formtwo).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.dialogTableVisible = false
              this.accountList()
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
