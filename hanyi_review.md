## 体验家1.7.1版本复盘2021.12.17

### 浏览器兼容方案
- https://chromium.cypress.io/
- https://www.yundongfang.com/Yun43124.html
1. 各个浏览器及版本的市场占有率
2. 以1为依据做一个渐进式兼容表格
3. 落地实施方案注意
	* A Grade标准兼容，C Grade不兼容，B Grade部分功能兼容。
	* 历史原因可能只做了新版本浏览器测试，为了达到A Grade级别兼容，测试需要一个缓冲期
	* 所有开发下载chrome85版本进行开发测试，关闭自动更新(https://chromium.cypress.io/win64/stable/85.0.4183.83)

1. css !important 禁止shiy