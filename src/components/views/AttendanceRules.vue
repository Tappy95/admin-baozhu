<template>
  <div class="attendance-rules-wrap">
    <div class="attendance-rules-inner">
      <div class="attendance-rules-header">
        <h3>每日红包/每日红包规则</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="规则名称">
            <el-input v-model="formInline.ruleName" placeholder="请输入规则名称" clearable></el-input>
          </el-form-item>
          <el-button class="mytest" type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="attendance-rules-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column prop="ruleName" label="规则名称">
            </el-table-column>
            <el-table-column prop="stickTime" label="连续签到天数">
            </el-table-column>
            <el-table-column prop="score" label="奖励金币">
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.ruleId)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.ruleId)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加规则" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="规则名称" :label-width="formLabelWidth" prop="ruleName">
              <el-input v-model="form.ruleName" auto-complete="off" style="width: 300px" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="连续签到天数" prop="stickTime" :label-width="formLabelWidth">
              <el-input  v-model="form.stickTime" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>

            <el-form-item label="奖励金币" prop="score" :label-width="formLabelWidth">
              <el-input  v-model="form.score" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改签到规则" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-form-item label="规则名称" :label-width="formLabelWidth">
              <el-input v-model="formtwo.ruleName" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>

            <el-form-item label="连续签到天数" :label-width="formLabelWidth">
              <el-input  v-model="formtwo.stickTime" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>

            <el-form-item label="奖励金币" :label-width="formLabelWidth">
              <el-input  v-model="formtwo.score" auto-complete="off" style="width: 300px" clearable></el-input>
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
  export default {
    name: 'AttendanceRules',
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
        form: {},
        rules: {
          ruleName: [{
            required: true,
            message: '请输入规则名',
            trigger: 'blur'
          }],
          stickTime: [{required: true, message: '请输入连续签到天数', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
          score: [{required: true, message: '请输入奖励金币', trigger: 'change'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}]
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isSubmit:false,
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
    },
    mounted(){
      // $(".el-table__fixed-right").css({"right":"7px"});
      //
      // $(".el-table__fixed-right").css({"position":"fixed"});
      // position: absolute
      // $(".mytest").hide();
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
          ruleName: this.formInline.ruleName
        }
        this.$fetch('/api/mSignRule/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.tableData = res.data.list;
          this.totalCount = res.data.total;

            // $(".mytest").hide();
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
        this.isSubmit = false;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
        if(valid) {
          this.$nextTick(function () {
            this.isSubmit=true;
          })
          this.$post('/api/mSignRule/add', this.form).then(res => {
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
          ruleId: id
        }
        this.$fetch('/api/mSignRule/delete', parameterData).then(res => {
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
        this.$fetch('/api/mSignRule/info', {
          ruleId: id
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
        this.$put('/api/mSignRule/update', this.formtwo).then(res => {
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

  .attendance-rules-wrap {
    width: 100%;
  }

  .attendance-rules-inner {
    margin: auto;
    padding: 0 20px;
  }

  .attendance-rules-header {
    margin-bottom: 20px;
  }

  .attendance-rules-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .attendance-rules-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
