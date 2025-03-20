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
