# 说说你对盒子模型的理解？

对文档进行布局的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框和模型将所有元素表示为一个个矩形的盒子。
一个盒子由四个部分组成:content,padding,border,margin.
content:即实际内容，显示文本和图像
padding:即内边距，清除内容周围的区域，内边距是透明的，取值不能为负，受盒子的 background 属性的影响
border:即边框，围绕元素内容的边框的一条或多条线，由粗细，样式，颜色三部分组成
margin:即外边距，在元素外创建额外的空白，空白通常指不能放其他元素的区域
CSS 盒子模型通常分两种：W3C 标准盒子模型，IE 怪异盒子模型

- 标准盒子模型
  标准盒子模型是浏览器默认的盒子模型
  盒子总宽度=width+padding+border+margin
  盒子总高度=hegiht+padding+border+margin
  也就是说,width/height 只是内容高度，不包含 padding 和 border 的值
- IE 怪异盒子模型
  盒子总宽度=width+margin
  盒子总高度=height+margin
  也就是,width/height 包含了 padding 和 border 的值

# 谈谈你对 BFC 的理解？

BFC(Block Formatting Context)，即块级格式化上下文，它是页面中的一块渲染区域，并有一套属于自己的渲染规则：

- 内部的盒子会在垂直方向上一个接一个的放置
- 对于同一个 BFC 的两个相邻的盒子的 margin 会发生重叠，与方向无关
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然 BFC 目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素
  触发条件
- 根元素，即 HTML 元素
- 浮动元素：float 值为 left,right
- overflow 值不为 visible,为 auto,scroll,hidden
- display 的值为 inline-block,inltable-cell,table-caption,table,inline-table,flex,inline-flex,grid,inline-grid
- position 的值为 absolute 或 fixed
  应用场景
  - 防止 margin 重叠
  - 清楚内部浮动
  - 自适应多多栅布局

# 什么是响应式设计？响应式设计的基本原理是什么？如何做？

响应式设计是一种网络页面设计布局，页面的设计与开发应用应当根据用户行为以及设备环境（系统平台，屏幕尺寸，屏幕定向等）进行相应的响应和调整
特点：

- 同时适配 PC+平板+手机等
- 标签导航在接近手持终端设备时改变为经典的抽屉式导航
- 网站的布局会根据视口来调整模块的大小和位置
  实现方式：

```HTML
<meta name="viewport" content="width=device-width, initial-scal=1, maximum-scale=1,user-scalable=no">
```

width=device-width 是自适应手机屏幕的尺寸宽度
maximum-scale 是缩放比例的最大值
inital-scale 是缩放的初始化
user-scalable 是用户的可以缩放的操作
实现响应式布局的方式有：

- 媒体查询
  使用@media 查询可以针对不同的媒体类型定义不同的样式

```CSS
@media screen and(max-width:1920px){ ...}
@media screen (min-width:375px) and (max-width:600px){
    body{
        font-size:18px
    }
}
```

- 百分比
  通过百分比单位"%"来实现响应式的效果
  比如当浏览器的宽度或者高度发生变化时，通过百分比单位，可以使得浏览器中的组件的宽度和高度随着浏览器的变化而变化，从而实现响应式的效果
- vw/vh
  vw 表示相对视图窗口的宽度，vh 表示相对于视图窗口宽度。任意层级元素，在使用 vw 单位的情况下，1vw 等于视图宽度的百分之一
- rem
  rem 是相对于根元素 html 的 font-size 属性，默认情况下浏览器字体大小为 16px，此时 1rem=16px

响应式布局优点：

- 面对不同分辨率设备灵活性强
- 能够快捷解决多设备显示适应问题
  缺点：
- 仅使用布局，信息，框架并不复杂的部门类型网站
- 兼容各种设备工作量大，效率低下
- 代码累赘，会出现隐藏无用的元素，加载时间加长

# 元素水平垂直居中的方法有哪些？如果元素不定宽高呢？

实现元素水平垂直居中的方式：

- 利用定位+margin:auto
- 利用定位+margin:负值
- 利用定位+transform
- table 布局
- flex 布局
- grid 布局
  不知道元素宽高大小仍能实现水平垂直居中的方法有：
- 利用定位+margin:auto
- 利用定位+transform
- flex 布局
- grid 布局

总结：
根据元素标签的性质，可以分为：

- 内联元素居中布局
  水平居中
  - 行内元素可设置：text-align:center
  - flex 布局设置父元素：display:flex;justify-content:center
    垂直居中
  - 单文本父元素确认高度：height===line-height
  - 多行文本父元素确认高度：display:table-ceil;vertical-align:middle
- 块级元素居中布局
  水平居中
  - 定宽：margin:0 auto
  - 绝对定位+left:50%+margin:负自身一半
    垂直居中
  - position:absolute 设置 left,top,margin-left,margin-top(定高)
  - display:table-cell
  - transform:translate(x,y)
  - flex(不定高，不定宽)
  - grid(不定高，不定宽)，兼容性相对比较差
