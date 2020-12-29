export const MS1SEC = 1000
export const MS1MIN = MS1SEC * 60
export const MS1HOU = MS1MIN * 60
export const MS1DAY = MS1HOU * 24
export const MS1WEE = MS1DAY * 7

/**
 * 获取某个日期开始时间的毫秒数
 * @param diffDays - 目标日期减去今天日期所得的天数
 *        如：n天前为 -n; n天后为 n
 */
export function dateStart (diffDays = 0): number {
  const now = new Date()
  const number = now.setDate(now.getDate() + diffDays)
  // 消除时区偏差
  const msTimeZoneOffset = now.getTimezoneOffset() * MS1MIN

  return number - (number % MS1DAY) + msTimeZoneOffset
}

/** 获取某个日期的最后一毫秒 */
export function dateEnd (diffDays = 0): number {
  return dateStart(diffDays + 1) - 1
}

/**
 * 获取最近几天的number时间范围
 * @param nDays - 最近的天数, 应该为非负数
 *        如: 今天为 0; 最近 30 天为 30
 */
export function recentDaysRange (nDays = 1) {
  return [dateStart(-nDays + 1), dateEnd(0)]
}

// day:3表示3天后，-3表示3天前，ts：对比的时间， 毫秒数, 不能超过30天
// 判断ts时间是不是在[day, 今天]或[今天， day]区间
function isInDateArea (day = 0, ts = new Date().valueOf()) {
  var now = new Date()
  var curYear = now.getFullYear()
  var curMonth = now.getMonth() + 1
  var curDay = now.getDate()

  var nowTs = new Date(curYear + "/" + curMonth + "/" + curDay + " 00:00:00").valueOf()
  var endTs = new Date(curYear + "/" + curMonth + "/" + curDay + " 00:00:00").valueOf()
  var start = nowTs + day * 24 * 60 * 60 * 1000
  var end = endTs + 24 * 60 * 60 * 1000
  start = Math.min(start, end)
  end = Math.max(start, end)
  return ts >= start && ts < end ? true : false
}
/**
 * 日期是否在范围内
 * @param  {Date} startDate 开始日期
 * @param  {Date} endDate 结束日期
 * @param  {Date} checkDate 校验日期
 * @return {Boolean} 是否在日期范围内
*/
function isInDateRang (startDate = new Date(), endDate = new Date(), checkDate = new Date()) {
  return checkDate.valueOf() >= startDate.valueOf() && checkDate.valueOf() <= endDate.valueOf() ? true : false
}
/**
 * 判断闰年
 * @return {Boolean} 是闰年返回true，否则返回false。
 */
export function isLeapYear (date: Date) {
  return (0 == date.getFullYear() % 4 && ((date.getFullYear() % 100 != 0) || (date.getFullYear() % 400 == 0)))
}

/**
 * @desc 格式化日期
 *        date为日期格式: Date 或date字符串
 *        fmt为要转化的格式,如:'yyyy-MM-dd HH:mm:ss'
 */
export const dateFormatter = (date: Date | number | string, fmt = 'yyyy-MM-dd HH:mm:ss') => {
  if (!date) return ''
  if (typeof date === 'string') {
    const time1 = date.replace(/-/g, '/')
    date = new Date(time1)
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  const week = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() as keyof typeof week])
  }
  let k: keyof typeof o
  for (k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k] + '') : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// /**
//  * 判断闰年
//  * @return {Boolean} 是闰年返回true，否则返回false。
//  */
// Date.prototype.isLeapYear = function () {
//   // return new Date(this.getFullYear(),2,0).getDate();
//   // return (0 == this.getFullYear() % 4 && ((this.getFullYear() % 100 != 0) || (this.getFullYear() % 400 == 0)));
//   return (0 == this.getFullYear() % 4 && ((this.getFullYear() % 100 != 0) || (this.getFullYear() % 400 == 0)))
// }
// /**
//    * 返回指定格式的日期;	/// 格式 YYYY/yyyy/YY/yy 表示年份
// /// MM/M 月份
// /// W/w 星期
// /// dd/DD/d/D 日期
// /// hh/HH/h/H 时间
// /// mm/m 分钟
// /// ss/SS/s/S 秒
//  * @param  {String} format 日期格式字符串
//  * @return {Date}        返回指定格式的日期
//  */
// Date.prototype.format = function (format) {
//   var week = ['日', '一', '二', '三', '四', '五', '六']
//   var o = {
//     "M+": this.getMonth() + 1, //month
//     "d+|D+": this.getDate(), //day
//     "h+|H+": this.getHours(), //hour
//     "w|W": week[this.getDay()], // week
//     "m+": this.getMinutes(), //minute
//     "s+": this.getSeconds() //seconds
//   }

//   // format year
//   if (/(y+|Y+)/.test(format)) {
//     format = format.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length))
//   }

//   for (var k in o) {
//     if (new RegExp("(" + k + ")").test(format)) {
//       format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
//     }
//   }
//   return format
// }
