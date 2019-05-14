<template>
  <div class="bannermanage-wrap">
    <div class="bannermanage-inner">
      <div class="bannermanage-header">
        <h3>用户管理/用户等级</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="等级名称"
                        prop="level">
            <el-input placeholder="请输入等级名称"
                      v-model="formInline.level"
                      clearable></el-input>
          </el-form-item>
          <el-button @click="search()">查询</el-button>
          <el-button @click="load()" v-if="add">添加用户等级</el-button>
        </el-form>
      </div>
      <div>
        <el-dialog title="添加用户等级" width="600px"
                   :visible.sync="dialogFormVisible">
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <div class="form">
              <el-form-item label="等级名称"
                            prop="level"
                            :label-width="formLabelWidth">
                <el-input v-model="form.level"
                          auto-complete="off"
                          clearable
                          style="width: 300px;"></el-input>
              </el-form-item>
              <el-form-item label="所需经验值"
                            prop="experience"
                            :label-width="formLabelWidth">
                <el-input min="0" type="number" v-model="form.experience"
                          auto-complete="off"
                          clearable
                          style="width: 300px;"></el-input>
              </el-form-item>
              <el-form-item label="等级排序"
                            prop="orderId"
                            :label-width="formLabelWidth">
                <el-input min="0" type="number" v-model="form.orderId"
                          auto-complete="off"
                          clearable
                          style="width: 300px;"></el-input>
              </el-form-item>
              <el-form-item label="金猪加成比例(%)"
                            prop="addition"
                            :label-width="formLabelWidth">
                <el-input min="0" type="number" v-model="form.addition"
                          auto-complete="off"
                          clearable
                          style="width: 300px;"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="addBtn(form)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="bannermanage-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    height="580">
            <el-table-column label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80'>
            </el-table-column>
            <el-table-column prop="level"
                             label="等级名称">
            </el-table-column>
            <el-table-column prop="experience"
                             label="所需经验值">
            </el-table-column>
            <el-table-column prop="orderId"
                             label="等级排序">
            </el-table-column>
            <el-table-column prop="addition"
                             label="金猪加成比例(%)">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button @click="getInfo(scope.row.id)"
                           size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog title="修改用户等级" width="600px"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <el-form-item label="等级名称"
                          :label-width="formLabelWidth">
              <el-input  v-model="formtwo.level"
                        auto-complete="off"
                        style=""
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="所需经验值"
                          :label-width="formLabelWidth">
              <el-input type="number" min="0" v-model="formtwo.experience"
                        auto-complete="off"
                        style=""
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="等级排序"
                          :label-width="formLabelWidth">
              <el-input type="number" min="0" v-model="formtwo.orderId"
                        auto-complete="off"
                        style=""
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="金猪加成比例(%)"
                          :label-width="formLabelWidth">
              <el-input type="number" min="0" v-model="formtwo.addition"
                        auto-complete="off"
                        style=""
                        clearable></el-input>
            </el-form-item>
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
  import BigImg from './BigImg'
  import { delSession, getSession } from '../../utils/cookie'
  export default {
    name: 'UserLevel',
    data() {
      return {
        uploadData:{},
        powerTrue:false,
        optionW:'0px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        app: 0,
        web: 1,
        advertisingPage: 1,
        webPage: 2,
        advertising: 3,
        areaChart: 4,
        homepage: 0,
        show: 0,
        activePage: 1,
        detailsPage: 2,
        imageUrl: '',
        imgUrl:'',
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        form: {
          level: '',
          experience: '',
          image: '',
          orderId:''
        },
        rules: {
          level: [
            {required: true, message: '请输入等级名称', trigger: 'blur'}
          ],
          experience: [
            {required: true, message: '请输入所需经验值', trigger: 'blur'}
          ],
          orderId: [
            {required: true, message: '请输入等级排序', trigger: 'blur'}
          ],
          addition: [
            {required: true, message: '请输入金猪加成比例', trigger: 'blur'}
          ],
          imgUrl: [{required: true, message: '请选择图片', trigger: 'change'}]
        },
        formLabelWidth: '160px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        showImg: false,
        imgSrc: '',
        formInline: {},
        tableData: []
      }
    },
    components: {
      'big-img': BigImg
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
              this.optionW = '160px'
            }
          }
        } else {
        }
      })
      },
      clickImg(e) {
        this.showImg = true
        this.imgSrc = e.currentTarget.src
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
          level: this.formInline.level
        }
        this.$fetch('/api/pLevel/list', parameterData).then(res => {
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
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      load() {
        this.dialogFormVisible = true;
        this.form = {};
        this.formInline = {};
        this.imageUrl='';
      },
      addBtn(form) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$post('/api/pLevel/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false
              this.$message({ type: 'success', message: '添加成功！' })
              this.accountList()
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
        this.$fetch('/api/pLevel/remove',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: '删除成功！' })
            this.accountList()
        } else {
        }
      })
      },
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/api/pLevel/queryOne',{
          id: id
        }).then(res => {
          this.formtwo = res.data
        this.imgUrl = res.data.imgUrl
      })
      },
      update(formtwo) {
        this.formtwo.imgUrl=this.imageUrl
        this.$put('/api/pLevel/modify', this.formtwo).then(res => {
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
  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }
  .bannermanage-wrap {
    width: 100%;
  }
  .bannermanage-inner {
    margin: auto;
    padding: 0 20px;
  }
  .bannermanage-header {
    margin-bottom: 20px;
  }
  .bannermanage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .bannermanage-table {
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
  .form {
    /*overflow-y: scroll;*/
  }
</style>
