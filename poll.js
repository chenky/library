/**
 * 轮询数据
 * 如果你需要持续检查数据更新，但系统中没有 WebSocket，则可以使用这个工具来执行操作。
 * 它非常适合上传文件时，想要持续检查文件是否已完成处理的情况，
 * 或者使用第三方 API（例如 dropbox 或 uber）并且想要持续检查过程是否完成或骑手是否到达目的地的情况。
*/
async function poll (fn, validate, interval = 2500) {
  const resolver = async (resolve, reject) => {
    try { // catch any error thrown by the "fn" function
      const result = await fn() // fn does not need to be asynchronous or return promise
      // call validator to see if the data is at the state to stop the polling
      const valid = validate(result)
      if (valid === true) {
        resolve(result)
      } else if (valid === false) {
        setTimeout(resolver, interval, resolve, reject)
      } // if validator returns anything other than "true" or "false" it stops polling
    } catch (e) {
      reject(e)
    }
  }
  return new Promise(resolver)
}