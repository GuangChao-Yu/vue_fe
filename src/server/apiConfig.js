//node qs模块
let qs = require('qs');

/* axios 配置 */
let axiosConfig = {
  // `url` 是用于请求的服务器 URL
  url: '',
  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // Do whatever you want to transform the data
  transformRequest: [function (data) {
    /*let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret.substring(0,ret.length-1)*/
    return qs.stringify(data);
  }],
  // Do whatever you want to transform the data
  transformResponse: [function (data) {
    return data;
  }],
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 10000,

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的
};

if (process.env.NODE_ENV == 'development') {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  // 测试域名API Domain
  axiosConfig.baseURL = 'http://t54.ftxesports.com/api/';
} else {
  //BATE版API Domain
  //axiosConfig.baseURL='https://apibate.dj10000.com/api/'
  //测试版API Domain
  axiosConfig.baseURL = 'http://t54.ftxesports.com/api/';
  //正式域名API Domain
  //axiosConfig.baseURL = 'https://api.dj10000.com/api/v1';
}

export {
  axiosConfig
}
