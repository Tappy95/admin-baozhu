<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/意见反馈</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户ID:">
            <el-input :style="styleObject"  v-model="formInline.accountId" placeholder="请输入用户ID" auto-complete="off"  clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="意见类型:">
            <el-select  v-model="formInline.opinionType" placeholder="请选择意见类型">
              <el-option label="会员相关" value="1"></el-option>
              <el-option label="积分提现" value="2"></el-option>
              <el-option label="信息错误" value="3"></el-option>
              <el-option label="友好意见" value="4"></el-option>
              <el-option label="其他" value="5"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select  v-model="formInline.state" placeholder="请选择状态">
                <el-option label="待处理" value="1"></el-option>
                <el-option label="已处理" value="2"></el-option>
                <el-option label="不予处理" value="3"></el-option>
                <el-option label="作废" value="4"></el-option>
                <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button style="margin-bottom: 30px" @click="search()" type="primary" plain>查询</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column fixed="left" min-width="150px" prop="accountId" label="用户ID">
            </el-table-column>
            <el-table-column min-width="120px" prop="vipName"  label="会员等级">
            </el-table-column>
            <el-table-column min-width="150px" prop="experience" label="用户成长值">
            </el-table-column>
            <el-table-column min-width="120px" prop="opinionType" label="意见类型">
            </el-table-column>
            <el-table-column min-width="250px" prop="opinionContent" label="意见内容">
            </el-table-column>
            <el-table-column min-width="200px" prop="email" label="邮箱">
            </el-table-column>
            <el-table-column min-width="100px" prop="state" label="状态">
            </el-table-column>
            <el-table-column min-width="300px" prop="remarks" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" size="mini" v-if="exa">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="意见审核" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="状态:" prop="opinionType" :label-width="formLabelWidth">
                  <el-select  v-model="formtwo.state" placeholder="请选择状态">
                    <el-option label="待处理" :value="1"></el-option>
                    <el-option label="已处理" :value="2"></el-option>
                    <el-option label="不予处理" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remarks" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update('formtwo')">确 定</el-button>
          </div>
        </el-dialog>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc">
        </big-img>
        <el-dialog title="反馈详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo" >
            <el-row>
              <el-col :span="23">
                <el-form-item label="用户ID:" :label-width="formLabelWidth" >
                  <el-input :disabled="true"   v-model="formtwoInfo.accountId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="vip等级:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.vipName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户成长值:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.experience" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.email" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  label="意见类型:" :label-width="formLabelWidth">
                  <el-select :disabled="true"  :style="styleObject" :label-width="formLabelWidth"  v-model="formtwoInfo.opinionType" placeholder="">
                    <el-option label="会员相关" :value="1"></el-option>
                    <el-option label="积分提现" :value="2"></el-option>
                    <el-option label="信息错误" :value="3"></el-option>
                    <el-option label="友好意见" :value="4"></el-option>
                    <el-option label="其他" :value="5"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建时间:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.createrTime" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
              <el-form-item  label="图片:"
                            :label-width="formLabelWidth">
                <div class="box_img">
                  <div class="box_min"  v-for="(item,index) in arrImg" :key="index"  v-if="arrImg && item">
                    <img v-if="item"  @click="clickImg(item)" :src="item" class="avatar">
                  </div>
                </div>
              </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="备注:"  :label-width="formLabelWidth">
                  <el-input :disabled="true"  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.remarks" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="意见内容:" :label-width="formLabelWidth">
                  <el-input :disabled="true"  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.opinionContent" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
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
  import BigImg from './BigImg'

  export default {
    name: 'FeedBack',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        w_input:'200px',
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        exa:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {},
        roles: {
          id: '',
          realname: ''
        },
        rules: {
          opinionType: [{
            required: true,
            message: '请选择意见类型',
            trigger: 'change'
          }],
          remarks: [{
            required: true,
            message: '请输入 备注',
            trigger: 'blur'
          }],
        },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          lotteryPlayedTplId:1
        },
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        lotteryPlayed:[],
        PlayedGroup:[],
        showImg:false,
        arrImg:[],
      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
    },
    methods: {
      clickImg(img) {
        this.showImg = true;
        this.imgSrc = img;
      },
      viewImg() {
        this.showImg = false
      },
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'exa') {
                this.exa=true;
                this.powerTrue =true;
                this.optionW = '150px'
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
          state:this.formInline.state,
          opinionType:this.formInline.opinionType,
          accountId:this.formInline.accountId
        }
        this.$fetch('/api/mUserOpinion/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              // 意见类型1会员相关2积分提现3信息错误4 友好意见5其他
              if(res.data.list[i].opinionType == '1') {
                res.data.list[i].opinionType = '会员相关'
              } else if(res.data.list[i].opinionType == '2') {
                res.data.list[i].opinionType = '积分提现'
              }else if(res.data.list[i].opinionType == '3') {
                res.data.list[i].opinionType = '信息错误'
              }else if(res.data.list[i].opinionType == '4') {
                res.data.list[i].opinionType = '友好意见'
              }else if(res.data.list[i].opinionType == '5') {
                res.data.list[i].opinionType = '其他'
              }

              if(res.data.list[i].state == '1') {
                res.data.list[i].state = '待处理'
              } else if(res.data.list[i].state == '2') {
                res.data.list[i].state = '已处理'
              }else if(res.data.list[i].state == '3') {
                res.data.list[i].state = '不予处理'
              }else if(res.data.list[i].state == '4') {
                res.data.list[i].state = '作废'
              }
            }
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
        this.accountList()
      },
      getInfo(id) {
        //修改前查询基本信息
        this.dialogTableVisible = true
        this.$fetch('/api/mUserOpinion/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
          }
        })
      },
      update(formtwo) {
        this.$refs[formtwo].validate(valid => {
          if(valid) {
        this.$put('/api/mUserOpinion/update', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.dialogTableVisible = false
            this.accountList()
              }else {
            this.$message({
              type: 'error',
              message: res.message
            })
            }
            })
          }
        })
      },
      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/api/mUserOpinion/info', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            res.data.createrTime =  formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss');
            this.formtwoInfo = res.data;
            if (res.data.contentImg){
              this.arrImg = res.data.contentImg.split(',');
            }
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
      toggle: function(value) {
        this.isShow = !this.isShow;
      }
    },
  }
</script>
<style type="text/css">
  .box_img{
    width: 560px;
    height: 148px;
    padding: 10px;
    border: 1px solid #dcdfe6;
    float: left;
    background-color: #f5f7fa;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: self-start;
  }

  .box_img .box_min{
    max-width:148px;
    max-height:148px;
    float: left;
    margin-right: 10px;
  }
  .box_img img{
    max-width:148px;
    max-height:148px;
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
  .avatar {
    max-width: 148px;
    max-height: 148px;
    display: block;
    cursor: pointer;
  }

</style>
