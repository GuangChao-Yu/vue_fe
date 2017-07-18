import axios from 'axios';
import {
  axiosConfig
} from './apiConfig.js'

//使用自定义的配置创建一个axios实例
let fetch = axios.create(axiosConfig);

const VERSION='v0.2.0'; //微信版本号
const DEVICE_SYSTEM='social' //设备号微信

//添加拦截器请求，如果存在auth，就添加后端接口规则headers
fetch.interceptors.request.use(function (config) {
  let auth = JSON.parse(window.localStorage.getItem('auth'));
  if (auth) {
    config.headers.Authorization = 'Bearer ' + auth.token;
    config.headers.version=VERSION;
    config.headers.device_system=DEVICE_SYSTEM;
    config.headers.Accept = 'application/json';
  }
  return config;
}, function (err) {
  return Promise.reject(err);
})

// 添加响应拦截器 response请求
fetch.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.status === 10401) {
    localStorage.clear();
    alert('您的账号在别处登录,正在重新登录..');
    window.location = '/index/' + '&time' + ((new Date()).getTime())
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 所有的接口以及参数说明
/**
 * 用户登录
 * @param {String}      login_name   登录名，必选
 * @param {String}      login_psw    登录密码：目标值，必选
 */
let userLogin = ({
  login_name,
  login_psw
}) => fetch.post('v1/1001', {
  login_name: login_name,
  login_psw: login_psw
});

/**
 * 用户注册
 * @param {String}      loginName  登录名，必选
 * @param {String}      loginPwd   登录密码，必选
 * @param {String}      nickName   昵称，必选【唯一】
 * @param {String}      fullName   真名，必选
 * @param {int}         loginType  注册类型【1-手机，2-邮箱】，必选
 * @param {int}         loginVcode 验证码，必选
 */
let userRegister = ({
  loginName,
  loginPwd,
  nickName,
  fullName,
  loginType,
  loginVcode
}) => fetch.post('v1/1002', {
  login_name: loginName,
  login_psw: loginPwd,
  nick_name: nickName,
  full_name: fullName,
  login_type: loginType,
  login_vcode: loginVcode
});

/**
 * 用户重置密码 - 邮箱
 * @param token
 * @param loginPwd
 */
let userUpdatePasswordEmail = ({
  token,
  loginPwd
}) => fetch.post('v1/1003', {
  token: token,
  login_psw: loginPwd
});

/**
 * 用户重置密码 - 手机
 * @param resetCode
 * @param loginName
 * @param loginPsw
 */
let userUpdatePasswordPhone = ({
  resetCode,
  loginName,
  loginPsw
}) => fetch.post('v1/1018', {
  reset_code: resetCode,
  login_name: loginName,
  login_psw: loginPsw
});

/**
 * 获取天体排行
 * @param token
 * @param uid
 */
let getRank = ({
  token,
  uid
}) => fetch.post('v1/1015', {
  token: token,
  uid: uid
});

/**
 * 用户登录
 * @param uid
 * @param token
 */
let getUserInfo = ({
  uid,
  token
}) => fetch.post('v1/1007', {
  uid: uid,
  token: token
});

/**
 * 获取验证码
 * @param loginType
 * @param loginName
 */
let getCheckCode = (loginType, loginName) => fetch.post('v1/1017', {
  login_type: loginType,
  login_name: loginName
});

/**
 * 微信验证登录
 * @param code  微信公众号返回的code参数
 */
let weiXinLogin = ({
  code
}) => fetch.post('v1/1020', {
  code: code
});

/**
 * 微信注册新用户
 * @param unionid
 * @param wxName
 * @param wxHeadImg
 */
let weiXinRegister = ({
  unionid,
  wxName,
  wxHeadImg
}) => fetch.post('v1/1021', {
  unionid: unionid,
  wx_name: wxName,
  wx_head_img: wxHeadImg
});

/**
 * 微信绑定账号
 * @param unionid
 * @param loginName
 * @param loginPsw
 * @param wXHeadImg
 */
let weiXinBind = ({
  unionid,
  loginName,
  loginPsw,
  wXHeadImg
}) => fetch.post('v1/1022', {
  unionid: unionid,
  login_name: loginName,
  login_psw: loginPsw,
  wx_head_img: wXHeadImg
});


/**
 * 获取比赛列表
 * @param {int}         uid  用户id，选填
 * @param {String}      token  用户登录密码，选填
 * @param {int}         gameTypeId   游戏类型，选填【1-LOL】
 * @param {int}         contestType   奖金分配方式，选填
 * @param {int}         leaguesId  联赛ID【1-lpl】，选填
 * @param {int}         sortType 排序方式，选填
 * @param {String}      orderType 排序方式【desc/asc】，选填
 */
let getContestList = ({
  uid,
  token,
  gameTypeId,
  contestType,
  leaguesId,
  sortType,
  orderType
}) => fetch.post('v1/2001', {
  uid: uid,
  token: token,
  game_type_id: gameTypeId,
  contest_type: contestType,
  leagues_id: leaguesId,
  sort_id: sortType,
  order_type: orderType
});

/**
 * 获取我的竞赛列表 【参数皆为必选】
 * @param uid
 * @param token
 * @param game_type_id
 */
let getMyContestList = ({
  uid,
  token,
  game_type_id
}) => fetch.post('v1/2008', {
  uid: uid,
  token: token,
  game_type_id:game_type_id
});


/**
 * 比赛详情
 * @param {String}    uid,选填
 * @param {String}    token,选填
 * @param {int}       contestId,比赛盘口ID，必填
 */
let getContestDetails = ({
  uid,
  token,
  contestId
}) => fetch.post('v1/2002', {
  uid: uid,
  token: token,
  contest_id: contestId
});

/**
 * 队员详情【队员场均统计】
 * @param token
 * @param playerId
 */
let getPlayerDetails = ({
  token,
  playerId
}) => fetch.post('v1/2037', {
  token: token,
  player_id: playerId
});
/**
 * 队伍详情[战队场均统计]
 * @param token
 * @param teamId
 */
let getTeamDetails = ({
  token,
  teamId
}) => fetch.post('v1/2038', {
  token: token,
  team_id: teamId
});


/**
 * 队员队伍列表
 * @param {String}    uid,选填
 * @param {String}    token,选填
 * @param {int}       contests_id,比赛盘口ID，必填
 */
let getPlayerAndTeamList = ({
  uid,
  token,
  contests_id
}) => fetch.post('v1/2005', {
  uid: uid,
  token: token,
  contests_id: contests_id
});

/**
 * 入盘   【以下参数皆是必选】
 * @param {int}         uid,
 * @param {String}      token,
 * @param {int}         tickType,入盘方式 【1-点券，2-金币】
 * @param {int}         contestId,
 * @param {int}         teamsId,战队ID
 * @param {int}         playId1,上单
 * @param {int}         playId2,打野
 * @param {int}         playId3,中单
 * @param {int}         playId4,射手
 * @param {int}         playId5,辅助
 * @param {int}         playId6,替补
 * @param {int}         extraSalary,额外薪资
 * @param {int }        game_type_id 游戏类型id
 */
let joinContest = ({
  uid,
  token,
  tickType,
  contestId,
  teamsId,
  playId1,
  playId2,
  playId3,
  playId4,
  playId5,
  playId6,
  extraSalary,
  game_type_id
}) => fetch.post('v1/2006', {
  uid: uid,
  token: token,
  tick_type: tickType,
  contests_id: contestId,
  teams_id: teamsId,
  play_id1: playId1,
  play_id2: playId2,
  play_id3: playId3,
  play_id4: playId4,
  play_id5: playId5,
  play_id6: playId6,
  extrasalarys: extraSalary,
  game_type_id:game_type_id
});

/**
 * 修改参赛   【以下参数皆是必选】
 * @param {int}         billId,【票据ID】
 * @param {String}      token,
 * @param {int}         teamsId,战队ID
 * @param {int}         playId1,上单
 * @param {int}         playId2,打野
 * @param {int}         playId3,中单
 * @param {int}         playId4,射手
 * @param {int}         playId5,辅助
 * @param {int}         playId6,替补
 * @param {int}         extraSalary,额外薪资
 */
let updateJoinContest = ({
  billId,
  token,
  teamsId,
  playId1,
  playId2,
  playId3,
  playId4,
  playId5,
  playId6,
  extraSalary
}) => fetch.post('v1/2006', {
  my_contest_id: billId,
  token: token,
  teams_id: teamsId,
  play_id1: playId1,
  play_id2: playId2,
  play_id3: playId3,
  play_id4: playId4,
  play_id5: playId5,
  play_id6: playId6,
  extrasalary: extraSalary,
});


/**
 * 导入队伍 【参数皆为必选】
 * @param {String}  contest_id
 * @param {String}  token
 * @param {String}  uid
 */
let importTeams = ({
  token,
  uid,
  contest_id
}) => fetch.post('v1/2009', {
  token: token,
  uid: uid,
  contest_id: contest_id
});

/**
 * 快速入盘的盘口列表
 * @param {virtual_id}    virtual_id,虚拟战队id【必填】
 * @param {String}        token,必填
 */
let fastContestList = ({
  virtual_id,
  token
}) => fetch.post('v1/2010', {
  virtual_id: virtual_id,
  token: token
});


/**
 * 比赛详情，参与盘口的用户列表 【参数皆为必选】
 * @param {String}  contestId
 * @param {String}  token
 * @param {String}  page,页码
 */
let userListForContestDetails = ({
  contestId,
  token,
  page
}) => fetch.post('v1/2011', {
  contest_id: contestId,
  token: token,
  page: page
});

/**
 *  修改所选队伍
 * @param token
 * @param my_contest_id
 * @param teams_id
 * @param play_id1
 * @param play_id2
 * @param play_id3
 * @param play_id4
 * @param play_id5
 * @param play_id6
 * @param extrasalarys
 */
let updateJoinTeam = ({
  token,
  my_contest_id,
  teams_id,
  play_id1, //上单
  play_id2, //打野
  play_id3, //中单
  play_id4, //射手
  play_id5, //辅助
  play_id6, //替补
  extrasalarys
}) => fetch.post('v1/2013', {
  my_contest_id: my_contest_id,
  teams_id: teams_id,
  play_id1: play_id1, //上单
  play_id2: play_id2, //打野
  play_id3: play_id3, //中单
  play_id4: play_id4, //射手
  play_id5: play_id5, //辅助
  play_id6: play_id6, //替补
  extrasalarys: extrasalarys

});

/**
 * 我的竞猜比赛
 * @param uid
 * @param token
 * @param billId    彩票ID
 */
let contestResult = ({
  uid,
  token,
  billId
}) => fetch.post('v1/2014', {
  token: token,
  uid: uid,
  my_contest_id: billId
});

/**
 * 竞赛结果 比赛排名列表
 * @param token            token 【必填】
 * @param uid              uid  【必填】
 * @param myContestId      彩票ID       【必填】
 * @param type             查询的类型：（1-我的位置，2-最后获胜的位置）   【选填】
 * @param page             页码【选填】
 */
let contestResultRankList = ({
  token,
  uid,
  myContestId,
  type,
  page
}) => fetch.post('v1/2015', {
  token: token,
  uid: uid,
  my_contest_id: myContestId,
  page: page,
  type: type
});

/**
 * 未开始比赛修改队伍
 * @param token
 * @param myContestId
 */
let updateMyContestTeam = ({
  token,
  myContestId
}) => fetch.post('v1/2031', {
  token: token,
  my_contest_id: myContestId
});

/**
 * 快速入盘  【参数皆为必选】
 * @param {String}  token
 * @param {int}     uid
 * @param {int}     tick_type,入盘方式
 * @param {int}     contests_id
 * @param {int}     vts_id,虚拟队伍ID
 */
let fastJoinContest = ({
  token,
  uid,
  tick_type,
  contests_id,
  vts_id
}) => fetch.post('v1/2032', {
  token: token,
  uid: uid,
  tick_type: tick_type,
  contests_id: contests_id,
  vts_id: vts_id
});

/**
 *  获取活动列表
 * @param uid
 * @param page
 * @param token
 * @param page_size
 */
let getEventList = ({
  uid,
  page,
  token,
  pageSize
}) => fetch.post('v1/5004', {
  uid: uid,
  token: token,
  page: page,
  page_size: pageSize
});

/**
 * 签到列表获取
 * @param {int}     uid
 * @param {String}  token
 */
let getTaskApi = ({
  uid,
  token
}) => fetch.post('v1/5006', {
  uid: uid,
  token: token
});

/**
 * 点击领取签到
 * @param {int}     uid
 * @param {String}  token
 */
let getClickTaskResult = ({
  uid,
  token
}) => fetch.post('v1/5007', {
  uid: uid,
  token: token
});

/**
 * 兑换商品列表
 * @param {int}     category_id
 * @param {page}    page
 * @param {String}  token
 */
let getProductList = ({
  category,
  page,
  token
}) => fetch.get('v1/getProductList', {
  params: {
    token: token,
    category_id: category,
    page: page
  }
});

/**
 * 兑换商品列表
 * @param {int}     exchange
 * @param {int}    uid
 * @param {String}  token
 */
let getExchangeDetail = ({
  exchange,
  uid,
  token
}) => fetch.post('v1/getExchangeDetail', {
  uid: uid,
  token: token,
  exchange_id: exchange
});

/**
 * 游戏大区列表
 * @param {String}  token
 */
let getGameAreaList = ({
  token
}) => fetch.get('v1/getGameAreaList', {
  params: {
    token: token
  }
});

/**
 * 兑换qb列表
 * @param {String}  token
 */
let getExchange = ({
  token
}) => fetch.get('v1/exchange', {
  params: {
    token: token
  }
});

/**
 * 兑换qb
 * @param {int}     token
 * @param {String}  token
 * @param {String}  account
 * @param {int}     product_id
 */
let getQbExchange = ({
  uid,
  account,
  productId,
  token
}) => fetch.post('v1/exchange', {
  uid: uid,
  token: token,
  account: account,
  product_id: productId

});

/**
 * 创建兑换列表
 * @param {String}  token
 * @param {int}     uid
 * @param {String}  account
 * @param {int}     num
 * @param {int}     game_area_id
 * @param {int}     product_id
 */
let createExchange = ({
  productId,
  gameAreaId,
  num,
  account,
  uid,
  token
}) => fetch.post('v1/createExchange', {
  uid: uid,
  token: token,
  product_id: productId,
  game_area_id: gameAreaId,
  num: num,
  account: account
});

/**
 * 个人兑换记录
 * @param {int} uid
 * @param {String} token
 * @param {int} page
 */
let getExchangeList = ({
  uid,
  token,
  page
}) => fetch.get('v1/getExchangeList', {
  params: {
    uid: uid,
    token: token,
    page: page
  }
})

/**
 * 首页banner
 * @param {int} game_type_id
 */
let getHomeBanner = ({
  game_type_id
}) => fetch.post('v1/2036', {
  game_type_id:game_type_id
});

/**
 * 个人收支记录
 * @param {int} uid
 * @param {String} token
 * @param {int} page
 */
let getDealList = ({
  uid,
  token,
  page
}) => fetch.post('v1/1008', {
  uid: uid,
  token: token,
  page: page
})

/**
 * 获取可选头像列表
 * @param {ing} uid
 * @param {String} token
 */
let getUserHeadImg = ({
  uid,
  token
}) => fetch.post('v1/1023', {
  uid: uid,
  token: token
})

/**
 * 修改头像
 * @param {int} uid
 * @param {int} img_id
 * @param {String} token
 */
let updateHeadImg = ({
  uid,
  img_id,
  token
}) => fetch.post('v1/1024', {
  uid: uid,
  img_id: img_id,
  token: token
})

/**
 * 编辑用户信息
 * @param {int} uid
 * @param {String} token
 * @param {String} full_name
 * @param {String} address
 * @param {int} birthday
 * @param {String} city
 * @param {String} province
 * @param {String} area
 * @param {String} zip_code
 * @param {int} is_newbie
 */
let editUserInfo = ({
  uid,
  token,
  full_name,
  address,
  birthday,
  city,
  province,
  area,
  zip_code,
  is_newbie
}) => fetch.post('v1/1005', {
  uid: uid,
  token: token,
  full_name: full_name,
  address: address,
  birthday: birthday,
  city: city,
  province: province,
  area: area,
  zip_code: zip_code,
  is_newbie: is_newbie
})

/**
 * 公告列表
 * @param {int} page
 * @param {String} token
 * @param {int} page_size
 */
let getAffiche = ({
  page,
  token,
  page_size
}) => fetch.post('v1/6001', {
  page: page,
  token: token,
  page_size: page_size
})

/**
 * 推荐队员队伍
 * @param {int} uid   //选填
 * @param {String} token  //选填
 * @param {int} contest_id  //必填
 */
let getRecommend = ({
  uid,
  token,
  contest_id
}) => fetch.post('v1/2039', {
  uid: uid,
  token: token,
  contest_id: contest_id
})

/**
 * 微信登录
 * @param {string} key //后端返回的key值
 */
let wechatLogin = ({
  key
}) => fetch.post('v2/wechat/login', {
  key: key
})

/**
 * 微信注册
 * @param {stirng} key //后端返回的key
 * @param {int}    type //注册类型 1直接注册 2绑定已有账号
 * @param {string} login //用户名 type为2时必填
 * @param {string} password 密码 type为2时必填
 */
let wechatRegister = ({
  key,
  type,
  login,
  password
}) => fetch.post('v2/wechat/register', {
  key: key,
  type: type,
  login: login,
  password: password
})


/**
 * 我的盘口已结束列表
 * @param {int} uid  //用户的id【必填】
 * @param {string} token //用户的登录密码 【必填】
 * @param {int} page  //页码【必填】
 * @param {int} page_size//每页显示的条数【选填】
 * @param {int} type //排序类型(1-日期，2-门票，3-分数，4-奖金)【必填】
 * @param {int} game_type_id //游戏类型（1-lol(默认) 2-王者荣耀）【选填】
 */
let myEndGuess = ({
  uid,
  token,
  page,
  page_size,
  type,
  game_type_id
}) => fetch.post('v1/2035', {
  uid: uid,
  token: token,
  page: page,
  page_size: page_size,
  type: type,
  game_type_id: game_type_id
})

/**
 * 获取本人所有消息通知
 * @param {String} include 引用附加信息参数，可传 read 消息读取状态 [非必填]
 * @param {int} count      获取条数[非必填]
 */
let notify = ({}) => fetch.get('v1/notify?include=read')


/**
 * 获取未读消息数量
 * @param {int} uid  	   用户id
 */
let notifyUnreadNum = ({
  uid
}) => fetch.get('v1/notify-unread?uid=' + uid + '')

/**
 * 获取消息通知详情
 * @param {int} id  消息ID
 */
let getNotifyCon = ({
  id
}) => fetch.get('v1/notify/' + id + '?include=read')

/**
 * 更新消息阅读状态
 * @param {int} id  消息ID
 */
let updateNotify = ({
  id
}) => fetch.put('v1/notify/' + id + '?include=read')

/**
 * 获取赛事咨询列表
 * @param {int} game_type_id  游戏类型id 1-LOL 2-王者荣耀
 */
let getMatchList=({
  game_type_id
})=>fetch.get('v2/leagues/information?game_type_id='+game_type_id+'')

/**
 * 获取联赛列表
 * @param {int} game_type_id  游戏类型id 1-LOL 2-王者荣耀
 */
let leagueList=({
  game_type_id
})=>fetch.get('v2/leagues?game_type_id='+game_type_id+'&include=game,banners')


/**
 * 根据ID获取竞猜比赛列表
 */
let getGuessListForId=({
  league_id
})=>fetch.get('v2/games/guesses?league_id='+league_id+'&include=left,right,guess,guess.answer')


/**
 * 获取竞猜记录
 * @param {int} game_type_id  游戏类型id 1-LOL 2-王者荣耀
 */
let guessRecord = ({
  game_type_id,
  page,
  type
}) => fetch.get('v2/my-guesses?game_type_id='+game_type_id+'&page='+page+'&type='+type+'&include=answer,guess,guess.games')

/**
 * 竞猜下注
 * @param {int} game_type_id  //游戏id
 * @param {int} select_id     //选项id
 * @param {int} base_gold     //下注金额
 */
let bettingApi=({
  game_type_id,
  select_id,
  base_gold
})=>fetch.post('v2/my-guesses',{
  game_type_id:game_type_id,
  select_id:select_id,
  base_gold:base_gold
})



export {
  wechatLogin,
  wechatRegister,
  userLogin,
  userRegister,
  userUpdatePasswordEmail,
  userUpdatePasswordPhone,
  weiXinLogin,
  weiXinRegister,
  weiXinBind,
  getUserInfo,
  getCheckCode,
  getContestList,
  getMyContestList,
  getContestDetails,
  getPlayerAndTeamList,
  joinContest,
  updateJoinContest,
  importTeams,
  fastContestList,
  userListForContestDetails,
  fastJoinContest,
  getHomeBanner,
  getPlayerDetails,
  getTeamDetails,
  contestResult,
  updateMyContestTeam,
  updateJoinTeam,
  getTaskApi,
  getClickTaskResult,
  contestResultRankList,
  getRank,
  getEventList,
  getExchangeList,
  getDealList,
  getUserHeadImg,
  updateHeadImg,
  editUserInfo,
  getProductList,
  getExchange,
  getExchangeDetail,
  getGameAreaList,
  getAffiche,
  createExchange,
  getQbExchange,
  getRecommend,
  myEndGuess,
  notify,
  notifyUnreadNum,
  getNotifyCon,
  updateNotify,
  getMatchList,
  leagueList,
  getGuessListForId,
  guessRecord,
  bettingApi

}
