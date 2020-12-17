// 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/Using_geolocation#%E5%8F%A6%E8%AF%B7%E5%8F%82%E9%98%85
// https://www.w3.org/TR/geolocation-API/
// http://www.cnblogs.com/lhb25/archive/2012/07/10/html5-geolocation-api-demo.html
// boolean enableHighAccuracy = false; 是否高精度
// [Clamp] unsigned long timeout = 0xFFFFFFFF;  超时时间
// [Clamp] unsigned long maximumAge = 0; 最大缓存时间
function getGeolocation (successCallback, errorCallback) {
  if ("geolocation" in navigator) {
    /* 地理位置服务可用 */

    navigator.geolocation.getCurrentPosition(function (position) {
      // position.coords.latitude, position.coords.longitude  获取到经纬度
      typeof successCallback === "function" ? successCallback(position) : ""
    },
      function (error) {
        // 获取地理位置失败了，可能是超时，可能是获取不到等等原因
        typeof errorCallback === "function" ? errorCallback.call(null, error) : ""
      }, { enableHighAccuracy: false, timeout: 60 * 1000, maximumAge: 10 * 60 * 1000 })

  } else {
    /* 地理位置服务不可用 */
    typeof errorCallback === "function" ? errorCallback.call(null, null) : ""
  }
}
// 做成可配置，只有需要位置信息的时候才去取
if (isNeedPos) {
  getGeolocation(function () { }, function () { })
}