(function (window, undefined) {
  /*
  链接：https://juejin.im/post/5aed6da16fb9a07aac2457f6
  */
  //第二代身份证号码正则
  let isChineseID2 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  //第一代身份证正则表达式(15位)
  let isChineseID1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
  ////用户名正则，4到16位（字母，数字，下划线，减号）
  let isUserName = /^[a-zA-Z0-9_-]{4,16}$/
  //密码正则，以字母开头，长度在6~18之间，只能包含字母、数字和下划线
  let isPassword = /^[a-zA-Z]\w{5,17}$/
  //强密码正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  let isStrongPassword = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
  // qq号正则
  let isQQ = /^[1-9][0-9]{4,10}$/
  //微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
  let isWechat = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
  //特殊字符检测正则:
  let isSpecialCharacters = /["'<>%;)(&+]+-!！@#$~/
  // 域名正则
  let isDomain = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
  // 车牌号码正则
  let isLicensePlateNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  // 包含中文正则	
  let isChinese = /[\u4E00-\u9FA5]/
  // 护照正则
  let isPassport = /^(P\d{7}|G\d{7,8}|TH\d{7,8}|S\d{7,8}|A\d{7,8}|L\d{7,8}|\d{9}|D\d+|1[4,5]\d{7})$/
  // IP地址正则
  let isIP = /\d+\.\d+\.\d+\.\d+/
  //经度正则
  let isLongitude = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
  //纬度正则
  let isLatitude = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
  // 某个固定域名
  let someDomain = /^https?:\/\/.+\.qtrade\.com\.cn\/.+$/

  /*
    动态正则表达式，参数正则表达式
    let reg1 = new RegExp('^' + delimiter + '([\\s\\S]*)$', 'g')
      let reg2 = new RegExp('^([\\s\\S]*)' + delimiter + '$', 'g')
      title = title.replace(reg1, '$1').replace(reg2, '$1')
  */


  function sUtil () { };
  sUtil.fn = sUtil.prototype = {
    version: 1.0,
    constructor: sUtil,

    // http://jqueryvalidation.org/ 常用的正则验证
    reg: {
      isPwd: /^[^\d]{6}$/,//非6位数字
      continuousReg: /^\d*(012|123|234|345|456|567|678|789)\d*$/, //连续的3位数字  123587
      repeatReg: /^(\d{3})\1$/, //重复的3位数 如 123123
      repeatCharacter: /([a-zA-Z])\1/, // 判断是否有连续重复的字符
      ReverseOrder: /^(\d)(\d)(\d)\3\2\1$/,//倒序的3位数 如 123321
      maxTwo: /^(\d)\1*([^\1])(\1|\2)*$/,//最多只包含两个不同的数字

      // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
      email: "/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i",
      // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
      url: "/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i",
      // http://docs.jquery.com/Plugins/Validation/Methods/number
      // 科学计数格式化数字，可以带逗号
      number: "/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/",
      // 保留两位小数点的数字，
      number2: "/^(0?|([1-9]\d*))(?:\.\d{1,2})?$/",
      // http://docs.jquery.com/Plugins/Validation/Methods/digits
      digits: "/^\d+$/",
      isInt: "/^[1-9]\d*$/", // 正整数
      idCode: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, // 身份证正则表达式
      // 验证中国邮政编码[1-9]{1}(\d+){5};
      postalCode: "/^\d{6}$/",
      isChinese: "/^[\u4e00-\u9fa5]+$/", // 验证是否是中文
      // 验证中国电话
      phone: "/^((\d{3,4})\-{0,1}){0,1}(\d{7,8})$/",
      // 验证中国手机号
      mobilePhone: "/^((13|15|18|14)\d{9})$/"
    },

    namespace: function () {
      var a = arguments,
        o = null,
        i, j, d
      for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".")
        o = window

        for (j = (d[0] == "window") ? 1 : 0; j < d.length; j = j + 1) {
          o[d[j]] = o[d[j]] || {}
          o = o[d[j]]
        }
      }
      return o
    },

    register: function (name, fn) {
      var o = window,
        j, d = name.split(".")
      for (j = (d[0] == "window") ? 1 : 0; j < d.length; j = j + 1) {
        if (j < d.length - 1) {
          o[d[j]] = o[d[j]] || {}
        }
        else {
          if (o[d[j]] === undefined) {
            o[d[j]] = function () {
              typeof fn === "function" ? fn.apply(this, arguments) : ""
            }
          }
          else {
            // o[d[j]] has be register;
          }
        }
        o = o[d[j]]
      }
      return o
    },

    /**
     * 产生指定范围的随机数
     * @param  {[type]}  lowerValue [description]
     * @param  {[type]}  upperValue [description]
     * @param  {Boolean} isNumber   [description]
     * @return {[type]}             [description]
     */
    random: function (lowerValue, upperValue, isNumber) {
      if (typeof lowerValue === "number" && typeof upperValue === "number") {
        var choices = (isNumber ? (upperValue - lowerValue + 1) :
          (upperValue - lowerValue)),
          rnd = Math.random() * choices + lowerValue
        return isNumber ? Math.floor(rnd) : rnd
      }
    },

    /**
   * 更加安全的产生指定范围的随机数
   * @param  {[type]}  lowerValue [description]
   * @param  {[type]}  upperValue [description]
   * @param  {Boolean} isNumber   [description]
   * @return {[type]}             [description]
   */
    cryptoRandom: function (lowerValue, upperValue, isNumber) {
      if (typeof lowerValue === "number" && typeof upperValue === "number") {
        const tempRnd = crypto.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF
        var choices = (isNumber ? (upperValue - lowerValue + 1) :
          (upperValue - lowerValue)),
          rnd = tempRnd * choices + lowerValue
        return isNumber ? Math.floor(rnd) : rnd
      }
    },

    /**
     * 中文字节长度
     * @param  {String} cnStr 中文字符串
     * @return {Number}          占位符的长度
     * 匹配中文字符的正则表达式： [\u4e00-\u9fa5]
     * 匹配双字节字符(包括汉字在内)：[^\x00-\xff] 
     */
    cnLen: function (cnStr) {
      return cnStr.replace(/[^\x00-\xff]/g, "aa").length
    },

    /**
     * 字符串编解码
     * @param  {String}  str      传人字符串
     * @param  {Boolean} isEncode true为编码，否则解码
     * @return {String}           返回字符串编解码字符串
     */
    codec: function (str, isEncode) {
      return isEncode ? encodeURIComponent(str) : decodeURIComponent(str)
    },

    addQueryString: function (url, name, value) {
      /// <summary>
      /// 添加url参数，返回编码后的url
      /// </summary>
      /// <param name="url" type="String">url字符串</param>
      /// <param name="name" type="String">参数名</param>
      /// <param name="value" type="String">参数值</param>
      /// <returns type="String">返回编码后的url</returns>
      url += url.indexOf("?") === -1 ? "?" : "&"
      url += this.codec(name, true) + "=" + this.codec(value, true)
      return url
    },

    getQueryString: function (name) {
      /// <summary>
      /// 获取querystring，如果传入name则获取其值，否则获取所有参数值，并以key/value的json对象返回,不区分大小写。
      /// </summary>
      /// <param name="name" type="String">url参数名</param>
      /// <returns type="String|json">如果传入name则获取其值，否则获取所有参数值，并以key/value的json对象返回</returns>
      //if (RegExp("(^|\\?|&)" + a + "=([^&]*)(\\s|&|$)", "i").test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
      //return ""			
      var qs = (location.href.length > 0 ? location.search.substring(1) : "")
      return this.getUrlValByName(qs, name)
    },

    // 如果参数已经存在则直接替换，否则添加此参数
    replaceOrAddParam: function (param, value, url) {
      var value = encodeURIComponent(value)
      var reg = new RegExp("([\\?&]" + param + "=)[^&#]*")
      if (url.match(reg)) {
        return url.replace(reg, "$1" + value)
      }
      else {
        var link = document.createElement("a")
        link.href = url
        var search = link.search,
          hash = link.hash,
          host = link.host,
          protocol = link.protocol,
          pathname = link.pathname
        return protocol + "//" + host + pathname + search + ((search ? "&" : "?") + param + "=" + value) + hash
      }
    },

    removeParam: function (param, url) {
      var reg = new RegExp("([\\?&]" + param + "=)[^&#]*")
      return url.replace(reg, "")
    },

    fixIe6Fixed: function (silderFloatAd) {
      if ($.browser.msie && jQuery.browser.version == "6.0") {
        var timeId = null
        var viewPortHeight = $(window).height()
        var silderFloatAdHeight = silderFloatAd.outHeight(false)
        silderFloatAd.css({ position: "absolute" })
        $(window).scroll(function () {
          clearTimeout(timeId)
          timeId = setTimeout(function () {
            silderFloatAd.css({
              top: $(this).scrollTop() + (viewPortHeight - silderFloatAdHeight) / 2 + "px"
            })
          }, 50)
        })
        $(window).triggerHandler("scroll")
      } else {
        silderFloatAd.css({
          marginTop: "-" + silderFloatAdHeight + "px",
          top: "50%"
        })
      }
    },

    getUrlValByName: function (url, name, IgnoreCase) {
      /// <summary>
      /// 获取querystring，如果传入name则获取其值，否则获取所有参数值，并以key/value的json对象返回,不区分大小写。
      /// </summary>
      /// <param name="url" type="String">url字符串</param>
      /// <param name="name" type="String">url参数名</param>
      /// <param name="IgnoreCase" type="Boolean">区分大小写,默认不区分大小写</param>
      /// <returns type="String|json">如果传入name则获取其值，否则获取所有参数值，并以key/value的json对象返回</returns>
      if (!IgnoreCase) {
        url = url.toLowerCase()
      }
      var tmp = url.substr(url.indexOf("?") + 1).split("&")
      var obj = {}, item = []
      for (var i = 0, len = tmp.length; i < len; i++) {
        item = tmp[i].split("=")
        if (item instanceof Array) {
          obj[vancl.codec(item[0], false)] = vancl.codec(item[1], false)
        }
      }
      return (typeof name === "string") ? obj[name] : obj
    },

    /*
         *	从URL中获取参数对应的值
         */
    getUrlParam: function (name, url) {
      //参数：变量名，url为空则表从当前页面的url中取
      var u = arguments[1] || window.location.search,
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'),
        r = u.substr(u.indexOf("\?") + 1).match(reg)
      return r != null ? r[2] : ""
    },
    parseProps: function (props) {
      // json字符串转换成json对象
      var mapValue = {
        "true": true,
        "false": false,
        "null": null,
        "undefined": undefined
      }
      if (props) {
        // 正则匹配成 key, :, 左侧引号, value, 右侧引号, ",", 6部分，对特殊值做map处理，
        // 返回合法json字符串，调用$.parseJSON即可, 举个例子：
        // width:'500px',title:'Technology Introduction', collapsible: true
        // 然后再正则和map处理=> "width":"500px","title":"Technology Introduction", "collapsible": true
        props = props.replace(/(\w+)(:[\s\uFEFF\xA0]*)(['"])?([^\\"',]+)(['"])?(,?)/g
          , function (all, key, colon, lQuotes, value, rQuotes, comma) {
            return '"' + key + '"' + colon + (value in mapValue ? mapValue[value] : ('"' + value + '"')) + comma
          })
      }
      try {
        return JSON.parse("{" + props + "}")
      } catch (e) {
        console.log("parseProps转换mu-attr属性成json串出错了")
        return {}
      }
    },

    breakWord: function (str, len) {
      var count = 0,
        result = [],
        str = str.split("")
      for (var i = 0, l = str.length; i < l; i++) {
        count += this.cnLen(str[i])
        result.push(str[i])
        if (count > 0 && count >= len) {
          count = 0
          result.push('<br/>')
        }
      }
      return result.join("")
    }
  }
  window.sUtil = new sUtil()


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
  window.stringBuilder = stringBuilder

  /**
   * 给定一个数组，然后随机打乱，并返回打乱后的数组
   * @return {Array}  给定一个数组，然后随机打乱，并返回打乱后的数组
   */
  Array.prototype.random = function () {
    var result = [],
      arr = this,
      len = arr.length

    /*for (var i = 0; i < len; i++) {
      var t = Math.floor(Math.random() * arr.length);
      result.push(arr[t]);

      var left = arr.slice(0, t),
        right = arr.slice(t + 1, arr.length);

      arr = left;
      arr.push.apply(arr, right);
    }*/
    for (var i = 0; i < len; i++) {
      var t = Math.floor(Math.random() * arr.length)
      result.push(arr.splice(t, 1)[0])
    }

    return result
  }

  // 清空字符串前后的空格
  String.prototype.trim = function () {
    return String(this).replace(/^\s+|\s+$/g, "").replace(/(^[\s\u3000]+)|([\s\u3000]+$)/g, "")
  }
  /**
   * 控制字符串个数，多出的使用省略号
   * @param  {String} num 控制的字符串个数
   * @return {String}     返回带省略号的字符串
   */
  String.prototype.sub = function (num) {
    var r = /[^\x00-\xff]/g
    if (this.replace(r, "mm").length <= num) return this
    var m = Math.floor(num / 2)
    for (var i = m; i < this.length; i++) {
      if (this.substr(0, i).replace(r, "mm").length >= num) {
        return this.substr(0, i) + "..."
      }
    }
    return this
  }

  /**
   * 判断闰年
   * @return {Boolean} 是闰年返回true，否则返回false。
   */
  Date.prototype.isLeapYear = function () {
    // return new Date(this.getFullYear(),2,0).getDate();
    // return (0 == this.getFullYear() % 4 && ((this.getFullYear() % 100 != 0) || (this.getFullYear() % 400 == 0)));
    return (0 == this.getFullYear() % 4 && ((this.getFullYear() % 100 != 0) || (this.getFullYear() % 400 == 0)))
  }
  /**
     * 返回指定格式的日期;	/// 格式 YYYY/yyyy/YY/yy 表示年份
  /// MM/M 月份
  /// W/w 星期
  /// dd/DD/d/D 日期
  /// hh/HH/h/H 时间
  /// mm/m 分钟
  /// ss/SS/s/S 秒
   * @param  {String} format 日期格式字符串
   * @return {Date}        返回指定格式的日期
   */
  Date.prototype.format = function (format) {
    var week = ['日', '一', '二', '三', '四', '五', '六']
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+|D+": this.getDate(), //day
      "h+|H+": this.getHours(), //hour
      "w|W": week[this.getDay()], // week
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds() //seconds
    }

    // format year
    if (/(y+|Y+)/.test(format)) {
      format = format.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
      }
    }
    return format
  }
})(window)


// 判断是否加载到页面底部
// $list.scrol1Top + document.body.clientHeight >= $list.scrollHeight;

// 大数位，进度不丢失相加运算
function addNumber (num1, num2) {
  if (arguments.length < 2) {
    throw '必须要传入两个参数,进行相加'
  };
  for (let num in arguments) {
    // 强制换成字符串, 
    if (typeof arguments[num] !== 'string') {
      arguments[num] += ''
    };
  };
  // 处理小数点
  let arr1 = num1.split('.')
  let arr2 = num2.split('.')
  // 先处理整数 按照''将字符串进行分割成数组
  let intArr1 = arr1[0].split('')
  let intArr2 = arr2[0].split('')
  // 在处理小数位
  let decimalsArr1 = arr1[1] || []
  let decimalsArr2 = arr2[1] || []
  // 存储处理好的number
  let resualtIntArr = []
  let resualtDecimalsArr = []
  let carrayInt = 0 // 默认整数计算单数位
  let carrayDecimals = 0 // 默认小数计算单数位
  // 比较两个数值 获取对多的一个小数位长度
  let decimalsMinLength = decimalsArr1.length > decimalsArr2.length ? decimalsArr1.length : decimalsArr2.length

  // 循环计算小数位
  while (decimalsMinLength > 0) {
    // 减少1位 用来做索引查找
    decimalsMinLength--
    let sumDecimals = carrayDecimals + parseInt(decimalsArr1[decimalsMinLength] || 0) + parseInt(decimalsArr2[decimalsMinLength] || 0)

    if (sumDecimals < 10) {
      // 添加到数组的第一个位置
      resualtDecimalsArr.unshift(sumDecimals)
      carrayDecimals = 0 // 变成0
    } else {// 往下计算10位的 
      resualtDecimalsArr.unshift(sumDecimals - 10)
      carrayDecimals = 1 // 往上加1
    };
  };
  // 小数位计算完毕 还有10位数的 记录下来 在下面整数时候进行添加
  if (carrayDecimals > 0) {
    carrayInt = carrayDecimals
  };
  // 跟小数点计算方法同理 
  while (intArr1.length || intArr2.length) {
    let sumInt = carrayInt + parseInt(intArr1.pop() || 0) + parseInt(intArr2.pop() || 0)
    if (sumInt < 10) {
      resualtIntArr.unshift(sumInt)
      carrayInt = 0
    } else {
      resualtIntArr.unshift(sumInt - 10)
      carrayInt = 1
    };
  };
  if (carrayInt > 0) {
    resualtIntArr.unshift(carrayInt)
  };
  // 在转成字符串拼接返回
  return resualtIntArr.join('') + '.' + resualtDecimalsArr.join('')
};
console.log(addNumber('1234567890123456789.98', 1.13))

// 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/Using_geolocation#%E5%8F%A6%E8%AF%B7%E5%8F%82%E9%98%85
// https://www.w3.org/TR/geolocation-API/
// http://www.cnblogs.com/lhb25/archive/2012/07/10/html5-geolocation-api-demo.html
// boolean enableHighAccuracy = false; 是否高精度
// [Clamp] unsigned long timeout = 0xFFFFFFFF;  超时时间
// [Clamp] unsigned long maximumAge = 0; 最大缓存时间
function getPosition (successCallback, errorCallback) {
  if ("geolocation" in navigator) {
    /* 地理位置服务可用 */

    navigator.geolocation.getCurrentPosition(function (position) {
      // position.coords.latitude, position.coords.longitude  获取到经纬度
      typeof successCallback === "function" ? successCallback(position) : ""
    },
      function (error) {
        // 获取地理位置失败了，可能是超时，可能是获取不到等等原因
        typeof errorCallback === "function" ? errorCallback.call(null, error) : ""
      }, { enableHighAccuracy: false, timeout: 60 * 1000, maximumAge: 10 * 60 * 1000 })

  } else {
    /* 地理位置服务不可用 */
    typeof errorCallback === "function" ? errorCallback.call(null, null) : ""
  }
}
// 做成可配置，只有需要位置信息的时候才去取
if (isNeedPos) {
  getPosition(function () { }, function () { })
}


/**
 * 依赖jQuery的工具
 * @type {Object}
 */
var jqueryTool = {
  // DOM Opration
  go2TopWithAnimate: function () {
    var rootDom = (document.documentElement.scrollTop === 0 ? document.body : document.documentElement)
    try {
      $(rootDom).animate({
        scrollTop: 0
      }, 1000)
    } catch (e) {
      $(window).scrollTop(0)
    }
  }
}

function banNested () {
  //完全不能嵌套
  /*if(top != window){
    top.location.href = window.location.href;
  }*/
  //同域可嵌套
  try {
    top.location.hostname
    if (top.location.hostname != window.location.hostname) {
      top.location.href = window.location.href
    }
  }
  catch (e) {
    top.location.href = window.location.href
  }
}

//科学计数格式化数字
/*
 formatNum(2000);
 "2,000"
 formatNum(2000.32);
 "2,000.32"*/
function formatNum (strNum) {
  if (strNum.length <= 3) {
    return strNum
  }
  if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
    return strNum
  }
  var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3
  var re = new RegExp()
  re.compile("(\\d)(\\d{3})(,|$)")
  while (re.test(b)) {
    b = b.replace(re, "$1,$2$3")
  }
  return a + "" + b + "" + c

}

/***
* 把传入的数字用千位分隔符分割  和formateNumbe一样的效果
*
formateMoney(234567567567);
"234,567,567,567.00"
formateMoney(2.4);
"2.40"
* */
function formateMoney (s) {
  s += ""
  if (/[^0-9\.]/.test(s)) return "invalid value"
  s = s.replace(/^(\d*)$/, "$1.")
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1")
  s = s.replace(".", ",")
  var re = /(\d)(\d{3},)/
  while (re.test(s))
    s = s.replace(re, "$1,$2")
  s = s.replace(/,(\d\d)$/, ".$1")
  return s.replace(/^\./, "0.")
}

/****
* 小数截取（非四舍五入）
* @param number 传递进来的数字
* @param decimals 要保留的小数位数（支持，0,1,2）
* @returns {string}
*/
function callSmallNum (number, decimals) {
  var newString = ""
  number = number + ""
  if (number.indexOf(".") > -1) {
    number = number.substring(0, number.indexOf(".") + 3)
    if (decimals == 2) {
      newString = (number.substring(0, number.indexOf("."))) + ".00"
    }
    if (decimals == 1) {
      newString = (number.substring(0, number.indexOf(".") + 2)) + "0"
    }
    if (decimals == 0) {
      //看小数点后面有几位
      if ((number.substring(number.indexOf(".") + 1, number.length)).length >= 2) {
        newString = number
      } else {
        newString = number + "0"
      }
    }

  } else {
    newString += number + ".00"
  }

  return newString
}

var quickSort = function (arr) {
  if (arr.length <= 1) { return arr }
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}

// 数组去重
Array.prototype.unique = function () {
  this.sort()
  var re = [this[0]]
  for (var i = 1, len = this.length; i < len; i++) {
    if (this[i] !== re[re.length - 1]) {
      re.push(this[i])
    }
  }
  return re
}

  // 同时支持promise和普通回掉函数的写法，防止重复，防重
  (function ($) {
    /**
     * 阻止ajax重复提交，guid异步请求唯一标示符
     * @param  {JSON object} settings 等同ajax中的settings参数
     * @return {[type]}          [description]
     */
    $.oneAjax = function (settings) {
      if ($.oneAjax[settings.guid] === "isProcessing") {
        return $.Deferred()// return ajax method
      }
      $.oneAjax[settings.guid] = "isProcessing"
      return $.ajax(settings).always(function () {
        delete $.oneAjax[settings.guid]
      })
    }
  })(jQuery);
(function ($) {
  /**
   * 阻止ajax重复提交，guid异步请求唯一标示符
   * @param  {JSON object} settings 等同ajax中的settings参数
   * @return {[type]}          [description]
   */
  $.oneAjax = function (settings) {
    if ($.oneAjax[settings.guid] === "isProcessing") {
      // return false;
      return $.Deferred()// return ajax method
    }
    $.oneAjax[settings.guid] = "isProcessing"
    // var userComplete = settings.complete || function () { };
    // settings.complete = function (xhr, status) {
    // 	delete $.oneAjax[settings.guid];
    // 	userComplete(xhr, status);
    // };
    return $.ajax(settings).always(function () {
      delete $.oneAjax[settings.guid]
    })
  }
})(jQuery)

// 防重，防止重复提交axios
const ajax = {
  // 防止重复提交
  blockRequst: function (config, param) {
    config.param = param
    if (!config.url) {
      throw new Error('提交的url不能为空')
    }
    if (this.blockRequst[config.url]) {
      // 正在提交中
      // return new Promise((resolve,reject)=>{})
      console.log('请求正在提交，直接返回')
      return
    }
    this.blockRequst[config.url] = true
    // let self = this
    return axios.request(config).finally(() => {
      // 请求结束重置请求，以允许用户再次提交
      console.log('数据已经返回，重置请求状态标识符')
      this.blockRequst[config.url] = false
    })
  }
}


var ua = navigator.userAgent.toLowerCase(),
  isIosPaipaiApp = /iospaipaiapp/.test(ua), // ios微店app 原始字符串 PaipaiWXD
  isAndroidPaipaiApp = /androidpaipaiapp/.test(ua), // android微店app
  isApp = /paipaiwxd/.test(ua),
  isPaipaiAndroidApp = /paipaiapp\/android/.test(ua), // android拍拍app
  isPaipaiIosApp = /paipaiapp\/ios/.test(ua), // ios拍拍app
  isAndroid = (/(android);?[\s\/]+([\d.]+)?/).test(ua),
  isIos = (/iPad|iPod|iPhone/).test(ua)
var isWx = ua.match(/micromessenger/) ? true : false
var isMqq = /qq\/([\d\.]+)*/.test(ua)

// 无限分页加载
function scroll2bottom () {
  var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight)
  var viewportHeight = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight || 0
  var scrollHeight = window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop || 0
  // console.log(pageHeight);
  // console.log(viewportHeight);
  // console.log(scrollHeight);
  return pageHeight - viewportHeight - scrollHeight < 20
}

//去重合并数组
function mergeArray (a, b) {
  for (var i = 0; i < b.length; i++) {
    (("," + a + ",").indexOf("," + b[i] + ",") < 0) && a.push(b[i])
  }
  return a
}

$.fn.fixed = function (option) {
  var def = { top: 0 }
  $.extend(def, option)
  $.each($(this), function (i, item) {
    var curElement = $(item)
    var timeId = null
    //var pos = curElement.css("position");
    //console.log("pos:" +pos);
    //curElement.css({ position: "absolute" });
    //var offsetTop = curElement.css("top").replace("px", "");
    //curElement.css({ position: pos});
    var offsetTop = curElement.offset().top
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop()
      //console.log("scrolltop:" + scrollTop + ",offsetTop:" + offsetTop);
      if (scrollTop >= (offsetTop - def.top)) {
        var match = /(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())
        if (!!match && match[1].msie && match[2] === "6.0") {// don't support position fixed in ie6
          clearTimeout(timeId)
          timeId = setTimeout(function () {
            curElement.css({ top: (scrollTop + def.top) + "px" })
          }, 50)
        }
        else {
          curElement.css({ position: "fixed", top: def.top + "px" })
        }
      }
      else {
        curElement.css({ position: "absolute", top: offsetTop + "px" })
      }
    })
  })

  $(function () {
    $(window).triggerHandler("scroll")
  })
}

// 解决ie6背景图片不缓存的问题
try { document.execCommand('BackgroundImageCache', false, true) } catch (e) { }

function setCookie (name, value, expires, path, domain, secure) {
  var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/", domain = arguments[4] || null, secure = arguments[5] || false
  expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : ""
  document.cookie = name + '=' + encodeURIComponent(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '')
}

function getCookie (name) {
  var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg)
  return val ? (val[2] ? decodeURIComponent(val[2]) : "") : null
}

function getQueryString (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2]); return null
}

//框架代码
function _bindEvent () {

}

function _init () {
  _bindEvent()
}

$(function () {

  _init()

})

// 获取元素离页面顶部的距离
function getPosition (el) {
  var t = el.offsetTop
  var elHeight = el.offsetHeight
  for (t; el = el.offsetParent;) {
    t += el.offsetTop
  }
  return {
    y: (t + elHeight) * window.devicePixelRatio
  }
};

// 判断元素是否在视窗范围内
// listener:{parentEl:"",y:元素离顶点的距离, callback:callback}
function checkCanShow (listener) {
  var winH = undefined
  var top = undefined
  if (listener.parentEl) {
    winH = listener.parentEl.offsetHeight
    top = listener.parentEl.scrollTop
  } else {
    winH = window.screen.availHeight
    top = document.documentElement.scrollTop || document.body.scrollTop
  }

  var height = (top + winH) * window.devicePixelRatio * 1.3
  if (listener.y < height) {
    typeof listener.callback === "function" ? listener.callback() : ""
  }
};

// 自关闭标签转换成标准的html关闭标签	
function convert (html) {
  var tags = /^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i
  return html.replace(/(<(\w+)[^>]*?)\/>/g, function (all, front, tag) {
    return tags.test(tag) ?
      all :
      front + "></" + tag + ">"
  })
}

// 获取contenteditable元素中光标的位置
//http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
//http://stackoverflow.com/questions/4767848/get-caret-cursor-position-in-contenteditable-area-containing-html-content
//http://jsfiddle.net/TjXEG/900/
function getCaretCharacterOffsetWithin (element) {
  var caretOffset = 0
  var doc = element.ownerDocument || element.document
  var win = doc.defaultView || doc.parentWindow
  var sel
  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection()
    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0)
      var preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      caretOffset = preCaretRange.toString().length
    }
  } else if ((sel = doc.selection) && sel.type != "Control") {
    var textRange = sel.createRange()
    var preCaretTextRange = doc.body.createTextRange()
    preCaretTextRange.moveToElementText(element)
    preCaretTextRange.setEndPoint("EndToEnd", textRange)
    caretOffset = preCaretTextRange.text.length
  }
  return caretOffset
}

// day:3标识3天后，-3表示3天前，ts：对比的时间， 毫秒数, 不能超过30天
function isInDateArea (day, ts) {
  var now = serverNow || new Date()
  var curYear = now.getFullYear()
  var curMonth = now.getMonth() + 1
  var curDay = now.getDate()

  var nowTs = new Date(curYear + "/" + curMonth + "/" + curDay + " 00:00:00").valueOf()
  var endTs = new Date(curYear + "/" + curMonth + "/" + curDay + " 00:00:00").valueOf()
  var start = nowTs + day * 24 * 60 * 60 * 1000
  var end = endTs + 24 * 60 * 60 * 1000
  // console.log(new Date(start)+","+new Date(end));
  ts = parseFloat(ts) || new Date()  // n 的格式为 毫秒数
  start = Math.min(start, end)
  end = Math.max(start, end)
  return ts >= start && ts < end ? true : false
}

// 设置contenteditable元素中光标的位置
//http://stackoverflow.com/questions/6249095/how-to-set-caretcursor-position-in-contenteditable-element-div
//http://jsfiddle.net/timdown/vXnCM/
function setCaret (el, pos) {
  if (el.childNodes.length > 0) {
    var range = document.createRange()
    var sel = window.getSelection()
    range.setStart(el.childNodes[0], pos)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
  }
  el.focus()
}

// 正则匹配查询字符串
function getQueryString (search, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  var r = search.match(reg)
  if (r != null) return decodeURIComponent(r[2]); return null
}

/*
*	从URL中获取参数对应的值
*/
function getParam (name, url) {
  //参数：变量名，url为空则表从当前页面的url中取
  var u = arguments[1] || window.location.search,
    reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'),
    r = u.substr(u.indexOf("\?") + 1).match(reg)
  return r != null ? r[2] : ""
}


var HtmlUtil = {
  /*1.用正则表达式实现html转码*/
  htmlEncodeByRegExp: function (str) {
    var s = ""
    if (str.length == 0) return ""
    s = str.replace(/&/g, "&amp;")
    s = s.replace(/</g, "&lt;")
    s = s.replace(/>/g, "&gt;")
    s = s.replace(/ /g, "&nbsp;")
    s = s.replace(/\'/g, "&#39;")
    s = s.replace(/\"/g, "&quot;")
    return s
  },
  /*2.用正则表达式实现html解码*/
  htmlDecodeByRegExp: function (str) {
    var s = ""
    if (str.length == 0) return ""
    s = str.replace(/&amp;/g, "&")
    s = s.replace(/&lt;/g, "<")
    s = s.replace(/&gt;/g, ">")
    s = s.replace(/&nbsp;/g, " ")
    s = s.replace(/&#39;/g, "\'")
    s = s.replace(/&quot;/g, "\"")
    return s
  }
}

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
   *	根据hash获取对应的模块名
   */
  getHashModelName: function () {
    var hash = this.getHash()
    return (hash ? hash.split("&")[0].split("=")[0] : [])
  },
  /*
   *	从hash中获取action
   */
  getHashActionName: function () {
    var hash = this.getHash()
    if (hash == "") return ""
    return (hash ? hash.split("&") : [])[0].split("=")[1]
  },
  /*
   * 从hash中获取name对应的值
   */
  getHashParam: function (name) {
    var result = this.getHash().match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"))
    return result != null ? result[2] : ""
  },
  /*
   *	从URL中获取参数对应的值
   */
  getUrlParam: function (name, url) {
    //参数：变量名，url为空则表从当前页面的url中取
    var u = arguments[1] || window.location.search,
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = u.substr(u.indexOf("\?") + 1).match(reg)
    return r != null ? r[2] : ""
  },
  /*
   *	获取所有HASH的参数，剔除model.
   */
  getParams: function () {
    var param = [],
      hash = this.getHash()
    paramArr = hash ? hash.split("&") : []
    for (var i = 1, l = paramArr.length; i < l; i++) {
      param.push(paramArr[i])
    }
    return param
  },
  decodeUrl: function (url) {
    url = decodeURIComponent(url)
    var urlObj = this.parseUrl(url), decodedParam = []
    $.each(urlObj.params, function (key, value) {
      value = decodeURIComponent(value)
      decodedParam.push(key + "=" + value)
    })
    var urlPrefix = url.split("?")[0]
    return urlPrefix + "?" + decodedParam.join("&")
  },
  parseUrl: function (url) {
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
          ret[s[0]] = s[1]
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
  replaceParam: function (param, value, url, forceReplace) {
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

// 生成随机字符串
function generateRandomAlphaNum (len) {
  var rdmString = ""
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len)
}

var HtmlUtil = {
  /*1.用浏览器内部转换器实现html转码*/
  htmlEncode: function (html) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html)
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    var output = temp.innerHTML
    temp = null
    return output
  },
  /*2.用浏览器内部转换器实现html解码*/
  htmlDecode: function (text) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div")
    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text
    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    var output = temp.innerText || temp.textContent
    temp = null
    return output
  }
}

/*
  javascript深度复制，深度拷贝
  https://smalldata.tech/blog/2018/11/01/copying-objects-in-javascript
*/
function deepClone (obj) {
  var copy

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = []
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i])
    }
    return copy
  }

  // Handle Function
  if (obj instanceof Function) {
    copy = function () {
      return obj.apply(this, arguments)
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {}
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr])
    }
    return copy
  }

  throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name)
}