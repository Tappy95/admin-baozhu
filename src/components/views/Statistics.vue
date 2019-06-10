<template>
    <div class="wrap" style="height: 100vh; background:rgba(244,244,245,1)">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid_item bg1 grid-content">
            <img src="../../assets/statistics/zhuce_add.png"/>
            <div class="dec">
              <p>{{tipData.userCount}}<span>人</span></p>
              <p>总人数</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid_item bg2 grid-content">
            <img src="../../assets/statistics/youxian_vip.png"/>
            <div class="dec">
              <p>{{tipData.vipCount}}<span>人</span></p>
              <p>总会员</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid_item bg3 grid-content">
            <img src="../../assets/statistics/tixian.png"/>
            <div class="dec">
              <p>{{tipData.txCount}}<span>人</span></p>
              <p>提现申请</p>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid_item bg4 grid-content">
            <img src="../../assets/statistics/duihuan.png"/>
            <div class="dec">
              <p>{{tipData.dhCount}}<span>人</span></p>
              <p>礼品兑换申请</p>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
              <el-date-picker
                v-model="selectTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="left">
              </el-date-picker>
          </el-form-item>
            <el-form-item label="渠道标识:" :label-width="formLabelWidth">
              <el-select  v-model="formInline.channelCode" placeholder="请选择渠道标识">
                <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelCode" :value="item.channelCode"></el-option>
                <el-option label="全部" value=""></el-option>
              </el-select>
            </el-form-item>

          <el-form-item style="margin-left: 20px">
             <el-button type="primary" plain @click="search">查询</el-button>
          </el-form-item>

          <el-form-item style="margin-left: 20px">
            <el-button type="danger" plain @click="typeTap">昨天</el-button>
          </el-form-item>

          <!--<el-form-item >-->
            <!--<el-button type="warning" plain >本周</el-button>-->
          <!--</el-form-item>-->

          <!--<el-form-item >-->
            <!--<el-button type="success" plain >本月</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </el-row>
     <div class="box_wrap">
          <el-row :gutter="10">
            <el-col  :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}"  >
            <el-popover
              :placement=place
              title="新增注册量"
              width="200"
              :offset=off
              trigger="hover"
              content="时间段内注册的人数">
              <div slot="reference" class="list grid-content">
                <img src="../../assets/statistics/zuce_add.png"/>
                <div class="dec">
                  <p>{{listData.regUser}}<span>人</span></p>
                  <p>新增注册量</p>
                </div>
              </div>
            </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="签到人数"
                width="200"
                :offset=off
                trigger="hover"
                content="时间段内参加每日签到的人数">
                  <div slot="reference" class="list grid-content">
                    <img src="../../assets/statistics/sign_num.png"/>
                    <div class="dec">
                      <p>{{listData.signCount}}<span>人</span></p>
                      <p>签到人数</p>
                    </div>
                  </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="登录人数"
                width="200"
                :offset=off
                trigger="hover"
                content="时间段内登录过的总人数">
                <div slot="reference" class="list grid-content">
                  <img src="../../assets/statistics/login_num.png"/>
                  <div class="dec">
                    <p>{{listData.loginCount}}<span>人</span></p>
                    <p>登录人数</p>
                  </div>
                </div>
              </el-popover>
            </el-col>


            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="首次购买VIP人数"
                width="200"
                :offset=off
                trigger="hover"
                content="时间段内第一次购买VIP的人数">
                <div slot="reference" class="list grid-content">
                <img src="../../assets/statistics/first_vip.png"/>
                <div class="dec">
                  <p>{{listData.firstVip}}<span>人</span></p>
                  <p>首次购买VIP人数</p>
                </div>
              </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="绑定支付通道人数"
                width="200"
                :offset=off
                trigger="hover"
                content="时间段内绑定过支付宝、微信等支付通道的总人数">
                <div slot="reference" class="list grid-content">
                    <img src="../../assets/statistics/pay_num.png"/>
                    <div class="dec">
                      <p>{{listData.bindZFB}}<span>人</span></p>
                      <p>绑定支付通道人数</p>
                    </div>
                </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="购买VIP人数"
                width="200"
                :offset=off
                trigger="hover"
                content="时间段内购买VIP的人数">
                <div slot="reference" class="list grid-content">
                  <img src="../../assets/statistics/vip_num.png"/>
                  <div class="dec">
                    <p>{{listData.vipCounts}}<span>人</span></p>
                    <p>购买VIP人数</p>
                  </div>
                </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="购买VIP总金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内用户购买VIP会员实际会费的总金额，不包含优惠赠送金额">
                <div slot="reference" class="list grid-content">
                  <img src="../../assets/statistics/vip_acconut.png"/>
                  <div class="dec">
                  <p>{{listData.vipAmount}}<span>元</span></p>
                  <p>购买VIP总金额</p>
                  </div>
                </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="游戏试玩累计金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段参加第三方游戏的试玩加成、试玩赠送的总金额">
                <div slot="reference" class="list grid-content">
                    <img src="../../assets/statistics/game.png"/>
                    <div class="dec">
                      <p>{{listData.swAmount}}<span>元</span></p>
                      <p>游戏试玩累计金额</p>
                    </div>
                  </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="总提现金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内通过支付通道兑换成功的金">
              <div slot="reference" class="list grid-content">
                <img src="../../assets/statistics/wallet.png"/>
                <div class="dec">
                  <p>{{listData.txzAmount}}<span>元</span></p>
                  <p>总提现金额</p>
                </div>
              </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="礼品等价总金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内所有兑换礼品相应价值的总金额">
                <div slot="reference" class="list grid-content">
                    <img src="../../assets/statistics/gift.png"/>
                    <div class="dec">
                      <p>{{listData.lpdjAmount}}<span>元</span></p>
                      <p>礼品等价总金额</p>
                    </div>
                 </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="升级运营总监总金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内所有渠道用户升级为运营总监所付费金额（含首次和续费金额）">
                <div slot="reference" class="list grid-content">
                    <img src="../../assets/statistics/upgrade.png"/>
                    <div class="dec">
                      <p>{{listData.tdzAmount}}<span>元</span></p>
                      <p>升级运营总监总金额</p>
                    </div>
                </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="活动奖励"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内参加答题、签到、新人注册、出题、阅读资讯等所有平台活动赠送的总金额">
                <div slot="reference" class="list grid-content">
                  <img src="../../assets/statistics/flag.png"/>
                  <div class="dec">
                    <p>{{listData.hdjlAmount}}<span>元</span></p>
                    <p>活动奖励</p>
                  </div>
              </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="好友贡献"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内包含推荐用户、徒弟贡献、徒弟到达第四级获取等总贡献金额">
                <div slot="reference" class="list grid-content">
                  <img src="../../assets/statistics/person.png"/>
                  <div class="dec">
                    <p>{{listData.hygxAmount}}<span>元</span></p>
                    <p>好友贡献</p>
                  </div>
              </div>
              </el-popover>
            </el-col>

          </el-row>
          <el-row style="padding-bottom: 30px">
            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="兑换金猪总金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内用户进行VIP充值、金币兑换、参加活动、升级运营总监等赠送金猪的总金额">
                <div slot="reference" class="list grid-content">
                    <img src="../../assets/statistics/exchange.png"/>
                  <div class="dec">
                    <p>{{listData.jzdhAmount}}<span>元</span></p>
                    <p>兑换金猪总金额</p>
                  </div>
                </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="总竞猜金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内参加宝猪乐园游戏竞猜的总金额">
                <div slot="reference" class="list grid-content">
                  <img src="../../assets/statistics/coin.png"/>
                  <div class="dec">
                    <p>{{listData.jczAmount}}<span>元</span></p>
                    <p>总竞猜金额</p>
                  </div>
              </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="中奖总金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内游戏竞猜的总猜中金额">
                <div slot="reference" class="list grid-content">
                  <img src="../../assets/statistics/trophy.png"/>
                  <div class="dec">
                    <p>{{listData.zjzAmount}}<span>元</span></p>
                    <p>中奖总金额</p>
                  </div>
                </div>
              </el-popover>
            </el-col>

            <el-col :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}">
              <el-popover
                :placement=place
                title="抽奖总金额"
                width="200"
                :offset=off
                trigger="hover"
                :tabindex=tabindex
                content="时间段内参加金猪抽奖总消耗金猪的金额">
                <div slot="reference" class="list grid-content">
                  <img src="../../assets/statistics/turntable.png"/>
                  <div class="dec">
                    <p>{{listData.cjzAmount}}<span>元</span></p>
                    <p>抽奖总金额</p>
                  </div>
                </div>
              </el-popover>
            </el-col>
          </el-row>
    </div>
    </div>
</template>
<script>
  import { formatDate } from '../../utils/date.js'

  export default {
        name: "statistics",
      data() {
        return {
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
          value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
          selectTime: '',
          channelNameList:[],
          channelCode:'',
          formInline:{},
          formLabelWidth: '100px',
          tipData:{},
          listData:{},
          type:'',
          place:'top',//提示信息的位置
          off:0,
          tabindex:0
        };
      },
      created(){

          this.channelList();
          this.tipList();
          this.list();
      },
      filters: {
        //每隔三位数字以逗号隔开，保留小数点后两位
        currency: function (num){
          var dataval = parseInt(num);
          return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        },
      },
      methods: {

          //查询
          search(){
            //起始时间
            if (this.selectTime && this.selectTime[0]) {
              this.formInline.startTime = formatDate(new Date(this.selectTime[0]), 'yyyy-MM-dd hh:mm:sss');
              // console.log(formatDate(new Date(this.selectTime[0]), 'yyyy-MM-dd hh:mm:sss'))
            }else {
              this.formInline.startTime = ''
            }
            //结束时间
            if (this.selectTime && this.selectTime[1]) {
              this.formInline.endTime = formatDate(new Date(this.selectTime[1]), 'yyyy-MM-dd hh:mm:sss');
              // console.log(this.formInline.endTime)
            }else {
              this.formInline.endTime = ''
            }

            this.type = '';
            this.list();
          },

          typeTap(){
            // console.log(this.selectTime)
            this.type = 'yesterday';
            this.selectTime = [];
            // this.formInline = {};
            this.list();
          },

        list() {
          let parameterData = {
            channelCode: this.formInline.channelCode,
            type: this.type,
            startDate: this.formInline.startTime,
            endDate: this.formInline.endTime
          }
          this.$fetch('/api/pDataStatistics/homeTable', parameterData).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              // console.log(res.data)
              this.listData = res.data;
            } else {
              this.$message({
                type: 'error',
                message: res.message,
                duration: 3000
              })
            }
          })
        },
        //调取名称列表
        channelList(){
          this.$fetch('/api/mChannelInfo/downList',{
          }).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              this.channelNameList = res.data;
            }
          })
        },

        tipList(){
          this.$fetch('/api/pDataStatistics/homeTopData',{
          }).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              this.tipData = res.data;
            }
          })
        },
      }
    }
</script>

<style>
  @media screen and (min-width:960px) and (max-width:1200px){
    .wrap{
      padding: 10px 15px 10px 10px;
    }

    .grid_item{
      border-radius:2px;
      padding:10px 0 12px 0;
    }

    .grid_item img{
      width: 32px;
      height: 32px;
    }

    .grid_item  .dec p:nth-child(1){
      font-weight:600;
      font-size: 16px;
    }

    .grid_item  .dec p:nth-child(2){
      font-weight:600;
      line-height:28px;
      font-size: 12px;
    }

    .box_wrap .list{
      padding: 15px 20px;
      margin-bottom: 5px;
    }

    .box_wrap  .list .dec p:nth-child(1){
      font-size: 14px;

    }

    .box_wrap  .list .dec p:nth-child(1) span{
      font-size: 10px;

    }

    .box_wrap .list .dec p:nth-child(2){
      font-size:12px;
    }

    .box_wrap .list img{
      width: 40px;
      height: 40px;
    }

  }

  @media screen and (min-width:1201px) and (max-width:1366px){
    .wrap {
      padding: 15px 25px 15px 15px;
    }
    .grid_item{
      border-radius:3px;
      padding:15px 0 18px 0;
    }

    .grid_item img{
      width: 35px;
      height: 35px;
    }

    .grid_item  .dec p:nth-child(1){
      font-size: 17px;
    }
    .grid_item  .dec p:nth-child(2){
      font-size: 14px;
    }

    .box_wrap .list{
      padding: 20px 35px;
      margin-bottom: 15px;
    }

    .box_wrap .list .dec p:nth-child(1){
      font-size: 18px;
    }

    .box_wrap .list .dec p:nth-child(1) span{
      font-size: 12px;
    }

    .box_wrap .list .dec p:nth-child(2){
      font-size:14px;
    }

    .box_wrap .list img{
      width: 50px;
      height: 50px;
    }
  }

  @media screen and (min-width:1361px) and (max-width:1445px){
    .wrap{
      padding: 20px 40px 20px 20px;
    }

    .grid_item{
      border-radius:3px;
      padding:10px 0 10px 0;
    }

    .grid_item img{
      width: 40px;
      height: 40px;
    }

    .grid_item  .dec p:nth-child(1){
      font-size: px;
    }
    .grid_item  .dec p:nth-child(2){
      font-size: 16px;
    }


    .box_wrap .list{
      padding: 25px 35px;
      margin-bottom: 15px;
    }

    .box_wrap .list .dec p:nth-child(1){
      font-size: 20px;
    }

    .box_wrap .list .dec p:nth-child(1) span{
      font-size: 12px;
    }

    .box_wrap .list .dec p:nth-child(2){
      font-size:14px;
    }

    .box_wrap .list img{
      width: 66px;
      height: 66px;
    }

  }

  @media screen and (min-width:1445px) and (max-width:1920px){
    .wrap{
      padding: 30px 50px 30px 30px;
    }
    .grid_item{
      border-radius:4px;
      padding:30px 0 35px 0;
    }

    .grid_item img{
      width: 45px;
      height: 45px;
    }

    .grid_item  .dec p:nth-child(1){
      font-size: 24px;
    }
    .grid_item  .dec p:nth-child(2){
      font-size: 18px;
    }


    .box_wrap .list{
      padding: 20px 18px;
      margin-bottom: 10px;
    }

    .box_wrap .list .dec {
      margin-left: 16px;
    }
    .box_wrap  .list .dec p{
      padding: 0;
      margin: 0;
    }

    .box_wrap .list .dec p:nth-child(1){
      font-size: 20px;
    }

    .box_wrap .list .dec p:nth-child(1) span{
      font-size: 12px;
    }

    .box_wrap .list .dec p:nth-child(2){
      font-size:14px;
    }
    .box_wrap .list img{
      width: 66px;
      height: 66px;
    }



  }

  @media screen  (min-width:1920px) {
    .wrap{
      padding: 30px 50px 30px 30px;
    }

    .grid_item{
      border-radius:4px;
      padding:30px 0 35px 0;
    }

    .grid_item img{
      width: 45px;
      height: 45px;
    }

    .grid_item  .dec p:nth-child(1){
      font-size: 24px;
    }
    .grid_item  .dec p:nth-child(2){
      font-size: 18px;
    }



    .box_wrap .list{
      padding: 20px 18px;
    }

    .box_wrap .list .dec {
      margin-left: 16px;
    }
    .box_wrap .list .dec p{
      padding: 0;
      margin: 0;
    }

    .box_wrap .list .dec p:nth-child(1){
      font-size: 20px;
    }

    .box_wrap .list .dec p:nth-child(1) span{
      font-size: 12px;
    }

    .box_wrap .list .dec p:nth-child(2){
      font-size:14px;
    }
    .box_wrap.list img{
      width: 66px;
      height: 66px;
    }

  }
   .wrap{
     height: auto;
   }

  .box_wrap{
    border-radius:4px;
    background: rgba(255,255,255,1);
    /*padding-top: 10px;*/
  }

   .grid_item{
     display: flex;
     justify-content: center;
     align-content: center;
     align-items: center;
     border-radius:4px;
     /*padding:30px 0 35px 0;*/
   }

   .grid_item img{
      /*width: 44px;*/
      /*height: 44px;*/
    }

   .grid_item  .dec{
      margin-left: 16px;
   }

   .grid_item  .dec p{
     margin: 0;
     padding: 0;
     color:rgba(255,255,255,1);
   }

   .grid_item  .dec p:nth-child(1){
     /*font-weight:600;*/
     /*line-height:28px;*/
     /*font-size: 20px;*/
   }

   .grid_item  .dec p:nth-child(1) span{
     font-size:12px;
     font-weight:400;
     color:rgba(255,255,255,1);
     margin-left: 4px;
   }
   .grid_item  .dec p:nth-child(2){
     /*font-weight:600;*/
     /*line-height:28px;*/
     /*font-size: 14px;*/
   }

   .bg1{
     background:rgba(81,134,240,1);
   }

   .bg2{
     background:rgba(240,123,32,1);
   }

   .bg3{
     background:rgba(127,207,130,1);
   }
   .bg4{
     background-color: #31caab;
   }

   .box_wrap .list{
     width: 100%;
     height: auto;
     display: flex;
     justify-content: flex-start;
     /*align-content: center;*/
     align-items: center;
     padding: 20px 0;
     cursor: pointer;
     position: relative;
     z-index: 120;
   }

  .box_wrap .list:hover{
    transition: all .5s;
    box-shadow: 0 2px 10px 0px rgba(0,0,0,.1)
  }

  .box_wrap .list .dec {
     margin-left: 16px;
   }
  .box_wrap .list .dec p{
     padding: 0;
     margin: 0;
   }

   .list .dec p:nth-child(1){
     /*font-size: 20px;*/
     font-weight:600;
     color:rgba(59,62,91,1);
     margin-bottom: 5px;
   }




  .box_wrap .list:hover  .dec p:nth-child(2){
    color: #409EFF;
    /*color: cyan;*/
    /*-webkit-animation: neon6 1.5s ease-in-out infinite alternate;*/
    /*-moz-animation: neon6 1.5s ease-in-out infinite alternate;*/
    /*animation: neon6 1.5s ease-in-out infinite alternate;*/
  }


  @keyframes neon6 {
    from {
      text-shadow: 0 0 10px #fff,
      0 0 10px #fff,
      0 0 15px #fff,
      0 0 20px #ff00de,
      0 0 35px #ff00de,
      0 0 40px #ff00de,
      0 0 50px #ff00de,
      0 0 75px #ff00de;
    }
    to {
      text-shadow: 0 0 5px #fff,
      0 0 5px #fff,
      0 0 7px #fff,
      0 0 10px #ff00de,
      0 0 15px #ff00de,
      0 0 20px #ff00de,
      0 0 25px #ff00de,
      0 0 35px #ff00de;
    }
  }

  .box_wrap .list .dec p:nth-child(1) span{
     /*font-size: 12px;*/
     color:rgba(158,169,188,1);
     margin-left: 4px;
   }

  .box_wrap .list .dec p:nth-child(2){
     /*font-size:14px;*/
     font-weight:400;
     color:rgba(158,169,188,1);
   }



  .box_wrap .list img{
     padding-left: 16px;
     /*width: 66px;*/
     /*height: 66px;*/
   }

   .el-row {
     margin-bottom: 20px;
   &:last-child {
      margin-bottom: 0;
    }
   }
   .el-col {
     border-radius: 4px;
   }
   .bg-purple-dark {
     background: #99a9bf;
   }
   .bg-purple {
     background: #d3dce6;
   }
   .bg-purple-light {
     background: #e5e9f2;
   }
   .grid-content {
     border-radius: 4px;
     min-height: 36px;
   }
   .row-bg {
     padding: 10px 0;
     background-color: #f9fafc;
   }

</style>
