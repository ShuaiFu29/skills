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

# CSS 选择器有哪些？优先级？哪些属性可以继承？

CSS 属性选择器常用的有：
id 选择器（#box），选择 id 为 box 的元素
类选择器（.one），选择类名为 one 的所以元素
标签选择器（div）,选择标签为 div 的所有元素
后代选择器（#box div） ，选择 id 为 box 元素内部所有 div 的元素
子选择器（.one>one_1）,选择父元素为.one 的所有.one_1 的元素
相邻同胞选择器（.one+.two）,选择紧接在.one 之后的所有.two 元素
群组选择器（div,p） ,选择 div，p 的所有元素
伪类选择器 （:link）,选择未被访问的链接
属性选择器 [attribute] 选择带有 attribute 属性的元素

优先级：
内联>ID 选择器>类选择器>标签选择器

不可继承属性：

- display
- 文本属性：vertical-align,text-decoration
- 盒子模型的属性：宽度，高度，内外边距，边框等
- 背景属性：背景图片，颜色，位置等
- 定位属性：浮动，清除浮动，定位 position 等
- 生成内容属性：content,counter-reset,counter-increment
- 轮廓样式属性：outline-style，outline-width,outline-color,outline
- 页面样式属性：size,page-break-before,page-break-after

# CSS 中，有哪些方式可以隐藏页面元素？区别？

CSS 实现隐藏元素方法有：

- display:none
- visibility:hidden
- opacity:0
- 设置 height,width 模型属性为 0
- position-absolute

# 如何实现单行/多行文本溢出的省略样式？

单行文本溢出省略

- text-overflow：规定当文本溢出是，显示省略符号来代表被修剪的文本
- white-space：设置文字在一行显示，不能换行
- overflow：文字长度超出限定宽度，则隐藏超出的内容
  overflow 设为 hidden，普通情况用在块级元素的外层隐藏内部溢出元素，或者配合下面两个属性实现文本溢出省略
  white-space:nowrap,作用是设置文本不换行，是 overflow:hidden 和 text-overflow:ellipsis 生效的基础
  text-overflow 属性值有如下：
  clip：当对象内文本溢出部分裁掉
  ellipsis：当对象内文本溢出时显示省略标记(...)
  text-overflow 只有在设置了 overflow:hidden 和 white-space:nowrap 才能够生效
  多行文本溢出省略
- 基于高度截断
  伪元素+定位
  - postition:relative 为伪元素绝对定位
  - overflow:hidden 文本溢出限定的宽度就隐藏内容
  - position:absolute 给省略号绝对定位
  - line-height:20px 结合元素高度，高度固定的情况下，设定行高，控制行数
  - height:40px 设定当前元素高度
  - ::after{} 设置省略号样式
  ```HTML
  <style>
      .deom{
        position:relative;
        line-height:20px;
        height:40px;
        overflow:hidden;
      }
      .demo::after{
        content:'...';
        position:absolute;
        bottom:0;
        right:0;
        padding:0 20px 0 10px;
      }
  </style>
  <body>
      <div class='demo'>这是一段很长的文本</div>
  </body>
  ```
  优点
  - 兼容性好
  - 响应式截断
- 基于行数截断
  - webkit-line-clamp:2 用来限制在一个块元素显示文本的行数，为了实现该效果，它需要组合其他的 WebKit 属性
  - display:-webkit-box 将对象作为弹性伸缩盒子模型显示
  - -webkit-box-orient:vertical 设置或检索伸缩盒对象的子元素排列方式
  - overflow:hidden 文本溢出限定宽度就隐藏内容
  - text-overflow:ellipsis 多文本的情况下，用省略号"..."隐藏溢出范围的文本
    利用 JS 实现文本截取

```HTML
<script>
  const textElement=document.getElementById('text')
  const maxLength=20
  const originalText=textElement.textContent
  if(originalText>maxLength){
    textElement.textContent=originalText.slice(0,maxLength)+'...'
  }
</script>
```

# 说说 flexbox（弹性盒布局模型），以及适用场景？

Flexible Box 简称 flex,意为"弹性布局"，可以简便，完整，响应式地实现各种页面布局，采用 flex 元素
属性有：

- flex-direction:决定主轴的方向（即项目的排列方向）
  - row(默认值)：主轴为水平方向，起点在左端
  - row-reverse：主轴为水平方向，起点在右端
  - column：主轴为垂直方向，起点在上沿
  - column-reverse：主轴为垂直方向，起点在下沿
- flex-wrap:弹性元素永远沿主轴排列，如果主轴排不下，通过 flex-wrap 绝对是否可以换行
  - nowrap(默认值)：不换行
  - wrap：换行，第一行在上方
  - wrap-reverse：换行，第一行在下方
- flex-flow:是 flex-direction 和 flex-wrap 的简写形式，默认值为 row nowrap
- justify-content:定义了项目在主轴上的对齐方式
  - flex-start(默认值)：左对齐
  - flex-end：右对齐
  - center：居中
  - space-between：两端对齐，项目之间的间隔都相等
  - space-around：每个项目两侧的间隔相等
- align-items:定义项目在交叉轴上如何对齐
  - flex-start：交叉轴的起点对齐
  - flex-end：交叉轴的终点对齐
  - center：交叉轴的中点对齐
  - baseline：项目的第一行文字的基线对齐
  - stretch(默认值)：如果项目未设置高度或设为 auto，将占满整个容器的高度
- align-content:定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用
  - flex-start：与交叉轴的起点对齐
  - flex-end：与交叉轴的终点对齐
  - center：与交叉轴的中点对齐
  - space-between：与交叉轴两端对齐，轴线之间的间隔平均
    分布
  - space-around：每根轴线两侧的间隔都相等
  - stretch(默认值)：轴线占满整个交叉轴

# 说说设备像素，css 像素，dpr，ppi 之间的区别？

- css 像素
  在 CSS 规范中，长度单位可以分为两类，绝对单位以及相对单位
  px 是一个相对单位，相对的是设备像素
  一般情况下，页面缩放比为 1，1 个 css 像素等于 1 个设备独立像素
  px 会受到以下因素变化而变化，每英寸像素，设备像素比
- 设备像素（物理像素）
  指设备能控制显示的最小物理单位，不一定是一个小正方形区块，也没有标准的宽高，只是用于显示丰富色彩的一个点而已，从屏幕在工厂生产出那天起，它上面的设备像素点就固定不变了
- 设备独立像素
  与设备无光的逻辑像素，代表可以通过程序控制使用的虚拟像素
- dpr（设备像素比）
  dpr=设备像素/设备独立像素
- ppi
  屏幕分辨率：x\*y
  ppi= √（x^2+y^2）/屏幕尺寸

# 说说 em/px/rem/vh/vw 区别？

相对长度单位：em,ex,ch,rem,vw,vh,vmin,vmax,%
绝对单位：cm,mm,in,px,pt,pc

- em
  em 的值并不是固定的
  em 会继承父级元素字体大小
  em 是相对长度单位，相对于当前对象内文本的字体尺寸
- rem
  相对的只是 HTML 根元素 font-size 的值
- vh,vw
  相对于视口的高度和宽度
- %
  相对于父元素的宽度和高度
