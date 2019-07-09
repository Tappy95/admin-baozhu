<template>
  <div class="bannermanage-wrap">
    <div class="bannermanage-inner">
      <div class="bannermanage-header">
        <h3>系统配置/奖品管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="奖品名称"
                        prop="goodsName">
            <el-input placeholder="请输入奖品名称"
                      v-model="formInline.goodsName"
                      clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加奖品</el-button>
        </el-form>
      </div>
      <div>
        <el-dialog title="添加奖品" width="600px"
                   :visible.sync="dialogFormVisible">
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <div class="form">
              <el-row>


                <el-col :span="12">
                  <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                    <el-select v-model="form.typeId" placeholder="">
                      <el-option v-for="(item,index) in lotterylist" :key="index" :label="item.typeName" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="奖品价格:" :label-width="formLabelWidth" prop="price">
                    <el-input type="number" min="0" v-model="form.price" auto-complete="off"  clearable>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="中奖概率(%):" :label-width="formLabelWidth" prop="rate">
                    <el-input type="number" min="0" v-model="form.rate" auto-complete="off"  clearable>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                    <el-select v-model="form.status" placeholder="">
                      <el-option label="启用" value="1"></el-option>
                      <el-option label="停用" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="奖品名称:"
                                prop="goodsName"
                                :label-width="formLabelWidth">
                    <el-input v-model="form.goodsName"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                    <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.remark" auto-complete="off" clearable></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="24">
                  <el-form-item label="奖品图片:"
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
                    height="580">
            <el-table-column label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80' fixed="left">
            </el-table-column>
            <el-table-column prop="goodsName"
                             label="奖品名称" fixed="left" >
            </el-table-column>

            <el-table-column min-width="120px" prop="price"
                             label="奖品价格(￥)"  >
            </el-table-column>


            <el-table-column prop="rate" min-width="120px"
                             label="中奖概率(%)">
            </el-table-column>

            <el-table-column min-width="200px" label="奖品图片">
              <template slot-scope="scope">
                <img :src='scope.row.imageUrl'
                     style="max-width: 100px;max-height: 50px"
                     @click="clickImg($event)">
              </template>
            </el-table-column>
            <el-table-column prop="status" width="120px"
                             label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">已启用</span>
                <span class="red" v-if="scope.row.status==2">已停用</span>
                <span class="zi" v-if="scope.row.status==3">已删除</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" :formatter="dateFormat" prop="createTime"
                             label="创建时间">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain size="mini"
                           @click="getInfo(scope.row.id,1)">详情</el-button>
                <el-button type="warning" plain size="mini"
                           @click="Delete(scope.row.id)" v-if="del && scope.row.status!=3"><span v-if="optionW='220px'"></span> 删除</el-button>
                <el-button  type="success" v-if="upd && scope.row.status!=3" plain @click="getInfo(scope.row.id,2)" size="mini">
                  <span v-if="optionW='220px'"></span> 修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog width="700px" title="修改奖品"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <el-row>

              <el-col :span="12">
                <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                  <el-select v-model="formtwo.typeId" placeholder="">
                    <el-option v-for="(item,index) in lotterylist" :key="index" :label="item.typeName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖品价格:" :label-width="formLabelWidth" prop="price">
                  <el-input type="number" min="0" v-model="formtwo.price" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖概率(%):" :label-width="formLabelWidth" prop="rate">
                  <el-input type="number" min="0" v-model="formtwo.rate" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                  <el-select v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="奖品名称:"
                              prop="goodsName"
                              :label-width="formLabelWidth">
                  <el-input v-model="formtwo.goodsName"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="奖品图片:"
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

          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog width="700px" title="奖品详情"
                   :visible.sync="dialogTableDetail">
          <el-form :model="formtwo">
            <el-row>

              <el-col :span="12">
                <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                  <el-select :disabled="true" v-model="formtwo.typeId" placeholder="">
                    <el-option v-for="(item,index) in lotterylist" :key="index" :label="item.typeName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖品价格:" :label-width="formLabelWidth" prop="price">
                  <el-input type="number" min="0" :disabled="true" v-model="formtwo.price" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖概率(%):" :label-width="formLabelWidth" prop="rate">
                  <el-input :disabled="true" type="number" min="0" v-model="formtwo.rate" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                    <el-option label="已删除" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="创建时间:" :label-width="formLabelWidth" prop="rate">
                  <el-input :disabled="true"  min="0" v-model="formtwo.createTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="奖品名称:"
                              prop="goodsName"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" v-model="formtwo.goodsName"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                  <el-input :disabled="true"  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="奖品图片"
                              prop="imageUrl:"
                              :label-width="formLabelWidth">
                  <el-upload :disabled="true" class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             >
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
    name: 'LotteryGoods',
    data() {
      return {
        uploadData:{},
        powerTrue:false,
        optionW:'75px',
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
        lotterylist:[],
        rules: {
          goodsName: [
             { required: true, message: '请输入奖品名称', trigger: 'blur' }
            ],
          price: [
            { required: true, message: '请输入奖品价格', trigger: 'blur' }
          ],
            rate: [
            { required: true, message: '请输入中奖概率', trigger: 'blur' }
            ],
            imageUrl: [{ required: true, message: '请选择图片', trigger: 'change' }],
            remark: [
            { required: true, message: '请输入奖品描述', trigger: 'blur' }
            ],
            status: [
            {required: true, message: '请选择状态', trigger: 'change' }
          ]
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        showImg: false,
        imgSrc: '',
        formInline: {},
        tableData: [],
        dialogTableDetail:false
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
      this.lotteryType()
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
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '150px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '220px'
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
          goodsName: this.formInline.goodsName
        }
        this.$fetch('/api/mLotteryGoods/list', parameterData).then(res => {
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
        this.form ={};
        this.imageUrl='';
        this.formInline = {}
      },
      addBtn(form) {
        this.form.imageUrl=this.imageUrl
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$post('/api/mLotteryGoods/add', this.form).then(res => {
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
        this.$fetch('/api/mLotteryGoods/remove',{
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
      getInfo(id,types) {

        this.$fetch('/api/mLotteryGoods/queryOne',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            if (types==1){
              this.dialogTableDetail = true
              res.data.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
            }else {
              this.dialogTableVisible = true
            }
            this.formtwo = res.data
            this.imageUrl = res.data.imageUrl
          }
        })
      },
      //修改的确定按钮
      update(formtwo) {
        this.formtwo.imageUrl=this.imageUrl;
        this.formtwo.createTime = '';
        this.$put('/api/mLotteryGoods/modify', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: '修改成功！' })
            this.dialogTableVisible = false
            this.accountList()
          }
        })
      },

      //奖品类型
        lotteryType(){
          this.$fetch('/api/mLotteryType/list').then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              this.lotterylist = res.data;
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
  .blue{
    color: #409eff;
  }
  .green{
    color: #13ce66;
  }
  .yellow{
    color: #e6a23c;
  }

  .red{
    color: #ff4d51;
  }

  .zi{
    color: #d8b1ee;
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

  .el-icon-plus{
    line-height:0;
  }
  .bannerAvatar-uploader-icon{
    line-height: 178px !important;
  }
</style>
