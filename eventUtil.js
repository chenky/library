//事件处理兼容各种浏览器，采用能力检测方法，所谓能力检测，就是有能力就做，没有能力就不做

//定义一个处理事件的对象，兼容各种浏览器，dom2级事件处理和ie事件，如果这两个事件都不兼容，就采用dom0级处理
var eventUtil = {
  addEvent: function (element, type, handler) {
    if (element.addEventListener) {
      //非IE浏览器采用dom2级事件处理，type为事件类型如：click，handler为事件处理函数，false代表事件采用冒泡处理模型，如果是true代表 采用捕获型处理模型
      //除了netbeans采用捕获型处理模型，其他都采用冒泡型处理模型
      //如果是非IE浏览器添加事件为：addEventListener
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      //如果为IE浏览器，添加事件采用 attachEvent
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeEvent: function (element, type, handler) {
    if (element.removeEventListener) {
      //非IE浏览器采用dom2级事件处理，type为事件类型如：click，handler为事件处理函数，false代表事件采用冒泡处理模型，如果是true代表 采用捕获型处理模型
      //除了netbeans采用捕获型处理模型，其他都采用冒泡型处理模型
      //如果是非IE浏览器添加事件为：removeEventListener
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      //如果为IE浏览器，添加事件采用 detachEvent
      element.detachEvent("on" + type, handler);
    } else {
      //dom0级事件处理，如果删除事件采用赋值null
      element["on" + type] = null;
    }
  },
  getEvent: function (event) {
    //获取事件本身
    return event ? event : window.event;
  },
  getType: function (event) {
    //获取事件类型
    return event.type;
  },
  getElement: function (event) {
    //获取事件作用元素
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    //阻止默认的事件行为
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopProPagation: function (event) {
    //停止事件冒泡
    if (event.stopProPagation) {
      event.stopProPagation();
    } else {
      event.cancelBubble = true;
    }
  },
};
