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
function isInDateArea (day: number, ts: number) {
  var now = new Date()
  var curYear = now.getFullYear()
  var curMonth = now.getMonth() + 1
  var curDay = now.getDate()

  var nowTs = new Date(curYear + "/" + curMonth + "/" + curDay + " 00:00:00").valueOf()
  var endTs = new Date(curYear + "/" + curMonth + "/" + curDay + " 00:00:00").valueOf()
  var start = nowTs + day * 24 * 60 * 60 * 1000
  var end = endTs + 24 * 60 * 60 * 1000
  // console.log(new Date(start)+","+new Date(end));
  ts = parseFloat(ts) || new Date()  // n 的格式为 毫秒数
  start = Math.min(start, end)
  end = Math.max(start, end)
  return ts >= start && ts < end ? true : false
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
