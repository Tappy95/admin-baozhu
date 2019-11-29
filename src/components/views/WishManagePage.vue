<template>
  <div class="news-notice-wrap">
    <div class="news-notice-inner">
      <div class="news-notice-header">
        <h3>心愿猪/商品管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="formInline.noticeTitle" placeholder="请输入商品名称" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="news-notice-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" fixed="left" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column fixed="left" width="170" prop="goodsName" label="商品名称">
                <template slot-scope="scope">
                  <div class="yichu">
                    {{scope.row.goodsName}}
                  </div>
                </template>
            </el-table-column>
            <el-table-column width="200px" label="商品图片">
              <template slot-scope="scope">
                <img :src='scope.row.goodsImg'
                     style="max-width: 45px;max-height: 45px"
                     @click="clickImg(scope.row.goodsImg)">
              </template>
            </el-table-column>
            <el-table-column width="150" prop="goodsType" label="商品类型">
              <template slot-scope="scope">
                <span v-if="scope.row.goodsType==1">普通商品</span>
                <span v-if="scope.row.goodsType==2">高价商品</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="passUrl" label="淘宝口令">
            </el-table-column>
            <el-table-column width="170" prop="answerMin" label="答案最小值">
            </el-table-column>
            <el-table-column width="170" prop="answerMax" label="答案最大值">
            </el-table-column>
            <el-table-column width="170" prop="tipsRange" label="提示范围">
            </el-table-column>
            <el-table-column width="170" prop="rankingMin" label="名次最小值">
            </el-table-column>
            <el-table-column width="170" prop="rankingMax" label="名次最大值">
            </el-table-column>
            <el-table-column width="150" prop="state" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.state==1">正常</span>
                <span v-if="scope.row.state==2">删除</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <!-- 添加商品 -->
        <el-dialog title="添加商品" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsName">
                  <el-input v-model="form.goodsName" auto-complete="off" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="图片:"
                              :label-width="formLabelWidth">
                  <el-upload class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                    <div class="img_loadBox" >
                      <img v-if="imageUrl"
                           :src="imageUrl"
                           class="avatar">
                      <i v-else
                         class="el-icon-plus bannerAvatar-uploader-icon"></i>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品类型" prop="goodsType" :label-width="formLabelWidth">
                  <el-select v-model="form.goodsType" placeholder="">
                    <el-option label="普通商品" value="1"></el-option>
                    <el-option label="高价商品" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="淘宝口令" :label-width="formLabelWidth">
                  <el-input spellcheck="false" v-model="form.passUrl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="答案最小值:"
                              :label-width="formLabelWidth" prop="answerMin">
                  <el-input spellcheck="false" v-model="form.answerMin" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="答案最大值:"
                              label-width="formLabelWidth" prop="answerMax">
                  <el-input spellcheck="false" v-model="form.answerMax" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="提示范围" :label-width="formLabelWidth" prop="tipsRange">
                  <el-input spellcheck="false" v-model="form.tipsRange" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名次最小值:"
                              :label-width="formLabelWidth" prop="rankingMin">
                  <el-input spellcheck="false" v-model="form.rankingMin" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名次最大值:"
                              label-width="formLabelWidth" prop="rankingMax">
                  <el-input spellcheck="false" v-model="form.rankingMax" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态"  :label-width="formLabelWidth" prop="state">
                  <el-select v-model="form.state" placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="删除" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改公告 -->
        <el-dialog title="修改公告" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="22">
                <el-form-item label="商品名称" :label-width="formLabelWidth" >
                  <el-input v-model="formtwo.goodsName" auto-complete="off" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="图片:"
                              :label-width="formLabelWidth">
                  <el-upload class="bannerAvatar-uploader"
                             action="/api/upload"
                             :data="uploadData"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                    <div class="img_loadBox">
                      <img v-if="imageUrl"
                           :src="imageUrl"
                           class="avatar">
                      <i v-else
                         class="el-icon-plus bannerAvatar-uploader-icon"></i>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品类型" prop="goodsType" :label-width="formLabelWidth">
                  <el-select v-model="formtwo.goodsType" placeholder="">
                    <el-option label="普通商品" :value="1"></el-option>
                    <el-option label="高价商品" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="淘宝口令" :label-width="formLabelWidth" >
                  <el-input spellcheck="false" v-model="formtwo.passUrl" auto-complete="off" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="答案最小值:"
                              :label-width="formLabelWidth">
                  <el-input spellcheck="false" v-model="formtwo.answerMin" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="答案最大值:"
                              label-width="formLabelWidth">
                  <el-input spellcheck="false" v-model="formtwo.answerMax" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="提示范围" :label-width="formLabelWidth" >
                  <el-input spellcheck="false" v-model="formtwo.tipsRange" auto-complete="off" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名次最小值:"
                              :label-width="formLabelWidth" prop="rankingMin">
                  <el-input spellcheck="false" v-model="formtwo.rankingMin" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名次最大值:"
                              label-width="formLabelWidth" prop="rankingMax">
                  <el-input spellcheck="false" v-model="formtwo.rankingMax" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态"  :label-width="formLabelWidth" prop="state">
                  <el-select v-model="formtwo.state" placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="删除" :value="2"></el-option>
                  </el-select>
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
    name: 'NewsNotice',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {},
        imageUrl:'',
        rules: {
          goodsName: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }],
          goodsImg: [{
            required: true,
            message: '请输入商品图片',
            trigger: 'blur'
          }],
          goodsType: [{
            required: true,
            message: '请选择商品类型',
            trigger: 'change'
          }],
          // passUrl: [{
          //   required: true,
          //   message: '请输入淘宝口令',
          //   trigger: 'blur'
          // }],
          answerMin: [{
            required: true,
            message: '请输入答案最小值',
            trigger: 'blur'
          }],
          answerMax: [{
            required: true,
            message: '请输入答案最大值',
            trigger: 'blur'
          }],
          // passUrl: [{
          //   required: true,
          //   message: '请输入淘宝口令',
          //   trigger: 'blur'
          // }],
          tipsRange: [{
            required: true,
            message: '请输入提示范围',
            trigger: 'blur'
          }],
          rankingMin: [{
            required: true,
            message: '请输入名次最小值',
            trigger: 'blur'
          }],
          rankingMax: [{
            required: true,
            message: '请输入名次最大值',
            trigger: 'blur'
          }],
          state: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        uploadData:{},
        selectTime: [],
        showImg:false,
        isSubmit:false,
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
    },
    filters: {
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
    },
    methods: {
      clickImg(img) {
        this.showImg = true;
        this.imgSrc = img;
      },
      viewImg() {
        this.showImg = false
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {
      },
      selectTap(time){
      },
      // 添加按钮
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.length - 1; i >= 0; i--) {
            if(res.data[i].btnCode == 'add') {
              this.add=true
            }
            if(res.data[i].btnCode == 'upd') {
              this.upd=true;
              this.powerTrue =true;
              this.optionW = '160px'
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.powerTrue =true;
              this.optionW = '160px'
            }

            if (this.upd && this.del) {
              this.powerTrue =true;
              this.optionW = '220px'
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
      // 详情
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          goodsName: this.formInline.noticeTitle
        }
        this.$fetch('/wish/guesGoods/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.tableData = res.data.list
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
      load() {
        this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
        this.imageUrl = "";
        this.selectTime=[];
        this.isSubmit=false;
      },
      addBtn(form) {
        this.form.goodsImg = this.imageUrl;
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/wish/guesGoods/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false;
              this.$message({
                type: 'success',
                message: '添加成功！'
              })
              this.accountList();
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
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/wish/guesGoods/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            let  arr =[]
            if (res.data.releaserTime) {
              let releaserTime = new Date(res.data.releaserTime);
              arr.push(releaserTime)
            }
            if (res.data.cancelTime) {
              let cancelTime = new Date(res.data.cancelTime);
              arr.push(cancelTime)
            }
            if (res.data.releaserTime && res.data.cancelTime) {
              this.selectTime = arr;
            }
            this.imageUrl = res.data.goodsImg
          this.formtwo = res.data;
        }
      })
      },
      update(formtwo) {
        this.formtwo.goodsImg = this.imageUrl;

        this.$put('/wish/guesGoods/update', this.formtwo).then(res => {
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
