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
          <el-form-item label="用户ID:">
            <el-input v-model="formInline.accountId"
                      placeholder="请输入用户ID"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="手机号:">
            <el-input v-model="formInline.mobile"
                      placeholder="请输入用户手机"
                      clearable></el-input>
          </el-form-item>

          <el-form-item label="选择成长等级:"
                        :label-width="formLabelWidth">
            <el-select   v-model="formInline.level" placeholder="">
              <el-option  v-for="(item,index) in levelList" :key="index" :label="item.level" :value="item.level"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

            <el-form-item label="渠道标识:" :label-width="formLabelWidth" >
              <el-select   v-model="formInline.channelCode" placeholder="">
                <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelCode" :value="item.channelCode"></el-option>
                <el-option label="全部" value=""></el-option>
              </el-select>
            </el-form-item>

          <el-form-item>
            <el-button @click="search()" type="primary" plain>查询</el-button>
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
            <el-table-column min-width="140px" prop="accountId" fixed="left"
                             label="用户ID">
            </el-table-column>

            <el-table-column min-width="140px" prop="referrer" fixed="left"
                             label="上级代理">
            </el-table-column>

            <el-table-column min-width="150px" prop="userName"
                             label="昵称">
            </el-table-column>
            <el-table-column  min-width="120px" prop="mobile"
                             label="手机号">
            </el-table-column>

            <el-table-column prop="vipName"
                             label="会员等级"
                             min-width="200px">
            </el-table-column>

            <el-table-column prop="level"
                             label="成长等级"
                             min-width="110px">
            </el-table-column>
            <el-table-column prop="apprentice"
                             label="直属下级人数"
                             min-width="110px">
            </el-table-column>

            <el-table-column prop="channelCode"
                             label="渠道"
                             min-width="100px">
            </el-table-column>
            <el-table-column prop="channelRelation"
                             label="渠道关系"
                             min-width="100px">
            </el-table-column>

            <el-table-column label="身份标识"
                             min-width="100px">
              <template slot-scope="scope">
                <span v-if="scope.row.roleType==1">小猪猪</span>
                <span v-if="scope.row.roleType==2">团队长</span>
                <span v-if="scope.row.roleType==3">超级合伙人</span>
              </template>
            </el-table-column>

            <el-table-column
                             label="金币余额"
                             min-width="150px">
              <template slot-scope="scope">
                <span class="amountgreen">{{scope.row.coin | currency}}</span>
              </template>

            </el-table-column>

            <el-table-column
                             label="金猪余额"
                             min-width="150px">
              <template slot-scope="scope">
                <span class="amountblue">{{scope.row.pigCoin | currency}}</span>
              </template>
            </el-table-column>

            <el-table-column
                             label="人民币余额"
                             min-width="150px">
              <template slot-scope="scope">
                <span class="amountyellow">{{scope.row.balance | currencyFixed}}</span>
              </template>
            </el-table-column>

            <el-table-column
                             label="vip充值总额"
                             min-width="100px">
              <template slot-scope="scope">
                <span>{{scope.row.vipAmount | currencyFixed}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="vipCount"
                             label="VIP充值次数"
                             min-width="100px">
            </el-table-column>

            <el-table-column
                             label="提现金额"
                             min-width="150px">
              <template slot-scope="scope">
                <span class="amountred">{{scope.row.txAmount | currencyFixed}}</span>
              </template>

            </el-table-column>

            <el-table-column prop="txCount"
                             label="提现次数"
                             min-width="100px">
            </el-table-column>

            <el-table-column prop="djCount"
                             label="兑换奖品次数"
                             min-width="100px">
            </el-table-column>

            <el-table-column  width="170px" :formatter="dateFormat" prop="createTime"
                             label="注册时间"
                            >
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain  style="margin-bottom: 8px"
                           size="mini"
                           @click="getInfo(scope.row.userId)">详情</el-button>
                <el-button type="" style="margin-bottom: 8px"
                           size="mini" v-if="apprentice"
                           @click="apprenticee(scope.row.userId)">徒弟</el-button>
                <el-button type="" style="margin-bottom: 8px"
                           size="mini" v-if="rew"
                           @click="reward(scope.row.userId)">奖励</el-button>
                <el-button type="" v-if="setNo"
                           type="danger" plain
                           size="mini" style="margin-bottom: 8px"
                           @click="setSuper(scope.row.userId,scope.row.status,scope.row.remark,1)">冻结账户</el-button>

                <el-button type="success" plain @click="setSuper(scope.row.userId,scope.row.roleType,scope.row.remark,2)"  v-if="scope.row.roleType !=1 && setSuperMan" size="mini"><span v-if="optionW='305px'"></span>设置超级合伙人</el-button>


                <!--<el-button type="" v-if="setSuperMan"-->
                           <!--size="mini" style="margin-bottom: 8px"-->
                           <!--@click="reward(scope.row.userId)">设置超级合伙人</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="用户信息详情" :visible.sync="dialogTableVisible" width="800px">
          <el-form>
            <el-row>
              <el-col :span="22" style="margin-bottom: 10px">
                <el-form-item label="用户id:" :label-width="formLabelWidth">
                  <el-input :value="message.accountId" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="支付宝账户:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.aliNum" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="真实姓名:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="上级代理:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.referrerMobile" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="昵称:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="手机号:" :label-width="formLabelWidth">
                 <el-input :style="styleObject" :value="message.mobile" :disabled="true" auto-complete="off" style="" clearable></el-input>
                 </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="会员等级:"  :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.vipName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="成长等级:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.level" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="直属下级人数:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.apprentice" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="渠道:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.channelCode" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="渠道关系:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.channelRelation" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="身份标识:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="message.roleType" placeholder="">
                    <el-option label="小猪猪" :value="1"></el-option>
                    <el-option label="团队长" :value="2"></el-option>
                    <el-option label="超级合伙人" :value="3"></el-option>
                  </el-select>

                  <!--<el-input :value="message.roleType" :disabled="true" auto-complete="off" style="" clearable></el-input>-->
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币余额:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.coin | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金猪余额:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.pigCoin | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="人民币余额￥:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.balance | currencyFixed" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="vip充值总额:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.vipAmount | currencyFixed" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="提现金额:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.txAmount | currencyFixed" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="提现次数:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.txCount" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="兑换奖品次数:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.djCount" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="注册时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.createTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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

      <el-dialog :title="types==2?'设置超级合伙人':'设置冻结'" width="800px"
                 :visible.sync="dialogSuper">
        <el-form :model="formSet"
                 :rules="rules"
                 ref="formSet">
          <div class="form">
            <el-row>


              <el-col :span="12">
                <el-form-item v-if="types==2" label="设置为超级合伙人:"
                              prop="isSuper"
                              :label-width="formWidth">
                  <el-select :style="styleObject"  v-model="formSet.isSuper" placeholder="">
                    <el-option label="是" :value="3"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item v-if="types==1" label="是否冻结账户:"
                              prop="isFro"
                              :label-width="formWidth">
                  <el-select :style="styleObject"  v-model="formSet.isSuper" placeholder="">
                    <el-option label="是" :value="3"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="22">
                <el-form-item label="描述:"
                              prop="remark"
                              :label-width="formWidth">
                  <el-input  type="textarea"  :autosize="{ minRows: 4, maxRows: 8}" v-model="formSet.remark"
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
          <el-button @click="dialogSuper = false">取 消</el-button>
          <el-button type="primary"
                     @click="setBtn('formSet')">确 定</el-button>
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
        testNum:'14523698',
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        apprentice:false,
        rew:false,
        add:false,
        del:false,
        upd:false,
        exa:false,
        types:'',
        rules: {
          remark: [
            {required: true, message: '请输入备注', trigger: 'blur'}
          ],
          isSuper: [{required: true, message: '请选择是否设置超级合伙人', trigger: 'change'}],
          isFro: [{required: true, message: '请选择是否冻结账户', trigger: 'change'}],

        },
        formSet:{
          isSuper:'',
          userId:'',
          remark:''
        },
        styleObject:{
          width:'200px'
        },
        form: {
          isAuditing: '',
        },
        isShow: false,
        radio: '',
        list: [],
        imgElements:[],
        message: {},
        requestText: '',
        dialogSuper:false,
        dialogTableVisible: false,
        usetApprenticeId:'',
        apprenticeeVisible:false,
        rewardId:'',
        rewardVisible:false,
        formLabelWidth: '100px',
        formWidth:'150px',
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
        channelNameList:[],
        levelList:[],
        interface:'',
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.channelList();//调取渠道标识列表
      this.levelListD();//调取用户等级
      this.queryBtns();//权限
      this.accountList();//列表
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
              this.optionW = '220px'
            }

            if (res.data[i].btnCode == 'setSuperMan') {
              this.setSuperMan =true;
              this.optionW = '175px'
            }

            if (res.data[i].btnCode == 'setNo') {
              this.setNo = true;
              this.optionW = '175px'
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


      //调取渠道标识列表
      channelList(){
        this.$fetch('/api/mChannelInfo/downList',{
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.channelNameList = res.data;
          }
        })
      },

      //调取用户等级
      levelListD(){
        this.$fetch('/api/pLevel/downLevelList',{
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.levelList = res.data;
          }
        })
      },


      setSuper(userId,roleType,remark,type){
        this.dialogSuper = true;
        this.formSet.userId = userId;
        this.formSet.isSuper = roleType;
        this.formSet.remark = remark;
        this.types = type;
      },

      setBtn(formSet){
        if (this.types==2) {
          this.interface = '/api/userInfo/setSuperPartner'
        }else if (this.types==1) {
          // this.formSet.status =  this.formSet.isSuper;
          this.interface = '/api/userInfo/freezeUser'
        }
        this.$refs.formSet.validate(valid => {
          if (valid) {
            this.$post(this.interface,this.formSet).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogSuper = false;
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
          referrerId: this.usetApprenticeId,
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
          accountId:this.formInline.accountId,
          mobile:this.formInline.mobile,
          level:this.formInline.level,
          channelCode:this.formInline.channelCode
        }
        this.$fetch('/api/userInfo/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          // for(let i = res.data.list.length - 1; i >= 0; i--) {
          //   if(res.data.list[i].digitalNumType == 1) {
          //       res.data.list[i].digitalNumType = "身份证"
          //     }
          //
          // }
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

  .amountblue{
    color: #409eff;
  }
  .amountgreen{
    color: #13ce66;
  }
  .amountyellow{
    color: #e6a23c;
  }

  amountred{
    color: #fbc4c4;
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
