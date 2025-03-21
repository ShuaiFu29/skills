# 请描述下 vue 生命周期的理解

- 生命周期是什么？
  生命周期是指 Vue 实例从创建到销毁的过程，即指从创建，初始化数据，编译模板，挂在 DOM->渲染，更新->渲染，卸载等一系列过程，我们可以把组件比喻成工厂里面的一条流水线，每个组件都有一个完整的生命周期。
  生命周期有哪些？
  beforeCreate 组件实例被创建之初
  created 组件实例已经完全创建
  beforeMount 组件挂载之前
  mounted 组件挂载到实例上去完成
  beforeUpdate 组件数据发送变化，更新之前
  updated 组件数据更新之后
  beforeDestroy 组件实例销毁之前
  destroyed 组件实例销毁之后
  activated keep-alive 缓存的组件激活时
  deactivated keep-alive 缓存的组件停用时调用
  errorCaptured 捕获一个来自子孙组件的错误时被调用
  生命周期整体流程
  - beforeCreate->created
    - 初始化 vue 实例，进行数据观测
  - created
    - 完成数据观测，属性和方法的运算，watch，event 事件回调的配置
    - 可调用 methods 中的方法，访问和修改 data 数据触发响应式渲染 DOM，可通过 computed 和 watch 完成数据计算
    - 此时 vm.$el 并没有被创建
  - created->beforeMount
    - 判断是否存在 el 选项，若不存在则停止编译，直到调用 vm.$mount(el)才会继续编译
    - 优先级：render>template>outerHTML
    - vm.el 获取到的是挂载 DOM 的
  - beforeMount
    - 在此阶段可获取到 vm.el
    - 在此阶段 vm.el 虽已完成 DOM 初始化，但并未挂载在 el 选项上
  - beforeMount->mounted
    - 在此阶段 vm.el 完成挂载，vm.$el 生成的 DOM 替换了 el 选项所对应的 DOM
  - mounted
    - vm.el 已完成 DOM 的挂载与渲染，此刻打印 vm.$el,发现之前的挂载点及内容已被替换成新的 DOM
  - beforeUpdate
    - 更新的数据必须是被渲染在模板上的（el,template,render 之一）
    - 此时 view 层还未更新
    - 若在 beforeUpdate 中再次修改数据，不会再次触发更新方法
  - updated
    - 完成 view 层的更新
    - 若在 updated 中再次修改数据，会再次触发更新方法（beforeUpdate,updated）
  - beforeDestroy
    - 实例被销毁前调用，此时实例属性与方法仍然可访问
  - destroyed
    - 完全销毁一个实例，可清理它与其他实例的连接，解绑它的全部指令及事件监听器
  - 使用场景分析
    生命周期 描述  
    beforeCreate 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
    created 组件初始化完毕，各种数据可以使用，常用于异步数据获取
    beforeMount 未执行渲染，更新，DOM 未创建
    mounted 初始化结束,DOM 已创建，可用于获取访问数据和 DOM 元素
    beforeUpdate 更新前，可用于获取更新前各种状态
    updated 更新后所有状态已是最新状态
    beforeDestroy 销毁前，可用于一些定时器或订阅的取消
    destroyed 组件已销毁，作用同上
- 数据请求在 created 和 mounted 的区别
  created 是在组件实例一旦创建完成的时候立即调用的，这是页面 DOM 节点并未生成。mounted 是在页面 DOM 节点渲染完毕之后立即执行的。触发时机上 created 是比 mounted 要更早的，两者的相同点：都能拿到实例对象的属性和方法。
  讨论这个问题本质就是触发时机，放在 mounted 中的请求有可能导致页面闪动（因为此时页面 DOM 结构已经生成），但如果在页面加载前完成请求，则不会出现此情况。建议对页面内容改动放在 created 生命周期中。

# 双向数据绑定是什么？

- 双向绑定由三个重要部分构成
  - 数据层（Model）：应用的数据及业务逻辑
  - 视图层（View）：应用的展示效果，各类 UI 组件
  - 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来
- 理解 ViewModel
  它的主要职责就是，数据变化后更新视图，视图变化后更新数据
  它还有两个主要部分组成，监听器（Obserber，对所有数据属性进行监听），解析器（Compiler，对每个元素节点的指令进行扫描跟解析，根据指令模板替换数据，以及绑定相应的更新函数）
- 实现双向绑定
  1. new Vue() 首先执行初始化，对 data 执行响应式处理，这个过程发生 Observe 中
  2. 同时对模板执行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile 中
  3. 同时定义一个更新函数和 Watcher，将来对应数据变化时 Watcher 会调用更新函数
  4. 由于 data 的某个 key 在一个视图中可能出现多次，所有每个 key 都需要一个管家 Dep 来管理多个 Watcher
  5. 将来 data 中数据一旦发生变化，会首先找到对应的 Dep，通知所有 Watcher 执行更新函数

# Vue 组件之间的通信方式有哪些？

- 分类
  1. 父子组件之间的通信
  2. 兄弟组件之间的通信
  3. 祖孙与后代组件之间的通信
  4. 非关系组件之间的通信
- 组件间通信的方案
  1. 通过 props 传递
  2. 通过$emit 触发自定义事件
  3. 使用 ref
  4. EventBus
  5. parent 或 root
  6. attrs 与 listeners
  7. Provide 与 Inject
  8. Vuex
- props 传递数据
  适用场景：父组件传递数据给子组件
  子组件设置 props 属性，定义接收父组件传递过来的参数
  父组件在使用子组件标签中通过字面量来传递值
  ```js
  //Children.vue
  props:{
    //字符串形式
    name:String  //接收的类型参数
    //对象形式
    age:{
      type:Number,
      defaule:18    //默认值
      require:true  //age属性必须传递
    }
  }
  //Parent.vue
  <Children name='Jack' age=18 />
  ```
- $emit触发自定义事件
  适用场景：子组件传递数据给父组件
  子组件通过$emit 触发自定义事件，$emit 第二个参数为传递的数值
  父组件绑定监听器获取到子组件传递过来的参数
  ```js
  //Children.vue
  this.$emit('add',good)
  //Parent.vue
  <Children @add=cartAdd($event) />
  ```
- ref
  父组件在使用子组件的时候来设置 ref
  父组件通过设置子组件 ref 来获取数据
  ```js
  //Parent.vue
  <Children ref="foo" />;
  this.$ref.foo; //获取子组件实例，通过子组件实例我们就能拿到对应的数据
  ```
- EventBus
  使用场景：兄弟组件传值
  创建一个中央事件总线 EventBus
  兄弟组件通过$emit触发自定义事件，$emit 第二个参数为传递的数值
  另一个兄弟组件通过$on 监听自定义事件
  ```js
  //创建一个中央时机总线类
  class Bus{
    constructor(){
      this.callbaks={}  //存放事件的名字
    }
    $on(name,fn){
      this.callbacks[name]=this.callbacks[name]||[]
      this.callbacks[name].push(fn)
    }
    %emit(name,age){
      if(this.callbacks[name]){
        this.callbacks[name].forEach((cb)=>cb(args))
      }
    }
  }
  //main.js
  Vue.prototype.$bus=new Bus()  //将$bus挂载到vue实例的原型上
  Vue.prototype.$bus=new Vue()  //Vue已经实现了Bus的功能
  //Children1.vue
  this.$bus.$emit('foo')
  //Children2.vue
  this.$bus.$on('foo',this.handle)
  ```
- parent,root
  通过共同祖辈$parent或者$root 搭建通信桥连
  兄弟组件
  this.$parent.on('add',this.add)
  另一个兄弟组件
  this.$parent.$emit('add')
- attrs,listeners
  适用场景：祖先传递数据给子孙
  设置批量向下传属性$attrs和$listeners
  包含了父级作用域中不作为 prop 被识别（且获取）的特性绑定（class 和 style 除外）
  可以通过 v-bind='$attrs'传入内部组件
  ```js
  //child:并未在props中声明foo
  <p>{{$attrs.foo}}</p>
  //parent
  <HelloWorld foo='foo' />
  //给Grandson隔代传值，communication/index.vue
  <Child2 msg='lalala' @some-event='onSomeEvent'/>
  //Child2做展开
  <Grandson v-bind='attrs' v-on='$listeners' />
  //Grandson
  <div @click="$emit('some-event','msg from grandson')">{{msg}}</div>
  ```
- provide 与 inject
  在祖先组件定义 provide 属性，返回传递的值
  在后代组件通过 inject 接收组件传递过来的值
  ```js
  //祖先组件
  provide(){
    return{
      foo:'foo'
    }
  }
  //后代组件
  inject:['foo'] //获取到祖先组件传递过来的值
  ```
- vuex
  适用场景：复杂关系的组件数据传递
  Vuex 作用相当于一个用来存储共享变量的容器
  state 用来存放共享变量的地方
  getter，可以增加一个 getter 派生状态，（相对于 store 中的计算属性），用来获得共享变量的值
  mutations 用来存放修改 state 的方法
  actions 也是用来存放修改 state 的方法，不过 action 是在 mutations 的基础上进行。常用来做一些异步操作
- 小结
  - 父子关系组件数据传递选择 props 与$emit 进行传递，也可以选择 ref
  - 兄弟关系的组件数据传递可以选择$bus，其次可以选择$parent 进行传递
  - 祖先与后代组件数据传递可以选择 attrs 与 listeners 或者 Provide 与 Inject
  - 复杂关系的组件数据传递可以通过 vuex 存放共享的变量

# 为什么 data 属性是一个函数而不是一个对象？

- 实例和组件定义 data 的区别
  vue 实例的时候定义 data 属性既可以是一个对象，也可以是一个函数
  ```js
  const app=new Vue({
    el:'#app',
    //对象格式
    data:{
      foo:'foo'
    },
    //函数格式
    data(){
      return {
        foo:'foo'
      }
    }
  })
  //组件中定义data属性，只能是一个函数
  //如果为组件data直接定义为一个对象
  Vue.component('component1',{
    template:`<div>组件</div>`
    data:{
      foo:'foo'
    }
  })
  //则会得到警告信息
  //警告说明：返回data应该是一个函数在每一个组件实例中
  ```
- 组件 data 定义函数与对象的区别

  ```js
  //定义data属性，采用对象的形式
  function Component() {}
  Component.prototype.data = {
    count: 0,
  };
  //创建两个组件实例
  const componentA = new Component();
  const componentB = new Component();
  //修改componentA组件data属性的值，componentB中的值也发生了改变
  console.log(componentB.data.count); //0
  componentA.data.count = 1;
  console.log(componentB.data.count); //1
  //产生这样的原因这是两者共用了同一个内存地址，componentA修改的内容，同样对componentB产生了影响
  //如果我们采用函数的形式，则不会出现这样情况（函数返回的对象内存地址并不相同）
  function Component() {
    this.data = this.data();
  }
  Component.prototype.data = function () {
    return {
      count: 0,
    };
  };
  //修改componentA组件data属性的值，componentB中的值不受影响
  console.log(componentB.data.count); //0
  componentA.data.count = 1;
  console.log(componentB.data.count); //0
  //vue组件可能会有很多个实例，采用函数返回一个全新data形式，使每个实例对象的数据不会受到其他实例对象数据的污染
  ```

- 结论
  根实例对象 data 可以是对象也可以是函数（根实例是单例），不会产生数据污染情况
  组件实例对象 data 必须为函数，目的是为了防止多个组件实例对象之间共用一个 data，产生数据污染。采用函数形式，initData 时会将其作为工厂函数都会返回全新 data 对象

# v-if 和 v-for 的优先级是什么？

v-for 优先级是比 v-if 高
在进行 if 判断的时候，v-for 是比 v-if 先进性判断
主要事项：

1. 永远不要把 v-if 和 v-for 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
2. 如果避免出现这种情况，则在外层嵌套 template（页面渲染不生成 DOM 节点），在这一层进行 v-if 判断，然后再内部进行 v-for 循环
3. 如果条件出现在循环内部，可通过计算属性 computed 提前过滤掉那些不需要显示的项

# v-show 和 v-if 有什么区别？使用场景分别是什么？

- 共同点
  作用效果是相同的，都能控制元素在页面是否显示，在语法上也是相同的
  当表达式为 true 的时候，都会占据页面的位置
  当表达式都为 false 时，都不会占据页面的位置
- 区别
  控制手段不同：v-show 隐藏则是为该元素添加 css 样式 display:none,DOM 元素依然还在。v-if 显示隐藏是将 DOM 元素整个添加或删除
  编译过程不同：v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件，v-show 只是简单的基于 css 切换
  编译条件不同：v-if 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染。v-show 有 false 变为 true 的时候不会触发组件的生命周期。v-if 由 false 变为 true 的时候，触发组件的 beforeCreate，create,beforeMount,mounted 钩子，由 true 变为 false 的时候触发组件的 beforeDestory,destoryed 方法
  性能消耗：v-if 有更高的切换消耗，v-show 有更高的初始渲染消耗
- 使用场景
  v-if 与 v-show 都能控制 DOM 元素在页面的显示
  v-if 相比 v-show 开销更大（直接操作 DOM 节点增加与删除）
  如果需要频繁的切换，则使用 v-show 较好
  如果在运行时条件很少改变，则使用 v-if 较好

# 你知道 vue 中 key 的原理吗？说说你对它的理解

- Key 是什么
  key 是给每一个 vnode 的唯一 id，也是 diff 的一种优化策略，可以根据 key，更准确，更快的找到对应的 vnode 节点
- 设置 key 值一定能提高 diff 效率吗？
  其实不然，文档明确表示：
  当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示一被渲染过的每个元素
  这个默认的模式是高效的，但是只适用于不依赖子组件或临时 DOM 状态（例如：表单输入值）的列表渲染输出

# 说说你对 vue 的 mixin 的理解，有什么应用场景？

- mixin 是什么
  Mixin 是面向对象程序设计语言中的类，提供了方法的实现。其他类可以访问 mixin 类的方法而不必成为其子类
  Mixin 类通常作为功能模块使用，在需要该功能时“混入”，有利于代码复用右避免了多继承的复杂
- Vue 中的 mixin
  mixin（混入），提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能
  本部其实就是一个 js 对象，它可以包含我们组件中任意功能选项，如 data，components，methods，created，computed 等
  我们只要将共用的功能以对象的方式传入 mixins 选项中，当组件使用 mixins 对象时所有 mixins 对象的选项都将被混入该组件本身的选项中来
  在 Vue 中我们可以局部混入和全局混入
- 局部混入
  定义一个 mixin 对象，有组件 options 的 data，methods 属性
  ```js
  const myMixin = {
    created: function () {
      this.hello();
    },
    methods: {
      hello: function () {
        console.log("hello from mixin!");
      },
    },
  };
  //组件通过mixins属性调用mixin对象
  Vue.component("componentA", {
    mixins: [myMixin],
  });
  //该组件在使用的时候，混入了mixin里面的方法，在自动执行created生命钩子，执行hello方法
  ```
- 全局混入
  通过 Vue.mixin()进行全局混入
  ```js
  Vue.mixin({
    created: function () {
      console.log("全局混入");
    },
  });
  ```
- 注意事项  
  当组件存在与 mixin 对象相同的选项的时候，进行递归合并的时候组件的选项会覆盖 mixin 的选项
  但是如果相同选项为生命周期钩子的时候，会合并成一个数组，先执行 mixin 的钩子，再执行组件的钩子

# Vue 常用的修饰符有哪些有什么应用场景？

- 表达修饰符
  关于表单的修饰符有如下：
  - lazy
  - trim
  - number
- 事件修饰符
  - stop
  - prevent
  - self
  - once
  - capture
  - passive
  - native
- 鼠标按钮修饰符
  - left 左键点击
  - right 右键点击
  - middle 中间点击
- 键盘修饰符
- v-bind 修饰符
  - async
  - prop
    -camel
- 应用场景
  - .stop 阻止事件冒泡
  - .native 绑定原生事件
  - .once 事件只执行一次
  - .self 将事件绑定在自身身上，相当于阻止事件冒泡
  - .prevent 阻止默认事件
  - .caption 阻止事件捕获
  - .once 只触发一次
  - .keyCode 监听特定键盘按下
  - .right 右键

# Vue 中的$nextTick 有什么作用？

- NextTick 是什么
  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
  可以理解为，Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue 将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新
- 为什么要有 NextTick
  ```js
  {
    {
      num;
    }
  }
  for (let i = 0; i < 100000; i++) {
    num = i;
  }
  ```
  如果没有 NextTick 更新机制，那么 num 每次更新值都会触发视图更新（上面这段代码也就是会更新 10 万次视图），有了 NextTick 机制，只需要更新一次，所有 NextTick 本质是一种优化策略
- 使用场景
  如果想要在修改数据后立即得到更新后的 DOM 结构，可以使用 Vue.nextTick()
  第一个参数为：回调函数（可以获取最近得到 DOM 结构）
  第二个参数为：执行函数上下文
  ```js
  //修改数据
  vm.message='修改后的值'
  //DOM还没有更新
  console.log(vm.$el.textContent)  //原始的值
  Vue.nextTick(function(){
    //DOM更新了
    console.log(vm.$el.textContent) //修改后的值
  })
  //组件内只有vm.$nextTick()实例方法只需要通过this.$nextTick(),并且回调函数中的this将自动绑定到当前的Vue实例上
  this.message='修改后的值'
  console.log(this.$el.textContent) //=>'原始的值'
  this.$nextTick(function(){
    console.log(this.$el.textContent) //=>'修改后的值'
  })
  $nextTick()会返回一个Promise对象，可以是用async/await完成相同作用的事情
  this.message='修改后的值'
  console.log(this.$el.textContent)  //=>'原始的值'
  await this.$nextTick()
  console.log(this.$el.textContent)  //=>'修改后的值'
  ```

# Vue 实例挂载的过程？

- new Vue()的时候会调用\_init 方法
  - 定义$set,$get,$delete,$watch 等方法
  - 定义$on,$off,$emit 等事件
  - 定义\_update,$forceUpdate,$destory 生命周期
- 调用$mount 进行页面的挂载
- 挂载的时候主要是通过 mountComponent 方法
- 定义 updateComponent 更新函数
- 执行 render 生成虚拟 DOM
- \_update 将虚拟 DOM 生成真实 DOM 结构，并且渲染到页面中

# 你理解 vue 的 diff 算法？

- 是什么
  diff 算法是一种通过同层的树节点进行比较的高效算法
  特点：
  1. 比较只会在同层级进行，不会跨层级比较
  2. 在 diff 比较的过程中，循环从两边向中间比较
     diff 算法在很多场景都有应用，在 vue 中，作用于虚拟 DOM 渲染成真实的 DOM 的新旧 vnode 节点进行比较
- 比较方式
  diff 整体策略为：深度优先，同层比较
  1. 比较只会在同层级进行，不会跨层级比较
  2. 比较过程中，循环从两边向中间收拢

# Vue 中组件和插件有什么区别？

- 组件是什么？
  组件是把图形，非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在 vue 中每一个.vue 文件都可以视为一个组件
  组件的优势：
  - 降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历，时间范围等组件作具体的实现
  - 调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能快速定位，是因为每个组件之间低耦合，职责单一，所有逻辑会比分析整个系统要简单
  - 提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所有对代码进行优化可获得系统的整体升级
- 插件是什么？
  插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制
  - 添加全局方法或属性。如：vue-custom-element
  - 添加全局资源：指令/过滤器/过度等。如：vue-touch
  - 通过全局混入来添加一些组件选项。如：vue-router
  - 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现
  - 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如：vue-router
- 两种的区别
  - 编写形式
    编写一个组件，可以有很多方式，我们最常见的就是 vue 单文件的这种格式，每一个.vue 文件我们可以看成是一个组件
    ```Vue
    <template>
    </template>
    <script>
      export default{
        ...
      }
    </script>
    <style>
    </style>
    ```
    我们该可以通过 template 属性来编写一个组件，如果组件内容多，我们可以在外部定义 template 组件内容，如果组件内容并不多，我们可直接写在 template 属性上
    ```js
    <template id='testComponent'>  //组件显示的内容
      <div>component!</div>
    <template>
    Vue.component('componentA',{
      template:'#testComponent'
      template:`<div>component</div>` //组件内容少可以通过这种形式
    })
    ```
    编写插件，vue 插件的实现应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
    ```js
    MyPlugin.install=function(Vue,options){
      //1.添加全局方法或property
      Vue.myGlobalMethod=function(){
        //逻辑...
      }
      //2.添加全局资源
      Vue.directive('my-directive',{
        bind(el,binding,vnode,oldVnode){
          //逻辑...
        }
        ...
      })
      //3.注入组件选项
      Vue.mixin({
        created:function(){
          //逻辑...
        }
        ...
      })
      //4.添加实例方法
      Vue.prototype.$myMethod=function(methodOptions)【
      //逻辑...
    }
    ```
  - 注册形式
    - 组件注册
      vue 组件注册主要分为全局注册与局部注册
      全局注册通过 Vue.component 方法，第一个参数为组件的名称，第二个参数为传入的配置项
      ```js
      Vue.component("my-component-name", {
        /*...*/
      });
      ```
      局部注册只需要在用到的地方通过 components 属性注册一个组件
      ```js
      const component1={...} //定义一个组件
      export defalut{
        components:{
          component1  //局部注册
        }
      }
      ```
    - 插件注册
      插件的注册通过 Vue.use()的方式进行注册（安装），第一个参数为插件的名字，第二个参数是可选择的配置项
      ```js
      Vue.use(插件名字，{/*...*/})
      ```
      注意的是：
      注册插件的时候，需要在调用 new Vue() 启动应用之前完成
      Vue.use 会自动阻止多次注册相同插件，只会注册一次
  - 使用场景
    组件(Component) 是用来构成你的 App 的业务模块，它的目标是 App.vue
    插件(Plugin) 是用来增强你的技术栈的功能模块，它的目标是 Vue 本身
    插件就是指对 Vue 的功能的增强或补充

# Vue 项目中你是如何解决跨越的呢？

- 跨越是什么？
  跨越本质是浏览器基于同源策略的一种安全手段
  同源策略是一种约定，它是浏览器最核心也是最基本的安全功能
  所谓同源具有以下三个相同点
  协议相同
  主机相同
  端口相同
  反之非同源请求，也就是协议，端口，主机其中一项不相同的时候，就会产生跨域
  一定要注意跨越是浏览器的限制，你用抓包工具抓取接口数据，是可以看到接口已经把数据返回回来了，只是浏览器的限制，你获取不到数据。用 postman 请求接口能够请求到数据。这些再次印证了跨越是浏览器的限制
- 如何解决？
  解决跨越的方法有很多，下面列举三种：
  - JSONP
  - CORS
    CORS(跨越资源共享)是一个系统，它由一系列传输的 HTTP 头组成，这些 HTTP 头决定浏览器是否阻止前端 JS 代码获取跨越请求的响应
  - Proxy
    Proxy 也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。一些网关，路由器等网络设备具备网络代理功能。一般认为代理服务有利于保障网络终端的隐私或安全，防止攻击
