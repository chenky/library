/**
 * 格式化 JSON 字符串，stringify 任何内容
 * 我在使用 NodeJs 将对象记录到控制台时经常使用这种方法。
 * JSON.stringify 方法需要第三个参数，该参数必须有多个空格以缩进行。
 * 第二个参数可以为 null，但你可以用它来处理 function、Set、Map、Symbol 之类 
 * JSON.stringify 方法无法处理或完全忽略的内容。
*/
const stringify = (() => {
  const replacer = (key, val) => {
    if (typeof val === 'symbol') {
      return val.toString()
    }
    if (val instanceof Set) {
      return Array.from(val)
    }
    if (val instanceof Map) {
      return Array.from(val.entries())
    }
    if (typeof val === 'function') {
      return val.toString()
    }
    return val
  }

  return (obj, spaces = 0) => JSON.stringify(obj, replacer, spaces)
})()