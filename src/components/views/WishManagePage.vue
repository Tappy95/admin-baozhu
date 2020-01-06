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
            <el-input v-model="formInline.goodsName" placeholder="请输入商品名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否夺宝商品">
              <el-select v-model="formInline.isDb" placeholder="" >
                <el-option label="否" value="1"></el-option>
                <el-option label="是" value="2"></el-option>
                <el-option label="全部" value=""></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="商品类型" >
            <el-select v-model="formInline.goodsType" placeholder="" >
              <el-option v-for="(item,index) in goodsList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态" >
            <el-select v-model="formInline.state" placeholder="" >
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否抽奖商品" >
            <el-select v-model="formInline.isGuess" placeholder="" >
              <el-option label="否" value="1"></el-option>
              <el-option label="是" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" >
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item label="" >
            <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          </el-form-item>

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
            <el-table-column width="150" prop="typeName" label="商品类型">
            </el-table-column>
            <el-table-column width="150" prop="isDb" label="是否夺宝商品">
              <template slot-scope="scope">
                <span v-if="scope.row.isDb==1">否</span>
                <span v-if="scope.row.isDb==2">是</span>
              </template>
            </el-table-column>
            <el-table-column width="150" prop="isGuess" label="是否抽奖商品">
              <template slot-scope="scope">
                <span v-if="scope.row.isGuess==1">否</span>
                <span v-if="scope.row.isGuess==2">是</span>
              </template>
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
                <span v-if="scope.row.state==1">上架中</span>
                <span v-if="scope.row.state==2">已下架</span>
              </template>
            </el-table-column>
            <el-table-column width="170" prop="createTime" :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
                <el-button type="danger" plain @click="isUpper(scope.row.id,2)" size="mini" v-if="upper && scope.row.state==1 && scope.row.isTop==1">下架</el-button>
                <el-button type="warning" plain @click="isUpper(scope.row.id,1)" size="mini" v-if="upper && scope.row.state==2">上架</el-button>
                <el-button type="danger" plain @click="isTop(scope.row.id,2)" size="mini" v-if="tops && scope.row.state==1 && scope.row.isTop==1">置顶</el-button>
                <el-button type="primary" plain @click="isTop(scope.row.id,1)" size="mini" v-if="tops && scope.row.state==1 && scope.row.isTop==2">不置顶</el-button>
                <el-button type="warning" plain @click="isDbao(scope.row.id)" size="mini" v-if="duobao && scope.row.state==1">夺宝</el-button>
                <el-button type="warning" plain @click="isCj(scope.row.id,2)" size="mini" v-if="choujiang && scope.row.isGuess==1 && scope.row.state==1">抽奖</el-button>
                <el-button type="warning" plain @click="isCj(scope.row.id,1)" size="mini" v-if="choujiang && scope.row.isGuess==2 && scope.row.state==1">不抽奖</el-button>
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
              <el-col :span="22">
                <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsName">
                  <el-input v-model="form.goodsName" auto-complete="off" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
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
                <el-form-item label="商品类型"  :label-width="formLabelWidth" prop="goodsType" >
                  <el-select v-model="form.goodsType" placeholder="" style="width: 200px">
                    <el-option v-for="(item,index) in goodsList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="商品价格:" :label-width="formLabelWidth" prop="price">
                  <el-input  v-model="form.price" auto-complete="off"  clearable style="width: 200px">
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
                              :label-width="formLabelWidth" prop="answerMax">
                  <el-input spellcheck="false" v-model="form.answerMax" auto-complete="off"  clearable style="width: 200px">
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
                              :label-width="formLabelWidth" prop="rankingMax">
                  <el-input spellcheck="false" v-model="form.rankingMax" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="提示范围" :label-width="formLabelWidth" prop="tipsRange">
                  <el-input spellcheck="false" v-model="form.tipsRange" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="淘宝口令" :label-width="formLabelWidth">
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.passUrl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="状态"  :label-width="formLabelWidth" prop="state">
                  <el-select v-model="form.state" placeholder="">
                    <el-option label="上架" :value="1"></el-option>
                    <el-option label="下架" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改公告 -->
        <el-dialog title="修改商品" :visible.sync="dialogTableVisible" width="800px">
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
                <el-form-item label="商品价格:"
                              :label-width="formLabelWidth" prop="price">
                  <el-input spellcheck="false" v-model="formtwo.price" auto-complete="off"  clearable style="width: 200px">
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
                              :label-width="formLabelWidth">
                  <el-input spellcheck="false" v-model="formtwo.answerMax" auto-complete="off"  clearable style="width: 200px">
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
                              :label-width="formLabelWidth" prop="rankingMax">
                  <el-input spellcheck="false" v-model="formtwo.rankingMax" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="提示范围:" :label-width="formLabelWidth" >
                  <el-input spellcheck="false" v-model="formtwo.tipsRange" auto-complete="off" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="淘宝口令:" :label-width="formLabelWidth" >
                  <el-input spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.passUrl" auto-complete="off" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

             <!-- <el-col :span="12">
                <el-form-item label="状态"  :label-width="formLabelWidth" prop="state">
                  <el-select v-model="formtwo.state" placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="删除" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>-->
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 设置夺宝 -->
        <el-dialog title="设置夺宝" :visible.sync="dialogDuoBao" width="800px">
          <el-form :model="formdb" :rules="rules" ref="formdb">
            <el-row>
              <!--bannerImg;//多张,分隔-->
              <!--夺宝弹框字段-->
              <el-col :span="12">
                <el-form-item label="所需人次数:"
                              :label-width="formLabelWidth" prop="timesNum">
                  <el-input spellcheck="false" v-model="formdb.timesNum" auto-complete="off"  clearable style="width: 200px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="每次需要心愿值" prop="timesXy" :label-width="formLabelWidth" >
                  <el-input  v-model="formdb.timesXy" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="排序" prop="dbOrders" :label-width="formLabelWidth" >
                  <el-input v-model="formdb.dbOrders" auto-complete="off" style="width: 200px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否夺宝商品" prop="isDb" :label-width="formLabelWidth">
                  <el-select v-model="formdb.isDb" placeholder="" style="width: 200px">
                    <el-option label="否" :value="1"></el-option>
                    <el-option label="是" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="轮播图:" prop="bannerImg" :label-width="formLabelWidth">
                  <el-upload
                    action="/api/upload"
                    list-type="picture-card"
                    :data="uploadData"
                    :file-list="fileList"
                    :on-success="handlePicture"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogDuoBao = false">取 消</el-button>
            <el-button type="primary" @click="updateformdb('formdb')">确 定</el-button>
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
        upper:false,
        duobao:false,
        choujiang:false,
        dialogDuoBao:false,
        dialogTableVisible: false,
        formtwo: {},
        formdb:{},
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
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          isDb: [{
            required: true,
            message: '请选择是否夺宝商品',
            trigger: 'change'
          }],
          timesNum: [{ required: true, message: '请输入夺宝所需人次数', trigger: 'blur' }],
          timesXy: [{ required: true, message: '请输入夺宝每次需要心愿值', trigger: 'blur' }],
          dbOrders: [{ required: true, message: '请输入排序', trigger: 'blur' }],
          bannerImg: [{
            required: true,
            message: '请选择轮播图',
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
        tops:false,
        fileList:[],
        goodsList:[],
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
      //商品类型
      this.goodsType();
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

            if (res.data[i].btnCode == 'add' && res.data.length>=2){
               let opW = (res.data.length-1) * 75
                this.optionW = opW
            }
            if(res.data[i].btnCode == 'add') {
              this.add=true
            }
            if (res.data[i].btnCode == 'choujiang' ) {
              this.choujiang=true
              // return
            }
            if(res.data[i].btnCode == 'upd') {
              this.upd=true;
              this.powerTrue =true;
              this.optionW = '75'
            }
            if(res.data[i].btnCode == 'upper') {
              this.upper=true;
              this.powerTrue =true;
              this.optionW = '75'
            }

            if(res.data[i].btnCode == 'tops') {
              this.tops =true;
              this.optionW = '75'
            }

            if(res.data[i].btnCode == 'duobao') {
              this.duobao =true;
              this.optionW = '75'
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

      // 列表
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          goodsName: this.formInline.goodsName,
          isDb: this.formInline.isDb,
          goodsType: this.formInline.goodsType,
          state: this.formInline.state,
          isGuess: this.formInline.isGuess
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
        this.goodsType();
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
      isUpper(id,state){
        let parameterData = {
          id: id,
          state: state
        }
        this.$put('/wish/guesGoods/updateState', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
            this.accountList();
          }
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
      isTop(id,stats) {
        // isTop 1不置顶2置顶
        // id 商品id
        let tempState = ''

        if (stats==1){
          tempState = '不置顶'
        } else if(stats==2){
          tempState = '置顶'
        }
        this.$confirm('此操作将'+tempState+'该商品,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$post('/wish/guesGoods/updateTop',{
              id: id,
              isTop: stats
            }).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({ type: 'success', message: '删除成功！' })
                this.accountList()
              } else {
              }
            })
          })
          .catch(() => {
            this.$message({ type: 'info', message: '已取消删除' })
          })
      },
      isDbao(id){
        this.dialogDuoBao = true;
        this.fileList = [];
        this.$fetch('/wish/guesGoods/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            if (res.data.bannerImg) {
              let arr=res.data.bannerImg.split(',');
              for(var i=0;i<arr.length;i++){
                let fileImg={};
                fileImg.url=arr[i];
                this.fileList.push(fileImg)
              }
            }
            this.formdb = res.data;
          }
        })
      },

      updateformdb(formdb) {
        this.formdb.bannerImg='';
        let arr1 = '';
        if (this.fileList.length>0){
          for(let i=0; i<this.fileList.length;i++){
            arr1+= this.fileList[i].url +','
          }
        }
        this.formdb.bannerImg=arr1.substr(0, arr1.length - 1);
        this.$refs[formdb].validate(valid => {
          if (valid) {
            this.$put('/wish/guesGoods/updateDb', this.formdb).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({ type: 'success', message: '修改成功！' });
                this.dialogDuoBao = false;
                this.accountList();
              }
            })
          }
        })
      },

      handlePicture(res, file, fileList){
        let fileImg={};
        console.log(res)
        fileImg.url=res.data;
        this.fileList.push(fileImg)
        console.log(this.fileList)
      },

      handleRemove(file, fileList) {
        this.fileList=fileList;
      },

      handlePictureCardPreview(file,fileList) {
        this.showImg = true;
        this.imgSrc = file.url;
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

      isCj(id,types) {
        let tempType = ''
        if (types==1){
           tempType = '不抽奖'
        } else {
           tempType = '抽奖'
        }
        this.$confirm('此操作将设置该商品为'+tempType+'状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$post('/wish/guesGoods/updateGuess',{
              id: id,
              isGuess: types
            } ).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.$message({ type: 'success', message: '设置'+tempType+'状态成功！' })
                this.accountList()
              } else {
              }
            })
          })
          .catch(() => {
            this.$message({ type: 'info', message: '已取消操作' })
          })
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


  .news-notice-wrap .el-upload-list--picture-card .el-upload-list__item{
    width: 148px;
    height: 148px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    float: left;
  }

  .news-notice-wrap .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: auto;
    height: auto;
    max-width: 148px;
    max-height: 148px;
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
