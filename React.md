# 说说你对 React 的理解？有哪些特性？

- 是什么？
  React 用于构建用户界面的 JS 库，提供了 UI 层面的解决方案
  遵循组件设计模式，声明式编程范式和函数式编程概念，以使前端应用程序更高效
  使用虚拟 DOM 来有效地操作 DOM，遵循从高阶组件到低阶组件的单向数据流
- 特性
  - JSX 语法
  - 单向数据绑定
  - 虚拟 DOM
  - 声明式编程
    声明式编程是一种编程范式，它关注的是你要做什么，而不是如何做
    它表达逻辑而不显式地定义步骤，这意味着我们需要根据逻辑来计算声明要显示的组件
  - Component
    在 React 中，一切皆为组件。通常将应用程序的整个逻辑分解为小的单个部分。我们将每个单独的部分称为组件
    组件可以是一个函数或者是一个类，接受数据输入，处理它并返回在 UI 中呈现的 React 元素
    一个组件该有的特点如下：
    - 可组合：每个组件易于和其他组件一起使用，或者嵌套在另外一个组件内部
    - 可重用：每个组件都是具有独立功能的，它可以被使用在多个 UI 场景
    - 可维护：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护
- React 优势
  - 高效灵活
  - 声明式设计，简单使用
  - 组件式开发，提高代码复用率
  - 单向响应的数据流会比双向绑定的更安全，速度更快
- state 和 props 有什么区别？
  - state
    一个组件的显示形态可以由数据状态和外部参数所决定，而数据状态就是 state，一般在 constructor 中初始化
    当需要修改里面的值的状态需要通过调用 setState 来改变，从而达到更新组件内部数据的作用，并且重新调用组件 render 方法
  - props
    组件从概念上看就是一个函数，可以接受一个参数作为输入值，这个参数就是 props，所以可以把 props 理解为从外部传入组件内部的数据
    react 具有单向数据流的特性，所以它主要作用是从父组件向子组件中传递数据
    props 除了可以传字符串，数字，还可以传递对象，数组，甚至回调函数
  - 区别
    相同点：
    - 两者都是 JS 对象
    - 两者都是用于保存信息
    - props 和 state 都能触发渲染更新
      区别：
    - props 是外部传递给组件的，而 state 是在组件内被组件自己管理的，一般在 constructor 中初始化
    - props 在组件内部是不可修改的，但是 state 在组件内部可以进行修改
    - state 是多变的，可以修改

# super()和 super(props)有什么区别？

在 React 中，类组件基于 ES6，所以在 constructor 中必须使用 super
在调用 super 过程，无论是否传入 props，React 内部都会将 props 赋值给组件实例 props 属性中
如果只调用了 super(),那么 this.props 在 super()和构造函数结束之间仍是 underfined

# 说说对 React 中类组件和函数组件的理解？有什么区别？

- 类组件
  就是通过使用 ES6 类的编写形式去编写组件，该类必须继承 React.Component
  如果想要访问父组件传递过来的参数，可通过 this.props 的方式去访问
  在组件中必须实现 render 方法，在 return 中返回 React 对象
  ```jsx
  class Welcome extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <h1>Hello ,{this.props.name}</h1>;
    }
  }
  ```
- 函数组件
  就是通过函数编写的形式去实现一个 React 组件，是 React 中定义组件最简单的方式
  ```jsx
  function Welcome(props) {
    return <h1>Hello,{props.name}</h1>;
  }
  ```
  函数第一个参数为 props 用于接收父组件传递过来的参数
- 区别
  - 编写形式
    两者最明显的区别在于编写形式的不同，同一种功能的实现可以分别对应类组件和函数组件的编写形式
  - 状态管理
    在 hooks 出来之前，函数组件就是无状态组件，不能保管组件的状态，不像类组件中调用 setState。如果想要管理 state 状态，可以使用 useState
    ```jsx
    const FunctionalComponent = () => {
      const [count, setCount] = useState(0);
      return (
        <div>
          <p>count:{count}</p>
          <button onClick={() => setCount(count + 1)}>Click me!</button>
        </div>
      );
    };
    ```
    在使用 hooks 情况下，一般如果函数组件调用 state，则需要创建一个类组件或者 state 提升到你的父组件中，然后通过 props 对象传递到子组件
  - 生命周期
    在函数组件中，并不存在生命周期，这是因为这些生命周期钩子都来自于继承的 React.Component。所以，如果用到生命周期，就只能使用类组件
  - 调用方式
    如果是一个函数组件，调用则是执行函数即可
    如果是一个类组件，则需要将组件进行实例化，然后调用实例对象的 render 方法
- 小结
  两种组件都有各自的优缺点
  函数组件语法更短，更简单，这使得它更容易开发，理解，和测试
  而类组件也会因大量使用 this 而让人感到困惑

# 说说对受控组件和非受控组件的理解？应用场景？

- 受控组件
  简单来说就是受我们控制的组件，组件的状态全程响应外部数据，受控组件我们一般需要初始状态和一个状态更新事件函数
- 非受控组件
  简单来说就是不受我们控制的组件，一般情况是在初始化的时候接受外部数据，然后自己在内部存储其自身状态，当需要时，可以使用 ref 查询 DOM 并查找其当前值
- 应用场景
  特征 不受控制 受控制
  一次性取值（如，提交时） 是 是
  提交时验证 是 是
  即时现场验证 否 是
  有条件地禁用提交按钮 否 是  
  强制输入格式 否 是
  一个数据的多个输入 否 是
  动态输入 否 是

# 说说 React 的事件机制？

- 是什么？
  React 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册，事件合成，事件冒泡，事件派发等
  在 React 中这套事件机制被称为合成事件
  - 合成事件（SyntheticEvent）
    合成事件是 React 模拟原生 DOM 事件所以能力的一个事件对象，即浏览器元素事件的跨浏览器包装器
    React 事件和原生事件也非常相似，但也有一定区别：
    - 事件名称命名方式不同
    - 事件处理函数书写不同
      React 所有事件都挂载在 document 对象上
      当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件
      所以会先执行原生事件，然后处理 React 事件
      最后真正执行 document 上挂载的事件
- 总结
  React 事件机制：
  - React 上注册的事件最终都会绑定在 document 这个 DOM 上，而不是 React 组件对应的 DOM（减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件）
  - React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因
  - React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
  - React 有一套自己的合成事件（SyntheticEvent）

# React 事件绑定的方式有哪些？区别？

- 是什么？
  在 React 应用中，事件名都是小驼峰格式进行书写
- 如何绑定？
  1. render 方法中使用 bind
  2. render 方法中使用箭头函数
  3. constructor 中 bind
  4. 定义阶段使用箭头函数绑定
- 区别
  - 编写方面：方式一和方式二写法简单，方式三的编写过于冗余
  - 性能方面：方式一和方式二在每次组件 render 的时候都会生成新的方法实例，性能问题欠缺。若该函数作为属性值传给子组件的时候，都会导致额外的渲染。而方式三，方式四只会生成一个方法实例
    综上所述，方式四是最优的事件绑定

# React 构建组件的方法有哪些？区别？

- 是什么？
  在 React 中，一个类，一个函数都可以视为一个 1 组件
  - 降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求
  - 调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统简单
  - 提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可以获得系统的整体升级
- 如何构建？
  - 函数式构建
  - 通过 React.createClass 方法创建
  - 继承 React.Component 创建
- 区别
  由于 React.createClass 创建的方式过于冗余，并不建议使用
  而像函数式创建和类组件的区别主要在于需要创建的组件是否需要为有状态组件：
  - 对于一些无状态的组件创建，建议使用函数式创建的方式
  - 由于 react hooks 的出现，函数式组件创建通过 hooks 方法也能使之成为有状态组件，再加上目前推崇函数式编程，所以这里建议都使用函数式编程的方式来创建组件

# 说说 React 生命周期有哪些不同阶段？每个阶段对应的方法是什么？

- 流程
  - 创建阶段
    - constructor
    - getDerivedStateFromProps
    - render
    - componentDidMount
  - 更新阶段
    - getDerivedStateFromProps
    - shouldComponentUpdate
    - render
    - getSnapshotBeforeUpdate
    - componentDidUpdate
  - 卸载阶段
    - componentWillUnmount

# React 组件之间如何通信？

- 如何通信？
  - 父组件向子组件传递
    由于 React 的数据流动是单向的，父组件向子组件传递是最常见的方式
    父组件在调用子组件的时候，只需要在子组件标签内传递参数，子组件通过 props 属性就能接收父组件传递过来的参数
    ```jsx
    function EmailInput(props) {
      return (
        <label>
          Email:
          <input value={props.email} />
        </label>
      );
    }
    const element = <EmailInput email="123456@163.com" />;
    ```
  - 子组件向父组件传递
    子组件向父组件通信的基本思路是，父组件向子组件传递一个函数，然后通过这个函数的回调，拿到子组件传递过来的值
    ```jsx
    //父组件对应的代码
    class Parent extends Component{
      constructor(){
        super()
        this.state={
          price:0
        }
        getIremPrice(e){
          this.setState({
            price:e
          })
        }
      }
      render(){
        return (
          <div>
            <div>price: {this.state.price}</div>
             /*向子组件中传递一个函数*/
             <Child getPrice={this.getItemPrice.bind(this)} />
          </div>
        )
      }
    }
    //子组件对应的代码
    class Child extends Component{
      clickGoods(e){
        //在此函数中传入值
        this.props.getPrice(e)
      }
      render(){
        return (
          <div>
            <button onClick={this.clickGoods.bind(this,100)}>goods1</button>
            <button onClick={this.clickGoods.bind(this,1000)}>goods2</button>
          </div>
        )
      }
    }
    ```
  - 兄弟组件之间的通信
    如果是兄弟组件之间的传递，则父组件作为中间层来实现数据的互通，通过父组件传递
    ```jsx
    class Parent extends React.Component {
      consstructor(props) {
        super(props);
        this.state = { count: 0 };
      }
      setCount = () => {
        this.setState({ count: this.state.count + 1 });
      };
      render() {
        return (
          <div>
            <SiblingA count={this.state.count} />
            <SiblingB count={this.state.count} />
          </div>
        );
      }
    }
    ```
  - 父组件向后代组件传递
    父组件向后代组件传递数据是一件最普通的事情，就像全局数据一样
  - 非关系组件传递
    如果组件之间关系类型比较复杂，建议将数据进行一个全局资管管理，从而实现通信

# 说说对高阶组件的理解？应用场景？

- 是什么？
  高阶函数至少满足以下一个条件的函数
  - 接受一个或多个函数作为输入
  - 输出一个函数
- 如何编写？
  把通用的逻辑放在高阶组件中，对组件实现一致的处理，从而实现代码的复用
  所以，高阶组件的主要功能是封装并分离组件的通用逻辑，让通用逻辑在组件间更好地被复用
  但在使用高阶组件的同时，一般遵守一些约定：
  - props 保持一致
  - 你不能在函数式（无状态）组件上使用 ref 属性，因为它没有实例
  - 不要以任何方式改变原始组件 WrappedComponent
  - 透传不相关 props 属性给被包裹的组件 WrappedComponent
  - 不要再 render()方法中使用高阶组件
  - 使用 componse 组合高阶组件
  - 包装显示名字以便于调试

# 说说对 React refs 的理解？应用场景？

- 是什么？
  React 中的 refs 提供了一种方法，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。本质为 ReactDOM.render()返回的组件实例，如果是渲染组件则返回的是组件实例，如果渲染 DOM 则返回的是具体的 DOM 节点
- 如何使用？
  创建 ref 的形式有三种：
  - 传入字符串，使用时通过 this.refs 传入的字符串的格式获取对应的元素
  - 传入对象，对象是通过 React.createRef()方式创建出来，使用时获取到创建的对象中存在 current 属性就是对应的元素
  - 传入函数，该函数会在 DOM 被挂载时进行回调，这个函数会传入一个元素对象，可以自己保存，使用时，直接拿到之前保存的元素对象即可
  - 传入 hook，hook 是通过 useRef()方式创建，使用时通过 hook 对象的 current 属性就是对应的元素
- 应用场景
  - 对 DOM 元素的焦点控制，内容选择，控制
  - 对 DOM 元素的内容设置及媒体播放
  - 对 DOM 元素的操作和对组件实例的操作
  - 集成第三方 DOM 库

# 说说 React 中 setState 执行机制

- 是什么？
  一个组件的显示形态可以由数据状态和外部参数所决定，而数据状态就是 state
  当需要修改里面的值的状态就需要通过 setState 来改变，从而达到更新组件内部数据的作用
- 更新类型
  - 异步更新
  - 同步更新
    在组件生命周期或 React 合成事件中，setState 是异步
    在 setTimeout 或者原生 DOM 事件中，setState 是同步

# 说说 Real DOM 和 Virtual DOM 的区别？优缺点？

- 是什么？
  Real DOM,真实 DOM 是一个结构化文本的抽象，在页面渲染出的每一个节点都是一个真实的 DOM 结构
  Virtual DOM 本质上是以 JS 对象形式存在的对 DOM 的描述。创建虚拟 DOM 目的就是为了更好的将虚拟的节点渲染到页面视图上，虚拟 DOM 对象的节点与真实 DOM 的属性一一对应
- 区别
  虚拟 DOM 不会进行排版与重绘操作，而真实 DOM 会频繁重排与重绘
  虚拟 DOM 的总损耗是“虚拟 DOM 增删改+真实 DOM 差异增删改+排版与重绘”，而真实 DOM 的总损耗是“真实 DOM 完全增删改+排版与重绘”
- 优缺点：
  真实 DOM 优势： 易用
  真实 DOM 缺点：效率低，解析速度慢，内存占用量过高，性能差，频繁操作真实 DOM，易于导致重绘与回流
  虚拟 DOM 的优势：简单方便，如果使用手动操作真实 DOM 来完成页面，繁琐又容易出错，在大规模应用下维护起来困难。性能方面，使用 Virtual DOM 能有效避免真实 DOM 数频繁更新，减少多次引起重绘与回流，提高性能。React 借助虚拟 DOM，带来了跨平台的能力，一套代码多端运行
  虚拟 DOM 缺点：在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化，首次渲染大量 DOM 时，由于多了一次虚拟 DOM 的计算，计算比正常稍慢
