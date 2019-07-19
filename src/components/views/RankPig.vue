<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/金猪排行</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="是否真实用户:">
            <el-select placeholder="请选择是否真实用户" v-model="formInline.realData">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="排行榜类型:">-->
            <!--<el-select placeholder="请选择排行榜类型" v-model="formInline.rankType" >-->
              <!--<el-option label="天榜" value="1"></el-option>-->
              <!--<el-option label="周榜" value="2"></el-option>-->
              <!--<el-option label="月榜" value="3"></el-option>-->
              <!--<el-option label="年榜" value="4"></el-option>-->
              <!--<el-option label="总榜" value="5"></el-option>-->
              <!--<el-option label="全部" value=""></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->

          <el-form-item label="排名时间:">
            <el-date-picker
              v-model="formInline.rankDate"
              align="right"
              type="date"
              placeholder="请选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" max-height="680">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" prop="rankType" label="类型">
              <template slot-scope="scope">
                <span v-if="scope.row.rankType==1">天榜</span>
                <span v-if="scope.row.rankType==2">周榜</span>
                <span v-if="scope.row.rankType==3">月榜</span>
                <span v-if="scope.row.rankType==4">年榜</span>
                <span v-if="scope.row.rankType==5">总榜</span>
              </template>
            </el-table-column>
            <el-table-column width="120" prop="rankOrder" label="排名">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="imageUrl"  label="头像">
              <template slot-scope="scope">
                <img class="list_img" :src='scope.row.imageUrl'
                     style="max-width: 90px;max-height: 50px"
                     @click="clickImg($event)">
              </template>
            </el-table-column>
            <el-table-column  prop="userId"  label="用户Id">
            </el-table-column>
            <el-table-column prop="aliasName"  label="用户别名">
            </el-table-column>
            <el-table-column prop="mobile"  label="电话号码">
            </el-table-column>
            <el-table-column   label="累计金猪数">
              <template slot-scope="scope">
                <span class="green">
                 {{scope.row.pigBalance | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="rankDate" width="170" :formatter="dateFormat" label="排名时间">
            </el-table-column>
            <el-table-column prop="createTime" width="170" :formatter="dateFormat" label="创建时间">
            </el-table-column>

            <el-table-column prop="realData"  label="是否真实用户">
              <template slot-scope="scope">
                <span v-if="scope.row.realData==1">是</span>
                <span v-if="scope.row.realData==2">否</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <big-img v-if="showImg"
               @clickit="viewImg"
               :imgSrc="imgSrc"></big-img>
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
    name: 'BalanceChange',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        dialogTableVisible: false,
        dialogTable:false,
        formtwo: {},
        dialogFormVisible: false,
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isShow: false,
        message:{},
        showImg:false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.accountList();
    },
    components: {
      'big-img': BigImg
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    methods: {
      clickImg(e) {
        this.showImg = true
        this.imgSrc = e.currentTarget.src
      },
      viewImg() {
        this.showImg = false
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
          realData:this.formInline.realData,
          rankDate:this.formInline.rankDate
        }
        this.$fetch('/api/rankPig/list', parameterData).then(res => {
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
        if (this.formInline.rankDate){
          this.formInline.rankDate = formatDate(new Date(this.formInline.rankDate), 'yyyy-MM-dd')
        }else {
          this.formInline.rankDate = '';
        }
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
      toggle: function(value) {
        this.isShow = !this.isShow;
        console.log(this.isShow)
      }
    },

  }
</script>
<style type="text/css">
  .green{
    color: #13ce66;
  }

  .administratormanage-wrap {
    width: 100%;
  }

  .administratormanage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .administratormanage-header {
    margin-bottom: 20px;
  }

  .administratormanage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .administratormanage-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
    overflow: auto;
    /*border: 1px solid violet;*/
  }

  .el-table th {
    background-color: #e6e6e6;
  }

  .list_img{
    cursor: pointer;
  }



</style>
