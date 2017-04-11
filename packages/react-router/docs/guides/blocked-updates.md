# Dealing with Update Blocking | 更新阻止的处理

React Router有一些位置感知组件，它们使用当前的 "location" 对象来确定它们呈现的内容。 默认情况下，使用React的上下文模型将当前的 `location` 隐式传递给组件。 当位置更改时，这些组件应使用上下文中的新 `location` 对象重新渲染。

React提供了两种方法来优化应用程序的渲染性能："shouldComponentUpdate" 生命周期方法和 "PureComponent"。 两者都阻止重新渲染组件，除非满足正确的条件。 不幸的是，这意味着如果React Router的重新呈现被阻止，React Router的位置感知组件可能与当前位置不同步。

### 示例

当 `<UpdateBlocker>` 正在安装时，任何位置感知的子组件将使用当前的 "location" 和 "match" 对象进行渲染。

```js
// location = { pathname: '/about' }
<UpdateBlocker>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>
```

当位置改变时，`<UpdateBlocker>```shouldComponentUpdate` 方法将返回 `false`，其子组件将不被重新呈现。

```js
// location = { pathname: '/faq' }
<UpdateBlocker>
  // 链接不会重新呈现，所以它们保留了之前的属性
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>
```

### `shouldComponentUpdate`

为了使实现 `shouldComponentUpdate`的组件知道位置更改时_should_更新，它的 `shouldComponentUpdate` 方法需要能够检测位置更改。

如果您自己实现 `shouldComponentUpdate`，你可以_could_比较当前和下一个 `context.router` 对象的位置。 但是，作为用户，您不必直接使用上下文。 相反，如果您可以比较当前和下一个“位置”而不触及上下文，这将是理想的。

#### Third-Party Code

问题。 这很可能是因为`shouldComponentUpdate`被第三方代码调用，比如`react-redux` 的 `connect` 和 `mobx-react` 的 `observer`.

```js
// react-redux
const MyConnectedComponent = connect(mapStateToProps)(MyComponent)

// mobx-react
const MyObservedComponent = observer(MyComponent)
```

With third-party code, you likely cannot even control the implementation of `shouldComponentUpdate`. Instead, you will have to structure your code to make location changes obvious to those methods.

Both `connect` and `observer` create components whose `shouldComponentUpdate` methods do a shallow comparison of their current `props` and their next `props`. Those components will only re-render when at least one prop has changed. This means that in order to ensure they update when the location changes, they will need to be given a prop that changes when the location changes.

### `PureComponent`

React's `PureComponent` does not implement `shouldComponentUpdate`, but it takes a similar approach to preventing updates. When a "pure" component updates, it will do a shallow comparison of its current `props` and `state` to the next `props` and `state`. If the comparison does not detect any differences, the component will not update. Like with `shouldComponentUpdate`, that means that in order to force a "pure" component to update when the location changes, it needs to have a prop or state that has changed.

### The Solution

避免在位置更改后阻止重新呈现的关键是将阻止组件的 "location" 对象作为支柱传递。 每当位置发生变化时，这将是不同的，因此将检测和比较当前位置和下一个位置是否不同。
The key to avoiding blocked re-renders after location changes is to pass the blocking component the `location` object as a prop. This will be different whenever the location changes, so comparisons will detect that the current and next location are different.

```js
// location = { pathname: '/about' }
<UpdateBlocker location={location}>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about' class='active'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq'>F.A.Q.</a>
</UpdateBlocker>

// location = { pathname: '/faq' }
<UpdateBlocker location={location}>
  <NavLink to='/about'>About</NavLink>
  // <a href='/about'>About</a>
  <NavLink to='/faq'>F.A.Q.</NavLink>
  // <a href='/faq' class='active'>F.A.Q.</a>
</UpdateBlocker>
```

#### Getting the location

In order to pass the current `location` object as a prop, you must have access to it. There are two approaches that you should consider for this:

1.
Render a pathless `<Route>`. While `<Route>`s are typically used for matching a specific path, a pathless `<Route>` will always match, so it will always render its component. The current `location` object is one of the props that a `<Route>` passes to the component it renders.

```js
<Route render={({ location }) => (
  <UpdateBlocker location={location}>
    ...
  </UpdateBlocker>
)}/>
```

2.
You can wrap a component with the `withRouter` higher-order component and it will be given the current `location` as one of its props.

```js
class BlockAvoider extends React.Component {
  render() {
    return (
      <UpdateBlocker location={location}>
        ...
      </UpdateBlocker>
    )
  }
}

BlockAvoider = withRouter(BlockAvoider)
```
