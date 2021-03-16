var url = {
  /**
   * 设置hash
   * @param name
   */
  setHash: function (name) {
    setTimeout(function () {
      location.hash = name
    }, 0)
  },
  /**
   * 获取当前url中的hash值
   * @param url
   * @return String
   */
  getHash: function (url) {
    var u = url || location.hash
    return u ? u.replace(/.*#/, "") : ""
  },
  /*
   * 从hash中获取name对应的值
   */
  getParamFromHash: function (name) {
    var result = this.getHash().match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"))
    return result != null ? decodeURIComponent(result[2]) : ""
  },

  /*
   *	获取所有HASH的参数
   */
  getParamsFromHash: function () {
    var param = [],
      hash = this.getHash()
    paramArr = hash ? hash.split("&") : []
    for (var i = 0, l = paramArr.length; i < l; i++) {
      param.push(decodeURIComponent(paramArr[i]))
    }
    return param
  },
  decodeUrl: function (url) {
    url = decodeURIComponent(url)
    var urlObj = this.parseUrl(url), decodedParam = []
    let { params } = urlObj
    Object.keys(params).forEach((key, index) => {
      let value = decodeURIComponent(params[key])
      decodedParam.push(key + "=" + value)
    })
    var urlPrefix = url.split("?")[0]
    return urlPrefix + "?" + decodedParam.join("&")
  },
  // 把url字符串转换成url对象
  parseUrl2JSON: function (url) {
    var a = document.createElement('a')
    a.href = url
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function () {
        var ret = {},
          seg = a.search.replace(/^\?/, '').split('&'),
          len = seg.length, i = 0, s
        for (; i < len; i++) {
          if (!seg[i]) { continue }
          s = seg[i].split('=')
          ret[s[0]] = decodeURIComponent(s[1])
        }
        return ret
      })(),
      file: (a.pathname.match(/([^\/?#]+)$/i) || [, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    }
  },
  /*
 *	从URL中获取参数对应的值，url中有hash的话会有bug
 */
  getUrlParamFromSearch: function (name, url, ignoreCase) {
    //参数：变量名，url为空则表从当前页面的url中取
    let u = arguments[1] || window.location.search
    u = ignoreCase ? u.toLowerCase() : u
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = u.substr(u.indexOf("\?") + 1).match(reg)
    return r != null ? decodeURIComponent(r[2]) : ""
  },
  // 支持hash，search中不存在hash值，所以没有这个问题
  getSearchByName: function (name) {
    const reg = new RegExp(`[?&]${name}=([^&#]+)`)
    const query = location.search?.match(reg)?.[1] || ''
    return decodeURIComponent(query)
  },
  // 从url的search参数中删除name参数
  removeParamFromSearch: function (name, url) {
    var reg = new RegExp("([\\?&]" + name + "=)[^&#]*")
    return url.replace(reg, "")
  },
  // 替换url中的参数，forceReplace：true则强制替换
  replaceOrAddSearchParam: function (param, value, url, forceReplace) {
    value = encodeURIComponent(value)
    url = url || location.href
    var reg = new RegExp("([\\?&]" + param + "=)[^&#]*")
    if (!url.match(reg)) {
      return (url.indexOf("?") == -1) ? (url + "?" + param + "=" + value) : (url + "&" + param + "=" + value)
    }
    if (forceReplace) {
      return url.replace(reg, "$1" + value)
    }
    return url
  }
}