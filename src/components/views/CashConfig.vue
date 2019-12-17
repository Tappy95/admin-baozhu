<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/提现规则</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item :label-width="labelWidth"  label="是否完成任务:" >
            <el-select v-model="formInline.isTask"  placeholder="请选择状态">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column prop="price" label="提现金额(￥)">
            </el-table-column>
            <el-table-column prop="orders" label="排序">
            </el-table-column>
            <el-table-column min-width="120" prop="isTask"  label="是否完成任务">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.isTask==1">是</span>
                <span class="red" v-if="scope.row.isTask==2">否</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" prop="webType"  label="平台类型">
              <template slot-scope="scope">
                <span v-if="scope.row.webType==1">app</span>
                <span v-if="scope.row.webType==3">心愿猪app</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加提现规则" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="提现金额" :label-width="formLabelWidth" prop="price">
              <el-input v-model="form.price" auto-complete="off" style="width: 300px" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="排序" prop="orders" :label-width="formLabelWidth">
              <el-input v-model="form.orders" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否完成任务:" prop="isTask" :label-width="formLabelWidth">
              <el-select :style="styleObject" v-model="form.isTask" placeholder="">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台类型:" prop="webType" :label-width="formLabelWidth">
              <el-select :style="styleObject" v-model="form.webType" placeholder="">
                <el-option label="app" value="1"></el-option>
                <el-option label="心愿猪app" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改提现规则" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-form-item label="提现金额" prop="price" :label-width="formLabelWidth">
              <el-input v-model="formtwo.price" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="orders" :label-width="formLabelWidth">
              <el-input v-model="formtwo.orders" auto-complete="off" style="width: 300px" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否完成任务:" prop="isTask" :label-width="formLabelWidth">
              <el-select :style="styleObject" v-model="formtwo.isTask" placeholder="">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台类型:" prop="webType" :label-width="formLabelWidth">
              <el-select :style="styleObject" v-model="formtwo.webType" placeholder="">
                <el-option label="app" :value="1"></el-option>
                <el-option label="心愿猪app" :value="3"></el-option>
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
    name: 'CashConfig',
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
        rules: {
          price: [{required: true, message: '请输入提现金额', trigger: 'blur'},
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
          isTask: [{
            required: true,
            message: '请选择是否需要完成任务',
            trigger: 'change'
          }],
          webType: [{
            required: true,
            message: '请选择平台类型',
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
        styleObject:{
          width:'200px'
        }
      }
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
          isTask: this.formInline.isTask
        }
        this.$fetch('/api/cashPriceConfig/list', parameterData).then(res => {
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
        this.isSubmit=false;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
        if(valid) {
          this.$nextTick(function () {
            this.isSubmit=true;
          })
          this.$post('/api/cashPriceConfig/add', this.form).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
            this.dialogFormVisible = false;
            this.$message({type: 'success', message: '添加成功！'});
            this.accountList();
          } else {
            this.$message({type: 'error', message: res.message});
              this.isSubmit = false;
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
        this.$fetch('/api/cashPriceConfig/remove', parameterData).then(res => {
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
        this.$fetch('/api/cashPriceConfig/queryOne', {
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
            this.$put('/api/cashPriceConfig/modify', this.formtwo).then(res => {
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
