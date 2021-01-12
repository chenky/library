/*
常用正则表达式
链接：https://juejin.im/post/5aed6da16fb9a07aac2457f6
*/
//第二代身份证号码正则
let isChineseID2 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
//第一代身份证正则表达式(15位)
let isChineseID1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
// 身份证正则表达式包括第一代和第二代
let idCode = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
////用户名正则，4到16位（字母，数字，下划线，减号）
let isUserName = /^[a-zA-Z0-9_-]{4,16}$/
//密码正则，以字母开头，长度在6~18之间，只能包含字母、数字和下划线
let isPassword = /^[a-zA-Z]\w{5,17}$/
//强密码正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
let isStrongPassword = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
//非6位数字
let isPwd = /^[^\d]{6}$/
//连续的3位数字  123587
let continuousReg = /^\d*(012|123|234|345|456|567|678|789)\d*$/
//重复的3位数 如 123123
let repeatReg = /^(\d{3})\1$/
// 判断是否有连续重复的字符
let repeatCharacter = /([a-zA-Z])\1/
//倒序的3位数 如 123321
let ReverseOrder = /^(\d)(\d)(\d)\3\2\1$/
//最多只包含两个不同的数字
let maxTwo = /^(\d)\1*([^\1])(\1|\2)*$/
// qq号正则
let isQQ = /^[1-9][0-9]{4,10}$/
//微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
let isWechat = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
//特殊字符检测正则:
let isSpecialCharacters = /["'<>%;)(&+]+-!！@#$~/
// 域名正则
let isDomain = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
// 车牌号码正则
let isLicensePlateNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
// 包含中文正则	
let isChinese = /[\u4E00-\u9FA5]/
// 匹配双字节字符(包括汉字在内) ：[^\x00 -\xff]
let isDoubleByte = /[^\x00-\xff] /
// 护照正则
let isPassport = /^(P\d{7}|G\d{7,8}|TH\d{7,8}|S\d{7,8}|A\d{7,8}|L\d{7,8}|\d{9}|D\d+|1[4,5]\d{7})$/
// IP地址正则
let isIP = /\d+\.\d+\.\d+\.\d+/
//经度正则
let isLongitude = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
//纬度正则
let isLatitude = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
// 某个固定域名
let someDomain = /^https?:\/\/.+\.qtrade\.com\.cn\/.+$/

// http://jqueryvalidation.org/ 常用的正则验证
// contributed by Scott Gonzalez = http://projects.scottsplayground.com/email_address_validation/
let email = "/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i",
  // contributed by Scott Gonzalez = http://projects.scottsplayground.com/iri/
  url = "/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i",
  // http://docs.jquery.com/Plugins/Validation/Methods/number
  // 科学计数格式化数字，可以带逗号
  number = "/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/",
  // 保留两位小数点的数字，
  number2 = "/^(0?|([1-9]\d*))(?:\.\d{1,2})?$/",
  // http://docs.jquery.com/Plugins/Validation/Methods/digits
  digits = "/^\d+$/",
  isInt = "/^[1-9]\d*$/", // 正整数

  // 验证中国邮政编码[1-9]{1}(\d+){5};
  postalCode = "/^\d{6}$/",
  // 验证中国电话
  phone = "/^((\d{3,4})\-{0,1}){0,1}(\d{7,8})$/",
  // 验证中国手机号
  mobilePhone = "/^((13|15|18|14)\d{9})$/"

// qq域名正则表达式, 正则匹配qq子域名
// 写一个正则表达式，能够识别qq.com的所有子域名 
const qqDomain = /^(\w+\.)*qq\.com$/

/*
  动态正则表达式，参数正则表达式
  let reg1 = new RegExp('^' + delimiter + '([\\s\\S]*)$', 'g')
    let reg2 = new RegExp('^([\\s\\S]*)' + delimiter + '$', 'g')
    title = title.replace(reg1, '$1').replace(reg2, '$1')
*/