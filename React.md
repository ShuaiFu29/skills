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
