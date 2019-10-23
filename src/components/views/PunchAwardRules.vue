<template>
  <div class="punch-award-wrap">
    <div class="punch-award-inner">
      <div class="punch-award-header">
        <h3>早起打卡/奖励规则</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="punch-award-table">
        <template>
          <el-table :data="tableData" max-height="600">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column  min-width="200px" prop="minNumber" label="参与打卡最小人数">
            </el-table-column>
            <el-table-column prop="maxNumber" min-width="200px" label="参与打卡最多人数">
            </el-table-column>
            <el-table-column  min-width="150px" prop="minReward" label="最小奖励(金币)">
              <template slot-scope="scope">{{scope.row.minReward | currency}}</template>
            </el-table-column>
            <el-table-column prop="maxReward" min-width="150px" label="最大奖励(金币)">
              <template slot-scope="scope">{{scope.row.maxReward | currency}}</template>
            </el-table-column>
            <el-table-column prop="rewardRatio" min-width="120px" label="奖励比例(%)">
            </el-table-column>
            <el-table-column prop="extraReward" min-width="120px" label="额外奖励(金币)">
              <template slot-scope="scope">{{scope.row.extraReward | currency}}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button  type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="650px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="24">
                <el-form-item  label="参与打卡最少人数:"  :label-width="formLabelWidth" prop="minNumber">
                  <el-input   v-model="form.minNumber" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="参与打卡最多人数:"  :label-width="formLabelWidth" prop="maxNumber">
                  <el-input   v-model="form.maxNumber" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item  label="最小奖励(金币):"  :label-width="formLabelWidth" prop="minReward">
                  <el-input   v-model="form.minReward" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="最大奖励(金币):"  :label-width="formLabelWidth" prop="maxReward">
                  <el-input   v-model="form.maxReward" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="14">
                <el-form-item  label="奖励比例(%):"  :label-width="formLabelWidth" prop="rewardRatio">
                  <el-input   v-model="form.rewardRatio" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item  label="额外奖励(金币):"  :label-width="formLabelWidth" prop="extraReward">
                  <el-input   v-model="form.extraReward" auto-complete="off"  clearable>
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
        <el-dialog title="修改" :visible.sync="dialogTableVisible" width="650px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="24">
                <el-form-item  label="参与打卡最少人数:"  :label-width="formLabelWidth" prop="minNumber">
                  <el-input   v-model="formtwo.minNumber" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="参与打卡最多人数:"  :label-width="formLabelWidth" prop="maxNumber">
                  <el-input   v-model="formtwo.maxNumber" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="最小奖励(金币):"  :label-width="formLabelWidth" prop="minReward">
                  <el-input   v-model="formtwo.minReward" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="最大奖励(金币):"  :label-width="formLabelWidth" prop="maxReward">
                  <el-input   v-model="formtwo.maxReward" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item  label="奖励比例(%):"  :label-width="formLabelWidth" prop="rewardRatio">
                  <el-input   v-model="formtwo.rewardRatio" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item  label="额外奖励(金币):"  :label-width="formLabelWidth" prop="extraReward">
                  <el-input   v-model="formtwo.extraReward" auto-complete="off"  clearable>
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
    name: 'PunchAwardRules',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        powerTrue:false,
        optionW:'0',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisibleInfo:false,
        formtwoInfo: {},
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        form: {
          minNumber:'',
          maxNumber:'',
          rewardRatio:'',
          extraReward:'',
          minReward:'',
          maxReward:'',
        },
        rules: {
          minNumber: [{required: true, message: '请输入参与打卡最少人数', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum1.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          maxNumber: [{required: true, message: '请输入参与打卡最多人数', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum1.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],

          rewardRatio: [{required: true, message: '请输入奖励比例', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum2.test(value)) {
                  callback(new Error("请输入正数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          extraReward: [{required: true, message: '请输入额外奖励', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum1.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          minReward: [{required: true, message: '请输入最小奖励', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum1.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          maxReward: [{required: true, message: '请输入最大奖励', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                if (!this.$patternNum1.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],

        },
        formLabelWidth: '160px',
        /* 分页*/
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
    filters: {
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
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
                this.optionW = '160'
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
        this.$fetch('/api/checkinRewardRule/list').then(res => {
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

      load() {
        this.form={};
        this.dialogFormVisible = true;
        this.isSubmit = false;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            if (parseInt(this.form.minNumber) > parseInt(this.form.maxNumber)) {
              this.$message({
                type: 'warning',
                message: '参与打卡最多人数不得小于最少人数！'
              })
              return
            }
            if (parseInt(this.form.minReward) > parseInt(this.form.maxReward)) {
              this.$message({
                type: 'warning',
                message: '最大奖励不得小于最小奖励！'
              })
              return
            }
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.form.pushTime = new Date(this.form.pushTime).getTime();
            this.$post('/api/checkinRewardRule/add', this.form).then(res => {
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
                this.isSubmit=true;
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
        this.$fetch('/api/checkinRewardRule/delete', parameterData).then(res => {
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
      //修改
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/api/checkinRewardRule/info', {
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
            if (parseInt(this.formtwo.minNumber) > parseInt(this.formtwo.maxNumber)) {
              this.$message({
                type: 'warning',
                message: '参与打卡最多人数不得小于最少人数！'
              })
              return
            }
            if (parseInt(this.formtwo.minReward)> parseInt(this.formtwo.maxReward)) {
              this.$message({
                type: 'warning',
                message: '最大奖励不得小于最小奖励！'
              })
              return
            }

            this.$put('/api/checkinRewardRule/update', this.formtwo).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.dialogTableVisible = false;
                this.accountList()
              }else{
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
          }})
      },
    },
  }
</script>
<style type="text/css">

  .punch-award-inner {
    margin: auto;
    padding: 0 20px;
  }

  .punch-award-header {
    margin-bottom: 20px;
  }

  .punch-award-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .punch-award-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
