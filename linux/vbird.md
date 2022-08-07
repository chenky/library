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

• cd:变换目录
• pwd:显示目前的目录
• mkdir:建立一个新的目录 • rmdir:删除一个空的目录

![atime, ctime, mtime](./vbirdimg/atime-ctime-mtime.png)

- linux 中创建者创建文件的最高默认权限是，目录 drwxrwxrwx(d777), 文件-rw-rw-rw-
- umask [S] [权限码（即上面的 u,g,o 每组权限码和排列）]

  - umask 获取默认权限掩码，如 022 表示 g,o 要减掉可写权限。

- chattr [+-=][asacdostu] 文件或目录 此命令可以修改文件或目录的属性，比如 S：同步写入磁盘，i：不允许删除， a：只能增加不能删除
  A :当设定了 A 这个属性时，这个档案(或目录)的存取时间 atime (access) 将不可被修改，可避免例如手提式计算机容易有磁盘 I/O 错误的情况发生!
  S :这个功能有点类似 sync 的功能!就是会将数据同步写入磁盘当中! 可以有效的避免数据流失!
  a :当设定 a 之后，这个档案将只能增加数据，而不能删除，只有 root 才能设定这个属性。
  c :这个属性设定之后，将会自动的将此档案『压缩』，在读取的时候将会自动解压缩， 但是在储存的时候，将会先进行压缩后再储存(看来对于大档案似乎蛮有用的!)
  d :当 dump(备份)程序被执行的时候，设定 d 属性将可使该档案(或目录)不具有 dump 功能
  i :这个 i 可就很厉害了!他可以让一个档案『不能被删除、改名、设定连结也无法写入
  或新增资料!』对于系统安全性有相当大的帮助!
  j :当使用 ext3 这个档案系统格式时，设定 j 属性将会使档案在写入时先记录在
  journal 中!但是当 filesystem 设定参数为 data=journalled 时，由于已经设定了
  日志了，所以这个属性无效!
  s :当档案设定了 s 参数时，他将会被完全的移除出这个硬盘空间。
  u :与 s 相反的，当使用 u 来设定档案时，则数据内容其实还存在磁盘中，
  可以使用来 undeletion.
- lsattr [-aR] 档案或目录
  -a :将隐藏文件的属性也秀出来;
  -R :连同子目录的数据也一并列出来!

- SUID,SGID,Sticky bit
  • 4 为 SUID
  • 2 为 SGID
  • 1 为 Sticky bit

- whereis 与 locate 是利用数据库来搜寻数据，所以相当的快速，而且并没有实际的搜寻硬盘，比较省时间啦, find 是磁盘搜索慢呀
- which (根据 PATH，寻找『执行程序』) ， which [-a（将所有可以找到的指令均列出，而不止第一个被找到的指令名称）] command
- whereis [-bmsu] 档案或目录名
  -b :只找 binary 的档案
  -m :只找在说明文件 manual 路径下的档案
  -s :只找 source 来源档案
  -u :没有说明档的档案!
- find [PATH] [option] [action], find 使用方式
  参数:
  1. 与时间有关的参数:
     -atime n :n 为数字，意义为在 n 天之前的『一天之内』被 access 过的档案; -ctime n :n 为数字，意义为在 n 天之前的『一天之内』被 change 过状态的档案; -mtime n :n 为数字，意义为在 n 天之前的『一天之内』被 modification 过的档案; -newer file :file 为一个存在的档案，意思是说，只要档案比 file 还要新，
     就会被列出来~
  2. 与使用者或群组名称有关的参数:
     -uid n :n 为数字，这个数字是使用者的账号 ID，亦即 UID ，这个 UID 是记录在 /etc/passwd 里面与账号名称对应的数字。这方面我们会在第四篇介绍。
     -gid n :n 为数字，这个数字是群组名称的 ID，亦即 GID，这个 GID 记录在 /etc/group，相关的介绍我们会第四篇说明~
     -user name :name 为使用者账号名称喔!例如 dmtsai -group name:name 为群组名称喔，例如 users ;
     -nouser :寻找档案的拥有者不存在 /etc/passwd 的人! -nogroup :寻找档案的拥有群组不存在于 /etc/group 的档案!
     当您自行安装软件时，很可能该软件的属性当中并没有档案拥有者，
     这是可能的!在这个时候，就可以使用 -nouser 与 -nogroup 搜寻。
  3. 与档案权限及名称有关的参数:
     -name filename:搜寻文件名称为 filename 的档案;
     -size [+-]SIZE:搜寻比 SIZE 还要大(+)或小(-)的档案。这个 SIZE 的规格有:
     c: 代表 byte， k: 代表 1024bytes。所以，要找比 50KB
     还要大的档案，就是『 -size +50k 』
     -type TYPE :搜寻档案的类型为 TYPE 的，类型主要有:一般正规档案 (f),
     装置档案 (b, c), 目录 (d), 连结档 (l), socket (s),
     及 FIFO (p) 等属性。
     -perm mode :搜寻档案属性『刚好等于』 mode 的档案，这个 mode 为类似 chmod
     的属性值，举例来说， -rwsr-xr-x 的属性为 4755 !
     -perm -mode :搜寻档案属性『必须要全部囊括 mode 的属性』的档案，举例来说， 我们要搜寻 -rwxr--r-- ，亦即 0744 的档案，使用 -perm -0744， 当一个档案的属性为 -rwsr-xr-x ，亦即 4755 时，也会被列出来，
     因为 -rwsr-xr-x 的属性已经囊括了 -rwxr--r-- 的属性了。
     -perm +mode :搜寻档案属性『包含任一 mode 的属性』的档案，举例来说，我们搜寻
     -rwxr-xr-x ，亦即 -perm +755 时，但一个档案属性为 -rw-------
     也会被列出来，因为他有 -rw.... 的属性存在!
  4. 额外可进行的动作:
     -exec command :command 为其它指令，-exec 后面可再接额外的指令来处理搜寻到 的结果。
     -print :将结果打印到屏幕上，这个动作是预设动作!
  - find / -mtime 3 ，意思是说今天之前的 3*24 ~ 4*24 小时之间
  - find /home -user dmtsai 搜寻 /home 底下属于 dmtsai 的档案
  - find / -type f -name abc or find / -name "_bc_"
  - find / -perm +7000 -exec ls -l {} \;
    - 注意到，那个 -exec 后面的 ls -l 就是额外的指令，
    - 而那个 {} 代表的是『由 find 找到的内容』的意思~所以， -exec ls -l {} # 就是将前面找到的那些档案以 ls -l 列出长的数据!至于 \; 则是表示
    - -exec 的指令到此为止的意思~意思是说，整个指令其实只有在
    - -exec (里面就是指令下达) \;
    - 也就是说，-exec 最后一定要以 \; 结束才行!这样了解了吗?!
  - find / -size +1000k 找出系统中，大于 1MB 的档案
