// 节流
function throttle({ delay = 300, callback = () => { } }) {
    return function (...args) {
        const { isRunning } = throttle
        if (isRunning) return
        throttle.isRunning = true
        setTimeout(() => {
            callback(...args)
            throttle.isRunning = null
        }, delay)
    }
}
// 防抖
function debounce({ delay = 300, callback = () => { } }) {
    return function (...args) {
        const { lastid } = debounce
        lastid && clearTimeout(lastid)
        debounce.lastid = setTimeout(() => {
            callback(...args)
            // 释放内存
            debounce.lastid = null
        }, delay)
    }
}

function test(num) {
    console.log('this num is ', num)
}

// const debFn = debounce({ callback: test })
// debFn(11)
// debFn(12)
// debFn(13)
// setTimeout(() => {
//     debFn(14)
// }, 100)
// setTimeout(() => {
//     debFn(15)
// }, 500)
// const thFn = throttle({ callback: test })
// thFn(1)
// thFn(2)
// thFn(3)
// setTimeout(() => {
//     thFn(4)
// }, 100)
// setTimeout(() => {
//     thFn(5)
// }, 500)

// debounce({ callback: test })(1)
// debounce({ callback: test })(2)
// debounce({ callback: test })(3)

// throttle({ callback: test })(1)
// throttle({ callback: test })(2)
// throttle({ callback: test })(3)