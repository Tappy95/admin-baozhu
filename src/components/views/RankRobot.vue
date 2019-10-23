<template>
  <div class="rank-robot-wrap">
    <div class="rank-robot-inner">
      <div class="rank-robot-header">
        <h3>运营管理/排行榜人机</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div>
        <el-dialog title="添加Banner" width="800px"
                   :visible.sync="dialogFormVisible">
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <div class="form">
              <el-row>
                <el-col :span="22">
                  <el-form-item label="手机号:" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" auto-complete="off" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="图片:" prop="imageUrl" :label-width="formLabelWidth">
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
                </el-col>
              </el-row>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="rank-robot-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    max-height="556">
            <el-table-column label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80' fixed="left">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" fixed="left" >
            </el-table-column>
            <el-table-column  label="图片">
              <template slot-scope="scope">
                <img :src='scope.row.img'
                     class="rankRobot_img"
                     @click="clickImg($event)">
              </template>
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" plain
                           @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" v-if="upd"
                           size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog width="800px" title="修改"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="22">
                <el-form-item label="手机号:" prop="mobile" :label-width="formLabelWidth">
                  <el-input v-model="formtwo.mobile" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="图片:" prop="imageUrl" :label-width="formLabelWidth">
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
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 70]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { getSession } from '../../utils/cookie'
  import BigImg from './BigImg'
  export default {
    name: 'RankRobot',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        uploadData:{},
        powerTrue:false,
        optionW:'0px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        imageUrl: '',
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        form: {
          img:'',
          mobile:'',
          imageUrl:'',
        },
        rules: {
          mobile: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            {min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正确的手机号"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          imageUrl: [{ required: true, message: '请选择图片', trigger: 'change' }],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        showImg: false,
        imgSrc: '',
        formInline: {},
        tableData: [],
        isSubmit:false
      }
    },
    components: {
      'big-img': BigImg
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
                this.optionW = '160px'
              }
            }
          } else {
          }
        })
      },
      clickImg(e) {
        this.showImg = true;
        this.imgSrc = e.currentTarget.src;
      },
      viewImg() {
        this.showImg = false
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {

      },
      indexMethod(index) {
        return index * 1 + 1
      },

      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        }
        this.$fetch('/api/rankMachine/list', parameterData).then(res => {
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
        this.dialogFormVisible = true;
        this.form ={};
        this.formInline = {};
        this.imageUrl='';
        this.isSubmit = false;
      },
      addBtn(form) {
        // imageUrl
        this.form.imageUrl=this.imageUrl;
        this.form.img= this.form.imageUrl;
        console.log(this.form)
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/rankMachine/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false;
                this.$message({ type: 'success', message: '添加成功！' })
                this.accountList()
              }else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
                this.isSubmit=false;
              }
            })
          } else {
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
            this.$message({ type: 'info', message: '已取消删除' })
          })
      },
      delData(id) {
        this.$fetch('/api/rankMachine/delete',{
          id: id
        } ).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: '删除成功！' })
            this.accountList()
          } else {
          }
        })
      },
      //修改
      getInfo(id) {
        this.$fetch('/api/rankMachine/info',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.dialogTableVisible = true;
            this.formtwo = res.data;
            this.imageUrl = res.data.img
          }else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },
      //修改的确定按钮
      update(formtwo) {
        this.formtwo.img=this.imageUrl
        this.$put('/api/rankMachine/update', this.formtwo).then(res => {
          if (res.statusCode == 2000) {
            this.$message({ type: 'success', message: '修改成功！' })
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
      }
    }
  }
</script>
<style type="text/css">
  .rankRobot_img{
    max-width: 100px;
    max-height: 50px;
    border-radius: 50%;
  }
  .rank-robot-wrap {
    width: 100%;
  }
  .rank-robot-inner {
    margin: auto;
    padding: 0 20px;
  }
  .rank-robot-header {
    margin-bottom: 20px;
  }
  .rank-robot-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .rank-robot-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .el-table th {
    background-color: #e6e6e6;
  }
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
  .form {
    /*overflow-y: scroll;*/
    /*height: auto;*/
  }
  .el-icon-plus{
    line-height:0;
  }
  .bannerAvatar-uploader-icon{
    line-height: 148px !important;
  }
</style>
