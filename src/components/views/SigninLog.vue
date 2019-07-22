<template>
  <div class="signinlog-wrap">
    <div class="signinlog-inner">
      <div class="signinlog-header">
        <h3>运营管理/签到赚任务记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item  label="用户Id:">
            <el-input v-model="formInline.accountId" placeholder="请输入用户Id" clearable></el-input>
          </el-form-item>
          <el-form-item> <el-button type="primary" plain @click="search()">查询</el-button></el-form-item>
          <div class="sign_tip">默认无数据，请输入id查询</div>
        </el-form>
      </div>
      <div class="signinlog-table">
        <template>
          <el-table :data="tableData" v-loading="loading">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="200px" fixed="left" prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column min-width="150px" prop="signDay" label="签到天数">
            </el-table-column>
            <el-table-column min-width="150px" prop="gameCount" label="游戏任务数量">
            </el-table-column>
            <el-table-column min-width="120px" prop="reward" label="奖励金额">
            </el-table-column>
            <el-table-column min-width="120px" prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">待补签</span>
                <span v-if="scope.row.status==2">可进行</span>
                <span v-if="scope.row.status==3">完成待领取</span>
                <span v-if="scope.row.status==4">已领取</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120px" label="修改时间">
              <template slot-scope="scope">
                <span v-if="scope.row.updateTime>0">{{scope.row.updateTime | dateFont}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120px" prop="createTime"  :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" :width="optionW" v-if="optionT">
              <template slot-scope="scope">
                <el-button type="warning" plain v-if="signT"  @click=getInfo(scope.row.id) size="mini" >签到任务</el-button>
                <el-button type="success" plain v-if="upd"  @click=editTap(scope.row.id) size="mini" >修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <el-dialog :visible.sync="dialogTable" width="1200px">
        <template>
          <el-table
            :data="tableList"
            style="width: 100%; height: auto;max-height: 660px">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column prop="gameName"  label="游戏名称" ></el-table-column>
            <el-table-column prop="createTime"   label="领取任务时间">
              <template slot-scope="scope">
                <span v-if="scope.row.createTime>0">{{scope.row.createTime | dateFont}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column  label="完成时间">
              <template slot-scope="scope">
                <span v-if="scope.row.finishTime>0">{{scope.row.finishTime | dateFont}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="reward"  label="金币数"></el-table-column>
            <el-table-column prop="status" width="120" label="状态">
              <template slot-scope="scope">
                <span class="" v-if="scope.row.status==1">未完成</span>
                <span v-if="scope.row.status==2">已完成</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" v-if="childel" :width="oChildW" >
              <template slot-scope="scope">
                <el-button type="warning" plain  @click=Delete(scope.row.id) size="mini" >删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>
        <div class="block list_footer" >
          <el-pagination @size-change="handleSizeChangeInfo" @current-change="handleCurrentChangeInfo" :current-page="currentPageInfo" :page-sizes="[10, 20, 50, 70]" :page-size="pageSizeInfo" layout="total, sizes, prev, pager, next, jumper" :total="totalCountInfo">
          </el-pagination>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogEdit" width="600px">
        <el-form v-model="formEdit">
          <el-row>
            <el-col :span="22" >
              <el-form-item label="状态:":label-width="formLabelWidth">
                <el-select v-model="formEdit.status" placeholder="">
                  <el-option label="待补签" :value="1"></el-option>
                  <el-option label="进行中" :value="2"></el-option>
                  <el-option label="待领取" :value="3"></el-option>
                  <el-option label="已领取" :value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editBtn(formEdit)">确 定</el-button>
        </div>
      </el-dialog>
      <!--<div class="block">-->
        <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">-->
        <!--</el-pagination>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  export default {
    name: 'SigninLog',
    data() {
      return {
        channelNameList:[],
        menuId:'',
        formLabelWidth: '120px',
        exportExle:false,
        currentPageInfo: 1,
        pageSizeInfo: 10,
        totalCountinfo:0,
        formInline: {},
        tableData: [],
        dialogTable:false,
        tableList:[],
        currtId:'',
        loading:false,
        signT:false,
        upd:false,
        optionW:'',
        optionT:false,
        oChildW:'',
        childel:false,
        dialogEdit:false,
        formEdit:{},
        rules: {
          status: [{required: true, message: '请选择状态', trigger: 'change' }],
        },
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
    },
    filters: {
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
    },
    methods: {
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
      editTap(id){
        let parameterData = {
          id:id
        }
        this.$fetch('/api/userSignin/info', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.dialogEdit = true;
            this.formEdit = res.data;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },

      //修改
      editBtn(formEdit) {
            let parameterData = {
              id:this.formEdit.id,
              status:this.formEdit.status
            }
            this.$post('/api/userSignin/update',parameterData).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogEdit = false;
                this.$message({ type: 'success', message: '添加成功！' })
                this.accountList()
              }else {
                this.$message({ type: 'warning', message: res.message})
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
        this.$fetch('/api/userSignin/deleteGame',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: '删除成功！' })
            this.getInfo(this.currtId);
          } else {
            this.$message({ type: 'error', message: res.message })
          }
        })
      },
      //获取信息
      getInfo(id) {
        this.currtId = id;
        let parameterData = {
          pageNum: this.currentPageInfo,
          pageSize: this.pageSizeInfo,
          signinId:id
        }
        this.$fetch('/api/userSignin/gameList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableList = res.data.list;
            this.totalCountInfo = res.data.total;
            this.dialogTable = true;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },
      accountList() {
        this.tableData= [];
        if (!this.formInline.accountId){
          this.$message({type: 'warning', message:'请输入用户Id', duration: 3000})
          return false
        }
        this.loading = true;
        let parameterData = {
          accountId:this.formInline.accountId
        }
        this.$fetch('/api/userSignin/pageList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.loading =false;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'signT') {
                this.signT =true;
                this.optionW='100';
                this.optionT=true
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd =true;
                this.optionW='75';
                this.optionT=true
              }

              if (this.upd && this.signT) {
                this.optionW='175';
              }

              if(res.data[i].btnCode == 'childel') {
                this.childel =true;
                this.oChildW='75';
              }
            }
          } else {
          }
        })
      },
      search() {
        this.accountList();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.accountList();
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.accountList();
      },
      handleSizeChangeInfo(val) {
        this.pageSizeInfo = val;
        this.tableList();
      },
      handleCurrentChangeInfo(val) {
        this.currentPageInfo = val;
        this.tableList();
      },
    },
  }
</script>
<style type="text/css">
  .list_footer{
    margin: 20px;
  }
  .mar_bottom{
    margin-bottom: 20px;
  }
  .signinlog-wrap {
    width: 100%;
  }

  .signinlog-inner {
    margin: auto;
    padding: 0 20px;
  }

  .signinlog-header {
    margin-bottom: 20px;
  }

  .signinlog-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .signinlog-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }

  .sign_tip{
    font-size: 14px;
    color: #67c23a;
    margin-bottom: 10px;
  }

</style>
