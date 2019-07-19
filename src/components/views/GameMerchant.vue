<template>
  <div class="bannermanage-wrap">
    <div class="bannermanage-inner">
      <div class="bannermanage-header">
        <h3>第三方/商户列表</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-button  type="success" plain @click="load()" v-if="add">添加商户</el-button>
        </el-form>
      </div>
      <div>
        <el-dialog title="添加方法" width="700px"
                   :visible.sync="dialogMethod">
          <el-form :model="formMethod"
                   :rules="rules"
                   ref="formsend">
            <div class="form">
              <el-form-item label="商户名称:"
                            label-width="140px" prop="name">
                <el-select style="width: 200px" v-model="formMethod.companyId" @change="changeLocationValue"  placeholder="" >
                  <el-option v-for="(item,index) in company" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>

              </el-form-item>
              <el-form-item label="接口名称:"
                            label-width="140px" prop="interfaceName">
                <el-input v-model="formMethod.interfaceName"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label="接口代码:"
                            label-width="140px" prop="interfaceCode">
                <el-input v-model="formMethod.interfaceCode"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label="基础地址:"
                            label-width="140px" prop="baseUrl">
                <el-input v-model="formMethod.baseUrl"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label-width="140px" label="请求类型:" prop="reqType">
                  <el-select style="width: 200px" v-model="formMethod.reqType" placeholder="" >
                    <el-option label="get" value="1"></el-option>
                    <el-option label="post" value="2"></el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label-width="140px" label="是否循环:"  prop="isCycle">
                <el-select style="width: 200px" v-model="formMethod.isCycle" placeholder="" >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogMethod = false">取 消</el-button>
            <el-button type="primary"
                       @click="methodBtn('formMethod')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加商户" width="600px"
                   :visible.sync="dialogFormVisible">
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <div class="form">
              <el-row>
                 <el-col :span="24">
                   <el-form-item label="商户名称:"
                                 prop="name"
                                 :label-width="formLabelWidth">
                     <el-input v-model="form.name"
                               auto-complete="off"
                               clearable
                               style="width: 400px"></el-input>
                   </el-form-item>
                 </el-col>

                <el-col :span="24">
                  <el-form-item label="公司简称:"
                                prop="name"
                                :label-width="formLabelWidth">
                    <el-input v-model="form.shortName"
                              auto-complete="off"
                              clearable
                              style="width: 400px"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="商户描述:"
                                prop="remark"
                                :label-width="formLabelWidth">
                    <el-input  type="textarea"
                               :autosize="{ minRows: 6, maxRows:12}"
                               v-model="form.remark"
                               auto-complete="off"
                               clearable
                               style="width: 400px"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                <el-form-item label="logo"
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

                <el-col :span="18" style="margin-bottom: 10px">
                  <el-form-item prop="h5Type" label="游戏列表类型:" :label-width="formLabelWidth">
                    <el-select v-model="form.h5Type"  placeholder="">
                      <el-option label="我方列表" value="1"></el-option>
                      <el-option label="他方列表" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="18" style="margin-bottom: 10px">
                  <el-form-item prop="status" label="状态:" :label-width="formLabelWidth">
                    <el-select v-model="form.status"  placeholder="">
                      <el-option label="启用" value="1"></el-option>
                      <el-option label="停用" value="2"></el-option>
                    </el-select>
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
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
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
            <el-table-column fixed="left" prop="name"
                             label="名称" width="200px" >
            </el-table-column>
            <el-table-column width="300px"  prop="remark"
                             label="描述">
            </el-table-column>
            <el-table-column width="200px" label="logo">
              <template slot-scope="scope">
                <img :src='scope.row.imageUrl'
                     style="max-width: 45px;max-height: 45px"
                     @click="clickImg(scope.row.imageUrl)">
              </template>
            </el-table-column>
            <el-table-column  prop="h5Type"
                              label="游戏列表类型">
            </el-table-column>
            <el-table-column  prop="status"
                              label="状态">
            </el-table-column>
            <el-table-column prop="createTime" width="200px"
                             label="创建时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button  type="info" plain size="mini" @click="getInfo(scope.row.id,1)"
                >详情</el-button>
                <el-button  type="warning" plain size="mini"
                           @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button  type="success" plain @click="getInfo(scope.row.id,2)"
                           size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="修改商户" width="600px"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="24">
                <el-form-item label="商户名称:"
                              prop="name"
                              :label-width="formLabelWidth">
                  <el-input v-model="formtwo.name"
                            auto-complete="off"
                            clearable
                            style="width: 400px"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="公司简称:"
                              prop="name"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" v-model="formtwo.shortName"
                            auto-complete="off"
                            clearable
                            style="width: 400px"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="商户名称:"
                              prop="remark"
                              :label-width="formLabelWidth">
                  <el-input  type="textarea"
                             :autosize="{ minRows: 6, maxRows:12}"
                             v-model="formtwo.remark"
                             auto-complete="off"
                             clearable
                             style="width: 400px"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item label="logo"
                              :label-width="formLabelWidth">
                  <el-upload  class="bannerAvatar-uploader"
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

              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item prop="h5Type" label="游戏列表类型:" :label-width="formLabelWidth">
                  <el-select v-model="formtwo.h5Type"  placeholder="">
                    <el-option label="我方列表" :value="1"></el-option>
                    <el-option label="他方列表" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item prop="status" label="状态:" :label-width="formLabelWidth">
                  <el-select v-model="formtwo.status"  placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
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
        <el-dialog title="商户详情" :visible.sync="dialog" width="600px">
          <el-form>
            <el-row>
              <el-col :span="24">
                <el-form-item label="商户名称:"
                              prop="name"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" v-model="formtwo.name"
                            auto-complete="off"
                            clearable
                            style="width: 400px"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="公司简称:"
                              prop="name"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" v-model="formtwo.shortName"
                            auto-complete="off"
                            clearable
                            style="width: 400px"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="商户名称:"
                              prop="remark"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true"  type="textarea"
                             :autosize="{ minRows: 6, maxRows:12}"
                             v-model="formtwo.remark"
                             auto-complete="off"
                             clearable
                             style="width: 400px"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item label="logo:"
                              :label-width="formLabelWidth">
                    <img v-if="imageUrl"
                         :src="imageUrl"
                         @click="clickImg(imageUrl)"
                         class="avatar">
                  <span v-else>暂无</span>
                    <!--<i v-else-->
                       <!--class="el-icon-plus bannerAvatar-uploader-icon"></i>-->
                </el-form-item>
              </el-col>
              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item prop="h5Type" label="游戏列表类型:" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="formtwo.h5Type"  placeholder="">
                    <el-option label="我方列表" :value="1"></el-option>
                    <el-option label="他方列表" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item prop="status" label="状态:" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="formtwo.status"  placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
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
    name: 'GameMerchant',
    data() {
      return {
        uploadData:{},
        ruleForm:{
        options:[],
      },
        company:[],
        batchSendName:'',
        formsendPhone:'',
        batchSend:'',
        formMethod:{
          // mobiles:''
        },
        dialogMethod:false,
        dialog:false,
        taskTypes:[],
        persent:'',
        taskTypeName:[],
        checkedCities1: [],
        cities: [],
        powerTrue:false,
        optionW:'150px',
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
        form: {},
        rules: {
            name: [
              { required: true, message: '请输入商户名称', trigger: 'blur' }
            ],
            remark: [
              { required: true, message: '请输入商户描述', trigger: 'blur' }
            ],
            interfaceName: [
              { required: true, message: '请输入接口名称', trigger: 'blur' }
            ],
            interfaceCode: [
              { required: true, message: '请输入接口代码', trigger: 'blur' }
            ],
            baseUrl: [
              { required: true, message: '请输入基础地址', trigger: 'blur' }
            ],
            reqType: [
              { required: true, message: '请选择请求类型', trigger: 'change' }
            ],
            h5Type: [
              { required: true, message: '请选择游戏列表类型', trigger: 'change' }
            ],
            status: [
             { required: true, message: '请选择状态', trigger: 'change' }
            ],
            imageUrl: [{ required: true, message: '请选择logo', trigger: 'change' }],

            shortName: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
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
      clickImg(img) {
        this.showImg = true;
        this.imgSrc = img;
      },
      viewImg() {
        this.showImg = false
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {
      },
      changeLocationValue(val){
        let obj = {};
        obj = this.company.find((item)=>{
          return item.id === val;
       });
        this.formMethod.name = obj.name
      },
      companyList() {
            this.$fetch('/api/tpCompany/queryOpt').then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                   this.company = res.data;
            }else{
              this.$message({
                type: 'error',
                message: res.message,
                duration: 3000
              })
            }
          })
     },

      addMethod(){
         this.formMethod ={};
         this.dialogMethod = true;
         this.companyList();
      },
      methodBtn(formMethod) {
        this.$refs.formsend.validate(valid => {
          if (valid) {
            this.$post('/api/tpInterface/add', this.formMethod).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogMethod = false
              this.$message({ type: 'success', message: '添加成功！' })
            }else{
              this.$message({
                type: 'error',
                message: res.message,
                duration: 3000
              })
            }
          })
          } else {
          }
        })
      },

      sendTap(id,name){
        this.dialogSend =true;
        this.formsend.id = id;
        this.batchSendName = name;
        this.formsend.mobiles = '';
      },

      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      },

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
              this.optionW = '160px'
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.powerTrue =true;
              this.optionW = '160px'
            }

            if (this.upd && this.del) {
              this.powerTrue =true;
              this.optionW = '230px'
            }
          }
        } else {
        }
      })
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        }
        this.$fetch('/api/tpCompany/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].h5Type == '1') {
              res.data.list[i].h5Type = '我方列表'
            } else if(res.data.list[i].h5Type == '2') {
              res.data.list[i].h5Type = '他方列表'
            }

            if(res.data.list[i].status == '1') {
              res.data.list[i].status = '已启用'
            } else if(res.data.list[i].status == '2') {
              res.data.list[i].status = '已停用'
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
        this.formInline ={};
        this.dialogFormVisible = true
        this.form = {}
        this.imageUrl =''
      },
      addBtn(form) {
        // console.log(this.imageUrl)
        this.form.imageUrl=this.imageUrl
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$post('/api/tpCompany/add', this.form).then(res => {
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
        this.$fetch('/api/tpCompany/remove',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList()
        } else {
        }
      })
      },
      getInfo(id,types) {
        if (types ==1) {
          this.dialog = true
        }else {
          this.dialogTableVisible = true
        }
        this.$fetch('/api/tpCompany/queryOne',{
          id: id
        }).then(res => {
          this.formtwo = res.data
          this.imageUrl = res.data.imageUrl
      })
      },
      update(formtwo) {
        this.formtwo.imageUrl=this.imageUrl
        this.$put('/api/tpCompany/modify', this.formtwo).then(res => {
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
