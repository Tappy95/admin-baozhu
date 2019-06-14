import Vue from 'vue'
import Router from 'vue-router'

import {getSession} from '../utils/cookie'
// import HelloWorld from '@/components/HelloWorld'
/*import Index from '@/components/Index'
import LogIn from '@/components/LogIn' // 登录
import MobilePage from '@/components/MobilePage'

import AuthorityManagement from '@/components/views/AuthorityManagement'
import BrandManagement from '@/components/views/BrandManagement'
import BannerManage from '@/components/views/BannerManage'
import HomePage from '@/components/views/HomePage'
import {getSession} from '../utils/cookie'
import MenuManagement from '@/components/views/MenuManagement' //菜单管理
import RoleManagement from '@/components/views/RoleManagement' //角色管理

import Commodity from '@/components/views/Commodity'
import Classify from '@/components/views/Classify'
import Order from '@/components/views/Order'

import AdministratorManage from '@/components/views/AdministratorManage' //管理员管理
import Dictionary from '@/components/views/Dictionary' //字典管理
import UserInfo from '@/components/views/UserInfo' //用户信息管理
import AttendanceRules from '@/components/views/AttendanceRules' //签到规则

import NewsNotice from '@/components/views/NewsNotice' //公告
import NewsInfo from '@/components/views/NewsInfo' //通知

import BalanceChange from '@/components/views/BalanceChange' //提现记录
import TransactionChange from '@/components/views/TransactionChange' //交易记录

import UserLevel from '@/components/views/UserLevel' //用户等级
import ActiveManage from '@/components/views/ActiveManage' //活动管理
import CoinChange from '@/components/views/CoinChange' //金币
import PigChange from '@/components/views/PigChange' //金猪
import RechargeChange from '@/components/views/RechargeChange' //订单记录

import SignList from '@/components/views/SignList' //签到记录
import FightingInfo from '@/components/views/FightingInfo' //对战记录

import FightingRules from '@/components/views/FightingRules' //答题规则
import FightingQuestion from '@/components/views/FightingQuestion' //答题列表


import CardVoucher from '@/components/views/CardVoucher' //卡券管理
import VipManage from '@/components/views/VipManage' //VIP管理

import GameMerchant from '@/components/views/GameMerchant' //游戏商户列表
import GameInterface from '@/components/views/GameInterface' //游戏商户接口
import GameTypes from '@/components/views/GameTypes' //游戏类型

import GameTask from '@/components/views/GameTask' //游戏任务
import GameList from '@/components/views/GameList' //游戏列表

import ApplicationMarket from '@/components/views/applicationMarket' //应用市场
import TaskJob  from '@/components/views/TaskJob' //应用市场

import IpBlack  from '@/components/views/IpBlack' //ip黑名单
import IpWhite  from '@/components/views/IpWhite' //ip白名单

import LotteryType  from '@/components/views/LotteryType' //抽奖类型
import LotteryGoods  from '@/components/views/LotteryGoods' //奖品类型
import LotteryOrder  from '@/components/views/LotteryOrder' //中奖订单

import OddsManage from '@/components/views/OddsManage' //赔率
import PlayGroup from '@/components/views/PlayGroup' //玩法组
import FeedBack from '@/components/views/FeedBack' //意见反馈

import ChannelManage from '@/components/views/ChannelManage' //渠道
import ResourceType from '@/components/views/ResourceType' //资源类型
import ResourceCollect from '@/components/views/ResourceCollect' //资源采集

import VersionManage from '@/components/views/VersionManage' //版本管理
import ResourceList from '@/components/views/ResourceList' //资源列表
import LotteryResult from '@/components/views/LotteryResult' //开奖结果

import ChannelUser from '@/components/views/ChannelUser' //渠道用户
import GameSide from '@/components/views/GameSide' //渠道用户

import GameOrder from '@/components/views/GameOrder' //竞猜记录

import FissionCase from '@/components/views/FissionCase' //裂变方案
import ChannelSet from '@/components/views/ChannelSet' //渠道配置

import DataStatistics from '@/components/views/DataStatistics' //数据统计

import Statistics from '@/components/views/Statistics' //首页统计

import CashManage from '@/components/views/CashManage' //提现管理*/





//
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: resolve => require(['../components/LogIn.vue'], resolve),
  },
  {
    path: '/mobile-page',
    name: 'MobilePage',
    component: resolve => require(['../components/MobilePage.vue'], resolve),
  },
  {
    path: '/',
    redirect: '/home-page',
    name: 'Index',
    component: resolve => require(['../components/Index.vue'], resolve),
    meta: {auth: true},
    children: [{
      path: 'administrator-manage',
      name: 'AdministratorManage',
      component: resolve => require(['../components/views/AdministratorManage.vue'], resolve),
    },
      {
        path: 'authority-management',
        name: 'AuthorityManagement',
        component: resolve => require(['../components/views/AuthorityManagement.vue'], resolve),
      },
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: resolve => require(['../components/views/UserInfo.vue'], resolve),
      },
      {
        path: 'userlevel',
        name: 'UserLevel',
        component: resolve => require(['../components/views/UserLevel.vue'], resolve),
      },
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: resolve => require(['../components/views/Dictionary.vue'], resolve),
      },
      {
        path: 'attendance-rules',
        name: 'AttendanceRules',
        component: resolve => require(['../components/views/AttendanceRules.vue'], resolve),
      },
      {
        path: 'news-notice',
        name: 'NewsNotice',
        component: resolve => require(['../components/views/NewsNotice.vue'], resolve),
      },
      {
        path: 'news-info',
        name: 'NewsInfo',
        component: resolve => require(['../components/views/NewsInfo.vue'], resolve),
      },
      {
        path: 'balance-change',
        name: 'BalanceChange',
        component: resolve => require(['../components/views/BalanceChange.vue'], resolve),
      },
      {
        path: 'transaction-change',
        name: 'TransactionChange',
        component: resolve => require(['../components/views/TransactionChange.vue'], resolve),
      },

      {
        path: 'active-manage',
        name: 'ActiveManage',
        component: resolve => require(['../components/views/ActiveManage.vue'], resolve),
      },
      {
        path: 'coin-change',
        name: 'CoinChange',
        component: resolve => require(['../components/views/CoinChange.vue'], resolve),
      },
      {
        path: 'banner-manage',
        name: 'BannerManage',
        component: resolve => require(['../components/views/BannerManage.vue'], resolve),
      },
      {
        path: 'sign-list',
        name: 'SignList',
        component: resolve => require(['../components/views/SignList.vue'], resolve),
      },
      {
        path: 'fighting-info',
        name: 'FightingInfo',
        component: resolve => require(['../components/views/FightingInfo.vue'], resolve),
      },
      {
        path: 'fighting-rules',
        name: 'FightingRules',
        component: resolve => require(['../components/views/FightingRules.vue'], resolve),
      },
      {
        path: 'fighting-question',
        name: 'FightingQuestion',
        component: resolve => require(['../components/views/FightingQuestion.vue'], resolve),
      },

      {
        path: 'home-page',
        name: 'HomePage',
        component: resolve => require(['../components/views/HomePage.vue'], resolve),
      },
      {
        path: 'commodity',
        name: 'Commodity',
        component: resolve => require(['../components/views/Commodity.vue'], resolve),
      },
      {
        path: 'classify',
        name: 'Classify',
        component: resolve => require(['../components/views/Classify.vue'], resolve),
      },
      {
        path: 'order',
        name: 'Order',
        component: resolve => require(['../components/views/Order.vue'], resolve),
      },
      {
        path: 'menu-management',
        name: 'MenuManagement',
        component: resolve => require(['../components/views/MenuManagement.vue'], resolve),
      },
      {
        path: 'role-management',
        name: 'RoleManagement',
        component: resolve => require(['../components/views/RoleManagement.vue'], resolve),
      },
      {
        path: 'card-voucher',
        name: 'CardVoucher',
        component: resolve => require(['../components/views/CardVoucher.vue'], resolve),
      },
      {
        path: 'vip-manage',
        name: 'VipManage',
        component: resolve => require(['../components/views/VipManage.vue'], resolve),
      },
      {
        path: 'pig-change',
        name: 'PigChange',
        component: resolve => require(['../components/views/PigChange.vue'], resolve),
      },
      {
        path: 'game-merchant',
        name: 'GameMerchant',
        component: resolve => require(['../components/views/GameMerchant.vue'], resolve),
      },
      {
        path: 'game-interface',
        name: 'GameInterface',
        component: resolve => require(['../components/views/GameInterface.vue'], resolve),
      },
      {
        path: 'recharge-change',
        name: 'RechargeChange',
        component: resolve => require(['../components/views/RechargeChange.vue'], resolve),
      },
      {
        path: 'game-types',
        name: 'GameTypes',
        component: resolve => require(['../components/views/GameTypes.vue'], resolve),
      },
      {
        path: 'game-task',
        name: 'GameTask',
        component: resolve => require(['../components/views/GameTask.vue'], resolve),
      },
      {
        path: 'game-list',
        name: 'GameList',
        component: resolve => require(['../components/views/GameList.vue'], resolve),
      },
      {
        path: 'application-market',
        name: 'ApplicationMarket',
        component: resolve => require(['../components/views/applicationMarket.vue'], resolve),
      },
      {
        path: 'task-job',
        name: 'TaskJob',
        component: resolve => require(['../components/views/TaskJob.vue'], resolve),
      },
      {
        path: 'ip-black',
        name: 'IpBlack',
        component: resolve => require(['../components/views/IpBlack.vue'], resolve),
      },
      {
        path: 'ip-white',
        name: 'IpWhite',
        component: resolve => require(['../components/views/IpWhite.vue'], resolve),
      },
      {
        path: 'lottery-type',
        name: 'LotteryType',
        component: resolve => require(['../components/views/LotteryType.vue'], resolve),
      },
      {
        path: 'lottery-goods',
        name: 'LotteryGoods',
        component: resolve => require(['../components/views/LotteryGoods.vue'], resolve),
      },
      {
        path: 'lottery-order',
        name: 'LotteryOrder',
        component: resolve => require(['../components/views/LotteryOrder.vue'], resolve),
      },
      {
        path: 'odds-manage',
        name: 'OddsManage',
        component: resolve => require(['../components/views/OddsManage.vue'], resolve),
      },
      {
        path: 'play-group',
        name: 'PlayGroup',
        component: resolve => require(['../components/views/PlayGroup.vue'], resolve),
      },
      {
        path: 'feed-back',
        name: 'FeedBack',
        component: resolve => require(['../components/views/FeedBack.vue'], resolve),
      },
      {
        path: 'channel-manage',
        name: 'ChannelManage',
        component: resolve => require(['../components/views/ChannelManage.vue'], resolve),
      },
      {
        path: 'resource-type',
        name: 'ResourceType',
        component: resolve => require(['../components/views/ResourceType.vue'], resolve),
      },
      {
        path: 'resource-collect',
        name: 'ResourceCollect',
        component: resolve => require(['../components/views/ResourceCollect.vue'], resolve),
      },
      {
        path: 'version-manage',
        name: 'VersionManage',
        component: resolve => require(['../components/views/VersionManage.vue'], resolve),
      },
      {
        path: 'resource-list',
        name: 'ResourceList',
        component: resolve => require(['../components/views/ResourceList.vue'], resolve),
      },
      {
        path: 'lottery-result',
        name: 'LotteryResult',
        component: resolve => require(['../components/views/LotteryResult.vue'], resolve),
      },
      {
        path: 'channel-user',
        name: 'ChannelUser',
        component: resolve => require(['../components/views/ChannelUser.vue'], resolve),
      },
      {
        path: 'game-side',
        name: 'GameSide',
        component: resolve => require(['../components/views/GameSide.vue'], resolve),
      },
      {
        path: 'game-order',
        name: 'GameOrder',
        component: resolve => require(['../components/views/GameOrder.vue'], resolve),
      },
      {
        path: 'fission-case',
        name: 'FissionCase',
        component: resolve => require(['../components/views/FissionCase.vue'], resolve),
      },
      {
        path: 'channel-set',
        name: 'ChannelSet',
        component: resolve => require(['../components/views/ChannelSet.vue'], resolve),
      },
      {
        path: 'data-statistics',
        name: 'DataStatistics',
        component: resolve => require(['../components/views/DataStatistics.vue'], resolve),
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: resolve => require(['../components/views/Statistics.vue'], resolve),
      },
      {
        path: 'cash-manage',
        name: 'CashManage',
        component: resolve => require(['../components/views/CashManage.vue'], resolve),
      },

    ]
  }
]

const router = new Router({
  routes
});
router.beforeEach((to,from,next) => {
  if(to.matched.some( m => m.meta.auth)){
  const token = getSession("token")
  // 对路由进行验证
  if(null != token) { // 已经登陆
    next()   // 正常跳转到你设置好的页面
  }else{
    // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
    next({path:"/",query:{ Rurl: to.fullPath} })
  }
}else{
  next()
}
})
export default router;

// const router = new Router({
//   routes
// });
// router.beforeEach((to, from, next) = > {
//   if(to.matched.some(m = > m.meta.auth
// ))
// {
//   const token = getSession("token")
//   // 对路由进行验证
//   if (null != token) { // 已经登陆
//     next()   // 正常跳转到你设置好的页面
//   } else {
//     // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
//     next({path: "/", query: {Rurl: to.fullPath}})
//   }
// }
// else
//   {
//     next()
//   }
// })
// export default router;
