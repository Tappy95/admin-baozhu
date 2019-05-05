<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>系统配置/字典管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="字典名">
            <el-input v-model="formInline.dicName" placeholder="" clearable></el-input>
          </el-form-item>
          <el-button @click="search()">查询</el-button>
          <el-button @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column prop="dicName" label="字典名称">
            </el-table-column>
            <el-table-column prop="dicValue" label="字典值">
            </el-table-column>

            <el-table-column prop="dicRemark" label="字典描述">
            </el-table-column>

            <el-table-column prop="valueType" label="字典类型">
            </el-table-column>

            <el-table-column prop="modifyTime" label="修改时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>

            <el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW" >
              <template slot-scope="scope">
                <el-button v-if="scope.row.status!='已删除' && del" size="mini" @click="Delete(scope.row.id)">删除</el-button>
                <el-button @click="getInfo(scope.row.id)" v-if="upd" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-dialog title="添加字典" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="字典名称:" :label-width="formLabelWidth"  width="217px" prop="dicName">
              <el-input v-model="form.dicName" style="width: 217px" auto-complete="off"  clearable>
              </el-input>
            </el-form-item>

            <el-form-item label="字典类型:" :label-width="formLabelWidth" prop="valueType">
              <el-select v-model="form.valueType" placeholder="" @change="typeChange(form.valueType)">
                <el-option label="文本" value="1"></el-option>
                <el-option label="图片" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="字典描述" prop="dicRemark" :label-width="formLabelWidth">
              <el-input style="width: 350px" :autosize="{ minRows: 4, maxRows: 6}" class="text_area" type="textarea"   v-model="form.dicRemark" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item v-if="typeText" label="字典值:" prop="dicValue" :label-width="formLabelWidth">
              <el-input v-model="form.dicValue" style="width: 217px" auto-complete="off" clearable></el-input>
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

            <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
              <el-select v-model="form.status" placeholder="" >
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
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
          realname: '',
          mobile: '',
          password: '',
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
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        aa:''
      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
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
          this.typeText=true
          this.typeImg=false
        }else{
          this.typeText=false
          this.typeImg=true
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
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].status == '2') {
              res.data.list[i].status = '禁用'
            }else if(res.data.list[i].status == '1') {
              res.data.list[i].status = '正常'
            }else {
              res.data.list[i].status = '已删除'
            }
            if(res.data.list[i].valueType == '1'){
              res.data.list[i].valueType="文本"
            }else{
              res.data.list[i].valueType="图片"
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
        this.typeImg=false;
        this.typeText=false;
        this.form={};
        this.imageUrl = '';
        this.dialogFormVisible = true;
        this.formInline = {};
      },
      addBtn(form) {
        if(this.form.valueType==2){
          this.form.dicValue=this.imageUrl
          this.form.imageUrl=this.imageUrl
        }
        this.$refs[form].validate(valid => {
        if(valid) {
          this.$post('/api/pDictionary/add', this.form).then(res => {
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
</style>
