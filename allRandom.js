// 产生指定范围的随机数[lowerValue-upperValue],包括lowerValue和upperValue
// isNumber是否整型，是则返回整型，否则返回浮点型
// lowerValue,随机数下限；upperValue：随机数上线
function rangeRandom (lowerValue, upperValue, isNumber) {
  if (typeof lowerValue === "number" && typeof upperValue === "number") {
    var choices = (isNumber ? (upperValue - lowerValue + 1) :
      (upperValue - lowerValue)),
      rnd = Math.random() * choices + lowerValue
    return isNumber ? Math.floor(rnd) : rnd
  }
}

/**
* 更加安全的产生指定范围的随机数
* @param  {[type]}  lowerValue [description]
* @param  {[type]}  upperValue [description]
* @param  {Boolean} isNumber   [description]
* @return {[type]}             [description]
*/
function cryptoRandom (lowerValue, upperValue, isNumber) {
  if (typeof lowerValue === "number" && typeof upperValue === "number") {
    const tempRnd = crypto.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF
    var choices = (isNumber ? (upperValue - lowerValue + 1) :
      (upperValue - lowerValue)),
      rnd = tempRnd * choices + lowerValue
    return isNumber ? Math.floor(rnd) : rnd
  }
}

/*
得到一个大于等于0，小于1之间的随机数
Math.random() 函数返回一个浮点,  伪随机数在范围从0到小于1，也就是说，从0（包括0）往上，但是不包括1（排除1），然后您可以缩放到所需的范围。实现将初始种子选择到随机数生成算法;它不能被用户选择或重置。
*/
function getRandom () {
  return Math.random()
}

/*
得到一个两数之间的随机数
这个例子返回了一个在指定值之间的随机数。这个值不小于 min（有可能等于），并且小于（不等于）max。
*/
function getRandomArbitrary (min, max) {
  return Math.random() * (max - min) + min
}

/*
得到一个两数之间的随机整数
这个例子返回了一个在指定值之间的随机整数。这个值不小于 min （如果 min 不是整数，则不小于 min 的向上取整数），且小于（不等于）max。
*/
function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //不含最大值，含最小值
}

/*
得到一个两数之间的随机整数，包括两个数在内
*/
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值 
}

// 数组乱序
function shuffle (arr) {
  return arr.sort((a, b) => {
    return Math.random() > 0.5 ? 1 : -1
  })
}
// 数组乱序
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
// console.log(shuffle([1,2,3,4,5,6,7,8,9]));