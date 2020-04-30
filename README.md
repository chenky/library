## 技术

### 程序员必读书目（单）
- https://baijiahao.baidu.com/s?id=1564092687048361&wfr=spider&for=pc
- https://www.jianshu.com/p/963973835545

### [深入浅出nodejs作者前端技能汇总，包括推荐的书籍](https://github.com/JacksonTian/fks)

### [2020年3月最受欢迎的10个CSS项目](https://mp.weixin.qq.com/s/v9K_NzMCofqZrwQ8WMCV0A)

## 唤醒qq聊天窗口
  window.open(`http://wpa.qq.com/msgrd?v=3&uin=${qidianNumber}&site=qq&menu=yes`)
  移动端h5： window.open(`mqqwpa://im/chat?chat_type=wpa&uin=${qqNumber}&version=1&src_type=web&web_src=oicqzone.com`);
 window.open(`tencent://Message/?Uin=${qidianNumber}&amp;websiteName=qtrade.com.cn&amp;Menu=yes`)

## git技巧
![](./asset/img/git-command.jpg)
![](./asset/img/git-flow.png)
- [常用git命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- 删除文件
```bash
# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```
- 查看信息
```bash
# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog
```
- 撤销 回滚
```bash
# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```
- git其他操作
```bash
# 生成一个可供发布的压缩包
$ git archive
```

- [远程覆盖本地](https://blog.csdn.net/lorkoy/article/details/50404407)
  - git fetch --all
  - git reset --hard origin/master
- git vsCode git 操作提示 Permission denied, please try again
 ssh-add ~/.ssh/id_rsa
- 合并代码
  - 提交修改代码到本地仓库，$ git commit -m "修改的东西的描述"
  - 切换到master主分支上，$ git checkout master
  - 拉取主分支上面的代码，$ git pull origin master
  - 切换到自己的分支，$ git checkout lbh
  - 将master主分支上的代码合并到当前分支，$ git merge master
  - 将本地的 lbh 分支推送至远端的 lbh分支，如果没有就新建一个，$ git push origin lbh
- 创建分支
  - 切换到master， git checkout master, 同时获取最新代码，git pull
  - 基于当前master创建分支， git branch test(or git checkout -b test)
  - 当前分支推送到远程分支，git push origin test，或者git push origin test(本地分支名):test(远程分支名)
- 提交代码
  - git add .
  - git commit -m "commit information"
  - git push
- 打tag
  - 切换到base分支，比如 git checkout master
  - 本地打tag, git tag -a tagName -m "comment info"
  - 查看本地tag， git show tagName
  - 推送到远程服务器 git push origin tagName
  - 删除本地tag, git tag -d tagName
  - 删除远程分支， git push origin :refs/tags/tagName
- 查看所有分支
  - 本地分支和远程分支 git branch -a
  - 本地分支 git branch
- 删除分支
  - 删除本地分支
    - 当前分支不能是要删除的分支，要先切换到别的分支，比如master分支 git checkout master
    - 删除本地分支即可 git branch -d need-delete-branch-name
  - 删除远程分支
    - git push origin :test  or  git push origin --delete test
- 更新submodule
  -  初始化本地配置文件，$ git submodule init
  -  检出父仓库列出的commit，$ git submodule update

### git注意事项和错误及解决方案
- [git clone 提示 fatal: unable to access  SSL certificate problem: self signed certificate  ](https://blog.csdn.net/qibobo/article/details/43527595)
  - git clone 提示 fatal: unable to access  SSL certificate problem: self signed certificate  
  - 解决方法是：git config --global http.sslVerify false
- 

## 缓存
- [前端清理缓存](https://stackoverflow.com/questions/49547/how-do-we-control-web-page-caching-across-all-browsers)
  ```<meta charset='UTF-8'>
        <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Cache-Control" content="max-age=0, no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="-1">
- nginx配置缓存
  ```location ~* \.(?:html|htm)$ {  
   add_header "Cache-Control" "max-age=0, no-cache, no-store, must-revalidate";
  add_header "Pragma" "no-cache";
  add_header "Expires" "-1";
}

### 搜索技巧
- 搜索关键字，指南，流程，教程

## 教程
- [人工智能简介](https://course.elementsofai.com/)


## 阮一峰技术博客
- 事实上，今天任何一家公司都可以自建像亚马逊一样的网店。在美国，你可以使用 Shopify 建店，在社交媒体做广告，使用 Stripe 处理支付，通过 ShipBob 管理库存和订单，用 Returnly 处理退货，用 DarkStore 提供当日送货服务。这些 SaaS 服务的成本只需要几百美元，让你可以向消费者提供跟亚马逊一样的服务。
- [playwright](https://github.com/microsoft/playwright)
  - 一个支持 Chrome、Safari、Firefox、Edge 的浏览器自动化工具，即一个自动化脚本对所有浏览器都有效，由 Puppeteer 团队出品。
- [开源的短链接生成器，基于 Node.js，允许自定义短链接、设置链接密码，还提供访问统计](https://github.com/thedevs-network/kutt)
- [一个 JavaScript 语言的 OCR 库，可以在网页运行，识别图片中的文字。它支持100多种文字，包括中文。](https://github.com/naptha/tesseract.js)
  - [这里还有一篇教程，介绍 Python 语言如何使用这个库。](https://nanonets.com/blog/ocr-with-tesseract/) 
- [中文的密码学入门介绍，向非专业读者介绍了密码学的基本概念，没有涉及到技术细节。](https://learning.nervos.org/crypto-block/0-intro.html)
- [顶部进度条,一个网页顶部进度条的 JS 库](https://github.com/vortesnail/qier-progress)
- [一个基于 Python 的开源金融数据接口库，目的是实现股票、期货等金融产品从数据采集、数据清洗到数据下载的工具，满足金融数据科学家、数据科学爱好者在数据获取方面的需求](https://github.com/jindaxiang/akshare)
- [HTML 源码转换为 Markdown 的 JS 库，可以定制规则](https://github.com/mdnice/sitdown)
- [一个在线生成数学函数图形的网页小工具](https://helloacm.com/tools/math-plot-graph/)
- [一个 Python 代码的加密器，可以防止别人看脚本源码](https://github.com/ga0/pyprotect)
- [es2020新特性](https://alligator.io/js/es2020/)
- [前端面试复习笔记](https://github.com/CavsZhouyou/Front-End-Interview-Notebook)
- [无线电波的历史](http://www.ruanyifeng.com/blog/2006/08/the_story_of_marconi.html)
- [现代医学200年，新英格兰医学杂志](http://www.ruanyifeng.com/blog/2012/01/modern_medicine_timeline.html)
- [如何用网页脚本追踪用户](http://www.ruanyifeng.com/blog/2019/04/user-tracking.html)
- [只需要5秒的真人语音，就可以提取语音特征，然后任何文本都可以转成该人的语音](https://google.github.io/tacotron/publications/speaker_adaptation/)
- [浏览器禁用三方 Cookie 的分析](https://juejin.im/post/5e97124df265da47b27d97ff)
- [一个纯 CSS 库，提供各种形状的背景图案](https://bansal.io/pattern-css)
- [另一个纯 CSS 库，提供各种形状的背景图案](http://www.heropatterns.com/)
- [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
- [浏览器数据库indexedDB](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)
- [Node 调试工具入门教程,chrome浏览器调试node](http://www.ruanyifeng.com/blog/2018/03/node-debugger.html)
- [node事件循环 node-event-loop](http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html)
- [Ramda 函数库参考教程](http://www.ruanyifeng.com/blog/2017/03/ramda.html)
- [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [Node.js 命令行程序开发教程](http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)
- [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
- [关于Unix哲学,软件开发的原则](http://www.ruanyifeng.com/blog/2009/06/unix_philosophy.html)
- [互联网协议五层架构1](http://www.ruanyifeng.com/blog/2012/05/internet_protocol_suite_part_i.html)
- [互联网协议五层架构2](http://www.ruanyifeng.com/blog/2012/06/internet_protocol_suite_part_ii.html)
- 代码抽象原则
  - 一个函数或模块只做一件事情，复杂功能通过组合实现，少用继承
  - 不要重复自己，抽象化
  - 不要复杂化，尽快让软件运行起来
  - 2，3有冲突，可行性方案是重复三次以上才抽象化提取封装
- [DNS 原理入门 DNS查找](http://www.ruanyifeng.com/blog/2016/06/dns.html)
- [黑白照片变成彩色照片，照片着色，照片彩色化](https://colorize.cc/)
- [语种名称代码,语言包标识](http://www.ruanyifeng.com/blog/2008/02/codes_for_language_names.html)
- [OWASP安全开发指南](https://github.com/OWASP/DevGuide)
- [HTML Email 编写指南, 邮件中潜入html](http://www.ruanyifeng.com/blog/2013/06/html_email.html)
- [css动画介绍](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
- [理解OAuth 2.0授权](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)
- [随机输出格言](http://www.ruanyifeng.com/blog/2015/04/fortune.html)
- [git flow git提交流程](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html)
- [Emoji简介，Emoji编程，Emoji嵌入](http://www.ruanyifeng.com/blog/2017/04/emoji.html)


## 前端开发

### 技术博客
- [倔金腾讯IVWEB团队](https://juejin.im/user/5a9f77666fb9a028c14a01eb)
- [知乎purerender](https://zhuanlan.zhihu.com/purerender)
- [知乎精读前端](https://zhuanlan.zhihu.com/FrontendPerusal)

### 工具类及工程化类
- gitlab
- jinkens
- webpack
- react react-router react-redux mobx
- 装饰器
- [git学习路径](https://learngitbranching.js.org/)
- [nginx安装配置](https://www.runoob.com/linux/nginx-install-setup.html)
- [跨平台错误日志系统sentry]
  - [官网](https://sentry.io/welcome/)
  - [github](https://github.com/getsentry/sentry-javascript)

### webapi
- [javascript event keycodes事件按键码值](http://keycode.info/)

### [配置html5 history模式路由](https://router.vuejs.org/zh/guide/essentials/history-mode.html)
- Apache
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
- nginx
```
location / {
  try_files $uri $uri/ /index.html;
}
```
- 原生node.js
```node
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```

### 类库
- [一个实现各类图形的 CSS 库](https://github.com/chokcoco/magicCss)
- custom react hooks
  - [精度Function Component](https://github.com/dt-fe/weekly/blob/v2/104.%E7%B2%BE%E8%AF%BB%E3%80%8AFunction%20Component%20%E5%85%A5%E9%97%A8%E3%80%8B.md)
  - [react use](https://github.com/chenky/react-use)
  - [@umijs/hooks](https://github.com/umijs/hooks)
    - [unijs/hooks教程说明](https://zhuanlan.zhihu.com/p/94030173)
- [128.精读《Hooks 取数 - swr 源码》.md](https://github.com/dt-fe/weekly/blob/v2/128.%E7%B2%BE%E8%AF%BB%E3%80%8AHooks%20%E5%8F%96%E6%95%B0%20-%20swr%20%E6%BA%90%E7%A0%81%E3%80%8B.md)
  - [github address](https://github.com/zeit/swr)

### 前端进阶知识点
1. [惰性求值](https://zhuanlan.zhihu.com/p/26535479)
2. curry 化
3. 闭包
4. 高阶函数
5. 函数式编程
6. compose
7. 中间件
8. 依赖注入
9. flex和grid
10. 框架类库源码分析
11. [精读《Vue3.0 Function API》](https://zhuanlan.zhihu.com/p/71667382)
12. [精读《Function Component 入门》](https://zhuanlan.zhihu.com/p/67087685)
13. [一篇看懂 React Hooks](https://zhuanlan.zhihu.com/p/50597236)， [精读《React Hooks 最佳实践》](https://zhuanlan.zhihu.com/p/81752821)
14. promise, generator, async await
15. 数据结构与算法
16. [how to build your own react](https://pomb.us/build-your-own-react/)

### 前端面试题
- [The-Best-Frontend-JavaScript-Interview-Questions](https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-%28written-by-a-Frontend-Engineer%29)

### 错误日志监控
- [跨平台错误日志系统sentry]
  - [官网](https://sentry.io/welcome/)
  - [github](https://github.com/getsentry/sentry-javascript)

### [移动端调试工具](https://github.com/dt-fe/weekly/blob/v2/011.%E7%B2%BE%E8%AF%BB%E5%89%8D%E7%AB%AF%E8%B0%83%E8%AF%95%E6%8A%80%E5%B7%A7.md)
- [eruda]
  - [官网](https://eruda.liriliri.io/)
  - [github](https://github.com/liriliri/eruda)

### Vue3.0
- [109.精读《Vue3.0 Function API》.md](https://github.com/dt-fe/weekly/blob/v2/109.%E7%B2%BE%E8%AF%BB%E3%80%8AVue3.0%20Function%20API%E3%80%8B.md)
- [尤雨溪上海2019.6.8vue conf](https://www.bilibili.com/video/av55553166?from=search&seid=1740725612314499650)
- [自己整理的脑图](https://naotu.baidu.com/file/9506ac745baf842d4bd035ccf367ab22)

## 终端命令
- [mac](https://www.jianshu.com/p/3291de46f3ff)
  - 批量创建文件夹，mkdir dir{1..20} 批量创建文件夹名字是dir1-dir20
  - 批量创建文件， touch file{..20}.js 批量创建文件名字是file1.js-file20.js
  - 批量删除空文件夹， rmdir dir{2..5} 如果非空文件夹需要使用  sudo rm -r -f dir{1..2}
  - 批量删除文件， rm file{1..5}.js
  - 单个文件重命名 mv 原名 新名， 如 mv 1.js 2.js  1.js->2.js
  - 批量重命名 for i in *.js; do mv $i ${i//.js/.html}; done
  - cd 跳转到某个目录
  - ls 查看目录下到文件

## 经济理财
- 17世纪荷兰郁金香泡沫，18世纪英国南海公司发行股票大骗局，其中大科学家牛顿就亏损了2万多英镑，相当于他10年总收入之和，1929-1933美国经济大萧条，1997-1998亚洲金融危机，2000-2001年互联网金融泡沫，2007-2008次贷危机。
