// 获取cookie、
function getCookie (name) {
  var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg)
  return val ? (val[2] ? decodeURIComponent(val[2]) : "") : null
}

// 设置cookie,增加到vue实例方便全局调用
function setCookie (name, value, expires, path, domain, secure) {
  var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false
  expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : ""
  document.cookie = name + '=' + encodeURIComponent(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '')
}

// 删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
