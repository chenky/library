(function () {
  // 定义目标点击次数, boss每天只能沟通200家公司
  const MAX_CLICKS = 199;
  let clickCount = 0;
  // 左侧岗位列表第一个元素
  let currentItem = document.querySelector(".rec-job-list>.job-card-wrap");

  // 获取右侧“立即沟通”按钮
  function getCommunicateButton() {
    return document.querySelector(".op-btn.op-btn-chat"); // 请根据实际页面结构调整选择器
  }

  // 获取左侧岗位列表容器
  //   function getJobListContainer() {
  //     return document.querySelector(".job-list-container"); // 请根据实际页面结构调整选择器
  //   }

  // 滚动左侧岗位列表以加载更多岗位
  function scrollJobList() {
    // const jobListContainer = getJobListContainer();
    // if (jobListContainer) {
    //   jobListContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    // }
    console.log(
      "滚动加载更多岗位",
      document.querySelector("#wrap").scrollHeight
    );
    window.scrollTo(0, document.querySelector("#wrap").scrollHeight);
  }

  // 随机生成15s到30s之间的时间间隔
  function getRandomInterval() {
    return Math.floor(Math.random() * (30000 - 10000 + 1)) + 15000;
  }

  function clickJobList() {
    if (currentItem) {
      currentItem.querySelector(".job-card-box").click();
      // 右侧区域加载数据需要时间，延迟5s再点击“立即沟通”按钮
      setTimeout(() => {
        clickCommunicateButton();
        // 左侧当前岗位点击完了
        // 说明已经到列表末尾，滚动加载更多
        if (!currentItem.nextElementSibling) {
          scrollJobList();
          setTimeout(() => {
            // 滚动加载完毕，重新获取下一个岗位
            currentItem = currentItem.nextElementSibling;
          }, 3000);
        } else {
          currentItem = currentItem.nextElementSibling;
        }
      }, 3000);
    }
  }

  // 执行点击操作
  function clickCommunicateButton() {
    const communicateButton = getCommunicateButton();
    // 超过阈值则停止执行
    if (
      communicateButton &&
      communicateButton.text.trim() === "立即沟通" &&
      communicateButton.dataset.hasComunicated != 1 &&
      clickCount <= MAX_CLICKS
    ) {
      communicateButton.click();
      communicateButton.dataset.hasComunicated = 1;
      clickCount++;
      // 关闭弹窗留在当前页面
      setTimeout(() => {
        document
          .querySelector(".greet-boss-dialog .greet-boss-footer .cancel-btn")
          .click();
      }, 1000);
      console.log(`已经和第: ${clickCount}家公司沟通`);
    }
  }

  // 设置定时器，每隔随机时间执行一次点击操作
  function init() {
    if (clickCount >= MAX_CLICKS) {
      //   clearTimeout(timeId);
      console.log("已达到点击次数上限");
      return;
    }
    clickJobList();
    setTimeout(init, getRandomInterval());
  }

  init();
})();
