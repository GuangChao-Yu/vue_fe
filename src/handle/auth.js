/**
 *  存储用户
 */
import {
  setStore,
  getStore,
  removeStore
} from '@/handle/utils'

let saveAuth = (userinfo) => {
  let auth = {
    uid: userinfo.uid,
    token: userinfo.token
  };
  setStore("auth", auth);
};

let getAuth = () => {
  return getStore("auth")
}

let delAuth = () => {
  return removeStore("auth")
}

/**
 * 存储游戏类型 1:英雄联盟 2:王者荣耀
 * @param {string} type 
 */
let saveGameType = (type) => {
  setStore("gameType", type)
}

let getGameType = () => {
  return getStore("gameType")
}

let delGameType = () => {
  return removeStore("gameType")
}

export {
  saveAuth,
  getAuth,
  delAuth,
  saveGameType,
  getGameType,
  delGameType
}
