function isValidArray (x) {
  return /Int(8|16|32)Array|Uint(8|8Clamped|16|32)Array|Float(32|64)Array|ArrayBuffer/gi.test({}.toString.call(x))
};
function arrayBufferConcat (/* arraybuffers */) {
  var arrays = [].slice.call(arguments)

  if (arrays.length <= 0 || !this.isValidArray(arrays[0])) {
    return new Uint8Array(0).buffer
  }

  var arrayBuffer = arrays.reduce((cbuf, buf, i) => {
    if (i === 0) return cbuf
    if (!this.isValidArray(buf)) return cbuf

    var tmp = new Uint8Array(cbuf.byteLength + buf.byteLength)
    tmp.set(new Uint8Array(cbuf), 0)
    tmp.set(new Uint8Array(buf), cbuf.byteLength)

    return tmp.buffer
  }, arrays[0])

  return arrayBuffer
}
// reference: https://github.com/keqingrong/tiny-save-as/blob/master/src/index.js
function blobSaveAs (blob, filename) {
  // Microsoft Edge/IE 10+
  /*
   * msSaveBlob 和 msSaveOrOpenBlob 方法允许用户在客户端上保存文件，方法如同从 Internet 下载文件，这是此类文件保存到“下载”文件夹的原因。
     请注意，msSaveBlob 和 msSaveOrOpenBlob 之间的区别就在于前者仅为用户提供“保存”按钮，而后者不但提供“保存”按钮，还提供“打开”按钮。
   */
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename)
    return true
  }

  if (typeof URL !== 'undefined' && 'download' in HTMLAnchorElement.prototype) {
    var link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.addEventListener('click', function () {
      // 结束后释放 URL 对象，但如果立即调用 revokeObjectURL 会导致网络错误。
      // 如 Chrome 会提示 "Failed - Network error"，此处放在回调函数中异步处理。
      requestAnimationFrame(function () {
        URL.revokeObjectURL(link.href)
        link.remove()
      })
    }, false)

    // 没有必要调用 document.body.appendChild() 将 link 元素真的添加到页面中。
    // 因为没有添加到页面中，此处调用 link.click() 对 Firefox 来说不会触发下载，
    // 使用 link.dispatchEvent() 代替。
    link.dispatchEvent(new MouseEvent('click'))
    return true
  }
  console.warn('该浏览器不支持文件保存') // eslint-disable-line no-console
  return false
};

/**
 * 文件类型'text/plain' || 'application/pdf'
 * 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/bmp' || 'image/gif'
 * 如下是office2010：即后缀是.xlsx .docx, pptx
 * 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
 * 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
 * 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
 * office2003： 'application/vnd.ms-excel' || 'application/msword' || 'application/vnd.ms-powerpoint' 
 *  视频，音频： video/* || audio/*
 * 
*/
function arrayBufferSaveas (arrayBuffer, contentType, fileName) {
  const blob = new Blob([arrayBuffer], { type: contentType })
  blobSaveAs(blob, fileName)
}