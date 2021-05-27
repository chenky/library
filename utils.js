(function (window, undefined) {

  function sUtil () { };
  sUtil.fn = sUtil.prototype = {
    version: 1.0,
    constructor: sUtil,

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
    }
  }
  window.sUtil = new sUtil()

})(window)

// 防止单击劫持，即通过iframe嵌套页面然后透明，诱导用户单击操作
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

/**
 * 依赖jQuery的工具
 * @type {Object}
 */
var jqueryTool = {
  // DOM Opration， 有动画效果的滚动到页面顶部
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

// 判断是否加载到页面底部
// $list.scrol1Top + document.body.clientHeight >= $list.scrollHeight;
// 无限分页加载，判断页面是否滚动到底部
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

// 通过fixed和absolute模拟sticky的效果
$.fn.sticky = function (option) {
  var def = { top: 0 }
  $.extend(def, option)
  $.each($(this), function (i, item) {
    var curElement = $(item)
    var timeId = null
    var offsetTop = curElement.offset().top
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop()
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

/**
 * 获取对象属性，通过路径
*/
function getObjValByPath (obj, path) {
  let paths = path.split('.')
  let res = obj
  let prop
  while (prop = paths.shift()) {
    res = res[prop]
  }
  return res
}

// 自关闭标签转换成标准的html关闭标签	
function convert (html) {
  var tags = /^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i
  return html.replace(/(<(\w+)[^>]*?)\/>/g, function (all, front, tag) {
    return tags.test(tag) ?
      all :
      front + "></" + tag + ">"
  })
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


