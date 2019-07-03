<template>
  <div class="bannermanage-wrap">
    <div class="bannermanage-inner">
      <div class="bannermanage-header">
        <h3>第三方/平台任务</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="任务名称:">
            <el-input placeholder="请输入任务名称"
                      v-model="formInline.name"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="是否上下架:">
            <el-select v-model="formInline.isUpper" clearable placeholder="请选择是否上下架">
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否是签到赚任务:">
            <el-select v-model="formInline.isSignin" clearable placeholder="请选择是否上下架">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="taskGetTap()" v-if="taskGet">获取任务</el-button>
        </el-form>
      </div>
      <div>
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

            <el-table-column prop="name"
                             min-width="200"
                             label="任务名称" fixed="left" >
            </el-table-column>

            <el-table-column
                             min-width="120"
                             label="任务logo">
              <template slot-scope="scope">
                <img :src='scope.row.logo'
                     style="max-width: 50px;max-height: 45px;cursor: pointer;"
                     @click="clickImg($event)">
              </template>
            </el-table-column>

            <el-table-column min-width="150"
                             label="任务类型" >
              <template slot-scope="scope">
                <span  v-if="scope.row.typeId==1">高额收益</span>
                <span  v-if="scope.row.typeId==2">下载注册</span>
                <span  v-if="scope.row.typeId==3">实名认证</span>
                <span  v-if="scope.row.typeId==4">超简单</span>
                <span  v-if="scope.row.typeId==5">其他</span>
              </template>
            </el-table-column>
            <el-table-column min-width="300"
                             label="任务标签">
              <template slot-scope="scope">
                <span class="span_label" v-for="(item,index) in scope.row.label">{{item}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="100" prop="reward"
                             label="奖励(￥)"  >
            </el-table-column>
            <el-table-column min-width="150" prop="channelTaskNumber"
                             label="渠道任务数"  >
            </el-table-column>
            <el-table-column min-width="170" prop="surplusChannelTaskNumber"
                             label="剩余渠道任务数"  >
            </el-table-column>
            <el-table-column min-width="120"
                             label="上下架状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.isUpper==1">上架中</span>
                <span class="red" v-if="scope.row.isUpper==2">已下架</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170"
                             label="是否是签到赚任务" >
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.isSignin==1">是</span>
                <span class="blue" v-if="scope.row.isSignin==2">否</span>
              </template>
            </el-table-column>
            <el-table-column prop="taskChannel"
                             min-width="120"
                             label="任务渠道"  >
            </el-table-column>
            <el-table-column prop="createTime"
                             :formatter="dateFormat"
                             min-width="170"
                             label="创建时间"  >
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作" :width="optionW" >
              <template slot-scope="scope">
                <el-button type="info" plain size="mini"
                           @click="getInfo(scope.row.id,1)">详情</el-button>
                <el-button type="warning" plain size="mini"
                           @click="getInfo(scope.row.id,2)" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog width="800px" title="任务详情"
                   :visible.sync="dialogTableDetail">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="24">
                <el-form-item label="任务标签:"
                              :label-width="formLabelWidth">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false">
                    {{tag}}
                  </el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item v-if="channelCode=='baozhu'" label="是否上架:"
                              prop="isUpper"
                              :label-width="formLabelWidth">
                  <el-switch :disabled="true"
                             v-model="formtwo.isUpper"
                             active-color="#13ce66"
                             inactive-color="#ccc"
                             :active-text="formtwo.isUpper==1?'是':'否'"
                             inactive-text=""
                             :active-value="1"
                             :inactive-value="2">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否签到赚任务:"
                              prop="isSignin"
                              :label-width="formLabelWidth">
                  <el-switch :disabled="true"
                             v-model="formtwo.isSignin"
                             active-color="#13ce66"
                             inactive-color="#ccc"
                             :active-text="formtwo.isSignin==1?'是':'否'"
                             inactive-text=""
                             :active-value="1"
                             :inactive-value="2">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务渠道:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true"  :style="styleObject" v-model="formtwo.taskChannel"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="渠道任务数:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true"  :style="styleObject" v-model="formtwo.channelTaskNumber"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="剩余渠道任务数:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" v-model="formtwo.surplusChannelTaskNumber"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务类型:"  prop="typeId" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwo.typeId" clearable placeholder="请选择任务类型">
                    <el-option label="高额收益" :value="1"></el-option>
                    <el-option label="下载注册" :value="2"></el-option>
                    <el-option label="实名认证" :value="3"></el-option>
                    <el-option label="其他" :value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖励(￥):"
                              prop="reward"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" type="number" min="0" :style="styleObject" v-model="formtwo.reward"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建时间:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true"  :style="styleObject" v-model="formtwo.createTime"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24"></el-col>
              <el-col :span="21">
                <el-form-item label="任务名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :disabled="true" v-model="formtwo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="任务名称:" :label-width="formLabelWidth" prop="name">
                    <el-card class="card-box" :body-style="{ padding: '0px' }">
                      <img  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="card-img">
                    </el-card>
                </el-form-item>

                <!--<el-form-item label="任务logo:"-->
                              <!--prop="imageUrl"-->
                              <!--:label-width="formLabelWidth">-->
                  <!--<el-upload class="bannerAvatar-uploader"-->
                             <!--:disabled="true"-->
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
              </el-col>

            </el-row>
          </el-form>
        </el-dialog>
        <el-dialog width="600px" title="修改任务"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否上架:"
                              prop="isUpper"
                              :label-width="formLabelWidth">
                  <el-switch
                    v-model="formtwo.isUpper"
                    active-color="#13ce66"
                    inactive-color="#ccc"
                    :active-text="formtwo.isUpper==1?'是':'否'"
                    inactive-text=""
                    :active-value="1"
                    :inactive-value="2">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否是签到赚任务:"
                              prop="isSignin">
                  <el-switch
                    v-model="formtwo.isSignin"
                    active-color="#13ce66"
                    inactive-color="#ccc"
                    :active-text="formtwo.isSignin==1?'是':'否'"
                    inactive-text=""
                    :active-value="1"
                    :inactive-value="2">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
          <big-img v-if="showImg"
                   @clickit="viewImg"
                   :imgSrc="imgSrc">
          </big-img>
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
        dynamicTags:[],
        taskGet:false,
        uploadData:{},
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        upd:false,
        imageUrl: '',
        dialogTableDetail: false,
        dialogTableVisible:false,
        formtwo: {},
        dialogFormVisible: false,
        form: {},
        lotterylist:[],
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        showImg: false,
        imgSrc: '',
        formInline: {},
        tableData: [],
        dialogTableDetail:false,
        taskList:[],
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        styleObject: {
          width: '200px',
        },
        lableArr:[],
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
      this.channelCode=getSession("channelCode");
    },
    methods: {
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'taskGet') {
                this.taskGet=true;
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
                this.optionW = '150px';
              }
            }
          } else {
          }
        })
      },
      clickImg(e) {
        this.showImg = true
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
      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      //任务类型
      taskType(){
        this.$post('/api/taskType/list').then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.taskList = res.data;
          }
        })
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          isSignin: this.formInline.isSignin,
          isUpper: this.formInline.isUpper,
          name: this.formInline.name
        }
        this.$fetch('/api/tpTaskInfo/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
                  if (res.data.list[i].label){
                    res.data.list[i].label = res.data.list[i].label.split(',')
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

      handleSizeChange(val) {
        this.pageSize = val
        this.accountList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.accountList()
      },
      //任务步骤
      handleSizeChangeStep(val) {
        this.pageSizeStep = val
        this.stepTap(this.stepId);
      },
      handleCurrentChangeStep(val) {
        this.currentPageStep = val;
        this.stepTap(this.stepId);
      },
      viewImg() {
        this.showImg = false
      },

      //获取任务
      taskGetTap(){
        this.$fetch('/api/tpTaskInfo/getTasks',{
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message:'任务获取成功'})
            this.accountList();
          } else {
            this.$message({ type: 'success', message: res.message })
          }
        })
      },

      //点击修改获取信息
      getInfo(id,types) {
        this.$fetch('/api/tpTaskInfo/queryOne',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            if (types==1){
              if (res.data.label) {
              this.dynamicTags = res.data.label.split(',')
              }
              this.dialogTableDetail = true;
              res.data.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss');
              this.imageUrl = res.data.logo;
            }else {
              this.dialogTableVisible = true;
            }
            this.formtwo = res.data;
          }
        })
      },

      //修改的确定按钮
      update(formtwo) {
        this.$put('/api/tpTaskInfo/modify', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: '修改成功！' })
            this.dialogTableVisible = false
            this.accountList()
          }
        })
      },


    }
  }
</script>
<style type="text/css">
  .point{
    cursor: pointer;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .blue{
    color: #409EFF;
  }
  .green{
    color: #67c23a;
  }
  .yellow{
    color: #e6a23c;
  }

  .red{
    color: #f56c6c;
  }
  .w-box{
    width: 100%;
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

  .box_img{
    height: auto;
    width: 560px;
    min-height: 178px;
    border: 1px solid #dcdfe6;
    float: left;
    background-color: #f5f7fa;
    /*display: block;*/
    position: relative;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
  }

  .box_img .box_min{
    width: 148px;
    height: 148px;
    margin-bottom: 10px;
    border: 1px dashed #ccc;
    float: left;
    margin: 5px;
    position: relative;
  }

  .box_img img{
    max-width: 148px;
    max-height: 148px;
  }
  .box_img .box_min img.avatar{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: auto;
    height: auto;
    max-width:100%;
    padding: 5px;
    max-height: 148px;
  }

  .card-box {
    width: 200px;
    height: 200px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius:4px;
  }

  .card-box .card-img{
    max-width: 200px;
    max-height: 200px;
    border-radius:4px;
  }
  span.span_label{
    font-size: 12px;
    display: inline-block;
    padding: 2px 7px;
    /*color: #fff;*/
    margin: 0 5px;
    border-radius: 5px;
  }
  span.span_label:nth-child(1),
  span.span_label:nth-child(5){
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
  }
  span.span_label:nth-child(2),
  span.span_label:nth-child(6) {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
  span.span_label:nth-child(3),
  span.span_label:nth-child(7){
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
  span.span_label:nth-child(4),
  span.span_label:nth-child(8){
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }

</style>
