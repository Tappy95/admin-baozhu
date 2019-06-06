<template>
  <div class="bannermanage-wrap">
    <div class="bannermanage-inner">
      <div class="bannermanage-header">
        <h3>系统配置/Banner管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
          :model="formInline"
          class="demo-form-inline">
          <el-form-item label="标题"
            prop="title">
            <el-input placeholder="请输入Banner标题"
              v-model="formInline.title"
              clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加Banner</el-button>
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
                <el-col :span="12">
                  <el-form-item label="Banner标题:"
                                prop="title"
                                :label-width="formLabelWidth">
                    <el-input v-model="form.title"
                              auto-complete="off"
                              clearable
                              :style="styleObject"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item prop="position" label="图片位置:" :label-width="formLabelWidth">
                    <el-select :style="styleObject" v-model="form.position" placeholder="">
                      <el-option label="首页底部" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="开始时间:"
                                prop="startTime"
                                :label-width="formLabelWidth">
                    <el-date-picker :style="styleObject" v-model="form.startTime"
                                    type="datetime"
                                    placeholder="请选择开始时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结束时间:"
                                prop="endTime"
                                :label-width="formLabelWidth">
                    <el-date-picker :style="styleObject" v-model="form.endTime"
                                    type="datetime"
                                    placeholder="请选择结束时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                    <el-select :style="styleObject" v-model="form.status" placeholder="">
                      <el-option label="启用" :value="1"></el-option>
                      <el-option label="停用" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="22">
                  <el-form-item label="详情链接地址:"
                                prop="linkUrl"
                                :label-width="formLabelWidth">
                    <el-input  v-model="form.linkUrl"
                               auto-complete="off"
                               clearable
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="图片:"
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
                </el-col>
              </el-row>
            </div>
          </el-form>
          <div slot="footer"
            class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
              @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="bannermanage-table">
        <template>
          <el-table :data="tableData"
            style="width: 100%"
            height="528">
            <el-table-column label="序号"
              type="index"
              :index="indexMethod"
              width='80' fixed="left">
            </el-table-column>
            <el-table-column prop="title"
              label="Banner标题" fixed="left" min-width="160px">
            </el-table-column>
            <el-table-column prop="position" min-width="120px"
              label="显示位置">
            </el-table-column>
            <el-table-column prop="status" min-width="120px"
                             label="状态">
            </el-table-column>
            <el-table-column prop="startTime" :formatter="dateFormat"
              label="开始时间" width="200px">
            </el-table-column>
            <el-table-column :formatter="dateFormat" prop="endTime"
              label="结束时间" width="200px">
            </el-table-column>

            <el-table-column width="200px" :formatter="dateFormat" prop="createTime"
                             label="创建时间">
            </el-table-column>
            <el-table-column width="200px" label="图片">
              <template slot-scope="scope">
                <img :src='scope.row.imageUrl'
                  style="max-width: 100px;max-height: 50px"
                  @click="clickImg($event)">
              </template>
            </el-table-column>
            <el-table-column min-width="200px" prop="linkUrl"
              label="链接地址">
            </el-table-column>
            <el-table-column fixed="right"
              label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" plain
                  @click="Delete(scope.row.bannerId)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.bannerId)" v-if="upd"
                  size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
          @clickit="viewImg"
          :imgSrc="imgSrc"></big-img>
        <el-dialog width="800px" title="修改Banner"
          :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">

            <el-row>
              <el-col :span="12">
                <el-form-item label="Banner标题:"
                              prop="title"
                              :label-width="formLabelWidth">
                  <el-input v-model="formtwo.title"
                            auto-complete="off"
                            clearable
                            :style="styleObject"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="position" label="图片位置:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.position" placeholder="">
                    <el-option label="首页底部" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开始时间:"
                              prop="startTime"
                              :label-width="formLabelWidth">
                  <el-date-picker :style="styleObject" v-model="formtwo.startTime"
                                  type="datetime"
                                  placeholder="请选择开始时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间:"
                              prop="endTime"
                              :label-width="formLabelWidth">
                  <el-date-picker :style="styleObject" v-model="formtwo.endTime"
                                  type="datetime"
                                  placeholder="请选择结束时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="详情链接地址:"
                              prop="linkUrl"
                              :label-width="formLabelWidth">
                  <el-input  v-model="formtwo.linkUrl"
                             auto-complete="off"
                             clearable
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="图片:"
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
              </el-col>
            </el-row>


            <!--<el-form-item label="Banner标题"-->
                          <!--prop="title"-->
                          <!--:label-width="formLabelWidth">-->
              <!--<el-input v-model="formtwo.title"-->
                        <!--auto-complete="off"-->
                        <!--clearable-->
                        <!--style="width: 224px;"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="开始时间"-->
                          <!--prop="startTime"-->
                          <!--:label-width="formLabelWidth">-->
              <!--<el-date-picker v-model="formtwo.startTime"-->
                              <!--type="datetime"-->
                              <!--placeholder="选择开始时间"-->
              <!--&gt;-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="结束时间"-->
                          <!--prop="endTime"-->
                          <!--:label-width="formLabelWidth">-->
              <!--<el-date-picker v-model="formtwo.endTime"-->
                              <!--type="datetime"-->
                              <!--placeholder="选择结束时间"-->
              <!--&gt;-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->

            <!--<el-form-item prop="position" label="图片位置" :label-width="formLabelWidth">-->
              <!--<el-select v-model="formtwo.position" placeholder="">-->
                <!--<el-option label="首页底部" :value="1"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="链接地址"-->
                          <!--prop="linkUrl"-->
                          <!--:label-width="formLabelWidth">-->
              <!--<el-input v-model="formtwo.linkUrl"-->
                        <!--auto-complete="off"-->
                        <!--clearable-->
                        <!--style="width: 300px;"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="url地址"-->
                          <!--prop="imageUrl"-->
                          <!--:label-width="formLabelWidth">-->
              <!--<el-upload class="bannerAvatar-uploader"-->
                         <!--action="/api/upload"-->
                         <!--:data="uploadData"-->
                         <!--:show-file-list="false"-->
                         <!--:on-success="handleAvatarSuccess"-->
                         <!--:before-upload="beforeAvatarUpload">-->
                <!--<img v-if="imageUrl"-->
                     <!--:src="imageUrl"-->
                     <!--class="avatar">-->
                <!--<i v-else-->
                   <!--class="el-icon-plus bannerAvatar-uploader-icon"></i>-->
              <!--</el-upload>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="是否启用"  prop="status" :label-width="formLabelWidth">-->
              <!--<el-select v-model="formtwo.status" placeholder="">-->
                <!--<el-option label="启用" :value="1"></el-option>-->
                <!--<el-option label="停用" :value="2"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->

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
  import { formatDate } from '../../utils/date.js'
  import { delSession, getSession } from '../../utils/cookie'
  import BigImg from './BigImg'
export default {
  name: 'BannerManage',
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
      app: 0,
      web: 1,
      advertisingPage: 1,
      webPage:2,
      advertising:3,
      areaChart:4,
      homepage: 0,
      show:0,
      activePage:1,
      detailsPage:2,
      imageUrl: '',
      dialogTableVisible: false,
      formtwo: {},
      dialogFormVisible: false,
      form: {
      },
      rules: {
        title: [
          { required: true, message: '请输入Banner标题', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请选择图片位置', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        imageUrl: [{ required: true, message: '请选择图片', trigger: 'change' }],
        linkUrl: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px',
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
        title: this.formInline.title
      }
      this.$fetch('/api/pBanner/list', parameterData).then(res => {
        if ((res.statusCode+"").startsWith("2")) {
        for (let i = res.data.list.length - 1; i >= 0; i--) {
             if(res.data.list[i].position ==1){
               res.data.list[i].position ="首页底部"
             }
            if(res.data.list[i].status ==1){
               res.data.list[i].status ="已启用"
              }else {
                res.data.list[i].status ="已禁用"
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
      this.dialogFormVisible = true;
      this.form ={};
      this.formInline = {};
      this.imageUrl='';
    },
    addBtn(form) {
      this.form.imageUrl=this.imageUrl
      if (this.form.startTime) {
        this.form.startTime = new Date(this.form.startTime).getTime();
      }

      if (this.form.endTime) {
        this.form.endTime = new Date(this.form.endTime).getTime();
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$post('/api/pBanner/add', this.form).then(res => {
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
      this.$fetch('/api/pBanner/remove',{
        bannerId: id
      } ).then(res => {
        if (res.statusCode == 2000) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList()
        } else {
        }
      })
    },
    //修改
    getInfo(id) {
      this.dialogTableVisible = true
      this.$fetch('/api/pBanner/queryOne',{
        bannerId: id
      }).then(res => {
        this.formtwo = res.data
        this.imageUrl = res.data.imageUrl
      })
    },
    //修改的确定按钮
    update(formtwo) {
      this.formtwo.startTime = new Date(this.formtwo.startTime).getTime()
      this.formtwo.endTime = new Date(this.formtwo.endTime).getTime()

      this.formtwo.imageUrl=this.imageUrl
      this.$put('/api/pBanner/modify', this.formtwo).then(res => {
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
  /*height: auto;*/
}
  .el-icon-plus{
    line-height:0;
  }
.bannerAvatar-uploader-icon{
    line-height: 178px !important;
}
</style>
