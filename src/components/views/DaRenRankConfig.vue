<template>
  <div class="da-ren-rank-config-wrap">
    <div class="da-ren-rank-config-inner">
      <div class="da-ren-rank-config-header">
        <h3>达人管理/奖金池配置</h3>
        <hr />
      </div>
      <div style="margin-bottom: 20px">
        <el-row>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-row>

      </div>
      <div class="da-ren-rank-config-table">
        <template>
          <el-table :data="tableData" max-height="551">
            <el-table-column label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column  prop="darenLevel"  label="奖励等级">
            </el-table-column>
            <el-table-column prop="needNum" label="人数要求">
              <template slot-scope="scope">
                <span>{{scope.row.needNum | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="reward" label="奖池金币">
              <template slot-scope="scope">
                <span>{{scope.row.reward | currencyNum}}</span>
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
        <el-dialog title="添加配置" :visible.sync="dialogFormVisible" width="700px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="奖励等级" :label-width="formLabelWidth" prop="darenLevel">
                  <el-input :style="styleObject" v-model="form.darenLevel" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="人数要求" :label-width="formLabelWidth" prop="needNum">
                  <el-input :style="styleObject" v-model="form.needNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="奖池金币" :label-width="formLabelWidth" prop="reward">
                  <el-input :style="styleObject" v-model="form.reward" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit"  @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改配置" :visible.sync="dialogTableVisible" width="700px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="24">
                <el-form-item label="奖励等级" :label-width="formLabelWidth" prop="darenLevel">
                  <el-input :style="styleObject" v-model="formtwo.darenLevel" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="人数要求" :label-width="formLabelWidth" prop="needNum">
                  <el-input :style="styleObject" v-model="formtwo.needNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="奖池金币" :label-width="formLabelWidth" prop="reward">
                  <el-input :style="styleObject" v-model="formtwo.reward" auto-complete="off"  clearable>
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
        form: {},
        rules: {
          darenLevel: [{required: true, message: '请输入奖励等级', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          needNum: [{required: true, message: '请输入人数要求', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          reward: [{required: true, message: '请输入奖池金币', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        styleObject:{
          width:'350px'
        },
        isSubmit:false
      }
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currencyNum: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
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
          pageSize: this.pageSize
        }
        this.$fetch('/api/rankDarenConfig/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
          } else {
            this.$message({type: 'error', message: res.message, duration: 3000})
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
            this.$post('/api/rankDarenConfig/add', this.form).then(res => {
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
          id: id
        }
        this.$fetch('/api/rankDarenConfig/delete', parameterData).then(res => {
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
        this.$fetch('/api/rankDarenConfig/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data
          }
        })
      },
      update(formtwo) {
        this.$refs[formtwo].validate(valid => {
          if(valid) {
            this.$put('/api/rankDarenConfig/update', this.formtwo).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.dialogTableVisible = false;
                this.accountList();
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

  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }

  .da-ren-rank-config-wrap {
    width: 100%;
  }

  .da-ren-rank-config-inner {
    margin: auto;
    padding: 0 20px;
  }

  .da-ren-rank-config-header {
    margin-bottom: 20px;
  }

  .da-ren-rank-config-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .da-ren-rank-config-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
