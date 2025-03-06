# 说说 JavaScript 中的数据类型？存储上的差别？

1.JavaScript 分为两种类型，一种是基本数据类型，另一种是引用数据类型
基本数据类型有：
number，string，boolean，null，symbol，undefined，bigInt
引用数据类型有：
object,function,array, 2.基本数据类型存储在栈内存里，引用数据类型存储在堆里，每个堆内存都有对应的引用地址放在栈中

# 说说你了解的 JS 的数据结构

JS 的数据结构有，数组，栈队列，字典，列表，树，图，堆

# DOM 常见的操作有哪些？

主要有增，删，改，查，添,获
增：创建节点，document.createElement()
删：删除节点，removeChild()
改：修改节点，setAttribute()
查：查找节点，getElementById()
获：获取节点，querySelector()

# 说说你对 BOM 的理解，常见的 BOM 对象你了解哪些？

BOM 是浏览器对象模型，把浏览器当作一个对象来看待，顶级对象是 window
BOM 还有 location 对象，navigator 对象，screen 对象，history 对象
DOM 是文档对象模型，把文档当作一个对象，顶级对象是 document

# ==和===的区别，分别在什么情况使用？

==是判断值是否相等，它可能会对值进行隐式转换
注意： NaN==NaN 是 false null==underfined 是 true
===是判断两个值是否全等，它不会对值进行隐式转换，要数据类型一样，数据值一样

# typeof 与 instanceof 的区别?

typeof 是判断数据类型
instanceof 是判断对象是不是某个类型的实例，会顺着原型链上一直找，直到找到为止

# JS 原型，原型链？有什么特点？ 

每个对象拥有一个原型对象，当访问一个对象的属性时候，它不仅仅在该对象上寻找，还会在该对象的原型对象上找，直到找到为止，这就是原型链
一切对象都是继承自 Object 对象，Object 对象直接继承根源对象 null
一切的函数对象都是继承自 Function 对象
Object 对象直接继承自 Function 对象
Function 对象的**propto**会指向自己的原型对象，最终还是继承自 Object 对象
