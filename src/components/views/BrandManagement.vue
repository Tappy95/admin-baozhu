<template>
  <div class="brandmanagement-wrap">
    <div class="brandmanagement-inner">
      <div class="brandmanagement-header">
        <h3>车辆管理/品牌管理</h3>
        <hr />
      </div>
      <div>
        <el-button @click="load()">添加品牌</el-button>
        <el-dialog title="添加品牌"
          :visible.sync="dialogFormVisible">
          <el-form :model="form"
            :rules="rules"
            ref="form">
            <el-form-item label="品牌名称"
              prop="brandName"
              :label-width="formLabelWidth">
              <el-input v-model="form.brandName"
                auto-complete="off"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO"
              prop="logo"
              :label-width="formLabelWidth">
              <el-upload class="brandAvatar-uploader"
                action="/api/upload/uploadPicture"
                :show-file-list="false"
                :http-request="upload"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl"
                  :src="imageUrl"
                  class="avatar">
                <i v-else
                  class="el-icon-plus brandAvatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="是否推荐"
              :label-width="formLabelWidth"
              prop="isHot">
              <el-radio-group v-model="form.isHot">
                <el-radio :label="1"
                  v-model="radio1">推荐</el-radio>
                <el-radio :label="0"
                  v-model="radio1">不推荐</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否上架"
                prop="status" :label-width="formLabelWidth">
                <el-select v-model="form.status"
                  placeholder="">
                  <el-option label="上架"
                    value="1"></el-option>
                  <el-option label="不上架"
                    value="2"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer"
            class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
              @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="brandmanagement-table">
        <template>
          <el-table :data="tableData"
            style=""
            height="620">
            <el-table-column label="序号"
              type="index"
              :index="indexMethod"
              width='220'>
            </el-table-column>
            <el-table-column prop="brandName"
              label="品牌">
            </el-table-column>
            <el-table-column label="品牌LOGO">
              <template slot-scope="scope">
                <img :src='scope.row.logo'
                  style="width: 100px;height: 50px"
                  @click="clickImg($event)">
              </template>
            </el-table-column>
            <el-table-column prop="isHot"
              label="是否推荐">
            </el-table-column>
            <el-table-column prop="status"
              label="状态">
            </el-table-column>
            <el-table-column fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button size="mini"
                  @click="Delete(scope.row.id)">删除</el-button>
                <el-button @click="getInfo(scope.row.id)"
                  size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
          @clickit="viewImg"
          :imgSrc="imgSrc"></big-img>
        <el-dialog title="修改品牌"
          :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <el-form-item label="品牌名称"
              :label-width="formLabelWidth">
              <el-input v-model="formtwo.brandName"
                auto-complete="off"
                clearable></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO"
              prop="logo"
              :label-width="formLabelWidth">
              <el-upload class="brandAvatar-uploader"
                action="/api/upload/uploadPicture"
                :show-file-list="false"
                :http-request="upload"
                :before-upload="beforeAvatarUpload">
                <img v-if="formtwo.imageUrl"
                  :src="formtwo.imageUrl"
                  class="avatar">
                <i v-else
                  class="el-icon-plus brandAvatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="是否推荐"
              :label-width="formLabelWidth"
              prop="isHot">
              <el-radio-group v-model="formtwo.isHot">
                <el-radio label="1"
                  v-model="radio">推荐</el-radio>
                <el-radio label="0"
                  v-model="radio">不推荐</el-radio>
              </el-radio-group>
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
export default {
  name: 'BrandManagement',
  data() {
    return {
      yes:1,
      no:2,
      radio: '',
      radio1: '',
      showImg: false,
      imgSrc: '',
      imageUrl: '',
      dialogTableVisible: false,
      formtwo: {
        logo: ''
      },
      dialogFormVisible: false,
      form: {
        brandName:'',
        logo: '',
        isHot:1,
        status:'1',
      },
      rules: {
        brandName: {
          required: true,
          message: '请输入品牌名称',
          trigger: 'blur'
        },
        logo: { required: true, message: '请选择品牌LOGO', trigger: 'change' }
      },
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      tableData: []
    }
  },
  components: {
    'big-img': BigImg
  },
  created() {
    this.accountList()
  },
  methods: {
    clickImg(e) {
      this.showImg = true
      this.imgSrc = e.currentTarget.src
    },
    viewImg() {
      this.showImg = false
    },
    upload(item) {
      let formData = new FormData()
      formData.append('imgFile', item.file)
      this.$uploadFile(item.action, formData).then(res => {
        if (res.statusCode == 3104) {
          this.imageUrl = res.data
          this.form.logo = res.data
          this.formtwo.logo = res.data
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isJPG == false && isPNG == false) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG == true || isPNG == true) && isLt2M
    },
    indexMethod(index) {
      return index * 1 + 1
    },
    accountList() {
      let parameterData = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$fetch('/api/finacingBrand/list', parameterData).then(res => {
        if (res.statusCode == 2000) {
          this.tableData = res.data.list
          this.totalCount = res.data.total
          for (let i = res.data.list.length - 1; i >= 0; i--) {
            if (res.data.list[i].isHot == '1') {
              res.data.list[i].isHot = '推荐'
            } else {
              res.data.list[i].isHot = '不推荐'
            }
            if (res.data.list[i].status == '1') {
              res.data.list[i].status = '上架'
            } else {
              res.data.list[i].status = '不上架'
            }
          }
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
      this.dialogFormVisible = true
      this.form.id = null
    },
    addBtn(form) {
      let parameterData = {
            logo: this.form.logo,
            brandName: this.form.logo,
            isHot:this.form.isHot,
            status:this.form.status,
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$post('/api/finacingBrand/insert', parameterData).then(res => {
            if (res.statusCode == 2000) {
              this.dialogFormVisible = false
              this.$message({ type: 'success', message: '添加成功！' })
              this.accountList()
            } else {
              this.$message({ type: 'error', message: res.message })
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
      let parameterData = {
        id: id
      }
      this.$fetch('/api/finacingBrand/del', parameterData).then(res => {
        if (res.statusCode == 2000) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList()
        } else {
        }
      })
    },
    getInfo(id) {
      this.dialogTableVisible = true
      this.$fetch('/api/finacingBrand/info',{
        id: id
      }).then(res => {
        this.formtwo = res.data
        this.formtwo.imageUrl = res.data.logo
        res.data.isHot = res.data.isHot.toString()
      })
    },
    update(formtwo) {
      let parameterData = {
                id:this.formtwo.id,
                logo: this.formtwo.logo,
                brandName: this.formtwo.logo,
                isHot:this.formtwo.isHot,
                status:this.formtwo.status,
      }
      this.$post('/api/finacingBrand/edit', parameterData).then(res => {
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
.brandmanagement-wrap {
  width: 100%;
}
.brandmanagement-inner {
  margin: auto;
  padding: 0 20px;
}
.brandmanagement-header {
  margin-bottom: 20px;
}
.brandmanagement-header hr {
  color: #e6e6e6;
  opacity: 0.5;
}
.brandmanagement-table {
  border: 1px solid #e6e6e6;
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-table th {
  background-color: #e6e6e6;
}
.brandAvatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.brandAvatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.brandAvatar-uploader-icon {
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
</style>
