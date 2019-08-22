<template>
  <div class="game-task-wrap">
    <div class="game-task-inner">
      <div class="game-task-header">
        <h3>运营管理/任务管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="任务名称"
                        prop="level">
            <el-input placeholder="请输入任务名称"
                      v-model="formInline.taskName"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="任务类型:"
                        prop="taskType"
                        >
            <el-select style="width: 224px;"  v-model="formInline.taskType" placeholder="请选择任务类型">
              <el-option  v-for="(item,index) in tasks" :label="item.typeName" :value="item.id" :key="index"></el-option>
              <el-option label="全部类型" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-button  type="primary" plain @click="search()">查询</el-button>
          <el-button  type="success" plain @click="load()" v-if="add">添加任务</el-button>
        </el-form>
      </div>
      <div>
        <el-dialog title="添加任务" width="800px"
                   :visible.sync="dialogFormVisible">
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <div class="form">
              <el-row>
                <el-col :span="23">
                  <el-form-item label="任务名称:"
                                prop="taskName"
                                :label-width="formLabelWidth">
                    <el-input v-model="form.taskName"
                              auto-complete="off"
                              clearable
                             ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="任务类型:"
                                prop="taskType"
                                :label-width="formLabelWidth">
                    <el-select :style="styleObject"  v-model="form.taskType" placeholder="">
                      <el-option  v-for="(item,index) in tasks" :label="item.typeName" :value="item.id" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="排序:" prop="sort"
                                :label-width="formLabelWidth">
                    <el-input  v-model="form.sort"
                              auto-complete="off"
                              clearable
                              :style="styleObject"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="奖励数量:"
                                prop="reward"
                                :label-width="formLabelWidth">
                    <el-input  v-model="form.reward"
                              auto-complete="off"
                              clearable
                              :style="styleObject"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="奖励单位:"
                                prop="rewardUnit"
                                :label-width="formLabelWidth">
                    <el-select  :style="styleObject" v-model="form.rewardUnit" placeholder="">
                      <el-option label="金币" value="1"></el-option>
                      <el-option label="金猪" value="2"></el-option>
                      <el-option label="金币%" value="3"></el-option>
                      <el-option label="金猪%" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态:"
                                prop="status"
                                :label-width="formLabelWidth">
                    <el-select :style="styleObject"  v-model="form.status" placeholder="">
                      <el-option label="启用" value="1"></el-option>
                      <el-option label="禁用" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="图标类型:"
                                :label-width="formLabelWidth">
                    <el-select :style="styleObject"  v-model="form.iconType" placeholder="">
                      <el-option label="无" value="1"></el-option>
                      <el-option label="金猪" value="2"></el-option>
                      <el-option label="金币" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="20">
                  <el-form-item label="描述:"
                                prop="remark"
                                :label-width="formLabelWidth">
                    <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="form.remark"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="备注:"
                                :label-width="formLabelWidth">
                    <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="form.remarks"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="任务未完成图标:"
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

                <el-col :span="24">
                  <el-form-item label="任务完成图标:"
                                :label-width="formLabelWidth">
                    <el-upload class="bannerAvatar-uploader"
                               action="/api/upload"
                               :data="uploadData"
                               :show-file-list="false"
                               :on-success="filTaskImgSuccess"
                               :before-upload="filTaskImgUpload">
                      <img v-if="fulfilTaskImg"
                           :src="fulfilTaskImg"
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
      <div class="game-task-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    height="556">
            <el-table-column label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80' fixed="left">
            </el-table-column>
            <el-table-column fixed="left" prop="taskName"
                             label="任务名称" width="300px" >
            </el-table-column>
            <el-table-column prop="taskType"
                             label="任务类型" width="150px">
            </el-table-column>
            <el-table-column width="170px" prop="reward"
                             label="奖励数量">
            </el-table-column>

            <el-table-column prop="rewardUnit"
                             label="奖励单位" width="100px">
            </el-table-column>

            <el-table-column prop="remark" width="300px"
                             label="描述">
            </el-table-column>

            <el-table-column prop="status" width="200px"
                             label="状态" >
            </el-table-column>

            <el-table-column prop="createTime"
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
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog title="修改任务" width="800px"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="23">
                <el-form-item label="任务名称:"
                              prop="taskName"
                              :label-width="formLabelWidth">
                  <el-input v-model="formtwo.taskName"
                            auto-complete="off"
                            clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务类型:"
                              prop="taskType"
                              :label-width="formLabelWidth">
                  <el-select :style="styleObject"  v-model="formtwo.taskType" placeholder="">
                    <el-option  v-for="(item,index) in tasks" :label="item.typeName" :value="item.id" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序:"
                              :label-width="formLabelWidth">
                  <el-input  v-model="formtwo.sort"
                            auto-complete="off"
                            clearable
                            :style="styleObject"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励数量:"
                              prop="reward"
                              :label-width="formLabelWidth">
                  <el-input  v-model="formtwo.reward"
                            auto-complete="off"
                            clearable
                            :style="styleObject"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖励单位:"
                              prop="rewardUnit"
                              :label-width="formLabelWidth">
                  <el-select  :style="styleObject" v-model="formtwo.rewardUnit" placeholder="">
                    <el-option label="金币" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                    <el-option label="金币%" :value="3"></el-option>
                    <el-option label="金猪%" :value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:"
                              prop="status"
                              :label-width="formLabelWidth">
                  <el-select :style="styleObject"  v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="禁用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="图标类型:"
                              :label-width="formLabelWidth">
                  <el-select :style="styleObject"  v-model="formtwo.iconType" placeholder="">
                    <el-option label="无" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                    <el-option label="金币" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="描述:"
                              prop="remark"
                              :label-width="formLabelWidth">
                  <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="formtwo.remark"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="备注:"
                              :label-width="formLabelWidth">
                  <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="formtwo.remarks"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="任务未完成图标:"
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

              <el-col :span="24">
                <el-form-item label="任务完成图标:"
                              :label-width="formLabelWidth">
                  <el-upload class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             :on-success="filTaskImgSuccess"
                             :before-upload="filTaskImgUpload">
                    <img v-if="fulfilTaskImg"
                         :src="fulfilTaskImg"
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
        <el-dialog title="任务详情" :visible.sync="dialog" width="800px">
          <el-form>
            <el-row>
              <el-col :span="23">
                <el-form-item label="任务名称:"
                              prop="taskName"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" v-model="formtwo.taskName"
                            auto-complete="off"
                            clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务类型:"
                              prop="taskType"
                              :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject"  v-model="formtwo.taskType" placeholder="">
                    <el-option  v-for="(item,index) in tasks" :label="item.typeName" :value="item.id" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" min="0" type="number" v-model="formtwo.sort"
                            auto-complete="off"
                            clearable
                            :style="styleObject"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励数量:"
                              prop="reward"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" min="0" type="number" v-model="formtwo.reward"
                            auto-complete="off"
                            clearable
                            :style="styleObject"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="奖励单位:"
                              prop="rewardUnit"
                              :label-width="formLabelWidth">
                  <el-select :disabled="true"  :style="styleObject" v-model="formtwo.rewardUnit" placeholder="">
                    <el-option label="金币" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                    <el-option label="金币%" :value="3"></el-option>
                    <el-option label="金猪%" :value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:"
                              prop="status"
                              :label-width="formLabelWidth">
                  <el-select  :disabled="true" :style="styleObject"  v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="禁用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="图标类型:"
                              :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject"  v-model="formtwo.iconType" placeholder="">
                    <el-option label="无" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                    <el-option label="金币" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="创建时间:"  :label-width="formLabelWidth">
                <el-input :value="formtwo.createTime | formatDate"   :disabled="true" auto-complete="off" :style="styleObject" clearable></el-input>
                </el-form-item>
                </el-col>
              </el-col>

              <el-col :span="20">
                <el-form-item label="描述:"
                              prop="remark"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="formtwo.remark"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="备注:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="formtwo.remarks"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="任务未完成图标:"
                              :label-width="formLabelWidth">
                  <el-upload :disabled="true" class="bannerAvatar-uploader"
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

              <el-col :span="24">
                <el-form-item label="任务完成图标:"
                              :label-width="formLabelWidth">
                  <el-upload :disabled="true" class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             :on-success="filTaskImgSuccess"
                             :before-upload="filTaskImgUpload">
                    <img v-if="fulfilTaskImg"
                         :src="fulfilTaskImg"
                         class="avatar">
                    <i v-else
                       class="el-icon-plus bannerAvatar-uploader-icon"></i>
                  </el-upload>
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
    name: 'GameTask',
    data() {
      return {
        uploadData:{},
        imageUrl:'',
        fulfilTaskImg:'',
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
        tasks: [],
        powerTrue:false,
        optionW:'75px',
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
        imgUrl:'',
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        form: {},
        rules: {
          taskName: [
            {required: true, message: '请输入任务名称', trigger: 'blur'}
          ],
          taskType: [{required: true, message: '请选择任务类型', trigger: 'change'}],
          reward: [
            {required: true, message: '请输入奖励数量', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          sort: [
            {required: true, message: '请输入排序值', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          rewardUnit: [{required: true, message: '请选择奖励单位', trigger: 'change'}],
          status: [{required: true, message: '请选择状态', trigger: 'change'}],
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
      this.queryTaskType();
      this.uploadData={
        token:getSession("token")
      }
    },
    //过滤器
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
      }
    },
    methods: {
      clickImg(e) {
        this.showImg = true
        this.imgSrc = e.currentTarget.src
      },
      viewImg() {
        this.showImg = false
      },

      filTaskImgSuccess(res, file) {
        this.fulfilTaskImg=res.data
        console.log(res.data)
      },

      filTaskImgUpload(file) {

      },

      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
        console.log(res.data)
      },
      beforeAvatarUpload(file) {

      },
      sendTap(id,name){
        this.dialogSend =true;
        this.formsend.id = id;
        this.batchSendName = name;
        this.formsend.mobiles = '';
      },
      sendBtn(formsend) {
        this.$refs.formsend.validate(valid => {
          if (valid) {
            this.$post('/api/mTaskInfo/batchSendPassbook', this.formsend).then(res => {
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
      queryTaskType(){
        let parameterData = {
          token:getSession('token')
        }
        this.$fetch('/api/mPassbook/queryTaskType', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.tasks=res.data
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
              this.powerTrue =true;
              this.optionW = '150px'
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.powerTrue =true;
              this.optionW = '150px';
            }

            if (this.upd && this.del) {
              this.powerTrue =true;
              this.optionW = '220px';
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
        this.showImg = false;
      },

      //
      // handleAvatarSuccess(res, file) {
      //   this.imageUrl=res.data;
      // },
      beforeAvatarUpload(file) {

      },
      indexMethod(index) {
        return index * 1 + 1
      },
      // 渲染页面 获取列表
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          taskName: this.formInline.taskName,
          taskType:this.formInline.taskType,
        }
        this.$fetch('/api/mTaskInfo/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if (res.data.list[i].rewardUnit==1) {
              res.data.list[i].rewardUnit ='金币'
            }else if(res.data.list[i].rewardUnit==2) {
              res.data.list[i].rewardUnit ='金猪'
            }else if(res.data.list[i].rewardUnit==3){
              res.data.list[i].rewardUnit ='金币'
              res.data.list[i].reward = res.data.list[i].reward +'%'
            }else {
              res.data.list[i].reward = res.data.list[i].reward +'%'
              res.data.list[i].rewardUnit ='金猪'
            }

            if (res.data.list[i].status==1) {
              res.data.list[i].status ='已启用'
            }else {
              res.data.list[i].status ='已禁用'
            }

            if (res.data.list[i].taskType==1) {
              res.data.list[i].taskType ='男爵任务'
            }else if(res.data.list[i].taskType==2) {
              res.data.list[i].taskType ='子爵任务'
            }else if(res.data.list[i].taskType==3) {
              res.data.list[i].taskType ='伯爵任务'
            }else if(res.data.list[i].taskType==4) {
              res.data.list[i].taskType ='候爵任务'
            }else if(res.data.list[i].taskType==5){
              res.data.list[i].taskType ='公爵任务'
            }else if(res.data.list[i].taskType==6){
              res.data.list[i].taskType ='新手任务'
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
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      //清空添加里的各項
      load() {
        this.formInline ={};
        this.persent='';
        this.dialogFormVisible = true;
        this.form = {};
        this.imageUrl='';
        this.fulfilTaskImg='';
        this.taskTypeName = [];
        this.taskTypes='';
        this.queryTaskType();
        this.isSubmit=false;
      },
      addBtn(form) {
         this.form.taskImg = this.imageUrl;
        this.form.fulfilTaskImg = this.fulfilTaskImg;
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/mTaskInfo/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false;
              this.$message({ type: 'success', message: '添加成功！' });
              this.accountList();
            }else {
                this.$message({ type: 'error', message: res.message });
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
        this.$fetch('/api/mTaskInfo/remove',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList();
        } else {
        }
      })
      },
      getInfo(id,types) {
        if (types==2){
          this.taskTypes=[]
          this.dialogTableVisible = true
        }else {
          this.dialog =true
        }
        this.$fetch('/api/mTaskInfo/queryOne',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.formtwo = res.data;
          this.queryTaskType();
            this.imageUrl = res.data.taskImg;
            this.fulfilTaskImg = res.data.fulfilTaskImg;
          if (this.dialog){
            // this.formtwo.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
          }
        }
      })
      },
      update(formtwo) {
         this.formtwo.taskImg = this.imageUrl;
         this.formtwo.fulfilTaskImg = this.fulfilTaskImg;
        this.$put('/api/mTaskInfo/modify', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
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
  .game-task-wrap {
    width: 100%;
  }
  .game-task-inner {
    margin: auto;
    padding: 0 20px;
  }
  .game-task-header {
    margin-bottom: 20px;
  }
  .game-task-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .game-task-table {
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
