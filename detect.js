function detect (ua, platform) {
  var os = {}, browser = {},
    webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
    android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
    osx = !!ua.match(/\(Macintosh\; Intel /),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
    win = /Win\d{2}|Windows/.test(platform),
    wp = ua.match(/Windows Phone ([\d.]+)/),
    touchpad = webos && ua.match(/TouchPad/),
    kindle = ua.match(/Kindle\/([\d.]+)/),
    silk = ua.match(/Silk\/([\d._]+)/),
    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
    rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    playbook = ua.match(/PlayBook/),
    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
    firefox = ua.match(/Firefox\/([\d.]+)/),
    firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
    ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
    webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

  // Todo: clean this up with a better OS/browser seperation:
  // - discern (more) between multiple browsers on android
  // - decide if kindle fire in silk mode is android or not
  // - Firefox on Android doesn't specify the Android version
  // - possibly devide in os, device and browser hashes

  if (browser.webkit = !!webkit) browser.version = webkit[1]

  if (android) os.android = true, os.version = android[2]
  if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
  if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
  if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
  if (wp) os.wp = true, os.version = wp[1]
  if (webos) os.webos = true, os.version = webos[2]
  if (touchpad) os.touchpad = true
  if (blackberry) os.blackberry = true, os.version = blackberry[2]
  if (bb10) os.bb10 = true, os.version = bb10[2]
  if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
  if (playbook) browser.playbook = true
  if (kindle) os.kindle = true, os.version = kindle[1]
  if (silk) browser.silk = true, browser.version = silk[1]
  if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
  if (chrome) browser.chrome = true, browser.version = chrome[1]
  if (firefox) browser.firefox = true, browser.version = firefox[1]
  if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
  if (ie) browser.ie = true, browser.version = ie[1]
  if (safari && (osx || os.ios || win)) {
    browser.safari = true
    if (!os.ios) browser.version = safari[1]
  }
  if (webview) browser.webview = true

  os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
    (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
  os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
    (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
    (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))

  return { os, browser }
}


// 如下是简单的一下判断，如果需要更全面的判断可以使用如下两个类库
// https://github.com/lancedikson/bowser
// https://github.com/etienne-martin/device-detector-js
const ua = navigator.userAgent
const platform = navigator.platform

// 判断是iphone
const isiPhone = /(iPhone\sOS)\s([\d_]+)/.test(ua)
// 判断是ipad
const isiPad = /(iPad).*OS\s([\d_]+)/.test(ua)
// 是否ipod
const isiPod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
// 判断是ios
const isIos = isiPhone || isiPad || isiPod
// 判断是否mac os即 osx
const isOsx = /Macintosh/.test(ua)
// 判断是android平台
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua)
// 判断是否windows平台
const isWin = /Win\d{2}|Windows/.test(platform)
/**
 * windows2000: Windows NT 5.0|Windows 2000
 * windowsXp: Windows NT 5.1|Windows XP
 * windows2003:Windows NT 5.2|Windows 2003
 * windowsVista: Windows NT 6.0|Windows Vista
 * windows7: Windows NT 6.1|Windows 7
 * */
// 判断是否windows phone平台
const isWp = /Windows Phone ([\d.]+)/.test(ua)
// 判断是否linux
const isLinux = /Linux/i.test(platform)
// 华为
const isHuawei = /huawei/i.test(ua)
// Nexus
const isNexus = /nexus\s*(?:\d).*|galaxy nexus/i.test(ua)

// mobile
const isMobile = /[^-]mobi/i.test(ua)
// 判断是否微信
const isWx = /micromessenger/i.test(ua)
// 判断是否支付宝
const isAlipay = /Alipay/i.test(ua)
// 判断是否qq客户端
const isQQ = /QQ\/[0-9]/i.test(ua)
// 判断是否qq browser
const isQQBrowser = /qqbrowser/i.test(ua)
// 判断是否uc browser
const isUcBrowser = /ucbrowser/i.test(ua)
// is opera
const isOpera = /opera|opr\/|opios/i.test(ua)
// is Samsung Browser
const isSamsung = /SamsungBrowser/i.test(ua)
// is ie 
const isIe = /MSIE|Trident/.test(ua)
// is edge
const isEdge = /\sedg\/|edg([ea]|ios)/i.test(ua)
//is firefox 
const isFirefox = /(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i.test(ua)
// is firefoxos 
const isFirefoxOs = /\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/.test(ua)
// is chrome 
const isChrome = /(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i.test(ua)
// is safari
const isSafari = /(iPhone|iPod|iPad).*AppleWebKit(?=.*Safari)/.test(ua)

