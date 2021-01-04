/**
 * promises确定是promise类型数组
*/
function runPromiseInSequence (promises, input) {
  return promises.reduce((previous, current) => {
    return previous.then(current)
  }, Promise.resolve(input))
}

/**
 * 对一起进行promise顺序执行
 * 如果你有一堆异步或普通函数都返回 promise，要求你一个接一个地执行，这个工具就会很有用。
 * 它会获取函数或 promise 列表，并使用数组 reduce 方法按顺序解析它们。
*/
const asyncSequentializer = (() => {
  const toPromise = (x) => {
    if (x instanceof Promise) { // if promise just return it
      return x
    }

    if (typeof x === 'function') {
      // if function is not async this will turn its result into a promise
      // if it is async this will await for the result
      return (async () => await x())()
    }

    return Promise.resolve(x)
  }

  return (list) => {
    const results = []

    return list
      .reduce((lastPromise, currentPromise) => {
        return lastPromise.then(res => {
          results.push(res) // collect the results
          return toPromise(currentPromise)
        })
      }, toPromise(list.shift()))
      // collect the final result and return the array of results as resolved promise
      .then(res => Promise.resolve([...results, res]))
  }
})()