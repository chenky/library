//科学计数格式化数字
/*
 formatNum(2000);
 "2,000"
 formatNum(2000.32);
 "2,000.32"*/
function formatNum (strNum) {
  if (strNum.length <= 3) {
    return strNum
  }
  if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
    return strNum
  }
  var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3
  var re = new RegExp()
  re.compile("(\\d)(\\d{3})(,|$)")
  while (re.test(b)) {
    b = b.replace(re, "$1,$2$3")
  }
  return a + "" + b + "" + c

}

/***
* 把传入的数字用千位分隔符分割  和formateNumbe一样的效果
*
formateMoney(234567567567);
"234,567,567,567.00"
formateMoney(2.4);
"2.40"
* */
function formateMoney (s) {
  s += ""
  if (/[^0-9\.]/.test(s)) return "invalid value"
  s = s.replace(/^(\d*)$/, "$1.")
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1")
  s = s.replace(".", ",")
  var re = /(\d)(\d{3},)/
  while (re.test(s))
    s = s.replace(re, "$1,$2")
  s = s.replace(/,(\d\d)$/, ".$1")
  return s.replace(/^\./, "0.")
}

// 大数位，进度不丢失相加运算
function addNumber (num1, num2) {
  if (arguments.length < 2) {
    throw '必须要传入两个参数,进行相加'
  };
  for (let num in arguments) {
    // 强制换成字符串, 
    if (typeof arguments[num] !== 'string') {
      arguments[num] += ''
    };
  };
  // 处理小数点
  let arr1 = num1.split('.')
  let arr2 = num2.split('.')
  // 先处理整数 按照''将字符串进行分割成数组
  let intArr1 = arr1[0].split('')
  let intArr2 = arr2[0].split('')
  // 在处理小数位
  let decimalsArr1 = arr1[1] || []
  let decimalsArr2 = arr2[1] || []
  // 存储处理好的number
  let resualtIntArr = []
  let resualtDecimalsArr = []
  let carrayInt = 0 // 默认整数计算单数位
  let carrayDecimals = 0 // 默认小数计算单数位
  // 比较两个数值 获取对多的一个小数位长度
  let decimalsMinLength = decimalsArr1.length > decimalsArr2.length ? decimalsArr1.length : decimalsArr2.length

  // 循环计算小数位
  while (decimalsMinLength > 0) {
    // 减少1位 用来做索引查找
    decimalsMinLength--
    let sumDecimals = carrayDecimals + parseInt(decimalsArr1[decimalsMinLength] || 0) + parseInt(decimalsArr2[decimalsMinLength] || 0)

    if (sumDecimals < 10) {
      // 添加到数组的第一个位置
      resualtDecimalsArr.unshift(sumDecimals)
      carrayDecimals = 0 // 变成0
    } else {// 往下计算10位的 
      resualtDecimalsArr.unshift(sumDecimals - 10)
      carrayDecimals = 1 // 往上加1
    };
  };
  // 小数位计算完毕 还有10位数的 记录下来 在下面整数时候进行添加
  if (carrayDecimals > 0) {
    carrayInt = carrayDecimals
  };
  // 跟小数点计算方法同理 
  while (intArr1.length || intArr2.length) {
    let sumInt = carrayInt + parseInt(intArr1.pop() || 0) + parseInt(intArr2.pop() || 0)
    if (sumInt < 10) {
      resualtIntArr.unshift(sumInt)
      carrayInt = 0
    } else {
      resualtIntArr.unshift(sumInt - 10)
      carrayInt = 1
    };
  };
  if (carrayInt > 0) {
    resualtIntArr.unshift(carrayInt)
  };
  // 在转成字符串拼接返回
  return resualtIntArr.join('') + '.' + resualtDecimalsArr.join('')
};
console.log(addNumber('1234567890123456789.98', 1.13))

// 创建一个范围内的数字
/**
 * Python 里我很喜欢的一个功能是 range 函数，而在 JavaScript 里我经常需要自己写这个功能。
 * 下面是一个简单的实现，非常适合 for…of 循环以及需要特定范围内数字的情况。
*/
function range (maxOrStart, end = null, step = null) {
  if (!end) {
    return Array.from({ length: maxOrStart }, (_, i) => i)
  }

  if (end <= maxOrStart) {
    return []
  }

  if (step !== null) {
    return Array.from(
      { length: Math.ceil(((end - maxOrStart) / step)) },
      (_, i) => (i * step) + maxOrStart
    )
  }

  return Array.from(
    { length: Math.ceil((end - maxOrStart)) },
    (_, i) => i + maxOrStart
  )
}