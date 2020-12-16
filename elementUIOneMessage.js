import { Message } from 'element-ui'

// 只提示一个错误信息窗口，而不是重复提醒
const oneMessage = (function () {
  let isShowMsg = null
  return function (options) {
    if (isShowMsg) return
    isShowMsg = true
    const oldOnClose = typeof options.onClose === 'function' ? options.onClose : () => { }
    options.onClose = function (context) {
      oldOnClose(context)
      isShowMsg = null
    }
    Message(options)
  }
})()
oneMessage.success = function (message) {
  oneMessage({ message, type: 'success' })
}
oneMessage.warning = function (message) {
  oneMessage({ message, type: 'warning' })
}
oneMessage.info = function (message) {
  oneMessage({ message, type: 'info' })
}
oneMessage.error = function (message) {
  oneMessage({ message, type: 'error' })
}