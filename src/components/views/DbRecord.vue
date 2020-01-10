<template>
  <div class="db-list-wrap">
    <div class="db-list-inner">
      <div class="db-list-header">
        <h3>心愿猪/用户夺宝记录</h3>
        <hr />
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户Id:">
          <el-input v-model="formInline.accountId" auto-complete="off" placeholder="请输入用户Id"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="期号:">
          <el-input v-model="formInline.timeNo" auto-complete="off" placeholder="请输入期号"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item  label="状态:">
          <el-select v-model="formInline.status" placeholder="请选择状态" clearable>
            <el-option label="待揭晓" value="1"></el-option>
            <el-option label="未抽中" value="2"></el-option>
            <el-option label="幸运儿" value="3"></el-option>
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="是否发货:">
          <el-select v-model="formInline.isMail" placeholder="请选择是否发货" clearable>
            <el-option label="待发货" value="1"></el-option>
            <el-option label="已发货" value="2"></el-option>
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" plain @click="search" >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="queryExport" v-if="exportExle">导出表格</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="db-list-table">
      <template>
        <el-table :data="tableData"  v-loading="loading" max-height="506">
          <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
          </el-table-column>
          <el-table-column  min-width="170px"  prop="accountId" label="夺宝人账户id">
          </el-table-column>
          <el-table-column  min-width="200px" prop="mobile" label="夺宝人电话号码">
          </el-table-column>

          <el-table-column  min-width="120px" prop="timeNo" label="期号">
          </el-table-column>
          <el-table-column  min-width="120px" prop="joinNum"  label="参与次数">
          </el-table-column>
          <el-table-column  min-width="170px"  prop="xyExpend" label="消耗心愿值	">
          </el-table-column>
          <el-table-column min-width="120px"  prop="goodsName" label="商品名称	">
          </el-table-column>
          <el-table-column  min-width="100px" prop="goodsPrice" label="商品价格">
          </el-table-column>
          <el-table-column  min-width="250px" prop="modifyTime" :formatter="dateFormat" label="最后一次参与夺宝时间">
          </el-table-column>
          <el-table-column width="100px" prop="isMail" label="是否发货">
            <template slot-scope="scope">
              <span v-if="scope.row.isMail==1">待发货</span>
              <span v-if="scope.row.isMail==2">已发货</span>
              <span v-if="scope.row.isMail==''">不发货</span>
            </template>
          </el-table-column>
          <el-table-column min-width="200px"  prop="receiver" label="收件人">
          </el-table-column>
          <el-table-column min-width="200px"  prop="receiverMobile" label="收件人电话号码">
          </el-table-column>
          <el-table-column  min-width="200px" prop="address" label="详细地址">
          </el-table-column>
          <el-table-column  min-width="170px"  prop="remarks" label="描述">
          </el-table-column>
          <el-table-column  width="170px"  prop="mailTime" :formatter="dateFormat" label="发货时间">
          </el-table-column>
          <el-table-column width="100px" prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">待揭晓</span>
              <span v-if="scope.row.status==2">未抽中</span>
              <span v-if="scope.row.status==3">幸运儿</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" v-if="send" label="操作" width="75">
            <template slot-scope="scope">
              <el-button
                type="success"
                plain
               v-if="scope.row.status==3 && scope.row.isMail==1"
                @click="getInfo(scope.row.id,scope.row.isMail,scope.row.remarks)"
                size="mini">发货</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 是否发货 -->
    <el-dialog title="是否发货" :visible.sync="dialogFormVisible" width="800px">
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否发货" prop="isMail" :label-width="formLabelWidth">
              <el-select v-model="form.isMail" placeholder>
                <el-option label="是" :value="2"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
              <el-input v-model="form.remarks" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <big-img v-if="showImg"
             @clickit="viewImg"
             :imgSrc="imgSrc"></big-img>

    <div class="block" style="margin-left: 10px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  import BigImg from './BigImg'

  export default {
    name: 'DbList',
    data() {
      return {
        menuId:'',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        exportExle:false,
        formInline: {
          timeNo:'',
          status:'',
          goodsTypeId:'',
        },
        tableData: [],
        channelCode:'',
        days:'',
        minDays:'',
        maxDays:'',
        selectTime: '',
        selectTimeCash:'',
        loading:false,
        showImg:false,
        imgSrc:'',
        goodsList:[],
        send:false,
        form: {
          isMail: 1,
          remarks: ""
        },
        dialogFormVisible:false,
        formLabelWidth:'120px'
      }
    },
    components: {
      'big-img': BigImg
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num){
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
    },
    created() {
      this.menuId=this.$route.query.id;
      this.channelCode = this.$getSession("channelCode");
      this.queryBtns();
      this.goodsType();
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
              if(res.data[i].btnCode == 'exportExle') {
                this.exportExle=true
              }
              if(res.data[i].btnCode == 'send') {
                this.send=true
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
          accountId:this.formInline.accountId,
          timeNo:this.formInline.timeNo,
          status :this.formInline.status,
          isMail:this.formInline.isMail,
        }

        this.$fetch('/wish/dbUserLog/queryBList', parameterData).then(res => {
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
        //起始注册时间
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = new Date(this.selectTime[0]).getTime();
        }else {
          this.formInline.startTime = ''
        }
        //结束注册时间
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = new Date(this.selectTime[1]).getTime();
        }else {
          this.formInline.endTime = ''
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList()
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
        this.formInline.token=this.$getSession("token");
        this.formInline.channel=this.$getSession("channelCode");
        this.formInline.relation= this.$getSession("userRelation");
        let url ='/excl/dbUserLogExcl';
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
        this.pageSize = val
        this.accountList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.accountList()
      },
      //商品类型
      goodsType(){
        // this.goodsList = [];
        this.$fetch('/wish/goodsType/list').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.goodsList = res.data;
          }
        })
      },
      clickImg(img) {
        console.log(img)
        this.showImg = true;
        this.imgSrc = img;
      },
      viewImg() {
        this.showImg = false
      },

      getInfo(id, isMail, remarks) {
        this.id = id
        console.log(isMail)
        this.form.isMail = isMail;
        this.form.remarks = remarks;
        this.dialogFormVisible = true;
      },
      update() {
        let parameterData = {
          id: this.id,
          isMail: this.form.isMail,
          remarks: this.form.remarks
        };
        this.$fetch("/wish/dbUserLog/sendGoods", parameterData).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
            this.dialogFormVisible = false;
            this.accountList();
          } else {
            this.$message({
              type: "danger",
              message: res.message
            });
          }
        });
      },

    },
  }
</script>
<style type="text/css">
  .db-list-wrap {
    width: 100%;
  }

  .db-list-inner {
    margin: auto;
    padding: 0 20px;
  }

  .db-list-header {
    margin-bottom: 20px;
  }

  .db-list-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .db-list-table {
    border: 1px solid #e6e6e6;
    margin: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
