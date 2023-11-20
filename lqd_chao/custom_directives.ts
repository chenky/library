/**
 * @desc 定义全局 vue 自定义指令 define global vue directives, vue自定义指令，vue3自定义指令
 * vue3+vite中模版中引入图片自定义指令
 * 输入框自动聚焦，输入框自动focus，input focus
 */
import type { App } from 'vue'

export default function (app: App) {
  // picture adaptation
  // 图片适配
  const is2x = window.devicePixelRatio && window.devicePixelRatio > 1.5
  app.directive('img', {
    created(el, binding) {
      const suffix = (is2x ? '@2x' : '') + '.png'
      // binding.value: image name
      const src = new URL(`../assets/images/${binding.value + suffix}`, import.meta.url).href
      if (binding.arg == 'bg') {
        el.style.backgroundImage = `url(${src})`
      } else {
        el.src = src
      }
    }
  })

  // focus 聚焦输入框
  let inputFocusTimeout: number | null = null
  function inputFocus(this: HTMLInputElement) {
    if (inputFocusTimeout) clearTimeout(inputFocusTimeout)
    inputFocusTimeout = window.setTimeout(() => {
      const clientHeight = window.innerHeight
      const top = this.getBoundingClientRect().top
      const height = this.offsetHeight
      const diff = clientHeight - (top + height)
      if (diff < 0) {
        this.scrollIntoView(true)
      }
    }, 200)
  }
  function inputBlur(this: HTMLInputElement) {
    this.removeEventListener('focus', inputFocus)
    if (inputFocusTimeout) clearTimeout(inputFocusTimeout)
  }
  app.directive('input-focus', {
    mounted(el) {
      el.addEventListener('focus', inputFocus, false)
      el.addEventListener('blur', inputBlur, false)
    },
    beforeUnmount(el) {
      inputBlur.bind(el)()
      el.removeEventListener('blur', inputBlur)
    }
  })
}
