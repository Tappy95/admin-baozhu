import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
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


//
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/mobile-page',
    name: 'MobilePage',
    component: MobilePage
  },
  {
    path: '/',
    redirect: '/home-page',
    name: 'Index',
    component: Index,
    meta: {auth: true},
    children: [{
      path: 'administrator-manage',
      name: 'AdministratorManage',
      component: AdministratorManage
    },
      {
        path: 'authority-management',
        name: 'AuthorityManagement',
        component: AuthorityManagement
      },
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: UserInfo
      },
      {
        path: 'userlevel',
        name: 'UserLevel',
        component: UserLevel
      },
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: Dictionary
      },
      {
        path: 'attendance-rules',
        name: 'AttendanceRules',
        component: AttendanceRules
      },
      {
        path: 'news-notice',
        name: 'NewsNotice',
        component: NewsNotice
      },
      {
        path: 'news-info',
        name: 'NewsInfo',
        component: NewsInfo
      },
      {
        path: 'balance-change',
        name: 'BalanceChange',
        component: BalanceChange
      },
      {
        path: 'transaction-change',
        name: 'TransactionChange',
        component: TransactionChange
      },

      {
        path: 'active-manage',
        name: 'ActiveManage',
        component: ActiveManage
      },
      {
        path: 'coin-change',
        name: 'CoinChange',
        component: CoinChange
      },
      {
        path: 'banner-manage',
        name: 'BannerManage',
        component: BannerManage
      },
      {
        path: 'sign-list',
        name: 'SignList',
        component: SignList
      },
      {
        path: 'fighting-info',
        name: 'FightingInfo',
        component: FightingInfo
      },
      {
        path: 'fighting-rules',
        name: 'FightingRules',
        component: FightingRules
      },
      {
        path: 'fighting-question',
        name: 'FightingQuestion',
        component: FightingQuestion
      },

      {
        path: 'home-page',
        name: 'HomePage',
        component: HomePage
      },
      {
        path: 'commodity',
        name: 'Commodity',
        component: Commodity
      },
      {
        path: 'classify',
        name: 'Classify',
        component: Classify
      },
      {
        path: 'order',
        name: 'Order',
        component: Order
      },
      {
        path: 'menu-management',
        name: 'MenuManagement',
        component: MenuManagement
      },
      {
        path: 'role-management',
        name: 'RoleManagement',
        component: RoleManagement
      },
      {
        path: 'card-voucher',
        name: 'CardVoucher',
        component: CardVoucher
      },
      {
        path: 'vip-manage',
        name: 'VipManage',
        component: VipManage
      },
      {
        path: 'pig-change',
        name: 'PigChange',
        component: PigChange
      },
      {
        path: 'game-merchant',
        name: 'GameMerchant',
        component: GameMerchant
      },
      {
        path: 'game-interface',
        name: 'GameInterface',
        component: GameInterface
      },
      {
        path: 'recharge-change',
        name: 'RechargeChange',
        component: RechargeChange
      },
      {
        path: 'game-types',
        name: 'GameTypes',
        component: GameTypes
      },
      {
        path: 'game-task',
        name: 'GameTask',
        component: GameTask
      },
      {
        path: 'game-list',
        name: 'GameList',
        component: GameList
      },
      {
        path: 'application-market',
        name: 'ApplicationMarket',
        component: ApplicationMarket
      },
      {
        path: 'task-job',
        name: 'TaskJob',
        component: TaskJob
      },
      {
        path: 'ip-black',
        name: 'IpBlack',
        component: IpBlack
      },
      {
        path: 'ip-white',
        name: 'IpWhite',
        component: IpWhite
      },
      {
        path: 'lottery-type',
        name: 'LotteryType',
        component: LotteryType
      },
      {
        path: 'lottery-goods',
        name: 'LotteryGoods',
        component: LotteryGoods
      },
      {
        path: 'lottery-order',
        name: 'LotteryOrder',
        component: LotteryOrder
      },
      {
        path: 'odds-manage',
        name: 'OddsManage',
        component: OddsManage
      },
      {
        path: 'play-group',
        name: 'PlayGroup',
        component: PlayGroup
      },
      {
        path: 'feed-back',
        name: 'FeedBack',
        component: FeedBack
      },
      {
        path: 'channel-manage',
        name: 'ChannelManage',
        component: ChannelManage
      },
      {
        path: 'resource-type',
        name: 'ResourceType',
        component: ResourceType
      },
      {
        path: 'resource-collect',
        name: 'ResourceCollect',
        component: ResourceCollect
      },
      {
        path: 'version-manage',
        name: 'VersionManage',
        component: VersionManage
      },
      {
        path: 'resource-list',
        name: 'ResourceList',
        component: ResourceList
      },
      {
        path: 'lottery-result',
        name: 'LotteryResult',
        component: LotteryResult
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
