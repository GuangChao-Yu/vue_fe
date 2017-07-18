import vueRouter from 'vue-router'

const router = new vueRouter({
  mode: 'history',
  saveScrollPosition: true,
  routes: [
    // 统配跳转，url输入错误的话 可以转到404页面 或者首页
    {
      path: '*',
      redirect: '/index',
      component: require('../pages/index.vue')
    },
    //默认路由跳转到index redirect重新定向到index
    {
      path: '/',
      redirect: '/index',
    },
    //入口首页
    {
      path: '/index',
      name: "index",
      component: require('../pages/index.vue')
    },
    //绑定手机页面
    {
      path: '/bindingMobile',
      name: "bindingMobile",
      component: require('../pages/binding/bindingMobile.vue')
    },
    //个人中心
    {
      name: 'usercenter',
      path: '/usercenter',
      title: '个人中心',
      component: require('../pages/usercenter/index.vue'),
    },
    //个人中心兑换记录
    {
      component: require('../pages/usercenter/exchangelist.vue'),
      path: '/usercenter/exchangelist',
      title: '兑换记录',
      name: 'exchangelist',
      meta: {
        requiresAuth: true,
      }
    },
    //个人中心收支记录
    {
      component: require('../pages/usercenter/revenue.vue'),
      path: '/usercenter/revenue',
      title: '收支记录',
      name: 'revenue',
      meta: {
        requiresAuth: true,
      }
    },
    //个人中心天梯排行
    {
      component: require('../pages/rank/rank.vue'),
      path: '/usercenter/rank',
      title: '天梯排行',
      name: 'rank',
      meta: {
        requiresAuth: true
      }
    },
    //编辑个人中心
    {
      component: require('../pages/usercenter/edit.vue'),
      path: '/usercenter/edit',
      title: '编辑个人中心',
      name: 'edit',
      meta: {
        requiresAuth: true,
      }
    },
    //更换头像
    {
      component: require('../pages/usercenter/changehead.vue'),
      path: '/usercenter/changehead',
      title: '更换头像',
      name: 'changehead',
      meta: {
        requiresAuth: true
      }
    },
    //FAQ
    {
      component: require('../pages/usercenter/problem.vue'),
      path: '/usercenter/faq',
      title: 'FAQ',
      name: 'faq',
      meta: {
        requiresAuth: true
      }
    },
    //规则&评分
    {
      component: require('../pages/usercenter/grad.vue'),
      path: '/usercenter/rule',
      title: '规则评分',
      name: 'rule',
      meta: {
        requiresAuth: true
      }
    },
    //活动
    {
      name: "doing",
      path: '/doing',
      component: require('../pages/doing/doing.vue')
    },
    //竞猜(电竞经理人首页)
    {
      name: "handlers",
      path: '/handlers',
      component: require('../pages/handlers/handlers.vue')
    },
    //竞猜(我的竞猜)
    {
      name: 'myguess',
      path: '/myGuess',
      component: require('../pages/handlers/myguess.vue')
    },
    //兑换列表首页
    {
      name: "exchange",
      path: '/exchange',
      component: require('../pages/exchange/exchange.vue')
    },
    //兑换列表详情
    {
      name: "getExchangeDetail",
      path: '/getExchangeDetail',
      component: require('../pages/exchange/exchangeDetail.vue')
    },
    //兑换QB列表详情
    {
      name: "exchangeQb",
      path: '/exchangeQb',
      component: require('../pages/exchange/exchangeQb.vue')
    },
    //兑换QB列表详情
    {
      name: "exchangeQbTow",
      path: '/exchangeQbTow',
      component: require('../pages/exchange/exchangeQbTow.vue')
    },
    //赛事详情
    {
      name: "contestDetails",
      path: '/contestDetails',
      component: require('../pages/handlers/contestDetails.vue')
    },
    //配置阵容
    {
      name: 'mapplayer',
      path: '/mapplayer',
      component: require('../pages/handlers/mapplayer.vue')
    },
    //导入阵容
    {
      name: 'lead',
      path: '/leadbattle',
      component: require('../pages/handlers/leadbattle.vue')
    },
    //导入阵容详情
    {
      name: 'leadDetails',
      path: '/leadDetails',
      component: require('../pages/handlers/leadDetails.vue')
    },
    //选择队员队伍
    {
      name: 'picking',
      path: '/picking',
      component: require('../pages/handlers/pickplayer.vue')
    },
    //王者荣耀选择队员
    {
      name:'pickking',
      path:'/pickking',
      component:require('../pages/handlers/pickplayerKing.vue')
    },
    //比赛结果
    {
      name: 'contestResult',
      path: '/contestResult',
      component: require('../pages/handlers/contestResult.vue')
    },
    //队员&队伍详情页面
    {
      name: 'details',
      path: '/details',
      component: require('../pages/handlers/details.vue')
    },
    //其他竞猜页面
    {
      name: 'othergame',
      path: '/othergame',
      component: require('../pages/handlers/othergame.vue')
    },
    //站内信
    {
      name: 'letter',
      path: '/letter',
      component: require('../pages/letter/letter.vue')
    },
    //站内信详情
    {
      name: 'letterContent',
      path: '/letter/letterContent',
      component: require('../pages/letter/letterContent.vue'),
      meta: {
        requiresAuth: true
      }
    },
    //赛事咨询
    {
      name: 'consultation',
      path: '/consultation',
      component: require('../pages/consultation/consultation.vue')
    },
    //猜输赢，竞猜
    {
      name: 'guess',
      path: '/guess',
      component: require('../pages/guess/guess.vue')
    },
    //竞猜记录
    {

      name: 'guessRecord',
      path: '/guess/guessRecord',
      component: require('../pages/guess/guessRecord.vue'),

      meta: {
        requiresAuth: true
      }
    },
    //竞猜详情页面
    {
      name: 'guesscon',
      path: '/guess/guesscon',
      component: require('../pages/guess/guesscon.vue')
    },
    //竞猜规则页面
    {
      name: 'guessrule',
      path: '/guess/guessrule',
      component: require('../pages/guess/guessrule.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'instructions',
      path: '/instructions',
      component: require('../components/common/instructions.vue'),
      meta: {
        requiresAuth: true
      }
    },
    //竞猜规则页面
    {
      name: 'king',
      path: '/king',
      component: require('../components/common/king.vue'),
    }
  ]
})

export default router;
