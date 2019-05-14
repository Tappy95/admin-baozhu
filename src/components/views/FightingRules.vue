<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>答题对战/答题规则</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="类型名称">
            <el-input v-model="formInline.typeName" placeholder="" clearable></el-input>
          </el-form-item>
          <el-button @click="search()">查询</el-button>
          <el-button @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column fixed="left" prop="typeName" label="类型名称">
            </el-table-column>
            <el-table-column prop="isDisable" width="100px" label="是否废弃">
            </el-table-column>
            <el-table-column width="170px" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column width="170px" prop="updateTime" :formatter="dateFormat" label="修改时间">
            </el-table-column>
            <el-table-column width="400px" prop="fightingRule" label="对战规则">
            </el-table-column>
            <el-table-column width="120px" prop="questionNum" label="需完成问题数">
            </el-table-column>
            <el-table-column width="100px" prop="rewardType" label="奖励类型">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button @click="getInfo(scope.row.typeId)" size="mini" v-if="upd">修改</el-button>
                <el-button @click="getOne(scope.row.typeId)" size="mini">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-dialog title="添加答题规则" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型名称" :label-width="formLabelWidth" prop="typeName">
                  <el-input v-model="form.typeName" auto-complete="off" :style="styleObject" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖励类型" :label-width="formLabelWidth" prop="rewardType">
                  <el-select :style="styleObject" v-model="form.rewardType" placeholder="">
                    <el-option label="人民币" value="0"></el-option>
                    <el-option label="金币" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否废弃" :label-width="formLabelWidth" prop="isDisable">
                  <el-select :style="styleObject" v-model="form.isDisable" placeholder="">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="废弃" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="需完成问题数" :label-width="formLabelWidth" prop="questionNum">
                  <el-input :style="styleObject" v-model="form.questionNum" min="0" type="number" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="对战规则" prop="fightingRule" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.fightingRule" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改规则" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型名称" :label-width="formLabelWidth" prop="typeName">
                  <el-input v-model="formtwo.typeName" auto-complete="off" :style="styleObject" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖励类型" :label-width="formLabelWidth" prop="rewardType">
                  <el-select :style="styleObject" v-model="formtwo.rewardType" placeholder="">
                    <el-option label="人民币" :value="0"></el-option>
                    <el-option label="金币" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否废弃" :label-width="formLabelWidth" prop="isDisable">
                  <el-select :style="styleObject" v-model="formtwo.isDisable" placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="废弃" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="需完成问题数" :label-width="formLabelWidth" prop="questionNum">
                  <el-input :style="styleObject" v-model="formtwo.questionNum" min="0" type="number" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="对战规则" prop="fightingRule" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.fightingRule" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="规则详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型名称" :label-width="formLabelWidth" >
                  <el-input :disabled="true" v-model="formtwoInfo.typeName" auto-complete="off" :style="styleObject" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖励类型" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.rewardType" placeholder="">
                    <el-option label="人民币" :value="0"></el-option>
                    <el-option label="金币" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否废弃" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.isDisable" placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="废弃" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="需完成问题数" :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" v-model="formtwoInfo.questionNum" min="0" type="number" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="创建时间" :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" v-model="formtwoInfo.createTime"  auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="修改时间" :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" v-model="formtwoInfo.updateTime"  auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="对战规则" :label-width="formLabelWidth">
                  <el-input :disabled="true"  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.fightingRule" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
    name: 'FightingRules',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
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
          typeName: [{
            required: true,
            message: '请输入类型名称',
            trigger: 'blur'
          }],
          fightingRule: [{
            required: true,
            message: '请输入对战规则',
            trigger: 'blur'
          }],
          questionNum: [{
            required: true,
            message: '请输入需完成问题数',
            trigger: 'blur'
          }],
          isDisable: [{
            required: true,
            message: '请选择是否废弃',
            trigger: 'change'
          }],
          rewardType: [{
            required: true,
            message: '请选择奖励类型',
            trigger: 'change'
          }]
        },
        formLabelWidth: '150px',
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
          typeName: this.formInline.typeName
        }
        this.$fetch('/api/mFightingType/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].isDisable == '1') {
              res.data.list[i].isDisable = '正常'
            } else {
              res.data.list[i].isDisable = '废弃'
            }

            if(res.data.list[i].rewardType == '0') {
              res.data.list[i].rewardType = '人民币'
            } else {
              res.data.list[i].rewardType = '金币'
            }
          }
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
            this.$post('/api/mFightingType/add', this.form).then(res => {
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
          typeId: id
        }
        this.$fetch('/api/mFightingType/delete', parameterData).then(res => {
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
        this.$fetch('/api/mFightingType/info', {
          typeId: id
        }).then(res => {
        if ((res.statusCode+"").startsWith("2")) {
          if(res.data.rewardType==0){
            res.data.rewardType=-1
          }
          this.formtwo = res.data
        }
      })
      },
      update(formtwo) {
        this.$put('/api/mFightingType/update', this.formtwo).then(res => {
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
        this.$fetch('/api/mFightingType/info', {
          typeId: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          res.data.createTime =  formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss');
          res.data.updateTime =  formatDate(new Date(res.data.updateTime), 'yyyy-MM-dd hh:mm:sss');
          this.formtwoInfo = res.data;
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
