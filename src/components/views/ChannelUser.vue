<template>
  <div class="userloanInformation-wrap">
    <div class="userloanInformation-inner">
      <div class="userloanInformation-header">
        <h3>用户管理/渠道用户</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="用户id:">
            <el-input v-model="formInline.accountId"
                      placeholder="请输入用户id"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="累计赚取金币数:">
            <el-input v-model="formInline.minCoin"
                      placeholder="请输入最小值"
                      clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="formInline.maxCoin"
                    placeholder="请输入最大值"
                    clearable></el-input>
          </el-form-item>

          <el-form-item label="注册时间:">
              <el-date-picker
                @change="timeChang"
                v-model="selectTime"
                type="datetimerange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" plain  @click="search()">查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="success" plain v-if="exportExle" @click="queryExport()" >导出表格</el-button>
          </el-form-item>
        </el-form>
        <div class="no-tip">默认初始无数据，请根据条件筛选进行搜索即可！</div>
      </div>
      <div class="userloanInformation-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    v-loading="loading"
                    height="560">
            <el-table-column fixed="left" label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80'>
            </el-table-column>
            <el-table-column min-width="140px"  fixed="left"  prop="accountId"
                             label="用户ID">
            </el-table-column>
            <el-table-column min-width="140px"  prop="mobile"
                             label="手机">
            </el-table-column>
            <el-table-column min-width="150px" prop="channelCode"
                             label="渠道标识">
            </el-table-column>
            <el-table-column min-width="120"  label="渠道关系">
              <template slot-scope="scope">
                <span>{{scope.row.channelRelation}}</span>
                <!--<span :class="scope.row.channelRelation=='直属用户'?'amountyellow':'amountred'">{{scope.row.channelRelation}}</span>-->
              </template>
            </el-table-column>

            <el-table-column min-width="120"  label="身份标识">
              <template slot-scope="scope">
                <span v-if="scope.row.roleType==1">小猪猪</span>
                <span v-if="scope.row.roleType==2">团队长</span>
                <span v-if="scope.row.roleType==3">超级合伙人</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             label="累计充值(￥)">
              <template slot-scope="scope">
                <span class="amountblue">{{scope.row.sumRecharge | currencyFixed}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150px"
                             label="累计提现(￥)">
              <template slot-scope="scope">
                <span class="amountyellow">{{scope.row.sumCash | currencyFixed}}</span>
              </template>
            </el-table-column>
            <el-table-column  width="200px"
                              label="累计赚取金币数">
              <template slot-scope="scope">
                <span class="amountgreen">{{scope.row.sumCoin | currency}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200px"
                             label="剩余金币"
                             >
              <template slot-scope="scope">
                <span class="amountred">{{scope.row.coin | currency}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="300px"
                             label="剩余金猪"
                             >
              <template slot-scope="scope">
                <span class="amountrzi">{{scope.row.pigCoin | currency}}</span>
              </template>
            </el-table-column>
            <el-table-column  width="170px" :formatter="dateFormat" prop="createTime"
                              label="注册时间"
            >
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="setSuperMan" :width="qxW">
              <template slot-scope="scope">
                <el-button type="success" plain @click="setSuper(scope.row.userId,scope.row.roleType,scope.row.remark)"  v-if="scope.row.roleType !=1 && setSuperMan" size="mini"><span v-if="qxW='140px'"></span>设置超级合伙人</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="设置超级合伙人" width="800px"
                     :visible.sync="dialogFormVisible">
            <el-form :model="form"
                     :rules="rules"
                     ref="form">
              <div class="form">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="设置为超级合伙人:"
                                  prop="isSuper"
                                  :label-width="formLabelWidth">
                      <el-select :style="styleObject"  v-model="form.isSuper" placeholder="">
                        <el-option label="是" :value="3"></el-option>
                        <el-option label="否" :value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="描述:"
                                  prop="remark"
                                  :label-width="formLabelWidth">
                      <el-input  type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="form.remark"
                                 auto-complete="off"
                                 clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary"
                         @click="setBtn('form')">确 定</el-button>
            </div>
          </el-dialog>
        </template>
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
  import { getSession } from '../../utils/cookie'
  export default {
    name: 'ChannelUser',
    data() {
      return {
        fullscreenLoading: false,
        qxW:'1px',
        styleObject:{
          width:'200px'
        },
        form:{
          isSuper:'',
          userId:'',
          remark:''
        },
        rules: {
          remark: [
            {required: true, message: '请输入备注', trigger: 'blur'}
          ],
          isSuper: [{required: true, message: '请选择是否设置超级合伙人', trigger: 'change'}],

        },
        formLabelWidth: '150px',
        dialogFormVisible:false,
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData:[],
        formInline:{
          accountId:'',
          startTime:'',
            endTime:'',
            minCoin:'',
            maxCoin:''
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
        setSuperMan:false,
        exportExle:false,
        loading:true
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      // this.accountList();
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
      currencyFixed: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
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
              if(res.data[i].btnCode == 'setSuperMan') {
                this.setSuperMan =true;
                // this.qxW = '140px';
              }
              if(res.data[i].btnCode == 'exportExle') {
                this.exportExle =true;
              }
            }
          } else {
          }
        })
      },
      //导出表格
      queryExport() {
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: '正在导出....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startTime = ''
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endTime = ''
        }
        let accountId=this.formInline.accountId;
        let startTime=this.formInline.startTime;
        let endTime=this.formInline.endTime;
        let minCoin=this.formInline.minCoin;
        let maxCoin=this.formInline.maxCoin;
        let token= getSession("token");
        let channel= getSession("channelCode");
        let relation= getSession("userRelation");

        let url = '/api/excl/channelExclUser';
        let data = {url,accountId,startTime,endTime,minCoin,maxCoin,token,channel,relation};
        this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,
          accountId=obj.accountId,
          startTime=obj.startTime,
          endTime=obj.endTime,
          minCoin=obj.minCoin,
          maxCoin=obj.maxCoin,
          token= obj.token,
          channel=obj.channel,
          relation=obj.relation

        let a1 = document.createElement('a');
        let http=url;
        if(http==url){
           if(accountId!=null && accountId!=''){
             http=http+'?accountId=' + accountId
           }
        }
        if(http==url){
          if(startTime!=null && startTime!=''){
            http=http+'?startTime=' + startTime
          }
        }else{
          if(startTime!=null && startTime!=''){
            http=http+'&startTime=' + startTime
          }
        }
        if(http==url){
          if(endTime!=null && endTime!=''){
            http=http+'?endTime=' + endTime
          }
        }else{
          if(endTime!=null && endTime!=''){
            http=http+'&endTime=' + endTime
          }
        }
        if(http==url){
          if(minCoin!=null && minCoin!=''){
            http=http+'?minCoin=' + minCoin
          }
        }else{
          if(minCoin!=null && minCoin!=''){
            http=http+'&minCoin=' + minCoin
          }
        }
        if(http==url){
          if(maxCoin!=null && maxCoin!=''){
            http=http+'?maxCoin=' + maxCoin
          }
        }else{
          if(maxCoin!=null && maxCoin!=''){
            http=http+'&maxCoin=' + maxCoin
          }
        }
        if(http==url){
          http=http+'?token='+token+'&channel='+channel+'&relation='+relation
        }else{
          http=http+'&token='+token+'&channel='+channel+'&relation='+relation
        }
        a1.setAttribute('href',http);
        let body = document.querySelector('body');
        body.appendChild(a1);
        a1.click();
        a1.remove();
        //关闭正在导出弹层
        setTimeout(() => {
          this.fullscreenLoading.close();
        }, 5000);
      },
      timeChang(){

      },
      search() {
        this.currentPage = 1;
        this.pageSize = 10;

        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startTime = ''
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endTime = ''
        }

        this.accountList();
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
          accountId:this.formInline.accountId,
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
          minCoin:this.formInline.minCoin,
          maxCoin:this.formInline.maxCoin
        }
        this.$fetch('/api/userInfo/channelList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
            this.loading = false
          }
        })
      },

      setSuper(userId,roleType,remark){
        this.dialogFormVisible = true;
          this.form.userId = userId;
          this.form.isSuper = roleType;
          this.form.remark = remark;
      },

      setBtn(form){
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$post('/api/userInfo/setSuperPartner', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false;
                this.$message({ type: 'success', message: '设置成功！' })
                this.accountList()
              }else {
                this.$message({ type: 'error', message: res.message })
              }
            })
          } else {

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
    }
  }
</script>
<style type="text/css">
  .no-tip{
    margin-bottom: 20px;
    font-size: 14px;
    color: #ff4d51;
  }
  .amountblue{
    color: #409eff;
  }
  .amountgreen{
    color: #13ce66;
  }
  .amountyellow{
    color: #e6a23c;
  }

  .amountred{
    color: #ff4d51;
  }

  .amountrzi{
    color: #d8b1ee;
  }

  .le-bottom{
    margin-left: 20px;
  }
  .time_zhuce{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .userloanInformation-wrap {
    width: 100%;
  }
  .userloanInformation-inner {
    margin: auto;
    padding: 0 20px;
  }
  .userloanInformation-header {
    margin-bottom: 20px;
  }
  .userloanInformation-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .userloanInformation-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }
  .el-table th {
    background-color: #e6e6e6;
  }
  .information-wrap {
    margin-top: -30px;
    margin-bottom: 20px;
  }
  .information {
    display: flex;
  }
  .information div,
  .information-two div {
    margin-right: 20px;
  }
  .information div span,
  .information-two div span {
    color: red;
  }
  .information-two {
    display: flex;
    flex-wrap: wrap;
    width: 680px;
    line-height: 25px;
  }
  .informationImg{
    width: 178px;
    height: 178px;
  }
  .information-three div{
    display: inline-grid;
    margin: 5px 30px;
  }
</style>
