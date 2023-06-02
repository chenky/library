/**
 * @desc 定义工具函数 define utils functions
 */
import dayJs from 'dayjs'
import { EN, BRL, MXN, COP } from './constants'
import { PhoneNumberUtil } from 'google-libphonenumber'
import * as EmailValidator from 'email-validator'

class Tools {
  /**
   * async try catch
   */
  async to<T, E = Error>(promise: Promise<T>): Promise<[T | null, E | null]> {
    try {
      return [await promise, null]
    } catch (e: any) {
      return [null, e]
    }
  }

  /**
   * show msg
   * 展示消息
   *
   * @param {string|number} msg message to show
   */
  showMsg(msg: string | number) {
    alert(msg)
  }

  /**
   * check network online or offline
   * 判断当前网络在线或者断线
   */
  checkNetwork(): Promise<boolean> {
    const { navigator } = window
    if (navigator) {
      // h5
      return Promise.resolve(navigator.onLine)
    } else {
      // pc
      const img = new Image()
      img.src = new URL('../assets/images/header_logo.svg', import.meta.url) + '?' + Date.now()
      return new Promise((resolve) => {
        img.onload = function () {
          resolve(true)
        }
        img.onerror = function () {
          resolve(false)
        }
      })
    }
  }

  /**
   * redirect to other website
   * 重定向至其他网站
   *
   * @param {string} url other website
   */
  redirect(url: string) {
    if (location.href) {
      location.href = url
    } else {
      window.open(url, '_self')
    }
  }

  /**
   * format string => only save number
   * 格式化字符串 => 只保留数字
   *
   * @param {string} s string to format
   */
  onlyNum(s: string) {
    return s.replace(/[^0-9]/g, '')
  }

  /**
   * m / 100 and format to two decimal places by local type.
   * 分 => 元，并按本地金钱格式格式化至小数点后 2 位。
   *
   * @param {number} m money to format
   */
  formatMoney(m: number) {
    const lang = navigator.language || EN
    return (m / 100).toLocaleString(lang, {
      minimumFractionDigits: 2
    })
  }

  /**
   * format currency.
   * 格式化货币单位。
   *
   * @param currency
   */
  formatCurrency(currency: unknown) {
    return typeof currency == 'string'
      ? {
          [BRL]: 'R$',
          [MXN]: 'MXN$',
          [COP]: 'COP$'
        }[currency] ?? ''
      : ''
  }

  /**
   * format amount.
   * 格式化金额。
   *
   * @param currency
   * @param amount
   */
  getAmount(currency: unknown, amount?: number) {
    return this.formatCurrency(currency) + ' ' + (amount ? this.formatMoney(amount) : '--')
  }

  /**
   * format to local time.
   * 格式化至本地时间。
   *
   * @param {string|number} t time to format
   * @param {string} type format type. default: 'YYYY/MM/DD HH:mm'
   */
  formatTime(t: string | number, type = 'YYYY/MM/DD HH:mm') {
    if (typeof t === 'string') {
      t = t.replace(/^(?=\/d{4})-(?=\/d{2})-(?=\/d{2})/, '/')
    }
    return dayJs(t).format(type)
  }

  /**
   * format the document id
   * 格式化用户输入的税号
   *
   * @param {string} n user inputting
   * @param {boolean} isDelete whether to press the delete key. 用户的输入状态是否为删除
   */
  formatDoucmentId(n: string, isDelete = false) {
    let val = n
    switch (n.length) {
      case 0:
      case 1:
      case 2:
        break
      case 3:
        // eg: 111 => 111. | 111. => 111
        val = n + (isDelete ? '' : '.')
        break
      case 4:
      case 5:
        // eg: 11111 => 111.11
        val = this.formatDoucmentId(n.substring(0, 3)) + n.substring(3)
        break
      case 6:
        // eg: 111111 => 111.111. | 111.111. => 111.111
        val = this.formatDoucmentId(n.substring(0, 5)) + n.substring(5) + (isDelete ? '' : '.')
        break
      case 7:
      case 8:
        // eg: 1111111 => 111.111.1
        val = this.formatDoucmentId(n.substring(0, 6)) + n.substring(6)
        break
      case 9:
        // eg: 111111111 => 111.111.111- || 111.111.111- => 111.111.111
        val = this.formatDoucmentId(n.substring(0, 8)) + n.substring(8) + (isDelete ? '' : '-')
        break
      case 10:
      case 11:
        // eg: 11111111111 => 111.111.111-11
        val = this.formatDoucmentId(n.substring(0, 9)) + n.substring(9)
        break
      case 12:
        // eg: 111111111111 => 11.111.111/1111- | 11.111.111/1111- => 11.111.111/1111
        val =
          n.substring(0, 2) +
          '.' +
          n.substring(2, 5) +
          '.' +
          n.substring(5, 8) +
          '/' +
          n.substring(8, 12) +
          (isDelete ? '' : '-')
        break
      default:
        // eg: 11111111111111 => 11.111.111/1111-11
        val = this.formatDoucmentId(n.substring(0, 12)) + n.substring(12, 14)
    }
    return val
  }

  /**
   * get document type according to document id
   * 根据税号获取税号类型
   *
   * @param {string} n document id
   * @returns {string} document type
   */
  getDocumentType(n: string) {
    return this.onlyNum(n).length > 11 ? 'CNPJ' : 'CPF'
  }

  /**
   * whether images are downloaded
   * 图片是否加载完成
   *
   * @param list image src list
   */
  isImgsComplete(list: string[]): Promise<boolean> {
    return new Promise((resolve) => {
      const n = list.length
      if (!n) {
        resolve(true)
      } else {
        const imgs: Array<HTMLImageElement> = []
        list.forEach((src) => {
          const img = new Image()
          img.src = src
          imgs.push(img)
        })
        const t = setInterval(() => {
          if (imgs.reduce((pre, cur) => pre + (cur.complete ? 1 : 0), 0) == n) {
            resolve(true)
            clearInterval(t)
          }
        }, 50)
      }
    })
  }

  /**
   * debounce
   * 防抖函数
   *
   * @param callback callback function
   * @param wait debounce time, unit: ms
   */
  debounce(callback: (args: unknown) => unknown, wait: number) {
    let timeId: number | null = null
    return function (this: unknown, e: unknown) {
      if (timeId != null) {
        clearTimeout(timeId)
      }

      timeId = window.setTimeout(() => {
        callback.call(this, e)
        timeId = null
      }, wait)
    }
  }

  /**
   * open url in new tab
   * 新标签页打开网站
   *
   * @param url
   */
  openUrl(url: string) {
    const a = document.createElement('a'),
      body = document.body
    a.href = url
    a.target = '_blank'
    a.style.display = 'none'
    body.appendChild(a)
    a.click()
    body.removeChild(a)
  }

  /**
   * format the zip code
   * 格式化邮政编码
   *
   * @param {string} n user inputting
   * @param {boolean} isDelete whether to press the delete key. 用户的输入状态是否为删除
   */
  formatZipCode(n: string, isDelete = false) {
    let val = n
    switch (n.length) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        break
      case 5:
        // eg: 12345 => 12345- | 12345- => 12345
        val = n + (isDelete ? '' : '-')
        break
      default:
        // eg: 12345678 => 123456-78
        val = this.formatZipCode(n.substring(0, 5)) + n.substring(5, 8)
    }
    return val
  }

  /**
   * format name
   * 格式化名称
   *
   * @param {string} n user inputting
   * @returns {string} formatted name
   */
  formatName(n: string) {
    return n.replace(/[0-9]/g, '')
  },
    /**
   * split full phone number to countryCode and number
   * eg: 573015550107 => 57, 3015550107
   */
    splitPhone(phone: string) {
        let countryCode = ''
        const phoneUtil = PhoneNumberUtil.getInstance(),
          number = phoneUtil.parseAndKeepRawInput(phone)
        countryCode = phoneUtil.getRegionCodeForNumber(number)?.toLowerCase() ?? ''
        phone = number.getNationalNumber() ? String(number.getNationalNumber()) : phone
        return [countryCode, phone]
      }
      checkEmail(email: string) {
        return EmailValidator.validate(email)
      }
      checkInputType(type: string): {
        isDelete: boolean
      } {
        const params = {
          isDelete: false
        }
        switch (type) {
          case 'deleteContentBackward':
            params.isDelete = true
            break
          default:
        }
        return params
      }
}

export default new Tools()
