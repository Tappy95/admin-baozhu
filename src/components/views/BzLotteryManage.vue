<template>
  <div class="ba-lottery-manage-wrap">
    <div class="ba-lottery-manage-inner">
      <div class="ba-lottery-manage-header">
        <h3>宝猪28/开奖管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="期数">
            <el-input v-model="formInline.timeNo" placeholder="请输入期数" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="formInline.status" placeholder="请选择状态">
              <el-option label="未开奖" value="1"></el-option>
              <el-option label="已开奖" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="ba-lottery-manage-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" fixed="left" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" width="150" prop="timeNo" label="期数">
            </el-table-column>
            <el-table-column  prop="resultNum"  label="开奖结果">
            </el-table-column>
            <el-table-column width="150" prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">未开奖</span>
                <span v-if="scope.row.status==2">已开奖</span>
              </template>
            </el-table-column>
            <el-table-column width="170"  label="开奖时间">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">-</span>
                <span v-else>{{scope.row.updateTime | dateFont}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="endDate" label="结束时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd && scope.row.status==1 && scope.row.lockStatus==2">修改</el-button>
                <el-button type="warning" plain @click="lockTaps(scope.row.id,1)" size="mini" v-if="lock && scope.row.lockStatus==2 && scope.row.status==1"><span v-if="optionW='155'"></span>解锁</el-button>
                <el-button type="danger" plain @click="lockTaps(scope.row.id,2)" size="mini" v-if="lock && scope.row.lockStatus==1 && scope.row.status==1"><span v-if="optionW='155'"></span>锁定</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="修改" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="18">
                <el-form-item label="期号:" :label-width="formLabelWidth">
                  <el-input  :readonly="true" v-model="formtwo.timeNo" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="结果:" :label-width="formLabelWidth" >
                  <el-input placeholder="示例：1,2,3,4" v-model="formtwo.resultNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
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
    name: 'BzLotteryManage',
    data() {
      return {
        powerTrue:false,
        optionW:'0',
        menuId:'',
        lock:false,
        del:false,
        upd:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        imageUrl:'',
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          timeNo:'',
          status:"1"
        },
        tableData: [],
        uploadData:{},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime((start.getTime() + 3600 * 1000 * 24 * 7));
              picker.$emit('pick', [end, start]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [end,start]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [end,start]);
            }
          }]
        },
        selectTime: [],
        showImg:false,
      }
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
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
                this.powerTrue =true;
                this.optionW ='78';
              }
              if(res.data[i].btnCode == 'lock') {
                this.lock=true;
                this.powerTrue =true;
                this.optionW ='78';
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
          timeNo: this.formInline.timeNo,
          status: this.formInline.status,
        }
        this.$fetch('/bz28/lotteryTime/kjBList', parameterData).then(res => {
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
      lockTaps(id,types) {
        console.log(types)
        let typeOne = '';
        if (types==1){
          typeOne='解锁'
        }else if (types==2){
          typeOne='锁定'
        }
        this.$confirm('此操作将'+typeOne+'该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            let parameterData = {
              id: id,
              lockStatus:types
            }
            this.$fetch('/bz28/lotteryTime/lockRecord', parameterData).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({
                  type: 'success',
                  message: typeOne+'成功！'
                })
                this.accountList()
              } else {
                this.$message({
                  type: 'error',
                  message:res.message
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
      getInfo(id) {
        this.dialogTableVisible = true;
        this.$fetch('/bz28/lotteryTime/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
          }
        })
      },
      update(formtwo) {
        this.$put('/bz28/lotteryTime/setResultNum', this.formtwo).then(res => {
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
      handleSizeChange(val) {
        this.pageSize = val;
        this.accountList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.accountList();
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
  .ba-lottery-manage-wrap {
    width: 100%;
  }

  .ba-lottery-manage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .ba-lottery-manage-header {
    margin-bottom: 20px;
  }

  .ba-lottery-manage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .ba-lottery-manage-table {
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
