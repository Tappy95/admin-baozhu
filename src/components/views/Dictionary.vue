<template>
  <div class="dictionary-wrap">
    <div class="dictionary-inner">
      <div class="dictionary-header">
        <h3>系统配置/字典管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="字典名">
            <el-input v-model="formInline.dicName" placeholder="请输入字典名" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="dictionary-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="150" prop="dicName" label="字典名称">
            </el-table-column>
            <el-table-column min-width="150" prop="dicValue" label="字典值">
            </el-table-column>
            <el-table-column min-width="150" prop="dicRemark" label="字典描述">
            </el-table-column>
            <el-table-column min-width="120" prop="valueType" label="字典类型">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.valueType==1">文本</span>
                <span class="red" v-if="scope.row.valueType==2">图片</span>
              </template>
            </el-table-column>
            <el-table-column width="120" prop="status" label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">正常</span>
                <span class="red" v-if="scope.row.status==2">已禁用</span>
                <span class="zi" v-if="scope.row.status==3">已删除</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="modifyTime" label="修改时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW" >
              <template slot-scope="scope">
                <el-button type="warning" plain v-if="scope.row.status!=3 && del" size="mini" @click="Delete(scope.row.id)">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" v-if="upd" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加字典" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="字典名称:" :label-width="formLabelWidth"  prop="dicName">
              <el-input v-model="form.dicName" auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
            <el-form-item v-if="typeText" label="字典值:" prop="dicValue" :label-width="formLabelWidth">
              <el-input v-model="form.dicValue"  auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="字典描述" prop="dicRemark" :label-width="formLabelWidth">
              <el-input  :autosize="{ minRows: 4, maxRows: 6}" class="text_area" type="textarea"   v-model="form.dicRemark" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="typeImg" label="url地址" prop="imageUrl" :label-width="formLabelWidth">
            <el-upload class="bannerAvatar-uploader"
                       action="/api/upload"
                       :data="uploadData"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus bannerAvatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
            <el-form-item label="字典类型:" :label-width="formLabelWidth" prop="valueType">
              <el-select v-model="form.valueType" placeholder="" @change="typeChange(form.valueType)">
                <el-option label="文本" value="1"></el-option>
                <el-option label="图片" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
              <el-select v-model="form.status" placeholder="" >
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改字典" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-form-item label="字典名称" :label-width="formLabelWidth">
              <el-input v-model="formtwo.dicName" auto-complete="off" style="" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="typeText" label="字典值" :label-width="formLabelWidth">
              <el-input v-model="formtwo.dicValue" auto-complete="off" style="" clearable></el-input>
            </el-form-item>

            <el-form-item label="字典描述" :label-width="formLabelWidth">
              <el-input class="text_area" type="textarea" v-model="formtwo.dicRemark" auto-complete="off" style="" clearable></el-input>
            </el-form-item>

            <el-form-item label="字典类型" :label-width="formLabelWidth" prop="valueType">
              <el-select v-model="formtwo.valueType" placeholder="" @change="typeChange(formtwo.valueType)">
                <el-option label="文本" :value="1"></el-option>
                <el-option label="图片" :value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-if="typeImg" label="url地址"
                          prop="imageUrl"
                          :label-width="formLabelWidth">
              <el-upload class="bannerAvatar-uploader"
                         action="/api/upload"
                         :data="uploadData"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl"
                     :src="imageUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus bannerAvatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select v-model="formtwo.status" placeholder="">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="2"></el-option>
                <el-option label="删除" :value="3"></el-option>
              </el-select>
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
  import { delSession, getSession } from '../../utils/cookie'
  export default {
    name: 'Dictionary',
    data() {
      return {
        uploadData:{},
        powerTrue:false,
        optionW:'0px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        typeImg:false,
        typeText:false,
        imageUrl: '',
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        form: {
          status: '1'
        },
        rules: {
          dicName: [{
            required: true,
            message: '请输入字典名称',
            trigger: 'blur'
          }],
          dicValue: [{
            required: true,
            message: '请输入字典值',
            trigger: 'blur'
          }],
          dicRemark: [{
            required: true,
            message: '请输入字典描述',
            trigger: 'blur'
          }],
          valueType:[{
            required: true,
            message: '请选择字典类型',
            trigger: 'change'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
          imageUrl: [{
            required: true,
            message: '请选择图片',
            trigger: 'change'
          }]
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        aa:'',
        isSubmit:false,
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      this.uploadData={
        token:getSession("token")
      }
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

      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {
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
      typeChange(types){
        if(types==1){
          this.typeText=true;
          this.typeImg=false;
        }else{
          this.typeText=false;
          this.typeImg=true;
        }
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          dicName: this.formInline.dicName
        }
        this.$fetch('/api/pDictionary/list', parameterData).then(res => {
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
        this.typeImg=false;
        this.typeText=false;
        this.form={};
        this.imageUrl = '';
        this.dialogFormVisible = true;
        this.formInline = {};
        this.isSubmit= false;
      },
      addBtn(form) {
        if(this.form.valueType==2){
          this.form.dicValue=this.imageUrl;
          this.form.imageUrl=this.imageUrl;
        }
        this.$refs[form].validate(valid => {
        if(valid) {
          this.$nextTick(function () {
            this.isSubmit=true;
          })
          this.$post('/api/pDictionary/add', this.form).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
            this.dialogFormVisible = false;
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
          id: id,
          status:3
        }
        this.$fetch('/api/pDictionary/remove', parameterData).then(res => {
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
        this.$fetch('/api/pDictionary/queryOne', {
          id: id
        }).then(res => {
        if ((res.statusCode+"").startsWith("2")) {
          if(res.data != null ){
            if(res.data.valueType==1){
              this.typeText=true
              this.typeImg=false
            }else{
              this.typeText=false
              this.typeImg=true
              this.imageUrl=res.data.dicValue
            }
            this.formtwo = res.data
          }
        }
      })
      },
      update(formtwo) {
        if(this.formtwo.valueType==2){
          this.formtwo.dicValue=this.imageUrl
          this.formtwo.imageUrl=this.imageUrl
        }
        this.$put('/api/pDictionary/modify', this.formtwo).then(res => {
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
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
  .text_area{
    padding-right: 30px;
  }
  .dictionary-wrap {
    width: 100%;
  }

  .dictionary-inner {
    margin: auto;
    padding: 0 20px;
  }

  .dictionary-header {
    margin-bottom: 20px;
  }

  .dictionary-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .dictionary-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
