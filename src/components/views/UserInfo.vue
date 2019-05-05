<template>
  <div class="userloanInformation-wrap">
    <div class="userloanInformation-inner">
      <div class="userloanInformation-header">
        <h3>用户管理/用户信息</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="手机号">
            <el-input v-model="formInline.mobile"
                      placeholder="请输入用户手机"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="formInline.socialDigitalNum"
                      placeholder="请输入证件号"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="userloanInformation-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    height="640">
            <el-table-column fixed="left" label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80'>
            </el-table-column>
            <el-table-column width="140px" prop="mobile" fixed="left"
                             label="手机号">
            </el-table-column>
            <el-table-column width="150px" prop="aliasName"
                             label="昵称">
            </el-table-column>
            <el-table-column  width="200px" prop="socialDigitalNum"
                             label="证件号">
            </el-table-column>
            <el-table-column prop="digitalNumType"
                             label="证件类型"
                             width="200px">
            </el-table-column>
            <el-table-column prop="reward"
                             label="奖励金额(￥)"
                             width="110px">
            </el-table-column>
            <el-table-column prop="apprentice"
                             label="学徒数量(个)"
                             width="110px">
            </el-table-column>

            <el-table-column prop="level"
                             label="等级"
                             width="100px">
            </el-table-column>
            <el-table-column prop="levelValue"
                             label="经验值"
                             width="100px">
            </el-table-column>
            <el-table-column  width="300px" :formatter="dateFormat" prop="createTime"
                             label="注册时间"
                            >
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             :width="optionW">
              <template slot-scope="scope">
                <el-button type=""
                           size="mini"
                           @click="getInfo(scope.row.userId)">详情</el-button>
                <el-button type=""
                           size="mini" v-if="apprentice"
                           @click="apprenticee(scope.row.userId)">徒弟</el-button>
                <el-button type=""
                           size="mini" v-if="rew"
                           @click="reward(scope.row.userId)">奖励</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="用户信息详情" :visible.sync="dialogTableVisible" width="800px">
          <el-form>
            <el-row>
              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item label="用户id:" :label-width="formLabelWidth">
                  <el-input :value="message.userId" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" style="margin-bottom: 10px">
              <el-form-item label="姓名:" :label-width="formLabelWidth">
                <el-input :value="message.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="9" style="margin-bottom: 10px">
                <el-form-item label="性别:" :label-width="formLabelWidth">
                 <el-input :value="message.sex" :disabled="true" auto-complete="off" style="" clearable></el-input>
                 </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="生日:"  :label-width="formLabelWidth">
                  <el-input :value="message.birthday" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" style="margin-bottom: 10px">
                <el-form-item label="手机号码:" :label-width="formLabelWidth">
                  <el-input :value="message.mobile" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="昵称:" :label-width="formLabelWidth">
                  <el-input :value="message.aliasName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="登录账号:" :label-width="formLabelWidth">
                  <el-input :value="message.identity" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="证件号:" :label-width="formLabelWidth">
                  <el-input :value="message.socialDigitalNum" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" style="margin-bottom: 10px">
                <el-form-item label="证件类型:" :label-width="formLabelWidth">
                  <el-input :value="message.digitalNumType" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="余额:" :label-width="formLabelWidth">
                  <el-input :value="'￥'+message.balance" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" style="margin-bottom: 10px">
                <el-form-item label="代币:" :label-width="formLabelWidth">
                  <el-input :value="message.jadeCabbage" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="金币:" :label-width="formLabelWidth">
                  <el-input :value="message.coin" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" style="margin-bottom: 10px">
                <el-form-item label="总奖励金额:" :label-width="formLabelWidth">
                  <el-input :value="message.reward" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="徒弟数量:" :label-width="formLabelWidth">
                  <el-input :value="message.apprentice" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" style="margin-bottom: 10px">
                <el-form-item label="等级:" :label-width="formLabelWidth">
                  <el-input :value="message.level" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="等级值:" :label-width="formLabelWidth">
                  <el-input :value="message.levelValue" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" style="margin-bottom: 10px">
                <el-form-item label="注册时间:" :label-width="formLabelWidth">
                  <el-input :value="message.createTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="邀请人:" :label-width="formLabelWidth">
                  <el-input :value="message.referrerName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="邀请人手机号:" :label-width="formLabelWidth">
              <el-row>
                <el-col :span="10" style="margin-bottom: 10px">
                  <el-input :value="message.referrerMobile" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
          </div>
        </el-dialog>
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
      <el-dialog title="我的徒弟" :visible.sync="apprenticeeVisible" width="800px">
        <div class="userloanInformation-table">
          <template>
              <el-table :data="onetableData"
                        style="width: 100%"
                        height="640">
                <el-table-column fixed="left" label="序号"
                                 type="index"
                                 :index="indexMethod"
                                 width='80'>
                </el-table-column>
                <el-table-column prop="apprenticeMobile" fixed="left"
                                 label="手机号">
                </el-table-column>
                <el-table-column prop="apprenticeName"
                                 label="姓名">
                </el-table-column>
                <el-table-column :formatter="dateFormat" prop="createTime"
                                 label="注册时间">
                </el-table-column>
                <el-table-column prop="contribution"
                                 label="贡献值">
                </el-table-column>
              </el-table>
          </template>
          <div class="block">
            <el-pagination @size-change="onehandleSizeChange"
                           @current-change="onehandleCurrentChange"
                           :current-page="onecurrentPage"
                           :page-sizes="[10, 20, 50, 70]"
                           :page-size="onepageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="onetotalCount">
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="我的奖励" :visible.sync="rewardVisible" width="800px">
        <div class="userloanInformation-table">
          <template>
              <el-table :data="rewardtableData"
                        style="width: 100%"
                        height="640">
                <el-table-column fixed="left" label="序号"
                                 type="index"
                                 :index="indexMethod"
                                 width='80'>
                </el-table-column>
                <el-table-column prop="rewardType" fixed="left"
                                 label="奖励类型">
                </el-table-column>
                <el-table-column prop="money"
                                 label="奖励金额(￥)">
                </el-table-column>
                <el-table-column width="200px" :formatter="dateFormat" prop="rewardTime"
                                 label="奖励时间">
                </el-table-column>
              </el-table>
          </template>
          <div class="block">
            <el-pagination @size-change="rewardhandleSizeChange"
                           @current-change="rewardhandleCurrentChange"
                           :current-page="rewardcurrentPage"
                           :page-sizes="[10, 20, 50, 70]"
                           :page-size="rewardpageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="rewardtotalCount">
            </el-pagination>
          </div>
          </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  export default {
    name: 'UserInfo',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        apprentice:false,
        rew:false,
        add:false,
        del:false,
        upd:false,
        exa:false,
        rules: {
        },
        form: {
          isAuditing: '',
        },
        isShow: false,
        radio: '',
        list: [],
        imgElements:[
        ],
        message: {},
        requestText: '',
        dialogTableVisible: false,
        usetApprenticeId:'',
        apprenticeeVisible:false,
        rewardId:'',
        rewardVisible:false,
        formLabelWidth: '100px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData:[],
        onetableData:[],
        rewardtableData:[],
        isInfo: true,
        onecurrentPage: 1,
        onepageSize: 10,
        onetotalCount: 0,
        rewardcurrentPage: 1,
        rewardpageSize: 10,
        rewardtotalCount: 0,
      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
    },
    methods: {
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.length - 1; i >= 0; i--) {
            if(res.data[i].btnCode == 'rew') {
              this.rew=true;
              this.optionW = '160px'
            }
            if(res.data[i].btnCode == 'apprentice') {
              this.apprentice=true;
              this.optionW = '160px'
            }
            if (this.rew && this.apprentice) {
              this.powerTrue =true;
              this.optionW = '230px'
            }
          }
        } else {
        }
      })
      },
      search() {
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
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
      toggle: function() {
        this.isShow = !this.isShow
      },
      getInfo(id) {
        this.isInfo = true
        this.dialogTableVisible = true
        this.$fetch('/api/userInfo/queryOne', {
          userId: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          if(res.data.sex ==1){
            res.data.sex = "男"
          }else {
            res.data.sex = "女"
          }
          if (res.data.digitalNumType==1){
            res.data.digitalNumType = "身份证号"
          } else {
            res.data.digitalNumType = "驾驶证"
          }
          res.data.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
          this.message = res.data
        }
      })
      },
      apprenticee(id) {
        if(id!=0){
          this.usetApprenticeId=id
        }
        let parameterData = {
          pageNum: this.onecurrentPage,
          pageSize: this.onepageSize,
          referrerId: this.usetApprenticeId
        }
        this.apprenticeeVisible = true
        this.$fetch('/api/mUserApprentice/getList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.onetableData = res.data.list
          this.onetotalCount = res.data.total
        }
      })
      },
      reward(id) {
        if(id!=0){
          this.rewardId=id
        }
        let parameterData = {
          pageNum: this.rewardcurrentPage,
          pageSize: this.rewardpageSize,
          userId: this.rewardId
        }
        this.rewardVisible = true
        this.$fetch('/api/lUserReward/getList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if (res.data.list[i].rewardType == 1) {
              res.data.list[i].rewardType = "获取徒弟"
            } else if (res.data.list[i].rewardType == 2) {
              res.data.list[i].rewardType = "徒弟完成相关任务"
            }else {
              res.data.list[i].rewardType = "自己完成相关任务"            }
          }
          this.rewardtableData = res.data.list
          this.rewardtotalCount = res.data.total
        }
        })
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          socialDigitalNum:this.formInline.socialDigitalNum,
          mobile:this.formInline.mobile
        }
        this.$fetch('/api/userInfo/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].digitalNumType == 1) {
                res.data.list[i].digitalNumType = "身份证号"
              } else {
                res.data.list[i].digitalNumType = "驾驶证"
              }
          }
          this.tableData = res.data.list
          this.totalCount = res.data.total
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
      onehandleSizeChange(val) {
        this.onepageSize = val
        this.apprenticee(0)
      },
      onehandleCurrentChange(val) {
        this.onecurrentPage = val
        this.apprenticee(0)
      },
      rewardhandleSizeChange(val) {
        this.rewardpageSize = val
        this.reward(0)
      },
      rewardhandleCurrentChange(val) {
        this.rewardcurrentPage = val
        this.reward(0)
      }
    }
  }
</script>
<style type="text/css">
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
