## linux 基础

- 1byte(1 个字节) = 8bit(0,1 二进制比特)
- ![linux ls 文件列表字段含义 list 文件列表中各个字段的含义](./vbirdimg/ls-content-meaning.png)
- [-][rwx][r-x][r--]

  - 第一个中括号代表文档类型（d：目录，-：文件，l：link file，b：存储接口设备，c：串行端口设备如键盘鼠标）
  - 第二，三，四代表拥有人权限，群组权限，其他使用者权限
  - r：读， w：写， x：执行（与能否进入目录有关）
  - r：4 w：2 x：1
    owner = rwx = 4+2+1 = 7
    group = rwx = 4+2+1 = 7
    others= --- = 0+0+0 = 0
  - chgrp :改变档案所属群组
  - chown :改变档案所属人
  - chmod :改变档案的属性、 SUID 、等等的特性

  - (1)user (2)group (3)others 三群啦!那么我们就可以藉由 u, g, o 来代表三群的属性!此外， a 则代表 all 亦即全部的 三群
  - ![改变文档权限](./vbirdimg/chmod.png)
    - chmod u=rwx,go=rx .bashrc
    - 注意喔!那个 u=rwx,go=rx 是连在一起的，中间并没有任何空格符!
    - chmod a+w .bashrc(增加 .bashrc 这个档案的每个人均可写入的权限)
    - chmod a-x .bashrc(拿掉所有人的 x 的属性)
