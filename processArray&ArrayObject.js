/**
 * 数组对象去重
 * arr：待去重的数组对象
 * fieldId：以此属性值作为去重判断依据
 * [{fieldId:1,name:a,...},{fieldId:2, name:b,...},...]
 */
export function uniqueArrObj (arr, fieldId) {
  if (!Array.isArray(arr)) {
    console.error('arr参数必须是一个数组，将原样返回输入参数')
    return arr
  }
  // 不提供去重id则直接返回原数组
  if (typeof fieldId !== 'string' || !fieldId) {
    console.error('fieldId没有提供，将原样返回输入参数')
    return arr
  }
  const hash = {}
  const newArr = []
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    const fieldVal = element[fieldId]
    if (!hash[fieldVal]) {
      hash[fieldVal] = true
      newArr.push(element)
    }
  }
  return newArr
}

// 深度拍平数组，深度扁平化数组
export function arrflattenDeep (arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

/**
 * 判断数组对象，是否有重复项
 * arr数组对象
 * fieldId：以此属性值作为是否重复判断依据
 * [{fieldId:1,name:a,...},{fieldId:2, name:b,...},...]
 */
export function hasDuplicateArrObj (arr, fieldId) {
  if (!Array.isArray(arr)) {
    console.error('arr参数必须是一个数组，将原样返回输入参数')
    return arr
  }
  // 不提供去重id则直接返回原数组
  if (typeof fieldId !== 'string' || !fieldId) {
    console.error('fieldId没有提供，将原样返回输入参数')
    return arr
  }
  const flatArr = arrflattenDeep(arr)
  const hash = {}
  for (let index = 0; index < flatArr.length; index++) {
    const element = flatArr[index]
    const fieldVal = element[fieldId]
    if (!hash[fieldVal]) {
      hash[fieldVal] = true
    } else {
      // 出现重复项了
      return true
    }
  }
  return false
}

/**
 * arr: 待去重数组，数组项必须是非引用类型，可以是string，number等类型
*/
export function uniqueArr (arr) {
  if (!Array.isArray(arr)) {
    console.error('arr参数必须是一个数组，将原样返回输入参数')
    return arr
  }
  return [...new Set(arr)]
}

// 数组随机乱序，数组乱序
Array.prototype.shuffle = function () {
  let j
  let i = this.length
  while (i > 0) {
    j = parseInt(Math.random() * i)
    i--;
    [this[j], this[i]] = [this[i], this[j]]
  }
  return this
}
// 带权重的数组乱序，格式[{value:"val1", priority:1},{value:"val2", priority:9},...]
// priority的值在[0,1]之间，包括0，小于1
Array.prototype.shuffleWithPriority = function () {
  let prioritySum = this.reduce((total, elem) => total + elem.priority, 0)
  let res = []
  for (let i = 0; i < this.length; i++) {
    const elem = this[i]
    if (elem.priority / prioritySum > Math.random()) {
      res.unshift(elem)
    } else {
      res.push(elem)
    }
  }
  return res
}
// 从数组中随机提取一个元素
Array.prototype.random = function () {
  const len = this.length
  return this[parseInt(Math.random() * len)]
}

let arr = [1, 2, 3, 4, 5, 6, 7]
console.log(arr.shuffle())
console.log(arr.shuffle())
console.log(arr.random())
console.log([{ value: 1, priority: 1 }, { value: 2, priority: 10 }, { value: 3, priority: 20 }, { value: 4, priority: 30 }, { value: 5, priority: 50 }, { value: 6, priority: 60 }].shuffleWithPriority())