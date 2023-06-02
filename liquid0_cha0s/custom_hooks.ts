/**
 * @desc 定义勾子函数 define hooks
 */
import { ref, computed, watch, onUnmounted, onScopeDispose } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useClipboard } from '@vueuse/core'
import { MIN_WIDTH } from './constants'

/**
 * js match media query like css '@media'
 * js 匹配媒体查询，像 css media 标签一样
 * @param mediaQueryString default: '(min-width: 640px)'
 */
export function useMatchMedia(mediaQueryString = `(min-width: ${MIN_WIDTH}px)`): Ref<boolean> {
  const mql = matchMedia(mediaQueryString)
  const isMatch = ref(mql.matches)
  function mediaqueryresponse(ev: MediaQueryListEvent) {
    isMatch.value = ev.matches
  }
  try {
    mql.addEventListener('change', mediaqueryresponse)
    onUnmounted(() => {
      mql.removeEventListener('change', mediaqueryresponse)
    })
  } catch (err) {
    mql.addListener(mediaqueryresponse)
    onUnmounted(() => {
      mql.addListener(mediaqueryresponse)
    })
  }
  return isMatch
}

/**
 * copy
 * 复制
 *
 * @param s string for copy
 */
interface CopyReturn {
  copy(): void
  isSupported: Ref<boolean>
  copied: ComputedRef<boolean>
}
export function useCopy(s: Ref<string>): CopyReturn {
  const {
      copy: clipboardCopy,
      isSupported,
      copied: clipboardCopied
    } = useClipboard({ source: s, legacy: true }),
    myCopied = ref(false),
    copied = computed(() => {
      return myCopied.value || clipboardCopied.value
    })
  function copy() {
    try {
      // for android webview
      const ta = document.createElement('textarea')
      ta.value = s.value ?? ''
      ta.style.position = 'absolute'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
      myCopied.value = true
      setTimeout(() => {
        myCopied.value = false
      }, 1500)
    } catch {
      clipboardCopy()
    }
  }
  return {
    copy,
    isSupported,
    copied
  }
}

/**
 * lock scroll
 * 限制滚动
 *
 * @param triggle
 */
let lockScroll = 0
export function useLockScroll(triggle: Ref<boolean> | ComputedRef<boolean>) {
  const body = document.body,
    className = 'LqdLockScroll',
    setLockScroll = (flag: boolean) => {
      if (flag) {
        lockScroll++
        if (body.classList.contains(className)) {
          return
        }
        body.classList.add(className)
      } else {
        lockScroll--
        if (lockScroll > 0) return
        body.classList.remove(className)
      }
    }

  // init
  if (triggle.value) {
    setLockScroll(true)
  }

  watch(triggle, (now) => {
    setLockScroll(now)
  })

  onScopeDispose(() => {
    lockScroll = 1
    setLockScroll(false)
  })
}

/**
 * generate z-index
 * 生成 z-index
 */
const zIndex = ref(0)
const defaultZIndex = 2000
interface ZIndexReturn {
  defaultZIndex: number
  currentZIndex: ComputedRef<number>
  nextZIndex(): number
}
export function useZIndex(): ZIndexReturn {
  const currentZIndex = computed(() => {
    return defaultZIndex + zIndex.value
  })

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    defaultZIndex,
    currentZIndex,
    nextZIndex
  }
}
