// 清空字符串前后的空格
function trim (str) {
  return String(str).replace(/^\s+|\s+$/g, "").replace(/(^[\s\u3000]+)|([\s\u3000]+$)/g, "")
}
/**
 * 控制字符串个数，多出的使用省略号
 * @param  {String} num 控制的字符串个数
 * @return {String}     返回带省略号的字符串
 */
function ellipsisStr (str, num) {
  var r = /[^\x00-\xff]/g
  if (str.replace(r, "mm").length <= num) return this
  var m = Math.floor(num / 2)
  for (var i = m; i < str.length; i++) {
    if (str.substr(0, i).replace(r, "mm").length >= num) {
      return str.substr(0, i) + "..."
    }
  }
  return str
}

/**
 * 获取双字节字符串长度
 * @param  {String} doubleByteStr 双字节字符串
 * @return {Number}          占位符的长度
 * 匹配中文字符的正则表达式： [\u4e00-\u9fa5]
 * 匹配双字节字符(包括汉字在内)：[^\x00-\xff] 
 */
function doubleByteLen (doubleByteStr) {
  return doubleByteStr.replace(/[^\x00-\xff]/g, "aa").length
}
/**
 * 字节长度超过len，则强制换行
 * @param  {String} str 字符串
 * @param  {Number} len 限定的长度 
 * @return {String}     返回换行后的字符串 
 */
function singleLineStr2MultiLine (str, len) {
  var count = 0,
    result = [],
    str = str.split("")
  for (var i = 0, l = str.length; i < l; i++) {
    count += doubleByteLen(str[i])
    result.push(str[i])
    if (count > 0 && count >= len) {
      count = 0
      result.push('<br/>')
    }
  }
  return result.join("")
}

/**
 * 新建一个stringBuilder类型,参数格式： arg1,arg2,...argn
 * @return {Null} 新建一个stringBuilder类型,参数格式： arg1,arg2,...argn
 */
function stringBuilder () {
  this._strings = new Array()
  for (var i = 0, len = arguments.length; i < len; i++) {
    this._strings.push(arguments[i])
  }
}

stringBuilder.prototype = {
  constructor: stringBuilder,
  /**
   * 追加字符串
   * @param  {String} str 把字符串追加到数组中去
   * @return {Array}     返回字符串数组
   */
  append: function (str) {
    return this._strings.push(str)
  },

  /**
   * 返回字符串
   * @return {String} 返回字符串
   */
  toString: function () {
    /// <summary>返回字符串</summary>
    /// <returns type="String">返回字符串</returns>
    return this._strings.join("")
  }
}