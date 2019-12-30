<template>
  <div class="news-notice-wrap">
    <div class="news-notice-inner">
      <div class="news-notice-header">
        <h3>心愿猪/抽奖记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户id">
            <el-input v-model="formInline.accountId" placeholder="请输入用户id" clearable></el-input>
          </el-form-item>
          <el-form-item label="期号">
            <el-input v-model="formInline.issueNumber" placeholder="请输入期号" clearable></el-input>
          </el-form-item>
          <el-form-item  label="状态:">
            <el-select v-model="formInline.state" placeholder="请选择状态" clearable>
              <el-option label="未猜中" value="1"></el-option>
              <el-option label="已猜中" value="2"></el-option>
              <el-option label="幸运儿" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="是否发货:">
            <el-select v-model="formInline.isMail" placeholder="请选择是否发货" clearable>
              <el-option label="待发货" value="1"></el-option>
              <el-option label="已发货" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item  label="用户类型:">
            <el-select v-model="formInline.userTypeStr" placeholder="请选择用户类型" clearable>
              <el-option label="真实用户" value="1"></el-option>
              <el-option label="机器人" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="success" v-if="exportExle" plain @click="queryExport()" >导出表格</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="news-notice-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" fixed="left" :index="indexMethod" width="80"></el-table-column>
            <el-table-column fixed="left" width="170" prop="issueNumber" label="期号">
              <template slot-scope="scope">
                <div class="yichu">{{scope.row.issueNumber}}</div>
              </template>
            </el-table-column>
            <el-table-column fixed="left" width="170" prop="accountId" label="用户id">
              <template slot-scope="scope">
                <div class="yichu">{{scope.row.accountId}}</div>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="mobile" label="注册手机号"></el-table-column>
            <el-table-column min-width="270" prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column min-width="170" prop="price" label="商品价格"></el-table-column>
            <el-table-column width="170" prop="receiver" label="收货人姓名"></el-table-column>
            <el-table-column width="170" prop="contactMobile" label="收货人电话"></el-table-column>
            <el-table-column width="170" prop="detailAddress" label="收货地址"></el-table-column>
            <el-table-column width="170" prop="guessNumber" label="抽奖次数"></el-table-column>
            <el-table-column width="150" prop="state" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.state==1">未猜中</span>
                <span v-if="scope.row.state==2">已猜中</span>
                <span v-if="scope.row.state==3">幸运儿</span>
              </template>
            </el-table-column>
            <el-table-column width="150" prop="isMail" label="是否发货">
              <template slot-scope="scope">
                <span v-if="scope.row.isMail==1 && scope.row.state==3">待发货</span>
                <span v-if="scope.row.isMail==2 && scope.row.state==3">已发货</span>
                <span v-if="scope.row.isMail==1 && scope.row.state!=3">不发货</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="remarks" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  plain
                  @click="getInfo(scope.row.id,scope.row.isMail,scope.row.remarks)"
                  size="mini"
                  v-if="send && scope.row.state==3 && typeSel"
                >发货</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
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
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 70]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { formatDate } from "../../utils/date.js";
import { getSession } from "../../utils/cookie";
import BigImg from "./BigImg";
export default {
  name: "NewsNotice",
  data() {
    return {
      powerTrue: false,
      optionW: "75px",
      menuId: "",
      add: false,
      del: false,
      upd: false,
      dialogTableVisible: false,
      formtwo: {},
      dialogFormVisible: false,
      dialogTableDetail: false,
      formtwoInfo: {},
      form: {
        isMail: 1,
        remarks: ""
      },
      imageUrl: "",
      formLabelWidth: "120px",
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      formInline: {
        userTypeStr:"1"
      },
      tableData: [],
      uploadData: {},
      selectTime: [],
      showImg: false,
      isSubmit: false,
      send: false,
      typeSel:true,
      exportExle:false
    };
  },
  components: {
    "big-img": BigImg
  },
  created() {
    this.menuId = this.$route.query.id;
    this.queryBtns();
    this.accountList();
    this.uploadData = {
      token: getSession("token")
    };
  },
  filters: {
    dateFont: function(date) {
      return formatDate(new Date(date), "yyyy-MM-dd hh:mm:sss");
    }
  },
  methods: {
    //   clickImg(img) {
    //     this.showImg = true;
    //     this.imgSrc = img;
    //   },
    //   viewImg() {
    //     this.showImg = false
    //   },
    //   handleAvatarSuccess(res, file) {
    //     this.imageUrl=res.data
    //   },
    //   beforeAvatarUpload(file) {
    //   },
    selectTap(time) {},
    // 添加按钮
    queryBtns() {
      let parameterData = {
        menuId: this.menuId
      };
      this.$fetch("/api/pMenuBtn/queryBtns", parameterData).then(res => {
        if ((res.statusCode + "").startsWith("2")) {
          for (let i = res.data.length - 1; i >= 0; i--) {
            if (res.data[i].btnCode == "send") {
              this.send = true;
              this.powerTrue = true;
              this.optionW = "75";
            }

            if (res.data[i].btnCode == "exportExle") {
              this.exportExle = true;
            }
          }
        } else {
        }
      });
    },
    indexMethod(index) {
      return index * 1 + 1;
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return formatDate(new Date(date), "yyyy-MM-dd hh:mm:sss");
    },
    // 详情
    accountList() {
      let parameterData = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        accountId: this.formInline.accountId,
        issueNumber: this.formInline.issueNumber,
        state: this.formInline.state,
        isMail: this.formInline.isMail,
        userTypeStr:this.formInline.userTypeStr
      };
      this.$fetch("/wish//guesUserLog/page", parameterData).then(res => {
        if ((res.statusCode + "").startsWith("2")) {
          this.tableData = res.data.list;
          this.totalCount = res.data.total;
        } else {
          this.$message({
            type: "error",
            message: res.message,
            duration: 3000
          });
        }
      });
    },
    search() {
      this.currentPage = 1;
      this.pageSize = 10;
      if (this.formInline.userTypeStr=='2'){
        this.typeSel= false
      } else {
        this.typeSel= true
      }
      this.accountList();
    },
    load() {
      this.form = {};
      this.formInline = {};
      this.dialogFormVisible = true;
      this.imageUrl = "";
      this.selectTime = [];
      this.isSubmit = false;
    },
    getInfo(id, isMail, remarks) {
      this.id = id;
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
      this.$post("/wish/guesUserLog/isMail", parameterData).then(res => {
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
      let url ='/excl/guessLogExcl';
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.accountList();
    }
  }
};
</script>
<style type="text/css">
.yichu {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.red {
  color: #ff4d51;
}
.green {
  color: #13ce66;
}
.blue {
  color: #409eff;
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

.img_loadBox {
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
.el-icon-plus {
  line-height: 0;
}
.bannerAvatar-uploader-icon {
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
