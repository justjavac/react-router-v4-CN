# location

Location 是指你当前的位置，下一步打算去的位置，或是你之前所在的位置，形式大概就像这样：

```js
{
  key: 'ac3df4', // 在使用 hashHistory 时，没有 key
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

你使用以下几种方式来获取 location 对象：

- 在 [Route component](./Route.md#component) 中，以 `this.props.location` 的方式获取，
- 在 [Route render](./Route.md#render-func) 中，以 `({ location }) => ()` 的方式获取，
- 在 [Route children](./Route.md#children-func) 中，以 `({ location }) => ()` 的方式获取，
- 在 [withRouter](./withRouter.md) 中，以 `this.props.location` 的方式获取。

你也可以在 `history.location` 中获取 location 对象，但是别那么写，因为 history 是可变的。更多信息请参见 [history 文档](./history.md)。

location 对象不会发生改变，因此你可以在生命周期的钩子函数中使用 location 对象来查看当前页面的位置是否发生改变，这种技巧在获取远程数据以及使用动画时非常有用。

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}
```

你可以在不同环境中使用 location ：

- Web [Link to](../../../react-router-dom/docs/api/Link.md#to)
- Native [Link to](../../../react-router-native/docs/api/Link.md#to)
- [Redirect to](./Redirect.md#to)
- [history.push](./history.md#push)
- [history.replace](./history.md#push)

通常情况下，你只需要给一个字符串当做 location ，但是，当你需要添加一些 location 的状态时，你可以对象的形式使用 location 。并且当你需要多个 UI ，而这些 UI 取决于历史时，例如弹出框（modal），使用location 对象会有很大帮助。

```jsx
// 通常你只需要这样使用 location
<Link to="/somewhere"/>

// 但是你同样可以这么用
const location = {
  pathname: '/somewhere'
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```

最后，你可以把 location 传入一下组件：

- [Route](./Route.md#location)
- [Switch](./Route.md#location)

这样做可以让组件不使用路由状态（router state）中的真实 location，因为我们有时候需要组件去渲染一个其他的 location 而不是本身所处的真实 location，比如使用动画或是等待跳转时。
