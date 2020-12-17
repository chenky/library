import qs from 'qs'
// 同时支持promise和普通回掉函数的写法，防止重复，防重
(function ($) {
  /**
   * 阻止ajax重复提交，guid异步请求唯一标示符(如果config中有serialId字段则使用，否则使用url加)
   * @param  {JSON object} config 等同ajax中的config参数
   * @return {[type]}          [description]
   */
  $.oneAjax = function (config) {
    if (!config.url) {
      throw new Error('提交的url不能为空')
    }
    let guid = config.serialId
    if (!guid) {
      let { url, data } = config
      let params = qs.stringify(data)
      guid = url + (typeof params === 'string' ? params : '')
    }
    if ($.oneAjax[guid] === true) {
      return new Promise(function (resolve, reject) {
        resolve({ code: 'serial-request', msg: '当前请求正在提交中，待请求返回后方可再次提交' })
      })
    }
    $.oneAjax[guid] = true
    return $.ajax(config).always(function () {
      delete $.oneAjax[guid]
    })
  }
})(jQuery)
// 防重，防止重复提交axios
const http = {
  // 防止重复提交
  blockRequest: function (config) {
    if (!config.url) {
      throw new Error('提交的url不能为空')
    }
    let guid = config.serialId
    if (!guid) {
      let { url, params } = config
      // console.log(params)
      params = qs.stringify(params)
      guid = url + (typeof params === 'string' ? params : '')
    }
    if (this.blockRequest[guid]) {
      // 正在提交中
      return new Promise((resolve, reject) => {
        resolve({ code: 'serial-request', msg: '当前请求正在提交中，待请求返回后方可再次提交' })
      })
    }
    this.blockRequest[guid] = true
    // let self = this
    return axios.request(config).finally(() => {
      // 请求结束重置请求，以允许用户再次提交
      // console.log('数据已经返回，重置请求状态标识符')
      this.blockRequest[guid] = false
    })
  }
}