<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>系统管理/菜单管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="菜单名称:">
              <el-input v-model="formInline.menuName" placeholder="请输入菜单名称" clearable></el-input>
            </el-form-item>
            <el-button type="primary" plain @click="search()">查询</el-button>
            <el-button type="success" plain @click="load()">添加</el-button>

        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column min-width="120px" prop="icon" label="小图标">
            </el-table-column>
            <el-table-column min-width="150px" prop="menuName" label="菜单名称">
            </el-table-column>

            <el-table-column min-width="170px"  prop="menuUrl" label="菜单访问地址">
            </el-table-column>

            <el-table-column min-width="170px" prop="fileName" label="文件名">
            </el-table-column>

            <el-table-column min-width="150px" prop="parentName" label="父级名称">
            </el-table-column>

            <el-table-column min-width="120px" prop="orderId" label="排序">
            </el-table-column>

            <el-table-column prop="createTime" width="200px" label="创建时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="245">
              <template slot-scope="scope">
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini">修改</el-button>
                <el-button type="primary" plain v-if="scope.row.parentId!=0" @click="butList(scope.row.id)" size="mini">按钮列表</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="按钮列表" :visible.sync="dialogFormVisibleBtn" width="600px">
          <el-button class="but" @click="butLoad()">添加</el-button>
          <template>
            <el-table :data="tableData1" height="500" :visible.sync="dialogFormVisibleBtn">
              <el-table-column label="序号" type="index" :index="indexMethod" width='100'>
              </el-table-column>
              <el-table-column prop="btnName" label="按钮名称">
              </el-table-column>
              <el-table-column prop="btnCode" label="按钮代码">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="75px">
                <template slot-scope="scope">
                  <el-button  size="mini" @click="butDelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <div class="block">
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="totalCount1">
            </el-pagination>
          </div>
        </el-dialog>
        <el-dialog title="添加菜单" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="小图标:" :label-width="formLabelWidth"  width="217px">
              <el-input v-model="form.icon"  auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="菜单名称:" :label-width="formLabelWidth"  width="217px" prop="menuName">
              <el-input v-model="form.menuName"  auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="菜单url:" :label-width="formLabelWidth"  width="217px" prop="menuUrl">
              <el-input v-model="form.menuUrl"  auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="文件名:" :label-width="formLabelWidth"  width="217px" prop="fileName">
              <el-input v-model="form.fileName"  auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="排序:" :label-width="formLabelWidth"  width="217px" prop="orderId">
              <el-input min="0" type="number" v-model="form.orderId" auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
           <el-form-item label="父级:" :label-width="formLabelWidth" prop="parentId">
              <el-select v-model="form.parentId" placeholder="">
                <el-option v-for="(item,index) in parentsList" :key="index" :label="item.menuName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
              <el-select v-model="form.status" placeholder="" >
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改菜单" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-form-item label="小图标:" :label-width="formLabelWidth">
              <el-input v-model="formtwo.icon" auto-complete="off" style="" clearable></el-input>
            </el-form-item>
            <el-form-item label="菜单名称:" :label-width="formLabelWidth">
              <el-input  v-model="formtwo.menuName" auto-complete="off" style="" clearable></el-input>
            </el-form-item>
            <el-form-item label="菜单url:" :label-width="formLabelWidth">
              <el-input  v-model="formtwo.menuUrl" auto-complete="off" style="" clearable></el-input>
            </el-form-item>
            <el-form-item label="文件名:" :label-width="formLabelWidth"  width="217px" prop="fileName">
              <el-input v-model="formtwo.fileName"  auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="排序:" :label-width="formLabelWidth">
              <el-input min="0" type="number"  v-model="formtwo.orderId" auto-complete="off" style="" clearable></el-input>
            </el-form-item>
            <el-form-item label="父级:" :label-width="formLabelWidth" prop="parentId">
              <el-select v-model="formtwo.parentId" placeholder="">
                <el-option v-for="(item,index) in parentsList" :key="index" :label="item.menuName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态:" :label-width="formLabelWidth">
              <el-select v-model="formtwo.status" placeholder="">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="停用" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="添加菜单" :visible.sync="dialogFormVisibleaddBut" width="600px">
          <el-form :model="formBut" :rules="rules" ref="form">
            <el-form-item label="按钮名称:" :label-width="formLabelWidth"  width="217px" prop="btnName">
              <el-input v-model="formBut.btnName" style="width: 217px" auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="按钮代码:" :label-width="formLabelWidth"  width="217px" prop="btnCode">
              <el-input v-model="formBut.btnCode" style="width: 217px" auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleaddBut = false">取 消</el-button>
            <el-button type="primary" @click="addBtnList('form')">确 定</el-button>
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
    name: 'MenuManagement',
    data() {
      return {
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogFormVisibleBtn:false,
        dialogFormVisibleaddBut:false,
        form: {
          status: '1'
        },
        formBut:{

        },
        parentsList:[],
        rules: {
          menuName: [{
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }],
          menuUrl: [{
            required: true,
            message: '请输入菜单url',
            trigger: 'blur'
          }],
          orderId: [{
            required: true,
            message: '请输入排序值',
            trigger: 'blur'
          }],
          fileName:[{
            required: true,
            message: '请输入文件名',
            trigger: 'blur'
          }],
          parentId: [{
            required: true,
            message: '请选择父级',
            trigger: 'change'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
          btnName:[{
            required: true,
            message: '请输入按钮名称',
            trigger: 'blur'
          }],
          btnCode:[{
            required: true,
            message: '请输入按钮代码',
            trigger: 'blur'
          }]
        },
        formInline: {},
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData: [],
        currentPage1: 1,
        pageSize1: 10,
        totalCount1: 0,
        tableData1: [],
        mId:''
      }
    },
    created() {
      this.accountList()
    },
    methods: {
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

      butLoad(){
        this.formBut={}
        this.dialogFormVisibleaddBut = true;
      },
      addBtnList(form){
        this.formBut.menuId=this.mId
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/api/pMenuBtn/add', this.formBut).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '添加成功！'
              })
              this.dialogFormVisibleaddBut = false;
              this. butList(0)
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
      butList(id){
        this.dialogFormVisibleBtn=true
        if(id!=0){
          this.mId=id
        }
        let parameterData = {
          pageNum: this.currentPage1,
          pageSize: this.pageSize1,
          menuId:this.mId
        }
        this.$fetch('/api/pMenuBtn/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {

            this.tableData1 = res.data.list
            this.totalCount1 = res.data.total

          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
      })
      },
      butDelete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
          this.butDelData(id)
      })
      .catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      },
      butDelData(id) {
        let parameterData = {
          id: id,
        }
        this.$fetch('/api/pMenuBtn/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.butList(0)
        } else {
          this.$message({
            type: 'error',
            message: '删除失败！'
          })
        }
      })
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          menuName: this.formInline.menuName
        }
        this.$fetch('/api/pMenu/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].status == '1') {
              res.data.list[i].status = '启用'
            }else {
              res.data.list[i].status = '停用'
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
        this.getParents();
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
        if(valid) {
          this.$post('/api/pMenu/add', this.form).then(res => {
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
      getParents(){
        this.$fetch('/api/pMenu/queryParentMenu').then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              this.parentsList=res.data;
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
          id: id,
        }
        this.$fetch('/api/pMenu/remove', parameterData).then(res => {
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
        this.$fetch('/api/pMenu/queryOne', {
          id: id
        }).then(res => {
        if ((res.statusCode+"").startsWith("2")) {
           this.formtwo=res.data
           this.getParents()
        }
      })
      },
      update(formtwo) {
        this.$post('/api/pMenu/modify', this.formtwo).then(res => {
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
      handleSizeChange1(val) {
        this.pageSize1 = val
        this.butList(0)
      },
      handleCurrentChange1(val) {
        this.currentPage1 = val
        this.butList(0)
      }
    },
  }
</script>
<style type="text/css">

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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .text_area{
    padding-right: 30px;
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
  .but{
    margin-bottom: 20px;
  }
</style>
