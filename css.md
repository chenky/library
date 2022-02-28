# 代码的组织和重构策略
- 按照样式从最不精确到最精确组织CSS
  - (1) 通用样式
  - (2) 基础样式
  - (3) 组件及其容器的样式
  - (4) 结构化样式
  - (5) 功能性样式
  - (6) 浏览器特定样式（如果一定需要）
- 如单一css文件进行开发
```css
/**
 * 通用样式
 * ---------------------------------------------
 */

/**
 * 基础样式
 * ---------------------------------------------
 */

 /* 基础样式：表单 */
 /* 基础样式：标题 */
 /* 基础样式：图像 */
 /* 基础样式：列表 */
 /* 基础样式：表格 */
 /* 等等 */

 /**
 * 组件样式
 * ---------------------------------------------
 */

/* 组件样式：消息框 */
/* 组件样式：按钮 */
/* 组件样式：轮播框 */
/* 组件样式：下拉框 */
/* 组件样式：模态框 */
/* 等等 */

/**
 * 结构化样式
 * ---------------------------------------------
 */

/* 结构化样式：结算区域的布局 */1
/* 结构化样式：侧边栏的布局 */
/* 结构化样式：主区域的布局 */
/* 结构化样式：个人设置区域的布局 */
/* 等等 */

/**
 * 功能样式
 * ---------------------------------------------
 */
```
- 如多个css文件进行开发
|-css/
| |-normalizing-styles
| |    |- normalize.css
| |
| |-base-styles
| |    |- forms.css
| |    |- headings.css
| |    |- images.css
| |    |- lists.css
| |    |- tables.css
| |    |- etc.
| |
| |-component-styles
| |    |- alerts.css
| |    |- buttons.css
| |    |- carousel.css
| |    |- dropdowns.css
| |    |- modals.css
| |    |- etc.
| |
| |- structural-styles
| |    |- layout-checkout.css
| |    |- layout-sidebar.css
| |    |- layout-primary.css
| |    |- layout-settings.css
| |    |- etc.
| |
| |- utility-styles
| |    |- utility.css
| |
| |- browser-specific-styles
| |    |-ie8.css