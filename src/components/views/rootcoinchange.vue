<template>
  <div class="coin-change-wrap">
    <div class="coin-change-inner">
      <div class="coin-change-header">
        <h3>财务流水/金币账变明细</h3>
        <hr />
      </div>
      <div>
        <el-form  :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="用户id:">
                <el-input v-model="formInline.accountId" placeholder="请输入用户id" clearable></el-input>
              </el-form-item>
              <el-form-item  label="电话号码:">
                <el-input  v-model="formInline.mobile" placeholder="请输入电话号码" clearable></el-input>
              </el-form-item>
              <el-form-item :label-width="labelWidth"  label="金币:">
                <el-input type="number" min="0" v-model="formInline.coinMin" placeholder="请输入最小金额" clearable></el-input>
              </el-form-item>
              <el-form-item  label="至">
                <el-input type="number" min="0" v-model="formInline.coinMax" placeholder="请输入最大金额" clearable></el-input>
              </el-form-item>
              <el-form-item :label-width="labelWidth" label="变更时间:">
                <el-date-picker
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
              <el-form-item  label="变更类型:" >
                <el-select v-model="formInline.changedType"  placeholder="请选择变更类型">
                  <el-option label="答题" value="1"></el-option>
                  <el-option label="每日红包" value="2"></el-option>
                  <el-option label="提现" value="3"></el-option>
                  <el-option label="推荐用户" value="4"></el-option>
                  <el-option label="徒弟贡献" value="5"></el-option>
                  <el-option label="VIP" value="6"></el-option>
                  <el-option label="游戏试玩" value="7"></el-option>
                  <el-option label="徒弟升级奖励" value="8"></el-option>
                  <el-option label="新人注册" value="9"></el-option>
                  <el-option label="任务" value="10"></el-option>
                  <el-option label="出题" value="11"></el-option>
                  <el-option label="兑换闯关奖励" value="12"></el-option>
                  <el-option label="阅读资讯" value="13"></el-option>
                  <el-option label="提现退回" value="14"></el-option>
                  <el-option label="直属用户返利" value="15"></el-option>
                  <el-option label="赠送运营总监" value="16"></el-option>
                  <el-option label="间接用户返利" value="17"></el-option>
                  <el-option label="居间返利" value="18"></el-option>
                  <el-option label="阅读广告奖励" value="19"></el-option>
                  <el-option label="分享资讯" value="20"></el-option>
                  <el-option label="签到赚" value="21"></el-option>
                  <el-option label="大众团队长分佣" value="22"></el-option>
                  <el-option label="快速赚任务" value="23"></el-option>
                  <el-option label="达人首次奖励" value="24"></el-option>
                  <el-option label="达人后续奖励" value="25"></el-option>
                  <el-option label="阅读小说" value="26"></el-option>
                  <el-option label="达人邀请周榜奖励" value="27"></el-option>
                  <el-option label="高额赚提成" value="28"></el-option>
                  <el-option label="每日红包任务" value="29"></el-option>
                  <el-option label="观看视频" value="30"></el-option>
                  <el-option label="小游戏奖励" value="31"></el-option>
                  <el-option label="打卡消耗" value="32"></el-option>
                  <el-option label="打卡奖励" value="33"></el-option>
                  <el-option label="金币排行日榜奖励" value="34"></el-option>
                  <el-option label="合伙人一级直属用户贡献" value="35"></el-option>
                  <el-option label="合伙人二级直属用户贡献" value="36"></el-option>
                  <el-option label="闯关助力" value="37"></el-option>
                  <el-option label="合伙人二级以下直属用户贡献 " value="38"></el-option>
                  <el-option label="徒弟贡献金额" value="39"></el-option>
                  <el-option label="徒孙贡献金额" value="40"></el-option>
                  <el-option label="好友开通VIP奖励" value="41"></el-option>
                  <el-option label="团队开通VIP奖励" value="42"></el-option>
                  <el-option label="全部" value=""></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="查詢數據維度:" >
                <el-select v-model="formInline.searchType"  placeholder="请选择數據維度">
                  <el-option label="一級直屬" value="1"></el-option>
                  <el-option label="二級直屬" value="2"></el-option>
                  <el-option label="二級及以下" value="3"></el-option>
                  <el-option label="当前渠道" value=""></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="屏蔽赠币:" >
                <el-select v-model="formInline.rewardType"  placeholder="请选择數據維度">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="渠道选择:" >
            <el-select v-model="formInline.channelType" placeholder="请选择渠道">
              <el-option v-for="(item,index) in channelList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" plain @click="search()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" plain @click="queryExport()" v-if="exportExle">导出表格</el-button>
          </el-form-item>
        </el-form>
        </el-form>
      </div>
      <div class="coin-change-table">
        <template>
          <el-table :data="tableData" max-height="518">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column min-width="100" fixed="left" prop="accountId" label="用户id">
            </el-table-column>
            <el-table-column label="登陆设备" min-width="120px">
              <template slot-scope="scope">
                <span v-if="scope.row.equipmentType==1">安卓</span>
                <span v-if="scope.row.equipmentType==2">ios</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" prop="userName" label="姓名">
            </el-table-column>
            <el-table-column min-width="120" prop="roleType" label="用户等级">
            </el-table-column>
            <el-table-column min-width="120" prop="referrerId" label="上级ID">
            </el-table-column>
            <el-table-column min-width="120" prop="leaderId" label="最高领导人ID">
            </el-table-column>
            <el-table-column min-width="120" prop="phoneNum" label="手机">
            </el-table-column>
<!--            <el-table-column min-width="120" sortable coinBalance prop="level" label="成长等级">-->
<!--            </el-table-column>-->
            <el-table-column prop="changedType" min-width="170px" label="变更类型">
            </el-table-column>
            <el-table-column prop="revenue" sortable min-width="150" label="收入">
              <template slot-scope="scope">
                <span class="amountred">
                  <span v-if="scope.row.revenue>0">+</span>{{scope.row.revenue | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column min-width="150" sortable  prop="expend" label="支出">
              <template slot-scope="scope">
                <span  class="amountgreen">
                  <span v-if="scope.row.expend>0">-</span>{{scope.row.expend | currency}}
                </span>
              </template>
            </el-table-column>
            <el-table-column sortable prop="coinBalance" min-width="150" label="金币余额">
              <template slot-scope="scope">
                <span class="amountyellow">
                 {{scope.row.coinBalance | currency}}
                </span>
              </template>
            </el-table-column>

            <el-table-column sortable prop="changedTime" min-width="170px" label="变更时间">
            </el-table-column>

            <el-table-column sortable prop="registerTime" :formatter="dateFormat" min-width="170px" label="注册时间">
            </el-table-column>
            <el-table-column min-width="150" prop="remarks" label="备注">
            </el-table-column>
            </el-table-column>
            <el-table-column min-width="150" prop="reason" label="平台备注">
            </el-table-column>
            <!--<el-table-column fixed="right" label="操作" :width="optionW">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button type="info" plain @click="getInfo(scope.row.id)" size="mini" >查看</el-button>-->
            <!--<el-button type="success" plain @click="getAuditingInfo(scope.row.id)" size="mini" v-if="exa && scope.row.changedType=='提现' && scope.row.status=='冻结'"><span v-if="optionW='150px'"></span>审核</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </template>
        <el-dialog title="详情" :visible.sync="dialogTable" width="800px">
          <el-form>
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="真实姓名:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="message.changedType==3" :span="12" style="margin-bottom: 10px">
                <el-form-item label="支付宝账号:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.aliNum" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币变动:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.amount | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="收支:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="message.flowType" :disabled="true"   placeholder="">
                    <el-option label="收入" :value="1"></el-option>
                    <el-option label="支出" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更类型:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="message.changedType" :disabled="true"   placeholder="">
                    <el-option label="答题" :value="1"></el-option>
                    <el-option label="每日签到" :value="2"></el-option>
                    <el-option label="提现" :value="3"></el-option>
                    <el-option label="推荐用户" :value="4"></el-option>
                    <el-option label="徒弟贡献" :value="5"></el-option>
                    <el-option label="VIP" :value="6"></el-option>
                    <el-option label="游戏试玩" :value="7"></el-option>
                    <el-option label="好友升级奖励" :value="8"></el-option>
                    <el-option label="新人注册" :value="9"></el-option>
                    <el-option label="任务" :value="10"></el-option>
                    <el-option label="出题" :value="11"></el-option>
                    <el-option label="兑换金猪" :value="12"></el-option>
                    <el-option label="阅读资讯" :value="13"></el-option>
                    <el-option label="提现退回" :value="14"></el-option>
                    <el-option label="直属用户返利" :value="15"></el-option>
                    <el-option label="赠送运营总监" :value="16"></el-option>
                    <el-option label="间接用户返利" :value="17"></el-option>
                    <el-option label="居间返利" :value="18"></el-option>
                    <el-option label="阅读广告奖励" :value="19"></el-option>
                    <el-option label="分享资讯" :value="20"></el-option>
                    <el-option label="签到赚" :value="21"></el-option>
                    <el-option label="大众团队长分佣" :value="22"></el-option>
                    <el-option label="快速赚任务" :value="23"></el-option>
                    <el-option label="达人首次奖励" :value="24"></el-option>
                    <el-option label="达人后续奖励" :value="25"></el-option>
                    <el-option label="阅读小说" :value="26"></el-option>
                    <el-option label="达人邀请周榜奖励" :value="27"></el-option>
                    <el-option label="高额赚提成" :value="28"></el-option>
                    <el-option label="每日红包任务" :value="29"></el-option>
                    <el-option label="观看视频" :value="30"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.changedTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="message.changedType==3" style="margin-bottom: 10px">
                <el-form-item label="审核时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="message.auditTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"  v-if="message.changedType==3" style="margin-bottom: 10px">
                <el-form-item  label="审核结果:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="message.status" :disabled="true" @change="isAuditingChange(messageForm.status)"  placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="冻结" :value="2"></el-option>
                    <el-option label="拒绝" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col v-if="reasonMess" :span="20" style="margin-bottom: 10px">
                <el-form-item label="拒绝原因:" :label-width="formLabelWidth">
                  <el-input  :rows="4" spellcheck="false" :disabled="true"  type="textarea" v-model="message.reason"  auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTable=false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="审核" :visible.sync="dialogTableVisible" width="800px">
          <el-form>
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="真实姓名:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.userName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="messageForm.changedType==3" :span="10" style="margin-bottom: 10px">
                <el-form-item label="支付宝账号:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.account" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="提现金额（元）:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.amountM" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币余额:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.coin | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币变动:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.amount | currency" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="收支:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="messageForm.flowType" :disabled="true"   placeholder="">
                    <el-option label="收入" :value="1"></el-option>
                    <el-option label="支出" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更类型:" :label-width="formLabelWidth">
                  <!--<el-input :value="messageForm.changedType" :disabled="true" auto-complete="off" style="" clearable></el-input>-->
                  <el-select :style="styleObject" v-model="messageForm.changedType" :disabled="true"   placeholder="">
                    <el-option label="答题" :value="1"></el-option>
                    <el-option label="每日签到" :value="2"></el-option>
                    <el-option label="提现" :value="3"></el-option>
                    <el-option label="推荐用户" :value="4"></el-option>
                    <el-option label="徒弟贡献" :value="5"></el-option>
                    <el-option label="VIP" :value="6"></el-option>
                    <el-option label="游戏试玩" :value="7"></el-option>
                    <el-option label="好友升级奖励" :value="8"></el-option>
                    <el-option label="新人注册" :value="9"></el-option>
                    <el-option label="任务" :value="10"></el-option>
                    <el-option label="出题" :value="11"></el-option>
                    <el-option label="兑换金猪" :value="12"></el-option>
                    <el-option label="阅读资讯" :value="13"></el-option>
                    <el-option label="提现退回" :value="14"></el-option>
                    <el-option label="直属用户返利" :value="15"></el-option>
                    <el-option label="赠送运营总监" :value="16"></el-option>
                    <el-option label="间接用户返利" :value="17"></el-option>
                    <el-option label="居间返利" :value="18"></el-option>
                    <el-option label="阅读广告奖励" :value="19"></el-option>
                    <el-option label="分享资讯" :value="20"></el-option>
                    <el-option label="签到赚" :value="21"></el-option>
                    <el-option label="大众团队长分佣" :value="22"></el-option>
                    <el-option label="快速赚任务" :value="23"></el-option>

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="变更时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :value="messageForm.changedTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="12" style="margin-bottom: 10px">-->
                <!--<el-form-item label="审核时间:" :label-width="formLabelWidth">-->
                  <!--<el-input :style="styleObject" :value="messageForm.auditTime" :disabled="true" auto-complete="off" style="" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="审核结果:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="messageForm.status" @change="isAuditingChange(messageForm.status)"  placeholder="">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="冻结" :value="2"></el-option>
                    <el-option label="拒绝" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="reasonMess" :span="20" style="margin-bottom: 10px">
                <el-form-item label="拒绝原因:" :label-width="formLabelWidth">
                  <el-input :rows="4"  spellcheck="false" type="textarea" v-model="messageForm.reason"  auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible=false">取消</el-button>
            <el-button type="primary" @click="update(messageForm)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="sun_sty" v-if="tableData.length>0">
        <div class="list">
          <div class="item"><p>小计<span>({{tableData.length}})：</span></p></div>
          <div class="item"><p> [ 总收入： {{subRevenuePrice | currency}} ]</p></div>
          <div class="item"><p>[ 总支出：{{subExpendPrice | currency}} ]</p></div>
        </div>
        <div class="list">
          <div class="item"><p>合计<span>({{totalCount}})：</span></p></div>
          <div class="item"><p> [ 总收入： {{totalRevenuePrice | currency}} ]</p></div>
          <div class="item"><p>[ 总支出：{{totalExpendPrice | currency}} ]</p></div>
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
    name: 'CoinChange',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        searchTrue:false,
        exportExle:false,
        menuId:'',
        isNotAuditing:false,
        labelWidth:'80px',
        optionW:'1px',
        messageForm:{},
        channelList:[],  // 渠道列表
        reasonMess:false,
        dialogTableVisible:false,
        dialogTable:false,
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        subRevenuePrice:'',
        subExpendPrice:'',
        pageCount:'',
        totalRevenuePrice:'',
        totalExpendPrice:'',
        formInline: {
          userName:"",
          changedType:'',
          mobile:'',
          accountId:'',
          flowType:'',
          searchType:'',
          rewardType:'',
          channelType:''
        },
        tableData: [],
        message:{},
        exa:false,
        fullscreenLoading:false,//导出弹层
        selectTime:'',
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
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      this.getNewPlatList();
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
      //导出表格
      queryExport() {
        //开启正在导出弹层
        this.fullscreenLoading = this.$loading({
          lock: true,
          text: '正在导出...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startTime ='';
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endTime ='';
        }

          let  changedType=this.formInline.changedType;
          let mobile=this.formInline.mobile;
          let  accountId=this.formInline.accountId;
          let  startTime=this.formInline.startTime;
          let  endTime=this.formInline.endTime;
          let  coinMin=this.formInline.coinMin;
          let  coinMax=this.formInline.coinMax;
          let  searchType=this.formInline.searchType;
          let  rewardType=this.formInline.rewardType;
          let  channelType=this.formInline.channelType;
          let token= getSession("token");
          let channel= getSession("channelCode")
          let relation= getSession("userRelation");

          let url = '/excl/exclCoinChange';
          let data = {url,changedType,mobile,accountId,startTime,endTime,coinMin,coinMax,token,channel,relation};
          this.doDownload(data);
      },
      doDownload(obj) {
        let url = obj.url,

          mobile=obj.mobile,
          accountId=obj.accountId,
          changedType=obj.changedType,
          startTime=obj.startTime,
          endTime=obj.endTime,
          coinMin=obj.coinMin,
          coinMax=obj.coinMax,
          token= obj.token,
          channel=obj.channel,
          relation=obj.relation

        let a1 = document.createElement('a');

        let http=url;
        if(http==url){
          if(accountId){
            http=http+'?accountId=' + accountId
          }
        }

        if(http==url){
          if(changedType){
            http=http+'?changedType=' + changedType
          }
        }else{
          if(changedType){
            http=http+'&changedType=' + changedType
          }
        }

        if(http==url){
          if(mobile!=null && mobile!=''){
            http=http+'?mobile=' + mobile
          }
        }else{
          if(mobile!=null && mobile!=''){
            http=http+'&mobile=' + mobile
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
          if(coinMin){
            http=http+'?coinMin=' + coinMin
          }
        }else{
          if(coinMin){
            http=http+'&coinMin=' + coinMin
          }
        }
        if(http==url){
          if(coinMax){
            http=http+'?coinMax=' + coinMax
          }
        }else{
          if(coinMax){
            http=http+'&coinMax=' + coinMax
          }
        }
        if(http==url){
          http=http+'?token='+token+'&channel='+channel+'&relation='+relation
        }else{
          http=http+'&token='+token+'&channel='+channel+'&relation='+relation
        }
        //a1.setAttribute('href',url + '?userName=' + userName +'&changedType='+changedType +'&mobile='+mobile +'&accountId='+accountId +'&flowType='+flowType+'&token='+token +'&channel='+channel);
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

      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.length - 1; i >= 0; i--) {
            if(res.data[i].btnCode == 'exa') {
              this.powerTrue =true;
              this.exa=true
            }
            if(res.data[i].btnCode == 'search') {
              this.searchTrue =true;
            }
            if(res.data[i].btnCode == 'exportExle') {
              this.exportExle =true;
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
      // 获取新平台选项
      getNewPlatList(){
        this.$newPlatformGet('/py/platform_list', '').then(res=>{
          // 渠道列表
          this.channelList = [...res.channel_list]
          // 平台列表
          this.platformList = [...res.platform]
        })
      },
      accountList() {
        let parameterData = {
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          /*userName:this.formInline.userName,*/
          changedType:this.formInline.changedType,
          mobile:this.formInline.mobile,
          accountId:this.formInline.accountId,
          /*flowType:this.formInline.flowType*/
          startTime:this.formInline.startTime,
          endTime:this.formInline.endTime,
          coinMin:this.formInline.coinMin,
          coinMax:this.formInline.coinMax,
          searchType:this.formInline.searchType,
          rewardType:this.formInline.rewardType,
          channelType:this.formInline.channelType
        }

        this.$fetch('/py/coinchange', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            res.data.list[i].changedTime=formatDate(new Date(res.data.list[i].changedTime), 'yyyy-MM-dd hh:mm:sss')
            switch (res.data.list[i].changedType) {
              case 1:
                res.data.list[i].changedType = '答题';
                break;
              case 2:
                res.data.list[i].changedType = '每日红包';
                break;
              case 3:
                res.data.list[i].changedType = '提现';
                break;
              case 4:
                res.data.list[i].changedType = '推荐用户';
                break;
              case 5:
                res.data.list[i].changedType = '徒弟贡献';
                break;
              case 6:
                res.data.list[i].changedType = 'VIP';
                break;
              case 7:
                res.data.list[i].changedType = '游戏试玩';
                break;
              case 8:
                res.data.list[i].changedType = '好友升级奖励';
                break;
              case 9:
                res.data.list[i].changedType = '新人注册';
                break;
              case 10:
                res.data.list[i].changedType = '任务';
                break;
              case 11:
                res.data.list[i].changedType = '出题';
                break;
              case 12:
                res.data.list[i].changedType = '兑换闯关奖励';
                break;
              case 13:
                res.data.list[i].changedType = '阅读资讯';
                break;
              case 14:
                res.data.list[i].changedType = '提现退回';
                break;
              case 15:
                res.data.list[i].changedType = '直属用户返利';
                break;
              case 16:
                res.data.list[i].changedType = '赠送运营总监';
                break;
              case 17:
                res.data.list[i].changedType = '间接用户返利';
                break;
              case 18:
                res.data.list[i].changedType = '居间返利';
                break;
              case 19:
                res.data.list[i].changedType = '阅读广告奖励';
                break;
              case 20:
                res.data.list[i].changedType = '分享资讯';
                break;
              case 21:
                res.data.list[i].changedType = '签到赚';
                break;
              case 22:
                res.data.list[i].changedType = '大众团队长分佣';
                break;
              case 23:
                res.data.list[i].changedType = '快速赚任务';
                break;
              case 24:
                res.data.list[i].changedType = '达人首次奖励';
                break;
              case 25:
                res.data.list[i].changedType = '达人后续奖励';
                break;
              case 26:
                res.data.list[i].changedType = '阅读小说';
                break;
              case 27:
                res.data.list[i].changedType = '达人邀请周榜奖励';
                break;
              case 28:
                res.data.list[i].changedType = '高额赚提成';
                break;
              case 29:
                res.data.list[i].changedType = '每日红包任务';
                break;
              case 30:
                res.data.list[i].changedType = '观看视频';
                break;
              case 31:
                res.data.list[i].changedType = '小游戏奖励';
                break;
              case 32:
                res.data.list[i].changedType = '打卡消耗';
                break;
              case 33:
                res.data.list[i].changedType = '打卡奖励';
                break;
              case 34:
                res.data.list[i].changedType = '金币排行日榜奖励';
                break;
              case 35:
                res.data.list[i].changedType = '合伙人一级直属用户贡献';
                break;
              case 36:
                res.data.list[i].changedType = '合伙人二级直属用户贡献';
                break;
              case 37:
                res.data.list[i].changedType = '闯关助力';
                break;
              case 38:
                res.data.list[i].changedType = '合伙人二级以下直属用户贡献';
                break;
              case 39:
                res.data.list[i].changedType = '徒弟贡献金额';
                break;
              case 40:
                res.data.list[i].changedType = '徒孙贡献金额';
                break;
              case 41:
                res.data.list[i].changedType = '好友开通VIP奖励';
                break;
              case 42:
                res.data.list[i].changedType = '团队开通VIP奖励';
                break;
              // default:
            }

            if(res.data.list[i].roleType == '1'){
              res.data.list[i].roleType = '小麒麟'
            }else if(res.data.list[i].roleType == '2'){
              res.data.list[i].roleType = '金麒麟'
            }else if(res.data.list[i].roleType == '3'){
              res.data.list[i].roleType = '玉麒麟'
            }

            if(res.data.list[i].status == '1'){
              res.data.list[i].status = '正常'
            }else if(res.data.list[i].status == '2'){
              res.data.list[i].status = '冻结'
            }else{
              res.data.list[i].status = '拒绝'
            }
          }
          this.tableData = res.data.list;
          this.totalCount = parseInt(res.data.total);
          this.subRevenuePrice = res.data.subRevenuePrice;
          this.subExpendPrice = res.data.subExpendPrice;
          this.pageCount = res.data.pageCount;
          this.totalRevenuePrice = res.data.totalRevenuePrice;
          this.totalExpendPrice = res.data.totalExpendPrice;
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },
      getInfo(id) {
        this.reasonMess=false
        this.isNotAuditing=false
        this.dialogTable = true
        this.$fetch('/api/lCoinChange/info', {
          id: id
        }).then(res => {
           if ((res.statusCode+"").startsWith("2")) {
            if(res.data.status==3){
              this.reasonMess=true
            }
          res.data.changedTime=formatDate(new Date(res.data.changedTime), 'yyyy-MM-dd hh:mm:sss')
          res.data.auditTime=formatDate(new Date(res.data.auditTime), 'yyyy-MM-dd hh:mm:sss')
          this.message=res.data
         }
      })
      },
      getAuditingInfo(id){
        this.reasonMess=false
        this.dialogTableVisible = true
        this.$fetch('/api/lCoinChange/queryWithdrawalsInfo', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          if(res.data.status==3){
            this.reasonMess=true
          }
          res.data.changedTime=formatDate(new Date(res.data.changedTime), 'yyyy-MM-dd hh:mm:sss')
          res.data.auditTime=formatDate(new Date(res.data.auditTime), 'yyyy-MM-dd hh:mm:sss')
          this.messageForm=res.data
        }
       })
      },
      update(messageForm) {
        let parameterData = {
          id: this.messageForm.id,
          status:this.messageForm.status,
          reason:this.messageForm.reason
        }
        this.$fetch('/api/lCoinChange/audit', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogTableVisible = false
          this.accountList()
        }
      })
      },
      isAuditingChange(status){
        if(status==3){
          this.reasonMess=true
        }else{
          this.reasonMess=false
        }
      },
      search(){
        if (this.selectTime && this.selectTime[0]) {
          this.formInline.startTime = this.selectTime[0].getTime();
        }else {
          this.formInline.startTime ='';
        }
        if (this.selectTime && this.selectTime[1]) {
          this.formInline.endTime = this.selectTime[1].getTime();
        }else {
          this.formInline.endTime ='';
        }
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
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
  .coin-change-wrap .sun_sty{
    font-size: 14px;
    color: #13ce66;
    margin-bottom: 20px;
  }
  .coin-change-wrap  .sun_sty .list{
    width: 100%;
    height: 30px;
  }
  .coin-change-wrap .sun_sty .list .item:nth-child(1){
    min-width: 100px;
    max-width: 150px;
  }
  .coin-change-wrap .sun_sty .list .item{
    float: left;
    height: 30px;
    min-width: 200px;
    max-width: 300px;
  }

  .coin-change-wrap .sun_sty p{
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  .coin-change-wrap .sun_sty p span{
    font-size: 12px;
  }


  .amountred{
    color: #ff4d51;
  }
  .amountgreen{
    color: #13ce66;
  }

  .amountyellow{
    color: #E6A23C;
  }

  .coin-change-wrap {
    width: 100%;
  }

  .coin-change-inner {
    margin: auto;
    padding: 0 20px;
  }

  .coin-change-header {
    margin-bottom: 20px;
  }

  .coin-change-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .coin-change-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }
</style>
