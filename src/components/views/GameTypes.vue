<template>
  <div class="game-types-wrap">
    <div class="game-types-inner">
      <div class="game-types-header">
        <h3>第三方/游戏类型</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-bottom: 20px;">
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="game-types-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column prop="typeName" label="游戏名称">
            </el-table-column>
            <el-table-column prop="status" label="是否启用">
              <template slot-scope="scope">
                     <span class="green" v-if="scope.row.status==1">已启用</span>
                     <span class="red" v-if="scope.row.status==2">未启用</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <!--<el-button  type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>-->
                <el-button  type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button  type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-dialog title="添加游戏" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth" prop="typeName">
              <el-input v-model="form.typeName" auto-complete="off" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改游戏" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-form-item label="游戏名称：" :label-width="formLabelWidth" prop="typeName">
              <el-input v-model="formtwo.typeName" auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status" :label-width="formLabelWidth">
              <el-select v-model="formtwo.status" placeholder="">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="2"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="游戏详情" :visible.sync="dialogTableDetail" width="600px">
          <el-form :model="formtwoInfo">

            <el-form-item label="游戏名称：" :label-width="formLabelWidth" prop="typeName">
              <el-input :disabled="true" v-model="formtwoInfo.typeName" auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status" :label-width="formLabelWidth">
              <el-select :disabled="true"  v-model="formtwoInfo.status" placeholder="">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-input style="width: 187px" v-model="formtwoInfo.createTime" :disabled="true" auto-complete="off"  clearable></el-input>
            </el-form-item>
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
    name: 'GameTypes',
    data() {
      return {
        powerTrue:false,
        optionW:'0',
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
        rules: {
          typeName: [{
            required: true,
            message: '请输入游戏名称',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择是否启用',
            trigger: 'change'
          }]
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
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        }
        this.$fetch('/api/tpGameType/list', parameterData).then(res => {
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
        this.dialogFormVisible = true;
        this.isSubmit=false
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/tpGameType/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false;
              this.$message({type: 'success', message: '添加成功！'});
              this.accountList();
            } else {
              this.$message({type: 'error', message: res.message});
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
        this.$fetch('/api/tpGameType/remove', parameterData).then(res => {
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
        this.$fetch('/api/tpGameType/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.formtwo = res.data
        }
      })
      },
      update(formtwo) {
        this.$put('/api/tpGameType/modify', this.formtwo).then(res => {
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
        this.$fetch('/api/tpGameType/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          res.data.createTime =  formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
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
  .game-types-wrap {
    width: 100%;
  }

  .game-types-inner {
    margin: auto;
    padding: 0 20px;
  }

  .game-types-header {
    margin-bottom: 20px;
  }

  .game-types-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .game-types-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
