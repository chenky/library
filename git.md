## git 技巧

- git config（git配置文件可能的路径~/.gitconfig, /etc/gitconfig）
- 修改git项目的remote url（git项目地址）
  - 使用git命令行 git remote set-url origin http://192.168.100.235:9797/john/git_test.git
  - 修改配置文件，当前项目根目录，cd .git, vim config, 找到[remote "origin"] 修改url的值即可

![](./asset/img/git-command.jpg)
![](./asset/img/git-flow.png)

- [常用 git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
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
# 查看有变更的文件
$ git status

# 查看当前分支的版本历史
$ git log

# 查看commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 查看某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 查看某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 查看某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 查看指定文件相关的每一次diff
$ git log -p [file]

# 查看过去5次提交
$ git log -5 --pretty --oneline

# 查看所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 查看指定文件是什么人在什么时间修改过
$ git blame [file]

# 查看暂存区和工作区的差异
$ git diff

# 查看暂存区和上一个commit的差异
$ git diff --cached [file]

# 查看工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 查看两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 查看今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 查看某次提交的元数据和内容变化
$ git show [commit]

# 查看某次提交发生变化的文件
$ git show --name-only [commit]

# 查看某次提交时，某个文件的内容
$ git show [commit]:[filename]
# 查看某个分支的某个文件
$ git show branchName: filepath

# 查看当前分支的最近几次提交
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

# reset之后强制推到远程分支，一定要小心使用这个，因为它将强制覆盖远程分支内容
$ git push -f

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```

- git 其他操作

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
  - 切换到 master 主分支上，$ git checkout master
  - 拉取主分支上面的代码，$ git pull origin master
  - 切换到自己的分支，$ git checkout lbh
  - 将 master 主分支上的代码合并到当前分支，$ git merge master
  - 将本地的 lbh 分支推送至远端的 lbh 分支，如果没有就新建一个，$ git push origin lbh
- 回到合并前的状态
  - git merge --abort
- 创建分支
  - 切换到 master， git checkout master, 同时获取最新代码，git pull
  - 基于当前 master 创建分支， git branch test(or git checkout -b test)
  - 当前分支推送到远程分支，git push origin test，或者 git push origin test(本地分支名):test(远程分支名)
- git 合并部分文件, 从别的分支合并部分文件到当前分支（比如feature1分支的a，b文件合并到master分支）
  - 先切换到master分支 git checkout master
  - 把feature1分支的a，b文件合并到master分支 git checkout feature1 src/view/a.vue src/view/b.vue
- git 撤销指定文件（也可以是指定文件夹）到指定版本
  - git log [filename|folder]
    - 例如： git log sompage.vue 或者 git log src/pages/somefolder
  - git checkout <commitID> <filename|folder>
    - 例如： git checkout 0e3f0331e9654f77c32be7c6080dc877ebbb94a9 src/pages/somefolder
- 文件被修改了，但未执行 git add 操作(working tree 内撤销)
  - git checkout [filename|folder|.]
- 同时对多个文件执行了 git add 操作，但本次只想提交其中一部分文件
  - git status 查看 stage 暂存区（也叫 index）中是否有待 commit 的项，即 git add 的项目
  - git reset HEAD <filename|folder>
- 文件执行了 git add 操作，但想撤销对其的修改（index 内回滚）
  - git reset HEAD <filename|folder>
  - git checkout <filename|folder>
- 修改的文件已被 git commit，但想再次修改不再产生新的 Commit
  - git add something.txt
  - git commit --amend -m "说明"
- 已在本地进行了多次 git commit 操作，现在想撤销到其中某次 Commit
  - git reset [--hard|soft|mixed|merge|keep] [commitID|HEAD]
- 如果想回滚已经提交到 master 中的文件或文件夹
  - git checkout [branchname] <tag> <filename|folder>
- 删除最后一次远程提交
  - git revert HEAD && git push origin master
  - git reset --hard HEAD^ && git push origin master -f
- 回滚到指定版本
  - git revert [commitID] [filename|folder] && git push origin master
  - git reset --hard [commitID] [filename|folder] && git push origin master -f
- build 分支某个文件夹（文件）代码覆盖开发本地分支 cql-dev 的某个文件夹（文件）
  - git checkout cql-dev
  - git rm -r someFolderName(或者手动删除某个文件夹)
  - git checkout build src/pages/somefolderName
- 撤销本地的 commit，回滚到远程分支的代码
  - git reset --hard origin/branchname
- 提交代码
  - git add .
  - git commit -m "commit information"
  - git push
- 打 tag
  - 切换到 base 分支，比如 git checkout master
  - 本地打 tag, git tag -a tagName -m "comment info"
  - 查看本地 tag， git show tagName
  - 推送到远程服务器 git push origin tagName
  - 删除本地 tag, git tag -d tagName
  - 删除远程分支，执行上面的基础上再 git push origin :refs/tags/tagName
- 查看所有分支
  - 本地分支和远程分支 git branch -a
  - 本地分支 git branch
- 本地分支关联远程分支，可以修改本地分支关联另一个远程分支
  - git branch --set-upstream-to=origin/remote-branch-name local-branch-name
- 删除分支
  - 删除本地分支
    - 当前分支不能是要删除的分支，要先切换到别的分支，比如 master 分支 git checkout master
    - 删除本地分支即可 git branch -d need-delete-branch-name
  - 删除远程分支
    - 删除本地分支基础上再执行 git push origin :test 或者直接删除远程分支 git push origin --delete test or git push -d origin branch-name
- 更新 submodule
  - 初始化本地配置文件，$ git submodule init
  - 检出父仓库列出的 commit，$ git submodule update
- [如何撤销 Git 操作](http://www.ruanyifeng.com/blog/2019/12/git-undo.html)
- 修改分支名称
  - 本地分支重命名(还没有推送到远程) 
    - git branch -m oldName newName
  - 远程分支重命名 (已经推送远程-假设本地分支和远程对应分支名称相同)
    - 重命名远程分支对应的本地分支         git branch -m oldName newName
    - 删除远程分支                      git push --delete origin oldName
    - 上传新命名的本地分支                git push origin newName
    - 把修改后的本地分支与远程分支关联      git branch --set-upstream-to origin/newName

### git 注意事项和错误及解决方案

- [git clone 提示 fatal: unable to access SSL certificate problem: self signed certificate ](https://blog.csdn.net/qibobo/article/details/43527595)
  - git clone 提示 fatal: unable to access SSL certificate problem: self signed certificate
  - 解决方法是：git config --global http.sslVerify false


## git 设置代理 git proxy
全局设置代理，取消代理
git config --global https.proxy http://127.0.0.1:1080     # 1080这个端口每个人设置不一样，看你自己设置的代理端口
git config --global https.proxy https://127.0.0.1:1080    # 1080这个端口每个人设置不一样，看你自己设置的代理端口
git config --global --unset http.proxy
git config --global --unset https.proxy


只对GitHub设置代理，取消代理
git config --global http.https://github.com.proxy socks5://127.0.0.1:7890  # 7890这个端口每个人设置不一样，看你自己设置的代理端口
git config --global --unset http.https://github.com.proxy 