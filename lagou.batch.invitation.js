/*
使用教程说明：
1. 登陆拉勾网后搜索出符合条件的人选
2. 配置你需要邀请应聘者投简历的职位id
3. 在chrome浏览器中按F12，运行如下脚本即可
备注： 
 1. 找职位很简单，鼠标放到邀请面试者投简历的位置即可知道
 2. 参数说明：
    positionId：职位id
    greetingContent：邀请时文案
特别说明：
    1. 建议时间间隔在10以上，更好的模拟真人操作，防止被拉勾网识别为机器操作，而被封了账号
    2. 同时拉勾网貌似限制一天一个账号只能邀请5000人（具体数值不确定，可以问问拉钩的客服确认一下）
    所以在搜索筛选简历阶段就要小于限制人数
    3. 脚本一旦运行，将会自动邀请所有未被邀请过的面试者，如果需要停止，只需要关闭浏览器即可
*/

const positionId = 4088632
const greetingContent = "你好，在考虑新的工作机会吗？希望可以和你进一步沟通。"
const limitCount = 1000 // 最多邀请多少人，每次执行都会重新计算

let _count = 0

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值 
}

function batchAdd() {
    if (_count >= limitCount) return
    let add2List = jQuery(".add-chat-list"),
        len = add2List.length
    for (let i = 0; i < len; i++) {

        setTimeout(function () {
            _count++
            $.ajax({
                type: "POST",
                url: "https://easy.lagou.com/im/session/create/" + add2List.eq(i).data("cuserid") + ".json",
                data: {
                    cUserId: add2List.eq(i).data("cuserid"),
                    positionId: positionId,
                    greetingContent: greetingContent,
                    inviteDeliver: true
                },
                success: function () { },
                dataType: "json"
            })


        }, i === 0 ? 0 : getRandomIntInclusive(30, 60) * 1000)
    }

}
batchAdd()
let pagination = jQuery("#pagination")
let timeId = setInterval(function () {
    let current = pagination.find(".current"),
        next = current.next()
    if (next.is(".disabled")) {
        clearInterval(timeId)
        return
    }

    batchAdd()

    next.click()
}, getRandomIntInclusive(30, 60) * 1000)