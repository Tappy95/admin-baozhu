<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/数据统计</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="渠道标识:" >
            <el-select   v-model="formInline.channelCode" placeholder="">
              <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelCode" :value="item.channelCode"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="统计时间:" >
            <el-date-picker
              @change="timePickeTap"
              v-model="formInline.creatorTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item >
             <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item >
             <el-button type="success" plain @click="queryExport()">导出表格</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="528">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column min-width="200px" fixed="left" prop="channelCode" label="渠道标识">
            </el-table-column>
            <el-table-column min-width="150px" prop="total" label="总用户数">
            </el-table-column>
            <el-table-column min-width="150px" prop="sevenDayAdd" label="7天内新增用户">
            </el-table-column>
            <el-table-column min-width="120px" prop="sameDayAdd" label="当天新增用户数">
            </el-table-column>
            <el-table-column min-width="120px" prop="sign" label="签到用户数">
            </el-table-column>
            <el-table-column min-width="150px" prop="bindAli" label="绑定支付宝用户数">
            </el-table-column>
            <el-table-column min-width="120px" prop="cash" label="提现用户数">
            </el-table-column>
            <el-table-column min-width="150px" prop="game28"  label="参与28游戏用户数">
            </el-table-column>
            <el-table-column min-width="120px" prop="creatorTime"  label="统计时间">
            </el-table-column>
          </el-table>
        </template>
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
  import { getSession } from '../../utils/cookie'

  export default {
    name: 'VersionManage',
    data() {
      return {
        channelNameList:[],
        menuId:'',
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
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
      this.channelList();
      this.accountList();
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
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          channelCode:this.formInline.channelCode,
          creatorTime:this.formInline.creatorTime
        }
        this.$fetch('/api/pDataStatistics/list', parameterData).then(res => {
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

      //时间查询
      timePickeTap(){
        if (this.formInline.creatorTime){
          let times = this.formInline.creatorTime;
          this.formInline.creatorTime = formatDate(new Date(times), 'yyyy-MM-dd');
        }
      },

      //调取渠道标识列表
      channelList(){
        this.$fetch('/api/mChannelInfo/downList',{
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.channelNameList = res.data;
          }
        })
      },

      //导出表格
      queryExport() {

        let channelCode=this.formInline.channelCode;
        let creatorTime=this.formInline.creatorTime;

        let token= getSession("token");
        let channel= getSession("channelCode");

        let url = '/api/excl/exclDataStatistics';
        let data = {url,channelCode,creatorTime,token,channel};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          channelCode=obj.channelCode,
          creatorTime=obj.creatorTime,
          token= obj.token,
          channel=obj.channel

        let a1 = document.createElement('a');
        let http=url;
        if(http==url){
          if(channelCode!=null && channelCode!=''){
            http=http+'?channelCode=' + channelCode
          }
        }
        if(http==url){
          if(creatorTime!=null && creatorTime!=''){
            http=http+'?creatorTime=' + creatorTime
          }
        }else {
          if(creatorTime!=null && creatorTime!=''){
            http=http+'&creatorTime=' + creatorTime
          }
        }

        if(http==url){
          http=http+'?token='+token+'&channel='+channel
        }else{
          http=http+'&token='+token+'&channel='+channel
        }

        a1.setAttribute('href',http);
        let body = document.querySelector('body');
        body.appendChild(a1);
        a1.click();
        a1.remove();
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
  .mar_bottom{
    margin-bottom: 20px;
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
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
