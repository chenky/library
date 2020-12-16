/** $bus全局事件通信，主要用于解决任意跨级组件间 */
import Vue from 'vue'

/** 输出默认Event $bus */
const $bus = new Vue()

/** 统一记录相关Event Name，防止全局冲突 */
export const eventName = {
  addEventName1: 'addEventName1'
}

export default $bus

// 跨级组件A和组件B通讯，在两个组件都引入import $bus, { eventName } from '$utils/bus'
/**
 * 在组件A，B的mounted中注册事件： $bus.$on(eventName.addEventName1, function(params){})
 * $bus.$emit(eventName.addEventName1, params:any)
*/
