/**
 * 如果不成功则一直提示重试
 * -------------------- */
function retry (msg = '是否重试', title = '请求错误') {
  return function (target, property, descriptor) {
    const oldFn = descriptor.value
    if (typeof oldFn !== 'function') return
    descriptor.value = async function temp (...args) {
      const res = await oldFn.apply(this, args)
      if (res.code !== 0) {
        const confirmRetry = await MessageBox.confirm(msg, {
          title,
          type: 'error',
          showClose: false,
          closeOnClickModal: false,
          confirmButtonText: '再试试'
        })
          .catch(funcReturn(false))
        if (confirmRetry) return temp.apply(this, args)
      }
      return res
    }
    return descriptor
  }
}