import React from './react/index';

/**
 * componentWillMount
 * componentWillReceiveProps
 * componentWillUpdate
 * 这些生命周期方法经常被误解和滥用；此外，我们预计，在异步渲染中，它们潜在的误用问题可能更大。
 * 我们将在即将发布的版本中为这些生命周期添加 “UNSAFE_” 前缀。
 * （这里的 “unsafe” 不是指安全性，而是表示使用这些生命周期的代码在 React 的未来版本中更有可能出现 bug，尤其是在启用异步渲染之后。）
 */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
    };
  }

  /**
   * 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。
   * 但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。
   * 如果标记发生变化，React 仍将只更新 DOM。
   * 通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。
  */ 
  // forceUpdate()

  handleClick(e) {
    this.setState({
      test: this.state.test + 1,
    });
  }

  // 挂载之前触发
  UNSAFE_componentWillMount() {
    console.log('willMount');
  }

  // 挂载时触发
  componentDidMount() {
    console.log('mount');
    this.setState({
      test: 1,
    });
  }

  // 在已挂载的组件接收新的 props 之前被调用
  UNSAFE_componentWillReceiveProps(nextProps) {
    // 如果你需要更新状态以响应 prop 更改（例如，重置它），你可以比较 this.props 和 nextProps 并在此方法中使用 this.setState() 执行 state 转换。
    // 请注意，如果父组件导致组件重新渲染，即使 props 没有更改，也会调用此方法。如果只想处理更改，请确保进行当前值与变更值的比较。
    // 在挂载过程中，React 不会针对初始 props 调用 UNSAFE_componentWillReceiveProps()。组件只会在组件的 props 更新时调用此方法。调用 this.setState() 通常不会触发 UNSAFE_componentWillReceiveProps()。
    console.log(nextProps);
  }

  // 在组件实例化之后以及重新渲染之前调用。它可以返回一个对象来更新 state，或者返回 null 来表示新的 props 不需要任何 state 的更新
  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
  }

  // 根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。
  // 默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.test > 5) {
      console.log('shouldComponentUpdate中限制了更新');
      alert('shouldComponentUpdate中限制了更新');
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <span>{this.state.test}</span>
        <button onClick={this.handleClick.bind(this)}>改变状态</button>
        <ul>
          <li>1</li>
          <li>
            <a href="">测试</a>
          </li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </div>
    );
  }

  // 在更新之前（如：更新 DOM 之前）被调用。此生命周期的返回值将作为第三个参数传递给 componentDidUpdate。
  //（通常不需要，但在重新渲染过程中手动保留滚动位置等情况下非常有用。）
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    return 'update';
  }

  // 当组件收到新的 props 或 state 时，会在渲染之前调用
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('willupdate', nextProps, nextState);
  }

  // 会在更新后会被立即调用。首次渲染不会执行此方法。
  componentDidUpdate(prevProps, prevState, snapshot) {
    // snapshot getSnapshotBeforeUpdate的返回传递
    console.log('didupdate', prevProps, prevState, snapshot);
    // 典型用法（不要忘记比较 props）：直接调用 setState()，但请注意它必须被包裹在一个条件语句里
    if (this.props.test !== prevProps.test) {
      this.setState({test : this.props.test});
    }
  }

  // 在组件卸载及销毁之前直接调用
  componentWillUnmount() {
    // 在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等
    // componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。
  }

  // 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { hasError: true };
  }

  // 会在“提交”阶段被调用，因此允许执行副作用。
  componentDidCatch(error, info) {
    // error —— 抛出的错误。
    // info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。
  }
}

// defaultProps 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况。
App.defaultProps = {
  color: 'blue'
}
