<template>
  <div class="news-notice-wrap">
    <div class="news-notice-inner">
      <div class="news-notice-header">
        <h3>消息管理/公告</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="公告标题">
            <el-input v-model="formInline.noticeTitle" placeholder="请输入公告标题" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="news-notice-table">
        <template>
          <el-table :data="tableData" height="556">
            <el-table-column fixed="left" type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="创建时间：">
                    <span>{{ props.row.createrTime }}</span>
                  </el-form-item>
                  <el-form-item label="生效时间：">
                    <span>{{ props.row.releaserTime }}</span>
                  </el-form-item>
                  <el-form-item label="失效时间：">
                    <span>{{ props.row.cancelTime }}</span>
                  </el-form-item>
                  <el-form-item label="公告类型：">
                      <span v-if="props.row.noticeType==1">文字公告</span>
                      <span v-if="props.row.noticeType==2">首页活动</span>
                      <span v-if="props.row.noticeType=3">消息活动</span>
                  </el-form-item>
                  <el-form-item label="创建人：">
                    <span>{{ props.row.createrName }}</span>
                  </el-form-item>
                  <el-form-item label="权限：">
                    <span v-if="props.row.ranges==1">全部</span>
                  </el-form-item>
                  <el-form-item label="状态：">
                    <span class="green" v-if="props.row.isRelease==1">已发布</span>
                    <span class="blue" v-if="props.row.isRelease==2">未发布</span>
                    <span class="red" v-if="props.row.isRelease=3">已失效</span>
                  </el-form-item>
                  <el-form-item label="标题：" style="width: 100%">
                    <span>{{ props.row.noticeTitle }}</span>
                  </el-form-item>
                  <el-form-item label="内容："style="width:80%;">
                    <span>{{ props.row.noticeContent }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="序号" type="index" fixed="left" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column prop="noticeTitle"  fixed="left" label="标题">
              <template slot-scope="scope">
                <div class="yichu">
                  {{scope.row.noticeTitle}}
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="left" width="250" prop="noticeContent" label="内容">
                <template slot-scope="scope">
                  <div class="yichu">
                    {{scope.row.noticeContent}}
                  </div>
                </template>
            </el-table-column>
            <el-table-column width="170" prop="createrTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column width="170" prop="releaserTime" :formatter="dateFormat" label="生效时间">
            </el-table-column>
            <el-table-column width="170" prop="cancelTime" :formatter="dateFormat" label="失效时间">
            </el-table-column>
            <el-table-column prop="noticeType" label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.noticeType==1">文字公告</span>
                <span v-if="scope.row.noticeType==2">首页活动</span>
                <span v-if="scope.row.noticeType=3">消息活动</span>
              </template>
            </el-table-column>
            <el-table-column prop="createrName" label="创建人">
            </el-table-column>
            <el-table-column label="发布状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.isRelease==1">已发布</span>
                <span class="blue" v-if="scope.row.isRelease==2">未发布</span>
                <span class="red" v-if="scope.row.isRelease==3">已失效</span>
              </template>
            </el-table-column>
            <el-table-column prop="range" label="权限">
              <template slot-scope="scope">
                <span v-if="scope.row.ranges==1">全部</span>
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
        <el-dialog title="添加公告" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="公告类型" prop="noticeType" :label-width="formLabelWidth">
                  <el-select v-model="form.noticeType" placeholder="">
                    <el-option label="文字公告" value="1"></el-option>
                    <el-option label="首页活动" value="2"></el-option>
                    <el-option label="消息活动" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否发布" prop="isPublish" :label-width="formLabelWidth">
                  <el-select v-model="form.isPublish" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="公告标题" :label-width="formLabelWidth" prop="noticeTitle">
                  <el-input v-model="form.noticeTitle" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22" v-if="form.noticeType==3 || form.noticeType==2">
                <el-form-item label="链接地址" :label-width="formLabelWidth" prop="linkAddress">
                  <el-input spellcheck="false" v-model="form.linkAddress" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22" v-if="form.noticeType==1 || form.noticeType==3">
                <el-form-item label="公告内容" prop="noticeContent" :label-width="formLabelWidth">
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.noticeContent" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="form.noticeType==2 || form.noticeType==3">
                <el-form-item label="图片:"
                              :label-width="formLabelWidth">
                  <el-upload class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                    <div class="img_loadBox" >
                      <img v-if="imageUrl"
                           :src="imageUrl"
                           class="avatar">
                      <i v-else
                         class="el-icon-plus bannerAvatar-uploader-icon"></i>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                  <el-form-item label="发布时间:" @change="selectTap(selectTime)"  :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="selectTime"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      align="left">
                    </el-date-picker>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改公告" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="公告类型"  :label-width="formLabelWidth">
                  <el-select v-model="formtwo.noticeType" placeholder="">
                    <el-option label="文字公告" :value="1"></el-option>
                    <el-option label="首页活动" :value="2"></el-option>
                    <el-option label="消息活动" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否发布"  :label-width="formLabelWidth">
                  <el-select v-model="formtwo.isPublish" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="公告标题" :label-width="formLabelWidth" >
                  <el-input v-model="formtwo.noticeTitle" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22" v-if="formtwo.noticeType==3 || formtwo.noticeType==2">
                <el-form-item label="链接地址" :label-width="formLabelWidth" >
                  <el-input spellcheck="false" v-model="formtwo.linkAddress" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22" v-if="formtwo.noticeType==1 || formtwo.noticeType==3">
                <el-form-item label="公告内容"  :label-width="formLabelWidth">
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.noticeContent" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="formtwo.noticeType==2 || formtwo.noticeType==3">
                <el-form-item label="图片:"
                              :label-width="formLabelWidth">
                  <el-upload class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                    <div class="img_loadBox">
                      <img v-if="imageUrl"
                           :src="imageUrl"
                           class="avatar">
                      <i v-else
                         class="el-icon-plus bannerAvatar-uploader-icon"></i>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>

              <el-col :span="24" >
                <el-form-item label="发布时间:"   :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="selectTime"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="left">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="公告详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <div class="box_xinxi">
              <div class="wrap_da">
                <div class="header">
                  <span>详情信息</span>
                  <span></span>
                </div>
                <div class="body_list">
                  <div class="title">发布状态:</div>
                  <div class="name">
                    <span  v-if="formtwoInfo.isRelease==1">已发布</span>
                    <span  v-if="formtwoInfo.isRelease==2">未发布</span>
                    <span  v-if="formtwoInfo.isRelease==3">已失效</span>
                   </div>
                </div>
                <div class="body_list">
                  <div class="title">公告类型:</div>
                  <div class="name">
                    <span class="badeg status_on" v-if="formtwoInfo.noticeType==1">文字公告</span>
                    <span class="badeg status_wait" v-if="formtwoInfo.noticeType==2">首页活动</span>
                    <span class="badeg status_off" v-if="formtwoInfo.noticeType==3">消息活动</span>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">权限:</div>
                  <div class="name">
                    <span v-if="formtwoInfo.ranges==1">全部</span>
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">创建时间:</div>
                  <div class="name">{{formtwoInfo.createrTime | dateFont}}</div>
                </div>
                <div class="body_list">
                  <div class="title">生效时间:</div>
                  <div class="name">{{formtwoInfo.releaserTime | dateFont}}</div>
                </div>
                <div class="body_list">
                  <div class="title">失效时间:</div>
                  <div class="name">{{formtwoInfo.cancelTime | dateFont }}</div>
                </div>
                <div class="body_list dec" style="width: 100%" >
                <div class="title">公告标题:</div>
                  <div class="name"  style="width:600px;">
                    <span class="dec" style="line-height: 30px; padding: 10px 10px">   {{formtwoInfo.noticeTitle}}</span>
                  </div>
                </div>
                <div class="body_list dec" style="width: 100%" v-if="formtwoInfo.noticeType==1 || formtwoInfo.noticeType==3" >
                  <div class="title">公告内容:</div>
                  <div class="name"  style="width:600px;">
                    <span class="dec" style="line-height: 30px; padding: 10px 10px">  {{formtwoInfo.noticeContent}}</span>
                  </div>
                </div>
                <div class="body_list dec" style="width: 100%" v-if="formtwoInfo.noticeType==3 || formtwoInfo.noticeType==2">
                  <div class="title">链接地址:</div>
                  <div class="name"  style="width:600px;">
                    <span class="dec" style="line-height: 30px; padding: 10px 0">  {{formtwoInfo.linkAddress}}</span>
                  </div>
                </div>
                <div class="body_list img" style="width: 100%" v-if="formtwoInfo.noticeType==3 || formtwoInfo.noticeType==2">
                  <div class="title">任务logo:</div>
                  <div class="name">
                    <img @click="clickImg(formtwoInfo.imgUrl)" :src="formtwoInfo.imgUrl" />
                  </div>
                </div>
              </div>
            </div>
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
    name: 'NewsNotice',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {},
        imageUrl:'',
        rules: {
          noticeTitle: [{
            required: true,
            message: '请输入公告标题',
            trigger: 'blur'
          }],
          noticeContent: [{
            required: true,
            message: '请输入公告内容',
            trigger: 'blur'
          }],
          isRelease: [{
            required: true,
            message: '请选择是否发布',
            trigger: 'change'
          }],
          noticeType: [{
            required: true,
            message: '请选择公告类型',
            trigger: 'change'
          }],
          isPublish: [{
            required: true,
            message: '请选择是否发布',
            trigger: 'change'
          }],
          temps: [{
            required: true,
            message: '请选择发布时间',
            trigger: 'change'
          }],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        uploadData:{},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        selectTime: [],
        showImg:false,
        isSubmit:false,
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
    filters: {
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
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
      selectTap(time){
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
          noticeTitle: this.formInline.noticeTitle
        }
        this.$fetch('/api/appNotice/list', parameterData).then(res => {
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
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
        this.imageUrl = "";
        this.selectTime=[];
        this.isSubmit=false;
      },
      addBtn(form) {
        if (this.selectTime && this.selectTime[0]) {
          this.form.releaserTime = this.selectTime[0].getTime();
        }else {
          this.form.releaserTime = ''
        }
        if (this.selectTime && this.selectTime[1]) {
          this.form.cancelTime = this.selectTime[1].getTime();
        }else {
          this.form.cancelTime = ''
        }
        this.form.imgUrl = this.imageUrl;
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/appNotice/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false;
              this.$message({
                type: 'success',
                message: '添加成功！'
              })
              this.accountList();
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
        this.$fetch('/api/appNotice/delete', parameterData).then(res => {
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
        this.$fetch('/api/appNotice/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            let  arr =[]
            if (res.data.releaserTime) {
              let releaserTime = new Date(res.data.releaserTime);
              arr.push(releaserTime)
            }
            if (res.data.cancelTime) {
              let cancelTime = new Date(res.data.cancelTime);
              arr.push(cancelTime)
            }
            if (res.data.releaserTime && res.data.cancelTime) {
              this.selectTime = arr;
              console.log(this.selectTime)
            }
            this.imageUrl = res.data.imgUrl
          this.formtwo = res.data;
        }
      })
      },
      update(formtwo) {
        if (this.selectTime && this.selectTime[0]) {
          this.formtwo.releaserTime = this.selectTime[0].getTime();
        }else {
          this.formtwo.releaserTime = ''
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formtwo.cancelTime = this.selectTime[1].getTime();
        }else {
          this.formtwo.cancelTime = ''
        }
        this.formtwo.imgUrl = this.imageUrl;

        this.$put('/api/appNotice/update', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogTableVisible = false
          this.accountList()
        }else {
            this.$message({
              type: 'danger',
              message: res.message
            })
          }
      })
      },
      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/api/appNotice/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          res.data.createrTime =  formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss')
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
    },
  }
</script>
<style type="text/css">
  .yichu{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .red{
    color: #ff4d51;
  }
  .green{
    color: #13ce66;
  }
  .blue{
    color: #409EFF;
  }
  .news-notice-wrap {
    width: 100%;
  }

  .news-notice-inner {
    margin: auto;
    padding: 0 20px;
  }

  .news-notice-header {
    margin-bottom: 20px;
  }

  .news-notice-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .news-notice-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
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

  .img_loadBox{
    width: 148px;
    height: 148px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

  }

  .avatar {
    max-width: 148px;
    max-height: 148px;
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

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>
