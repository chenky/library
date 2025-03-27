/**
 * promises确定是promise类型数组
 */
function runPromiseInSequence(promises, input) {
  return promises.reduce((previous, current) => {
    return previous.then(current);
  }, Promise.resolve(input));
}

/**
 * 对一起进行promise顺序执行
 * 如果你有一堆异步或普通函数都返回 promise，要求你一个接一个地执行，这个工具就会很有用。
 * 它会获取函数或 promise 列表，并使用数组 reduce 方法按顺序解析它们。
 */
const asyncSequentializer = (() => {
  const toPromise = (x) => {
    if (x instanceof Promise) {
      // if promise just return it
      return x;
    }

    if (typeof x === "function") {
      // if function is not async this will turn its result into a promise
      // if it is async this will await for the result
      return (async () => await x())();
    }

    return Promise.resolve(x);
  };

  return (list) => {
    const results = [];

    return (
      list
        .reduce((lastPromise, currentPromise) => {
          return lastPromise.then((res) => {
            results.push(res); // collect the results
            return toPromise(currentPromise);
          });
        }, toPromise(list.shift()))
        // collect the final result and return the array of results as resolved promise
        .then((res) => Promise.resolve([...results, res]))
    );
  };
})();

/**
 * 页面有100个请求，但是一次只能请求5个，如何实现，异步事件队列
 */
// ... existing code ...

function runMutiplePromiseByQueue(asyncList, maxCount = 5) {
  let index = 0;
  const results = [];
  let runningCount = 0;

  // Helper function to execute promises
  const executeNext = () => {
    while (runningCount < maxCount && index < asyncList.length) {
      const currentIndex = index++;
      runningCount++;

      Promise.resolve(asyncList[currentIndex]())
        .then((result) => {
          results[currentIndex] = result;
        })
        .catch((error) => {
          results[currentIndex] = { error };
        })
        .finally(() => {
          runningCount--;
          executeNext();
        });
    }
  };

  // 需要知道所有的promise是否都执行完了，才返回结果
  return new Promise((resolve) => {
    const checkCompletion = setInterval(() => {
      if (runningCount === 0 && index >= asyncList.length) {
        clearInterval(checkCompletion);
        resolve(results);
      }
    }, 100);

    executeNext();
  });

  // 如果不需要知道所有的promise是否都执行完了
  //   executeNext();
}
