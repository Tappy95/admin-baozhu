<template>
  <div class="daren-manage-wrap">
    <div class="daren-manage-inner">
      <div class="daren-manage-header">
        <h3>达人管理/达人管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户Id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户Id" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话号码:">
            <el-input v-model="formInline.mobile" placeholder="请输入电话号码" clearable></el-input>
          </el-form-item>

          <el-form-item label="设置达人时间:">
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
          <el-form-item><el-button type="primary" plain @click="search()">查询</el-button></el-form-item>
          <el-form-item><el-button type="success" plain @click="addTap()" v-if="addDR" >添加达人</el-button></el-form-item>
          <el-form-item><el-button type="warning" plain class="mar_bottom" @click="queryExport()" v-if="Exlexport">导出表格</el-button></el-form-item>
        </el-form>
      </div>
      <div class="daren-manage-table">
        <template>
          <el-table :data="tableData" height="558"  v-loading="loading">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column fixed="left" min-width="150"  prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column width="150"  prop="userName" label="达人姓名">
            </el-table-column>
            <el-table-column width="170"  prop="channelCode" label="渠道">
            </el-table-column>
            <el-table-column width="170"  prop="qualityScore" label="质量分">
              <template slot-scope="scope">
                <span :class="scope.row.qualityScore<=40?'red':'green'">{{scope.row.qualityScore}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170"  prop="activityScore" label="活跃度">
            </el-table-column>
            <el-table-column width="150"  prop="apprenticeCount" label="下级人数">
            </el-table-column>
            <el-table-column width="150" prop="reward" label="总收益">
              <template slot-scope="scope">
                <span class="red">{{scope.row.reward | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column  width="150" prop="firstReward" label="首个任务奖励">
              <template slot-scope="scope">
                <span>{{scope.row.firstReward | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column  width="150" prop="secondReward" label="后续任务奖励">
              <template slot-scope="scope">
                <span>{{scope.row.secondReward | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column  width="150" prop="taskCount" label="徒弟完成任务数">
            </el-table-column>
            <el-table-column  width="150" prop="apprenticeReward" label="徒弟任务奖励">
              <template slot-scope="scope">
                <span>{{scope.row.apprenticeReward | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column  width="170" prop="coin" label="余额">
              <template slot-scope="scope">
                <span class="green">{{scope.row.coin | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column  width="170" prop="darenTime" label="达人设置时间">
              <template slot-scope="scope">
                <span v-if="scope.row.darenTime>0">{{scope.row.darenTime | datetime}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            </el-table-column>
            <!--:width="optionW"-->
            <el-table-column fixed="right" label="操作" :width="optionW" >
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.userId)" size="mini">详情</el-button>
                <el-button type="danger" plain size="mini" @click="cancelTap(scope.row.accountId)" v-if="cancelDR">取消身份</el-button>
                <el-button type="success" plain v-if="editScore" @click="getHyd(scope.row.userId,scope.row.qualityScore,scope.row.activityScore)" size="mini">活跃度分</el-button>
                <el-button type="warning" v-if="scope.row.openActivity==1 && openActive" plain @click="showHyd(scope.row.userId,2)" size="mini">
                  <span v-if="optionW='370'"></span>展示活跃度</el-button>
                <el-button type="warning" v-if="scope.row.openActivity==2 && openActive" plain @click="showHyd(scope.row.userId,1)" size="mini">
                  <span v-if="optionW='370'"></span>不展示活跃度</el-button>
                <!--openActivity：是否打开活跃度展示（1-不展示 2-展示）-->
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加用户为达人" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="16">
                <el-form-item label="达人Id" :label-width="formLabelWidth" prop="accountId">
                  <el-input v-model="form.accountId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改活跃度分" :visible.sync="dialogTableHyd" width="700px">
          <el-form :model="formhyd" :rules="rules" ref="formhyd">
            <el-row>
              <el-col :span="19">
                <el-form-item label="质量分:" prop="qualityScore" :label-width="formLabelWidth">
                  <el-input v-model="formhyd.qualityScore" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="活跃度:" prop="activityScore" :label-width="formLabelWidth">
                  <el-input :style="styleObject" v-model="formhyd.activityScore" auto-complete="off"  clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <!--<el-button @click="dialogTableHyd = false">取 消</el-button>-->
            <el-button type="primary" @click="update('formhyd')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="详情" :visible.sync="dialogTableDetail" width="1200px">
          <el-form :inline="true" :model="formDetail" class="demo-form-inline">
            <el-form-item label="用户Id:">
              <el-input v-model="formDetail.taccountId" placeholder="请输入用户Id" clearable></el-input>
            </el-form-item>
            <el-form-item label="任务名称:">
              <el-input v-model="formDetail.taskName" placeholder="请输入任务名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="任务顺序:" >
              <el-select  v-model="formDetail.taskType" placeholder="">
                <el-option label="首个任务" value="1"></el-option>
                <el-option label="后续任务" value="2"></el-option>
                <el-option label="全部" value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间:">
              <el-date-picker
                v-model="selectTimeDetail"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="left">
              </el-date-picker>
            </el-form-item>
            <el-form-item><el-button type="primary" plain @click="searchDetail()">查询</el-button></el-form-item>
          </el-form>
        <template>
          <el-table :data="formtwoInfo" max-height="578">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column fixed="left"  prop="taccountId" label="用户Id">
            </el-table-column>
            <el-table-column   prop="userName" label="姓名">
            </el-table-column>
            <el-table-column   prop="daccountId" label="所属达人id">
            </el-table-column>
            <el-table-column  prop="qrCode" label="达人邀请码">
            </el-table-column>
            <el-table-column  prop="taskName" label="任务名称">
            </el-table-column>
            <el-table-column   prop="taskType" label="任务顺序">
              <template slot-scope="scope">
                <span v-if="scope.row.taskType==1">首个任务</span>
                <span v-if="scope.row.taskType==2">后续任务</span>
              </template>
            </el-table-column>
            <el-table-column   prop="apprenticeReward" label="奖励金币">
              <template slot-scope="scope">
                <span>{{scope.row.apprenticeReward | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column  prop="reward" label="贡献奖励">
              <template slot-scope="scope">
                <span>{{scope.row.reward | currencyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column  width="170" prop="createTime" label="创建时间">
              <template slot-scope="scope">
                <span v-if="scope.row.createTime>0">{{scope.row.createTime | datetime}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
          </el-table>
        </template>

          <div class="sun_sty" style="margin-top: 10px" v-if="tableData">
            <p>总奖励<span>：</span>[ {{rewardSum |currencyNum }} ]</p>
          </div>
          <div class="block" style="margin-top: 10px">
            <el-pagination @size-change="handleSizeChangeDetail" @current-change="handleCurrentChangeDetail" :current-page="currentPageDetail" :page-sizes="[10, 20, 50, 70]" :page-size="pageSizeDetail" layout="total, sizes, prev, pager, next, jumper" :total="totalCountDetail">
            </el-pagination>
          </div>
        </el-dialog>
      </div>
      <div class="block mar_bot">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  import { getSession } from '../../utils/cookie'
  export default {
    name: 'DarenManage',
    data() {
      return {
        powerTrue:false,
        optionW:'75',
        menuId:'',
        showT:false,
        addDR:false,
        cancelDR:false,
        Exlexport:false,
        openActive:false,
        editScore:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogTableHyd: false,
        dialogTableDetail:false,
        formtwoInfo:[],
        form: {
          accountId:''
        },
        formhyd:{
          qualityScore:'',
          activityScore:'',
          userId:''
        },
        currentId:'',
        formLabelWidth: '140px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        currentPageDetail: 1,
        pageSizeDetail: 10,
        totalCountDetail: 0,
        formInline: {},
        tableData: [],
        rules: {
          accountId: [{required: true, message: '请输入达人Id', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          qualityScore: [{required: true, message: '请输入质量分', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value) || (value <0 || value>100)) {
                  callback(new Error("请输入0至100的正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}
          ],
          activityScore: [{required: true, message: '请输入活跃度', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                   let  n = 2,
                        a2 = value,
                        a1 =0;
                    if(typeof a2 !== 'string'){
                      a2 = a2.toString();
                    }
                   if (a2.includes('.')) {
                     a1 = a2.split('.')[1].length;
                   }
                if ((value>1 || value<0) || a1>n) {
                  callback(new Error("请输入0至1之间的数(只保留小数点后两位)"));
                }else{
                  callback();
                }
                
              }, trigger:'blur'}
          ],
    },
        styleObject:{
          width:'200px'
        },
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
        selectTime: '',
        fullscreenLoading:false,
        formDetail:{},
        selectTimeDetail:'',
        rewardSum:'',
        isSubmit:false,
        loading:false,
      }
    },

    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currencyNum: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
      datetime: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
      },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
    },
    methods: {
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'Exlexport') {
                this.Exlexport=true;
              }
              if(res.data[i].btnCode == 'addDR') {
                this.addDR=true;
              }
              if(res.data[i].btnCode === 'cancelDR') {
                this.cancelDR=true;
                this.optionW = '170'
              }
              if(res.data[i].btnCode === 'editScore') {
                this.editScore=true;
                this.optionW = '170'
              }
              if(res.data[i].btnCode === 'openActive') {
                this.openActive=true;
              }
              if (this.editScore && this.cancelDR) {
                this.optionW='260'
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
        this.loading =true;
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          darenTime_start:this.formInline.darenTime_start,
          darenTime_end:this.formInline.darenTime_end,
          accountId:this.formInline.accountId,
          mobile:this.formInline.mobile
        }
        this.$fetch('/api/userInfo/drList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            this.loading =false;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
            this.loading =false;
          }
        })
      },
      search() {
        //起始时间
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.darenTime_start =new Date(this.selectTime[0]).getTime();
        }else {
          this.formInline.darenTime_start = ''
        }
        //结束时间
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.darenTime_end = new Date(this.selectTime[1]).getTime();
        }else {
          this.formInline.darenTime_end = ''
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      searchDetail() {
        //起始时间
        if (this.selectTimeDetail && this.selectTimeDetail[0]) {
          this.formDetail.startTime =new Date(this.selectTimeDetail[0]).getTime();
        }else {
          this.formDetail.startTime = ''
        }
        //结束时间
        if (this.selectTimeDetail && this.selectTimeDetail[1]) {
          this.formDetail.endTime = new Date(this.selectTimeDetail[1]).getTime();
        }else {
          this.formDetail.endTime = ''
        }
        this.currentPageDetail = 1;
        this.pageSizeDetail = 10;
        this.getOne(this.currentId);
      },
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
      },

      //活跃度弹框
      getHyd(userId,qualityScore,activityScore){
         this.dialogTableHyd = true;
         this.formhyd.userId = userId;
        this.formhyd.qualityScore = qualityScore;
        this.formhyd.activityScore = activityScore;
        console.log(this.formhyd)
      },

      update(formhyd) {
        this.$refs[formhyd].validate(valid => {
          if(valid) {
            this.$put('/api/userActivity/modifyScore', this.formhyd).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.dialogTableHyd = false;
                this.accountList();
              }
            })
          }
        })
      },

      addTap(id) {
        this.isSubmit =false;
        this.dialogTableVisible = true;
      },
      getOne(userId){
        this.dialogTableDetail = true;
        this.currentId= userId;
        let parameterData = {
          pageNum: this.currentPageDetail,
          pageSize: this.pageSizeDetail,
          userId: this.currentId,
          taccountId: this.formDetail.taccountId,
          taskName: this.formDetail.taskName,
          taskType: this.formDetail.taskType,// 任务顺序（1-首个任务 2-后续任务）
          startTime: this.formDetail.startTime,//起始时间
          endTime: this.formDetail.endTime//结束时间
        }

        this.$fetch('/api/darenRewardDetail/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwoInfo = res.data.list;
            this.totalCountDetail = res.data.total;
            this.rewardSum = res.data.rewardSum;
          }
        })
      },
      cancelTap(id) {
        this.$confirm('此操作将永久取消该达人身份, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.cancelFun(id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      },
      cancelFun(id) {
        let parameterData = {
          accountId : id
        }
        this.$fetch('/api/userInfo/cancleDR', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '取消达人身份成功！'
            })
            this.accountList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      },

      //是否展示活跃度
      showHyd(userid,types){
        let funType = '';
        if (types==2){
           funType = '展示活跃度';
        } else if (types==1) {
           funType = '不展示活跃度';
        }

        this.$confirm('此操作将'+funType+'是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            let parameterData = {
              userId: userid,
              openActivity:types,
            }
            this.$post('/api/userActivity/openActivity', parameterData).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: funType+'操作成功！'
                })
                this.accountList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      },


      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/userInfo/setDR', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogTableVisible = false
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

      //导出表格
      queryExport() {
        this.search();
        //开启正在导出弹层
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: '正在导出...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.formInline.token=getSession("token");
        this.formInline.channel=getSession("channelCode");
        this.formInline.relation= getSession("userRelation");
        let url ='/api/excl/drExcl';
        this.doDownload(this.formInline,url);
      },

      doDownload(from,url){
        let keys=[];
        let data=[];
        for (var i in from) {
          if(from[i]!=null && from[i]!='') {
            keys.push(i)
            data.push(from[i])
          }
        }
        let http=url;
        for(let i=0;i<keys.length;i++){
          if(http==url){
            http=http+'?'+keys[i]+'='+ data[i]
          }else{
            http=http+'&'+keys[i]+'='+ data[i]
          }
        }
        let a1 = document.createElement('a');
        a1.setAttribute('href',http);
        let body = document.querySelector('body');
        body.appendChild(a1);
        a1.click();
        a1.remove();
        //关闭正在导出弹层
        setTimeout(() => {
          this.fullscreenLoading.close();
        }, 9000);
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.accountList();
      },
      handleSizeChangeDetail(val) {
        this.pageSizeDetail = val;
        this.getOne(this.currentId);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.accountList();
      },
      handleCurrentChangeDetail(val) {
        this.currentPageDetail = val;
        this.getOne(this.currentId);
      },
    },
  }
</script>
<style type="text/css">

  .red{
    color: #ff4d51;
  }
  .green{
    color: #13ce66;
  }

  .yellow{
    color: #E6A23C;
  }

  .mar_bot{
    margin-bottom: 20px;
  }

  .daren-manage-wrap {
    width: 100%;
  }

  .daren-manage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .daren-manage-header {
    margin-bottom: 20px;
  }

  .daren-manage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .daren-manage-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
