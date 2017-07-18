/**
 * 本地存储 localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content != "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 本地获取 localStorage
 */
export const getStore = name => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 本地删除 localStorage
 */
export const removeStore = name => {
  if (!name) return;
  return window.localStorage.removeItem(name);
}

/**
 * 删除本地所有
 */
export const removeAll = () => {
  return window.localStorage.clear();
}

/**
 * 把时间戳转换为日期格式
 * @param {int} time 时间格式
 */
export const formatTime = (time, type) => {
  let datetime = '';
  if (time == undefined || time == null) {
    datetime = new Date();
  } else {
    datetime = new Date(parseInt(time) * 1000);
  }
  let year = datetime.getFullYear();
  let month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  let day = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
  let hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
  let min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
  let sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
  if (type == 0 || type == undefined) {
    return year + '-' + month + '-' + day;
  }
  if (type == 1) {
    return year + '/' + month + '/' + day;
  }
  if (type == 2) {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + '';
  }
  if (type == 3) {
    return hour + ':' + min;
  }
  if (type == 4) {
    return month + '月' + day + '日';
  }

}

/**
 * 把日期转换成时间戳
 * @param {string} str 
 */
export const formatUnix = (str) => {
  str.replace(/-/g, "/");
  let date = new Date(str);
  let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return humanDate.getTime() / 1000 - 8 * 60 * 60;
}

//显示过去的时间
export const format = (date) => {
  return getDateDiff(new Date(date))
}

function getDateDiff(dateTimeStamp) {
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let halfamonth = day * 15
  let month = day * 30
  let now = new Date().getTime()
  let diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return
  }
  let monthC = diffValue / month
  let weekC = diffValue / (7 * day)
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minute
  let result = ""
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}

/**
 * 
 * 返回顶部
 * @export
 * @param {any} scrollDuration   //回到顶部时间 ex:1000
 */
export function scrollToTop(scrollDuration) {
  const scrollHeight = window.scrollY,
    scrollStep = Math.PI / (scrollDuration / 15),
    cosParameter = scrollHeight / 2;
  let scrollCount = 0,
    scrollMargin
  this.scrollInterval = setInterval(() => {
    if (window.scrollY != 0) {
      scrollCount = scrollCount + 1;
      scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
      console.log(scrollHeight - scrollMargin)
      window.scrollTo(0, (scrollHeight - scrollMargin));
    } else clearInterval(this.scrollInterval);
  }, 20)
}
