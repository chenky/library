/**
 * @desc 定义全局 vue 自定义指令 define global vue directives
 */
import type { App } from "vue";

export default function (app: App) {
  const cursor2endIfFocus = (e: Event) => {
    const targetInput = e.target as HTMLInputElement;
    const { value } = targetInput;
    // no value return
    if (!value) {
      return;
    }
    const valLen = value.length;
    // console.log(`len:${valLen}, start:${targetInput.selectionStart}, end: ${targetInput.selectionEnd}`)
    // if cursor in the end return
    if (
      targetInput.selectionStart === valLen &&
      targetInput.selectionEnd === valLen
    ) {
      return;
    }
    // set cursor to end when input focusin
    setTimeout(() => {
      targetInput.setSelectionRange(valLen, valLen);
      targetInput.scrollLeft = targetInput.scrollWidth;
    }, 0);
  };

  // set cursor to end when input focusin
  // 获取焦点时，光标默认移动到尾部
  app.directive("cursor2end", {
    mounted(el) {
      el.addEventListener("focusin", cursor2endIfFocus, false);
    },
    beforeUnmount(el) {
      el.removeEventListener("focusin", cursor2endIfFocus);
    },
  });
}
