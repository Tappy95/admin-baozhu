<template>
  <div class="channel-manage-wrap">
    <div class="channel-manage-inner">
      <div class="channel-manage-header">
        <h3>第三方/渠道管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="渠道标识:">
              <el-input v-model="formInline.channelCode" placeholder="请输入渠道标识" auto-complete="off"  clearable>
              </el-input>
            </el-form-item>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          <el-button type="primary" @click="loadChannel()" v-if="addChannelName">添加渠道名称</el-button>
        </el-form>
      </div>
      <div class="channel-manage-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column fixed="left" width="200"  prop="channelCode" label="渠道标识">
            </el-table-column>
            <el-table-column width="300"  prop="channelName"  label="渠道名称">
            </el-table-column>
            <el-table-column min-width="500" prop="content" label="注册地址">
            </el-table-column>
            <el-table-column width="150px" prop="status" label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">已启用</span>
                <span class="red" v-if="scope.row.status==2">已停用</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog title="添加渠道名称" :visible.sync="dialogChannel" width="600px">
          <el-form :model="formChannel" :rules="rules" ref="formChannel">
            <el-row>
              <el-col :span="20">
                <el-form-item label="渠道名称:" :label-width="formLabelWidth" prop="channelName">
                  <el-input style="300px" v-model="formChannel.channelName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChannel = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addChannel('formChannel')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加渠道" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="渠道标识:" :label-width="formLabelWidth" prop="channelCode">
                  <el-input :style="styleObject"  v-model="form.channelCode" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="渠道名称:" :label-width="formLabelWidth" prop="channelId">
                  <el-select  :style="styleObject" v-model="form.channelId" placeholder="">
                    <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="payEdit">
                <el-form-item label="开启微信支付:" prop="openWx" :label-width="formLabelWidth">
                  <el-select :style="styleObject"  v-model="form.openWx" placeholder="">
                    <el-option label="开启" value="1"></el-option>
                    <el-option label="关闭" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12"  v-if="payEdit">
                <el-form-item label="开启支付宝支付:" prop="openAli" :label-width="formLabelWidth">
                  <el-select :style="styleObject"  v-model="form.openAli" placeholder="">
                    <el-option label="开启" value="1"></el-option>
                    <el-option label="关闭" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="form.openWx==1">
                <el-form-item label="微信支付appId:" :label-width="formLabelWidth">
                  <el-input spellcheck="false"   v-model="form.wxAppId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="form.openWx==1">
                <el-form-item label="微信支付mchId:" :label-width="formLabelWidth">
                  <el-input spellcheck="false"  v-model="form.mchId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="form.openWx==1">
                <el-form-item label="微信支付apiKey:"  :label-width="formLabelWidth" >
                  <el-input  spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.apiKey" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="form.openAli==1">
                <el-form-item label="支付宝appId:"  :label-width="formLabelWidth" >
                  <el-input   spellcheck="false"  v-model="form.aliAppId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="form.openAli==1">
                <el-form-item label="支付宝私钥:"  :label-width="formLabelWidth" >
                  <el-input  spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"  v-model="form.aliPrivateKey" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="23" v-if="form.openAli==1">
                <el-form-item label="支付宝公钥:"  :label-width="formLabelWidth" >
                  <el-input  spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.aliPublicKey" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.status" placeholder="">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改渠道" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="渠道标识:" :label-width="formLabelWidth" prop="channelCode">
                  <el-input :style="styleObject"  v-model="formtwo.channelCode" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="渠道名称:" :label-width="formLabelWidth" prop="channelId">
                  <el-select  :style="styleObject" v-model="formtwo.channelId" placeholder="">
                    <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="payEdit">
                <el-form-item label="开启微信支付:" prop="openWx" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.openWx" placeholder="">
                    <el-option label="开启" :value="1"></el-option>
                    <el-option label="关闭" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="payEdit">
                <el-form-item  label="开启支付宝支付:" prop="openAli" :label-width="formLabelWidth">
                  <el-select  :style="styleObject" v-model="formtwo.openAli" placeholder="">
                    <el-option label="开启" :value="1"></el-option>
                    <el-option label="关闭" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="formtwo.openWx==1 && payEdit">
                <el-form-item label="微信支付appId:" :label-width="formLabelWidth">
                  <el-input  spellcheck="false"  v-model="formtwo.wxAppId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="formtwo.openWx==1 && payEdit">
                <el-form-item label="微信支付mchId:" :label-width="formLabelWidth">
                  <el-input  spellcheck="false"   v-model="formtwo.mchId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="formtwo.openWx==1 && payEdit">
                <el-form-item label="微信支付apiKey:"  :label-width="formLabelWidth" >
                  <el-input  spellcheck="false"   type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.apiKey" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="formtwo.openAli==1 && payEdit">
                <el-form-item label="支付宝appId:"  :label-width="formLabelWidth" >
                  <el-input   spellcheck="false"  v-model="formtwo.aliAppId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="23" v-if="formtwo.openAli==1 && payEdit">
                <el-form-item label="支付宝私钥:"  :label-width="formLabelWidth" >
                  <el-input  spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"  v-model="formtwo.aliPrivateKey" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="23" v-if="formtwo.openAli==1 && payEdit">
                <el-form-item label="支付宝公钥:"  :label-width="formLabelWidth" >
                  <el-input   spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.aliPublicKey" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="状态:" prop="status" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="渠道详情" :visible.sync="dialogTableDetail" width="1000px">
          <el-form :model="formtwoInfo">
            <el-row >
              <div class="box_xinxi">
                <div class="wrap_da">
                  <div class="header">
                    <span>详情信息</span>
                    <span></span>
                  </div>
                  <div class="body_list">
                    <div class="title">渠道标识:</div>
                    <div class="name">
                      {{formtwoInfo.channelCode}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">渠道名称:</div>
                    <div class="name">
                      <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.channelId" placeholder="">
                        <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelName" :value="item.id"></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="body_list" v-if="payEdit">
                    <div class="title">开启微信支付:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.openWx==1">开启中</span>
                      <span v-if="formtwoInfo.openWx==2">已关闭</span>
                    </div>
                  </div>
                  <div class="body_list" v-if="payEdit">
                    <div class="title">开启支付宝支付:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.openAli==1">开启中</span>
                      <span v-if="formtwoInfo.openAli==2">已关闭</span>
                    </div>
                  </div>

                  <div class="body_list">
                    <div class="title">状态:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.status==1">启用中</span>
                      <span v-if="formtwoInfo.status==2">已停用</span>
                    </div>
                  </div>
                  <div class="body_list">
                    <div class="title">创建时间:</div>
                    <div class="name">
                      {{formtwoInfo.createTime}}
                    </div>
                  </div>

                  <div class="header" v-if="formtwoInfo.openWx==1 && payEdit">
                    <span>微信支付</span>
                    <span></span>
                  </div>
                  <div class="body_list dec" v-if="formtwoInfo.openWx==1 && payEdit" style="width: 100%" >
                    <div class="title">微信支付appId:</div>
                    <div class="name">
                      <span class="dec">{{formtwoInfo.wxAppId}}</span>
                    </div>
                  </div>
                  <div class="body_list dec" v-if="formtwoInfo.openWx==1 && payEdit" style="width: 100%" >
                    <div class="title">微信支付mchId:</div>
                    <div class="name">
                      <span class="dec">{{formtwoInfo.mchId}}</span>
                    </div>
                  </div>
                  <div class="body_list dec" v-if="formtwoInfo.openWx==1 && payEdit" style="width: 100%" >
                    <div class="title">微信支付apiKey:</div>
                    <div class="name">
                      <span class="dec">{{formtwoInfo.apiKey}}</span>
                    </div>
                  </div>

                  <div class="header" v-if="formtwoInfo.openAli==1 && payEdit">
                    <span>支付宝</span>
                    <span></span>
                  </div>

                  <div class="body_list dec" v-if="formtwoInfo.openAli==1 && payEdit" style="width: 100%" >
                    <div class="title">支付宝appId:</div>
                    <div class="name">
                      <span class="dec">{{formtwoInfo.aliAppId}}</span>
                    </div>
                  </div>

                  <div class="body_list dec" v-if="formtwoInfo.openAli==1 && payEdit" style="width: 100%" >
                    <div class="title">支付宝私钥:</div>
                    <div class="name">
                      <span class="dec">{{formtwoInfo.aliPrivateKey}}</span>
                    </div>
                  </div>

                  <div class="body_list dec" v-if="formtwoInfo.openAli==1 && payEdit" style="width: 100%" >
                    <div class="title">支付宝公钥:</div>
                    <div class="name">
                      <span class="dec">{{formtwoInfo.aliPublicKey}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
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
  import BigImg from './BigImg'

  export default {
    name: 'ChannelManage',
    data() {
      return {
        uploadData:{},
        styleObject: {
          width: '200px',
        },
        w_input:'200px',
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        payEdit:false,
        addChannelName:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        dialogChannel:false,
        formtwoInfo:{},
        form: {
          channelName:'',
          openAli:2,
          openWx:2
        },
        formChannel:{
        },
        imageUrl: '',
        rules: {
          channelPosition: [{
            required: true,
            message: '请输入渠道推广位置',
            trigger: 'blur'
          }],
          channelCode: [{
            required: true,
            message: '请输入渠道标识',
            trigger: 'blur'
          }],
          channelName: [{
            required: true,
            message: '请输入渠道名称',
            trigger: 'blur'
          }],
          channelId: [{
            required: true,
            message: '请输入渠道名称',
            trigger: 'blur'
          }],
         channelPushType: [{
            required: true,
            message: '请选择推广方式',
            trigger: 'change'
          }],
          content: [{
            required: true,
            message: '请输入banner、url/投放文字',
            trigger: 'blur'
          }],
          downloadUrl: [{
            required: true,
            message: '请输入下载链接',
            trigger: 'blur'
          }],
          status: [{
              required: true,
              message: '请选择状态',
              trigger: 'change'
            }],
          channelName: [{
            required: true,
            message: '请输入渠道名称',
            trigger: 'blur'
          }],
         openAli: [{
            required: true,
            message: '请选择是否开启支付宝支付',
            trigger: 'change'
         }],
          openWx: [{
            required: true,
            message: '请选择是否开启微信支付',
            trigger: 'change'
          }],
        },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          lotteryPlayedTplId:1
        },
        tableData: [],
        isShow: false,
        channelNameList:[],
        showImg:false,
        isSubmit:false,
      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id;
      this.uploadData={
        token:getSession("token")
      }
      this.queryBtns();
      //调取名称列表
      this.channelList();
      this.accountList();
    },
    methods: {
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

      //权限
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {

              if(res.data[i].btnCode == 'addChannelName') {
                this.addChannelName=true
              }
              if(res.data[i].btnCode == 'payEdit') {
                this.payEdit=true
              }

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
          channelCode: this.formInline.channelCode
        }
        this.$fetch('/api/mChannelInfo/list', parameterData).then(res => {
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
      //渠道
      load() {
        this.form={};
        this.dialogFormVisible = true;
        this.imageUrl = "";
        this.isSubmit=false;
      },
      //渠道名称
      loadChannel() {
        this.formChannel = {};
        this.dialogChannel = true;
        this.isSubmit=false;
      },
      //调取名称列表
      channelList(){
        this.$fetch('/api/mChannel/list',{
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.channelNameList = res.data;
          }
        })
      },
      //添加渠道名称
      addChannel(formChannel) {
        this.$refs[formChannel].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/mChannel/add', this.formChannel).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogChannel = false
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.channelList()
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
      //添加渠道
      addBtn(form) {
          //无修改支付权限时
        if (!this.payEdit){
          this.form.openAli =2;
          this.form.openWx =2;
        }
        //将加号替换为%2B
        if (this.form.aliPublicKey && this.form.aliPublicKey.indexOf('+')!=-1){
          this.form.aliPublicKey = this.form.aliPublicKey.replace(/\+/g,"%2B");
        }
        //将加号替换为%2B
        if (this.form.aliPrivateKey && this.form.aliPrivateKey.indexOf('+')!=-1){
          this.form.aliPrivateKey = this.form.aliPrivateKey.replace(/\+/g,"%2B");
        }
        if (this.form.channelPushType==1) {
          this.form.content = this.imageUrl
        }
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/mChannelInfo/add', this.form).then(res => {
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
          id: id
        }
        this.$fetch('/api/mChannelInfo/remove', parameterData).then(res => {
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
        this.imageUrl='';
        //修改前查询基本信息
        this.dialogTableVisible = true;
        this.$fetch('/api/mChannelInfo/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
            this.imageUrl = this.formtwo.content
          }
        })
      },
      update(formtwo) {
        if (this.formtwo.channelPushType==1) {
          this.formtwo.content = this.imageUrl
        }

        //将加号替换为%2B
        if (this.formtwo.aliPublicKey && this.formtwo.aliPublicKey.indexOf('+')!=-1){
          this.formtwo.aliPublicKey = this.formtwo.aliPublicKey.replace(/\+/g,"%2B")
        }

        //将加号替换为%2B
        if (this.formtwo.aliPrivateKey && this.formtwo.aliPrivateKey.indexOf('+')!=-1){
          this.formtwo.aliPrivateKey = this.formtwo.aliPrivateKey.replace(/\+/g,"%2B")
        }

        this.$put('/api/mChannelInfo/modify', this.formtwo).then(res => {
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
      getOne(id){
        this.imageUrl='';
        this.dialogTableDetail = true;
        this.$fetch('/api/mChannelInfo/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.createTime =  formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
            this.imageUrl = res.data.content;
            this.formtwoInfo = res.data
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
  .channel-manage-wrap {
    width: 100%;
  }

  .channel-manage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .channel-manage-header {
    margin-bottom: 20px;
  }

  .channel-manage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .channel-manage-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }

  .channel-manage-wrap .box_xinxi .body_list.dec .name {
    width: 750px;
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
