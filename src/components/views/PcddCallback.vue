<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>游戏回调/pcdd回调</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户Id:" >
            <el-input placeholder="请输入用户Id"
                      v-model="formInline.accountId"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="游戏名称:" >
            <el-input placeholder="请输入游戏名称"
                      v-model="formInline.adname"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="状态:" >
            <el-select v-model="formInline.status " placeholder="请选择状态">
              <el-option label="失败" value="1"></el-option>
              <el-option label="成功" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
           <el-form-item >
            <el-button type="primary" plain class="mar_bottom" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <!--:class="showW?'u':'a'"-->
          <el-table :class="showW?'a':'u'" :data="tableData" max-height="600">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="200" fixed="left" prop="ordernum" label="订单号">
            </el-table-column>
            <el-table-column min-width="120" prop="accountId" label="用户Id">
            </el-table-column>
            <el-table-column min-width="120" prop="merid" label="用户注册游戏Id">
            </el-table-column>
            <el-table-column min-width="120" prop="adid" label="游戏Id">
            </el-table-column>
            <el-table-column min-width="120" prop="adname" label="游戏名称">
            </el-table-column>
            <el-table-column min-width="150" prop="pid" label="开发者渠道Id">
            </el-table-column>
            <el-table-column min-width="170" prop="deviceid" label="设备号">
            </el-table-column>
            <el-table-column min-width="120" prop="dlevel"  label="奖励级别">
            </el-table-column>
            <el-table-column min-width="120" prop="price" label="总奖励">
            </el-table-column>
            <el-table-column min-width="120" prop="money" label="用户奖励">
            </el-table-column>
            <el-table-column min-width="250" prop="event"  label="奖励说明">
            </el-table-column>
            <el-table-column min-width="120" prop="status"  label="状态">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.status==1">失败</span>
                <span class="green" v-if="scope.row.status==2">成功</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170" prop="itimeTime"  label="用户领奖时间">
            </el-table-column>
            <el-table-column min-width="170" prop="createTime"  label="回调时间">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作" v-show="showW" :width="optionW" >
              <template slot-scope="scope">
                <el-button  type="success" v-if="rep &&  scope.row.status==1" plain @click="getInfo(scope.row.id,2)" size="mini">
                  <span v-if="showW=true"></span>
                  <span v-else="showW=false"></span>
                  <span v-if="optionW='75'"></span>
                  <span v-else="optionW='1px'"></span>
                  重发
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>

      <div class="sun_sty xiao" v-if="tableData.length>0">
        <div class="list">
          <div class="item"><p>小计：</p></div>
          <div class="item su"><p> [ 成功数： {{smallSuccessCount | currency}} ]</p></div>
          <div class="item"><p> [ 平台奖励：{{smallPriceSum | currency}} ]</p></div>
          <div class="item"><p> [ 用户奖励：{{smallMoneySum | currency}} ]</p></div>
        </div>
        <div class="list">
          <div class="item"><p>合计：</p></div>
          <div class="item su"><p> [ 成功数： {{successCount | currency}} ]</p></div>
          <div class="item"><p> [ 平台奖励：{{priceSum | currency}} ]</p></div>
          <div class="item"><p> [ 用户奖励：{{moneySum | currency}} ]</p></div>
        </div>
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
    name: 'PcddCallback',
    data() {
      return {
        channelNameList:[],
        menuId:'',
        formLabelWidth: '120px',
        exportExle:false,
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        successCount:'',
        priceSum:'',
        moneySum:'',
        smallSuccessCount:'',
        smallPriceSum:'',
        smallMoneySum:'',
        optionW:'1px',
        rep:false,
        showW:false
       }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
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
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          accountId:this.formInline.accountId,
          adname:this.formInline.adname,
          status:this.formInline.status
        }
        this.$fetch('/api/PCDDCallback/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            this.successCount = res.data.successCount;
            this.priceSum = res.data.priceSum;
            this.moneySum = res.data.moneySum;
            this.smallSuccessCount = res.data.smallSuccessCount;
            this.smallPriceSum = res.data.smallPriceSum;
            this.smallMoneySum = res.data.smallMoneySum;
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
              if(res.data[i].btnCode == 'rep') {
                this.rep =true;
                // this.optionW = '75px'
              }else {
               this.showW = false
              }
            }
          } else {
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
        }else {
          this.formInline.creatorTime = ''
        }
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
  .el-table.u th{
    padding: 0;
  }
  .el-table.a th{
    padding: 12px 0;
  }
  .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .sun_sty .list{
    width: 100%;
    height: 30px;
    /*text-align: right;*/
  }
  .sun_sty.xiao .list .item:nth-child(1){
    width: 50px;
    min-width: 50px;
    max-width: 50px
  }
  .sun_sty .list .item.su{
    float: left;
    min-width: 150px;
    max-width: 200px;
    height: 30px;
  }
  .sun_sty .list .item{
    float: left;
    min-width: 200px;
    max-width: 300px;
    height: 30px;
  }

  .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .sun_sty p span{
    font-size: 12px;
  }

  .blue{
    color: #409eff;
  }
  .green{
    color: #13ce66;
  }
  .yellow{
    color: #e6a23c;
  }

  .red{
    color: #ff4d51;
  }

  .zi{
    color: #d8b1ee;
  }

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
