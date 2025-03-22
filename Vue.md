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

# 有写过自定义指令吗？自定义指令的应用场景有哪些？

- 如何实现？
  注册一个自定义指令有全局注册和局部注册
  全局注册主要是通过 Vue.directive 方法进行注册
  Vue.directive 第一个参数是指令的名字（不需要写上 v-前缀），第二个参数可以是对象数据，也可以是一个指令函数
  ```js
  //注册一个全局自定义指令"v-focus"
  Vue.directive('focus',{
    //当被绑定的元素插入DOM中时...
    inserted:function(el){
      //聚焦元素
      el.focus()  //页面加载完成之后自动让输入框获取到焦点的小功能
    }
  })
  //局部注册通过在组件options选项中设置directive属性
  directive:{
    focus:{
      //指令的定义
      inserted:function(el){
        el.focus() //页面加载完成之后自动让输入框获取到焦点的小功能
      }
    }
  }
  //然后你可以在模板中任何元素上使用新的v-focus propety,如下
  <input v-focus />
  ```
  自定义指令也像组件那样存在钩子函数
  - bind：只调用一次，指令第一次绑定到元素时调用。在这类可以进行一次性的初始化设置
  - inserted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）
  - update：所在组件的 vnode 更新时调用，但是可以发生在其子 vnode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
  - compoonentUpdated：指令所在组件的 vnode 及其子 vnode 全部更新后调用
  - unbind：只调用一次，指令与元素解绑时调用
    所有的钩子函数参数都有以下：
  - el：指令所绑定的元素，可以用来直接操作 DOM
  - binding：一个对象，包含以下 propety：
    - name：指令名，不包括 v-前缀
    - value：指令的绑定值，例如：v-my-directive="1+1"中，绑定值为 2
    - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用
    - expression：字符串形式的指令表达式。例如：v-my-directive="1+1"中，表达式为"1+1"
    - arg：传给指令的参数，可选。例如：v-my-directive:foo 中，参数为"foo"
    - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为{foo:true,bar:true}
  - vnode：Vue 编译生成的虚拟节点
  - oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用
    除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行

# Vue 中的过滤器了解吗？过滤器的应用场景有哪些？

- 是什么？
  过滤器（filter）是输送介质管道上不可缺少的一种装置
  过滤器实质不改变原始数据，只是对数据进行加工处理后返回过滤后的数据再进行调用处理，我们也可以理解其为一个纯函数
- 如何使用？
  vue 中的过滤器可以用在两个地方：双花括号插值和 v-bind 表达式，过滤器应该被添加再 js 表达式的尾部，由“管道”符号指示：
  ```js
  <!--在双花括号中-->>
  {{{message|capitalize}}}
  <!--在v-bind中-->
  <div v-bind:id="rawId|formatId"></div>
  ```
  局部过滤器优先于全局过滤器被调用
  一个表达式可以使用多个过滤器。过滤器之间需要用管道符"|"隔开。其执行顺序从左往右

# 说说吗对 slot 的理解？slot 使用场景有哪些？

- slot 是什么？
  在我们可以理解为 slot 在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填空（替换组件模板中 slot 位置）
- 使用场景
  如果父组件在使用到一个复用组件的时候，获取这个组件在不同的地方有少量的更改，如果重写组件是一件不明智的事情/通过 slot 插槽想组件内部指定位置传递内容，完成这个复用组件在不同场景的应用
- 分类
  - 默认组件
    子组件用<slot>标签来确定渲染的位置，标签里面可以放 DOM 结构，当父组件使用的时候没有往插槽传入内容，标签内 DOM 结构就会显示在页面
    父组件在使用的时候，直接在子组件的标签内写入内容即可
    ```vue
    子组件Child.vue
    <template>
      <slot>
        <p>插槽后背的内容</p>
      </slot>
    </template>
    父组件
    <Child>
      <div>默认插槽</div> 
    </Child>
    ```
  - 具名插槽
    子组件用 name 属性来表示插槽的名字，不传为默认值
    父组件中在使用时在默认插槽的基础上加上 slot 属性，值为子组件插槽 name 属性值
    ```vue
    子组件Child.vue
    <template>
      <slot>插槽后备的内容</slot>
      <slot name="content">插槽后备的内容</slot>
    </template>
    父组件
    <Child>
      <template v-slot:defalut>具名插槽</template>
      <!--具名插槽用插槽名做参数-->
      <template v-slot:content>内容...</template>
    </Child>
    ```
  - 作用域插槽
    子组件在作用域上绑定属性来将子组件信息传递给父组件使用，这些属性会被挂载到父组件 v-slot 接受的对象上
    父组件中在使用通过 v-slot:(简写：#)获取子组件的信息，在内容中使用
    ```vue
    子组件Child.vue
    <template>
      <slot name="footer" testProps="子组件的值">
        <h3>没传footer插槽</h3>
      </slot>
    </template>
    父组件
    <Child>
      <!--把v-slot的值指定为作用域上下文对象-->
      <template v-slot:defalut='slotProps'>
        来自子组件数据：{{sloteProps.testProps}}
      </template>
      <template #defalut='slotProps'>
        来自子组件数据：{{slotProps.testProps}}
      </template>
    </Child>
    ```
  - 小结
    v-slot 属性只能在<template>上使用，但在只有默认插槽时可以在组件标签上使用
    默认插槽名为 default，可以省略 defaul 直接 xiev-slot
    缩写为#时不能不写参数，写成#default
    可以通过解构获取 v-slot={user}，还可以重命名 v-slot='{user:newName}' 和定义默认值 v-slot="{user='默认值'}"

# 什么是虚拟 DOM？如何实现一个虚拟 DOM？说说你的思路

- 为什么要虚拟 DOM？
  DOM 是很慢的，其元素非常庞大，页面的性能问题的，大部分都是由 DOM 操作引起的
  真实的 DOM 节点，哪怕是一个最简单的 div 也包含者很多属性，操作 DOM 的代价仍然是昂贵的，频繁操作还是会出现页面卡顿，影响用户体验
- 实现虚拟 DOM 思路
  createElement 创建 vnode 的过程，每个 vnode 有 chuildren，children 每个元素也是 vnode，这样就形成了一个虚拟树结构，用于描述真实的 DOM 树结构

# Vue 项目中有封装过 axios 吗？主要是封装哪方面的？

- axios 是什么?
  axios 是一个轻量的 HTTP 客户端，基于 XMLHttpRequest 服务来执行 HTTP 请求，支持丰富的配置，支持 Promise，支持浏览器端和 node.js 端
- 为什么要封装
  随着项目规模增大，如果每发起一次 HTTP 请求，就要把这些比如设置超时时间，设置请求头，根据项目环境判断使用哪个请求地址，错误处理等等操作都要写一遍，这样重复劳动不仅浪费时间，而且让代码冗余不堪，难以维护
- 如何封装
  设置接口请求前缀：根据开发，测试，生成环境的不同，前缀需要加以区分
  请求头：来实现一些具体的业务，必须携带一些参数才可以请求（例如：会员业务）
  状态码：根据接口返回的不同 status，来执行不同的业务，这块需要和后端约定好
  请求方法：根据 get，post 等方法进行一个再次封装，使用起来更为方便
  请求拦截器：根据请求的请求头设定，来决定哪些请求可以访问
  响应拦截器：这块就是根据后端返回来的状态码判定执行不同的业务

# 是怎么处理 Vue 项目的错误的？

- 错误类型
  - 后端接口错误
    通过 axios 的 interceptor 实现网络请求的 response 先进行一层拦截
    ```js
    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status == 401) {
          router.push({ name: "Login" });
        } else {
          message.error("出错了");
          return Promise.reject(error);
        }
      }
    );
    ```
  - 代码中本身逻辑错误
    - 设置全局错误处理函数
      ```js
      Vue.config.errorHandler = function (err, vm, info) {
        //handle error
        //'info'是Vue特定的错误信息，比如错误所在的生命周期钩子
        //只在2.2.0+可用
      };
      ```
      errorHandler 指定组件的渲染和观察期间为捕获错误处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例
    - 生命周期钩子
      errorCaptured 是 2.5.0 新增的一个生命周期钩子函数，当捕获到一个来自子孙组件的错误时被调用
      基本类型
      ```js
      (err:Error,vm:Component,info:string)=>?boolean
      ```
      此钩子会受到三个参数：错误对象，发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播
- 小结
  - handleError 在需要捕获异常的地方调用，首先获取到报错的组件，之后递归查找当前组件的父组件，依次调用 errorCaptured 方法，在遍历调用完所有 errorCaptured 方法或 errorCaptured 方法有报错时，调用 globalHandleError 方法
  - globalHandleError 调用全局的 errorHandler 方法，再通过 logError 判断环境输出错误信息
  - invokeWithErrorHandling 更好的处理异步错误信息
  - logError 判断环境，选择不同的抛错方式。非生产环境下，调用 warn 方法处理错误

# 你了解 axios 的原理码？有看过它的源码码？

- axios 的使用
  ```js
  发送请求
  import axios from 'axios'
  axios(config)  //直接传入配置
  axios(url[,config]) //传入url和配置
  axios[method](url[,option]) //直接调用请求方法，传入data，url和配置
  axios.request(option) //调用reques方法
  const axiosInstance=axios.create(config) //axiosInstance也具有以上axios的能力
  axios.all([axiosInstance1,axiosInstance2]).then(axios.spread(response1,response2))  //调用all和传入sprea回调
  请求拦截器
  axios.interceptors.request.use(function (config){
    //这里写发送请求前处理的代码
    return config
  },function(error){
    //这里写发送请求错误相关代码
    return Promise.reject(error)
  })
  响应拦截器
  axios.interceptors.response.use(function (response){
    //这里写得到响应数据后处理的代码
    return response
  },function(error){
    //这里写得到错误响应处理的代码
    return Promise.reject(error)
  })
  取消请求
  //方法一
  const CancelToken=axios.CancelToken
  const source=CancelToken.source()
  axios.get('xxxx',{
    cancelToken:source.token
  })
  //取消请求（请求原因是可选的）
  source.cancel('主动取消请求')
  //方法二
  const CancelToken=axios.CancelToken
  let cancel
  axios.get('xxx',{
    cancelToken:new CancelToken(function executor(c){
      cancel=c
    })
  })
  cancel('主动取消请求')
  ```
- 实现一个简易版 axios

```js
class Axios {
  constructor() {}
  request(config) {
    return new Promise((resolve) => {
      const { url = "", method = "get", data = {} } = config;
      //发送ajax请求
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = function () {
        console.log(xhr.responseText);
        resolve(xhr.responseText);
      };
      xhr.send(data);
    });
  }
}
```

# vue 要做权限管理该怎么做？

- 是什么？
  权限是对特定资源的访问许可，所谓权限控制，也就是确保用户只能访问到被分配的资源
  而前端权限归根结底是请求的发起权，请求的发起可能有下面两种形式触发
  - 页面加载触发
  - 页面上的按钮点击触发
    总的来说，所有的请求发起都触发自前端路由或视图
    所以我们可以从这两方面入手，对触发权限的源头进行控制，最终要实现的目标是：
  - 路由方面，用户登录后只能看到自己有权访问的导航菜单，也只能访问自己有权访问的路由地址，否则将跳转 4xx 提示页
  - 视图方面，用户只能看到自己有权浏览的内容和有权操作的控件
  - 最后再加上请求控制作为最后一道防线，路由可能配置失误，按钮可能忘了加权限，这种时候请求控件可以用来兜底，越权请求将在前端被拦截
- 如何做？
  - 接口权限
    接口权限目前一般采用 jwt 的形式来验证，没有通过的话一般返回 401，跳转到登录页面重新进行登录
  - 按钮权限
    方案一：
    按钮权限可以用 v-if 判断
    但是如果页面过多，每个页面都需要获取用户权限 role 和路由表里的 meta.btnPermissions，然后再做判断
    方案二：
    通过自定义指令进行按钮权限的判断
    首先配置路由，自定义权限鉴定指令
  - 菜单权限
    菜单权限可以理解成将页面与路由进行解耦
    方案一：
    菜单与路由分离，菜单由后端返回，前端定义路由信息，全局路由守卫里做判断
    缺点：
    - 菜单需要与路由一一对应，前端添加新功能，需要通过菜单管理功能添加新的菜单，如果菜单配置的不对会导致应用不能正常使用
    - 全局路由守卫里，每次路由跳转都要做判断
      方案二
      菜单和路由都由后端返回
      前端统一定义路由组件，后端路由返回统一格式，在将后端返回路由通过 addRoutes 动态挂载之间，需要将数据处理一下，将 component 字段换为真正的组件
      如果由嵌套路由，后端功能设计的时候，需要添加相应的字段，前端拿到数据也要做相应的处理
      这种方法也会存在缺点：
    - 全局路由守卫里，每次路由跳转都要做判断
    - 前后端的配合要求更高
  - 路由权限
    方案一：
    初始化即挂载全部路由，并且在路由上标记相应的权限信息，每次路由跳转前做校验
    这种方式存在四种缺点：
    - 加载所有的路由，如果路由很多，而用户并不是所有路由都有权限访问，对性能会有影响。
    - 全局路由守卫里，每次路由跳转都要做权限判断
    - 菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
    - 菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识
      方案二：
      初始化的时候先挂载不需要权限控制路由，比如登录页，404 等错误页。如果用户通过 URL 进行强制访问，则会直接进入 404，相当于从源头上做了控制
      登录后，获取用户权限信息，然后筛选有权访问的路由，在全局路由守卫里进行调用 addRoutes 添加路由
      按需挂载，路由就需要知道用户的路由权限，也就是在用户登录进来的时候就要知道当前用户拥有哪些路由权限
      这种方式也存在以下缺点：
    - 全局路由守卫里，每次路由跳转都要做判断
    - 菜单信息写死在前端，要改给显示文字或权限信息，需要重新编译
    - 菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识

# 说说你对 keep-alive 的理解是什么？

- keep-alive 是什么？
  keep-alive 是 vue 中的内置组件，能在组件切换过程中将状态保留在内存中。防止重复渲染 DOM
  keep-alive 可以设置一下 props 属性：
  - include 字符串或正则表达式。只有名称匹配的组件会被缓存
  - exclude 字符串或正则表达式。任何名称匹配的组件都不会被缓存
  - max 数字。 最多可以缓存多少组件实例
- 使用场景
  使用原则：当我们在某些场景下不需要让页面重新加载时我们可以使用 keep-alive
- 缓存后如何获取数据
  解决方案有以下两种：
  - beforeRouteEnter
    每次组件渲染的时候，都会执行 beforeRouteEnter
  - actived
    在 keep-alive 缓存的组件被激活的时候，都会执行 actived 钩子
    注意：服务器端渲染期间 actived 不被调用

# 你对 SPA 单页面的理解，它的优缺点分别是什么？如何实现 SPA 应用呢？

- 什么是 SPA
  SPA(single-page-application)，翻译过来就是单页面应用 SPA 是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，这种方式避免了页面之间切换打断用户体验在单页应用中，所有必要的代码（HTML,JS 和 CSS）都通过单个页面加载而检索，或者根据需要（通常为响应用户操作）动态装载适当的资源并添加到页面，页面在任何时间点都不会重新加载，也不会将控制转移到其他页面。举个例子:一个杯子，早上装牛奶，中午装开水，晚上装茶，我们发现，变的始终是杯子里面的内容，而杯子始终是那个杯子
- SPA 和 MPA 的区别
  MPA(MultiPage-page-application)翻译过来就是多页面应用，在 MPA 中，每个页面都是一个主页面，都是独立的，当我们在访问另一个页面的时候，都需要重新加载 HTML,CSS,JS 文件
  单页面应用 多页面应用
  组成 一个主页面和多个页面片段 多个主页面
  刷新方式 局部刷新 整页刷新
  url 模式 哈希模式 历史模式
  SEO 搜索引擎优化 难实现，可使用 SSR 方式改善 历史模式
  数据传递 容易 通过 url，cookie，localStorage 等传递
  页面切换 速度快，用户体验良好 切换加载资源，速度慢，用户体验差
  维护成本 相对容易 相对复杂
- 单页面应用优缺点
  优点：
  - 具有桌面应用的即时性，网站的可移植性和可访问性
  - 用户体验好，快，内容的改变不需要重新加载整个页面
  - 良好的前后端分离，分工更明确
    缺点：
  - 不利于搜索引擎的抓取
  - 首次渲染速度相对较慢

# SPA 首屏加载速度慢的怎么解决？

- 什么是首屏加载？
  首屏时间指的是浏览器从响应用户输入网站地址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容
- 加载慢的原因
  - 网络延时问题
  - 资源文件体积是否过大
  - 资源是否重复发送请求区加载
  - 加载脚本的时候，渲染内容阻塞
    解决方案：
  - 减少入口文件体积
    常用的手段是路由懒加载，把不同路由对应组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加
    在 vue-router 配置路由的时候，采用动态加载路由的形式
    以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件
  - 静态资源本地缓存
    后端返回资源问题：
    - 采用 HTTP 缓存，设置 Cache-Control，Last-Modified，Etag 等响应头
    - 采用 Service Worker 离线缓存
      前端合理利用 localStorage
  - UI 框架按需加载
    按需引用所需要的 UI 组件
  - 图片资源的压缩
    对于所有的图片资源，我们可以进行适当的压缩，对页面上使用到的 icon，可以使用在线字体图标，或者雪碧图，将众多小图标合并到同一张图上，用以减轻 http 请求压力
  - 组件重复打包
    在 webpage 的 config 文件中，修改 CommonsChunkPlugin 的配置
  - 使用 SSR
    SSP(Server side) 也就是服务端渲染，组件或页面通过服务器生成 html 字符串，再发送到浏览器从头搭建一个服务端渲染是很复杂的，vue 应用建议使用 Nuxt.js 实现服务端渲染
- 小结
  减少首屏渲染时间的方法有很多，总的来讲可以分为两大部分：资源加载优化和页面渲染优化

# vue3 有了解过吗？能说说 vue2 的区别吗/

- vue3 新特性
  - 速度更快
    vue3 相比 vue2
    - 重写了虚拟 DOM 实现
    - 编译模板的优化
    - 更高效的组件初始化
    - update 性能提高 1.3~2 倍
    - SSR 速度提高了 2~3 倍
  - 体积减少
    通过 webpack 的 tree-shaking 功能，可以将无用的模块“剪辑”，仅打包需要的。能够 tree-shaking，有两大好处：
    - 对开发人员能够对 vue 实现更多其他的功能，而不必担忧整体体积过大
    - 对使用者，打包出来的体积变小了
  - 更容易维护
    - compostion API
      - 可与现有的 Options API 一起使用
      - 灵活的逻辑组合与复用
      - Vue3 模块可以和其他框架搭配使用
    - 更好的 Typescript 支持
    - 编译器重写
  - 更接近原生
    - 可以自定义渲染 API
  - 更易使用
    响应式 API 暴露出来
- Vue3 新增特性
  - framents
  - Teleport
  - compostion API
  - createRender
