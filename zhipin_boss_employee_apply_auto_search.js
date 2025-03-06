(function () {
  let totalClicked = 0;
  //   let intervalId;

  function clickJobAndCloseModal() {
    const jobList = document.querySelectorAll(
      "ul.job-list-box li.job-card-wrapper"
    );
    let index = 0;

    function clickNextJob() {
      if (index < jobList.length && totalClicked < 200) {
        const jobCard = jobList[index];
        const chatButton = jobCard.querySelector(".start-chat-btn");

        if (chatButton) {
          chatButton.click();
          totalClicked++;
          console.log(`已点击 ${totalClicked} 个岗位`);

          // 等待1秒后关闭弹窗
          setTimeout(() => {
            const closeModalButton = document.querySelector(
              "div.greet-boss-header .icon-close"
            );
            if (closeModalButton) {
              closeModalButton.click();
            }
          }, 1000);

          index++;

          // 设置随机间隔后点击下一个
          const randomInterval = (Math.random() * 15 + 15) * 1000; // 15-30秒
          setTimeout(clickNextJob, randomInterval);
        } else {
          index++;
          clickNextJob(); // 尝试下一个
        }
      } else {
        // 当前页面完成或达到200个，停止或翻页
        if (totalClicked >= 200) {
          console.log("已点击超过200个岗位，停止脚本。");
          //   clearInterval(intervalId); // 停止主循环
        } else {
          goToNextPage();
        }
      }
    }

    clickNextJob();
  }

  function goToNextPage() {
    // 换到新页了，重新开始
    index = 0;
    const nextPageButton = document
      .querySelector("div.options-pages a.selected")
      .nextElementSibling();
    if (nextPageButton && !nextPageButton.classList.contains("disabled")) {
      // 检查是否禁用
      nextPageButton.click();
      // 等待页面加载完成，然后再次开始点击
      setTimeout(clickJobAndCloseModal, 5000); // 等待5秒加载
    } else {
      console.log("没有下一页了或已禁用，停止脚本。");
      //   clearInterval(intervalId); // 停止主循环
    }
  }

  // 启动主循环
  clickJobAndCloseModal();
})();
