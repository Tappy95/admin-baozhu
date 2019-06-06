<template>
  <div class="bannermanage-wrap">
    <div class="bannermanage-inner">
      <div class="bannermanage-header">
        <h3>运营管理/卡券</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="卡券名称"
                        prop="level">
            <el-input placeholder="请输入卡券名称"
                      v-model="formInline.passbookName"
                      clearable></el-input>
          </el-form-item>
          <el-button  type="primary" plain @click="search()">查询</el-button>
          <el-button  type="success" plain @click="load()" v-if="add">添加卡券</el-button>
        </el-form>
      </div>
      <div>

        <el-dialog title="卡券发送" width="700px"
                   :visible.sync="dialogSend">
          <el-form :model="formsend"
                   :rules="rules"
                   ref="formsend">
            <div class="form">
              <el-form-item label="卡券名称:"
                            label-width="140px">
                <el-input v-model="batchSendName"
                          auto-complete="off"
                          clearable
                          style="width: 224px;" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="填写接收人号码:"
              prop="mobiles"
              label-width="140px">
                  <el-input
                  type="textarea"
                  :autosize="{ minRows: 12, maxRows: 20}"
                  placeholder="请输入内容"
                  v-model="formsend.mobiles"
                  >
                  </el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogSend = false">取 消</el-button>
            <el-button type="primary"
                       @click="sendBtn('formsend')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加卡券" width="800px"
                   :visible.sync="dialogFormVisible">
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <div class="form">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="卡券名称:"
                                prop="passbookName"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" v-model="form.passbookName"
                              auto-complete="off"
                              clearable
                             ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="卡券类型:"
                                prop="passbookType"
                                :label-width="formLabelWidth">
                    <el-select :style="styleObject"  @change="typeChange(form.passbookType)" v-model="form.passbookType" placeholder="">
                      <el-option label="翻倍券" value="1"></el-option>
                      <el-option label="折扣券" value="2"></el-option>
                      <el-option label="加成券" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="有效期(天):"
                                prop="useDay"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" min="0" type="number" v-model="form.useDay"
                              auto-complete="off"
                              clearable
                             ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="折扣值:"
                                prop="passbookValue"
                                :label-width="formLabelWidth">
                    <el-input style="width: 180px" min="0" type="number" v-model="form.passbookValue"
                              auto-complete="off"
                              clearable
                             ></el-input>
                    {{persent}}
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="是否发放:"
                                prop="regSend"
                                :label-width="formLabelWidth">
                    <el-select :style="styleObject"  v-model="form.regSend" placeholder="">
                      <el-option label="是" value="2"></el-option>
                      <el-option label="否" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="描述:"
                                prop="remark"
                                :label-width="formLabelWidth">
                    <el-input  type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="form.remark"
                              auto-complete="off"
                              clearable
                              ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                </el-col>
              </el-row>

              <el-form-item label="适用任务类型:"
                            prop=""
                            :label-width="formLabelWidth">
              </el-form-item>

              <el-form-item label="">
                <el-checkbox-group style="margin-top: -30px;"
                  v-model="taskTypeName">
                  <el-checkbox v-for="(item,index) in cities" :label="item.id" :key="index">{{item.typeName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
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
                             min-width='80' fixed="left">
            </el-table-column>
            <el-table-column fixed="left" prop="passbookName"
                             label="卡券名称" min-width="200px" >
            </el-table-column>
            <el-table-column prop="passbookType"
                             label="卡券类型" min-width="150px">
            </el-table-column>
            <el-table-column min-width="170px" prop="useDay"
                             label="有效期（天）">
            </el-table-column>

            <el-table-column prop="passbookValue"
                             label="折扣值" min-width="100px">
            </el-table-column>

            <el-table-column prop="regSend" min-width="200px"
                             label="是否注册发放">
            </el-table-column>

            <el-table-column prop="taskTypeName"
                             label="适用任务类型" min-width="200px">
            </el-table-column>

            <el-table-column prop="remark"
                             label="描述" min-width="300px">
            </el-table-column>

            <el-table-column prop="createTime" min-width="200px"
                             label="创建时间" :formatter="dateFormat">
            </el-table-column>

            <el-table-column fixed="right"
                             label="操作"
                              :width="optionW">
              <template slot-scope="scope">
                <el-button  type="info" plain size="mini" @click="getInfo(scope.row.id,1)"
                          >详情</el-button>

                <el-button  type="warning" plain size="mini"
                           @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button  type="success" plain @click="getInfo(scope.row.id,2)"
                           size="mini" v-if="upd">修改</el-button>
                <el-button  type="primary" plain v-if="send" @click="sendTap(scope.row.id,scope.row.passbookName)"
                           size="mini">发送</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog title="修改卡券" width="700px"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
        <div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="卡券名称:"
                              prop="passbookName"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" v-model="formtwo.passbookName"
                            auto-complete="off"
                            clearable
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="卡券类型:"
                              prop="passbookType"
                              :label-width="formLabelWidth">
                  <el-select :style="styleObject"  @change="typeChange(formtwo.passbookType)" v-model="formtwo.passbookType" placeholder="">
                    <el-option label="翻倍券" :value="1"></el-option>
                    <el-option label="折扣券" :value="2"></el-option>
                    <el-option label="加成券" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="有效期(天):"
                              prop="useDay"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" min="0" type="number" v-model="formtwo.useDay"
                            auto-complete="off"
                            clearable
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="折扣值:"
                              prop="passbookValue"
                              :label-width="formLabelWidth">
                  <el-input style="width: 180px" min="0" type="number" v-model="formtwo.passbookValue"
                            auto-complete="off"
                            clearable
                  ></el-input>
                  {{persent}}
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否发放:"
                              prop="regSend"
                              :label-width="formLabelWidth">
                  <el-select :style="styleObject"  v-model="formtwo.regSend" placeholder="">
                    <el-option label="是" :value="2"></el-option>
                    <el-option label="否" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="描述:"
                              prop="remark"
                              :label-width="formLabelWidth">
                  <el-input  type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="formtwo.remark"
                             auto-complete="off"
                             clearable
                  ></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            <el-form-item label="适用任务类型:"
              prop=""
              :label-width="formLabelWidth">
            </el-form-item>

            <el-form-item label=""
              prop="taskTypeName"
              >
              <el-checkbox-group style="margin-top: -30px;margin-left: 20px"
              v-model="taskTypes">
               <el-checkbox  v-for="(item,index) in cities" :label="item.id"  :key="item.id">{{item.typeName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
        </div>

          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="卡券详情" :visible.sync="dialog" width="800px">
          <el-form>
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="卡券名称:" :label-width="formLabelWidth">
                  <el-input :value="formtwo.passbookName" :style="styleObject" :disabled="true" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="卡券类型:" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" @change="typeChange(formtwo.passbookType)" v-model="formtwo.passbookType" placeholder="">
                    <el-option label="翻倍券" :value="1"></el-option>
                    <el-option label="折扣券" :value="2"></el-option>
                    <el-option label="加成券" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="有效期（天）:" :label-width="formLabelWidth">
                  <el-input :value="formtwo.useDay" :disabled="true" auto-complete="off" :style="styleObject" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="折扣值:"  :label-width="formLabelWidth">
                  <el-input :value="formtwo.passbookValue" :disabled="true" auto-complete="off" style="width: 180px" clearable></el-input>
                  {{persent}}
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="是否发放:"
                              prop="regSend"
                              :label-width="formLabelWidth">
                  <el-select  :disabled="true" style="width: 196px;" v-model="formtwo.regSend" placeholder="">
                    <el-option label="是" :value="2"></el-option>
                    <el-option label="否" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="创建时间:"  :label-width="formLabelWidth">
                  <el-input :value="formtwo.createTime"  :formatter="dateFormat" :disabled="true" auto-complete="off" :style="styleObject" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24" style="margin-bottom: 10px">
                <el-form-item label="描述:"
                              prop="remark"
                              :label-width="formLabelWidth">
                  <el-input type="textarea" :disabled="true" :autosize="{ minRows: 4, maxRows: 8}" v-model="formtwo.remark"
                            auto-complete="off"
                            clearable
                  ></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-form-item label="适用任务类型:"
                            prop=""
                            :label-width="formLabelWidth">
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label=""
                            prop="taskTypeName"
              >
                <el-checkbox-group disabled style="margin-top: -30px;margin-left: 20px"
                                   v-model="taskTypes">
                  <el-checkbox  v-for="(item,index) in cities" :label="item.id"  :key="item.id">{{item.typeName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
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
    name: 'CardVoucher',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        batchSendName:'',
        formsendPhone:'',
        batchSend:'',
        formsend:{
          mobiles:''
        },
        dialogSend:false,
        dialog:false,
        taskTypes:[],
        persent:'',
        taskTypeName:[],
        checkedCities1: [],
        cities: [],
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        send:false,
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
          passbookName: [
            {required: true, message: '请输入卡券名称', trigger: 'blur'}
          ],
          passbookType: [{required: true, message: '请选择卡券类型', trigger: 'change'}],
          useDay: [
            {required: true, message: '请输入有效期', trigger: 'blur'}
          ],
          mobiles: [
            {required: true, message: '请输入接收人', trigger: 'blur'}
          ],
          passbookValue: [
            {required: true, message: '请输入折扣值', trigger: 'blur'}
          ],
          taskTypes: [{required: true, message: '请选择卡券类型', trigger: 'change'}],
          regSend: [{required: true, message: '请选择是否发放', trigger: 'change'}],
          remark: [
            {required: true, message: '请输入描述', trigger: 'blur'}
          ],
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
    },
    methods: {
      sendTap(id,name){
        this.dialogSend =true;
        this.formsend.id = id;
        this.batchSendName = name;
        this.formsend.mobiles = '';
      },
      sendBtn(formsend) {
        this.$refs.formsend.validate(valid => {
          if (valid) {
            this.$post('/api/mPassbook/batchSendPassbook', this.formsend).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogSend = false
              this.$message({ type: 'success', message: '发送成功！' })
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

      typeChange(typeVale){
        if (typeVale==1){
          this.persent ='倍'
        }else {
          this.persent ='%'
        }
      },
      queryTaskType(){
        let parameterData = {
          token:getSession('token')
        }
        this.$fetch('/api/mPassbook/queryTaskType', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.cities =res.data
        }
          else {
        }
      })
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
              // this.powerTrue =true;
              this.optionW = '160px'
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              // this.powerTrue =true;
              this.optionW = '160px'
            }

            if(res.data[i].btnCode == 'send') {
              this.send=true;
              // this.powerTrue =true;
              this.optionW = '160px'
            }

            if (this.upd && this.del || this.upd && this.send || this.del && this.send) {
              // this.powerTrue =true;
              this.optionW = '250px'
            }

            if (this.upd && this.del && this.send) {
              // this.powerTrue =true;
              this.optionW = '290px'
            }
          }
        } else {
            // this.powerTrue =false;
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
          passbookName: this.formInline.passbookName
        }
        this.$fetch('/api/mPassbook/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
              if (res.data.list[i].passbookType==1) {
                res.data.list[i].passbookType ='翻倍券'
              }else if(res.data.list[i].passbookType==2){
                res.data.list[i].passbookType ='折扣券'
              }else {
                res.data.list[i].passbookType ='加成券'
              }

            if (res.data.list[i].regSend==1) {
              res.data.list[i].regSend ='否'
            }else {
              res.data.list[i].regSend ='是'

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
        this.persent='';
        this.dialogFormVisible = true
        this.form = {}
        this.imageUrl=''
        this.taskTypeName = [];
        this.taskTypes='';
        this.queryTaskType();
         this.formInline = {};
      },
      addBtn(form) {

        var selecType = ''
        for (let i=0; i<this.taskTypeName.length;i++){
          if(selecType!=''){
            selecType+= ','
          }
          selecType+= this.taskTypeName[i]
        }
       this.form.taskTypes = selecType
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$post('/api/mPassbook/add', this.form).then(res => {
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
        this.$fetch('/api/mPassbook/remove',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList()
        } else {
        }
      })
      },
      //修改
      getInfo(id,types) {
        this.taskTypes=[]
        if (types==2){
          this.dialogTableVisible = true
        }else {
          this.dialog =true
        }
        this.$fetch('/api/mPassbook/queryOne',{
          id: id
        }).then(res => {
          if(res.data.mPassbook.passbookType ==1){
            this.persent = '倍'
          }else{
          this.persent = '%'
        }

          this.formtwo = res.data.mPassbook //基本信息

        if (this.dialog){
          this.formtwo.createTime = formatDate(new Date(res.data.mPassbook.createTime), 'yyyy-MM-dd hh:mm:sss')
        }

        for(let i=0;i<res.data.rsPassbookTasks.length;i++){
           this.taskTypes.push(res.data.rsPassbookTasks[i].taskTypeId)
        }
        this.queryTaskType();
      })
      },
      update(formtwo) {
        var selecType = ''
        for (let i=0; i<this.taskTypes.length;i++){
          if(selecType!=''){
            selecType+= ','
          }
          selecType+=this.taskTypes[i]
        }
        this.formtwo.taskTypes =selecType;
        this.$put('/api/mPassbook/modify', this.formtwo).then(res => {
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

</style>
