# match

`match` 对象包含了 `<Route path>` 如何与URL匹配的信息。`match` 对象包含以下属性：

  - `params` -（ object 类型）即路径参数，通过解析URL中动态的部分获得的键值对。
  - `isExact` - 当为 `true` 时，整个URL都需要匹配。
  - `path` -（ string 类型）用来做匹配的路径格式。在需要嵌套 `<Route>` 的时候用到。
  - `url` -（ string 类型）URL匹配的部分，在需要嵌套 `<Link>` 的时候会用到。

你可以在以下地方获取 `match` 对象：

- 在 [Route component](./Route.md#component) 中，以 `this.props.match` 方式。
- 在 [Route render](./Route.md#render-func) 中，以 `({ match }) => ()` 方式。
- 在 [Route children](./Route.md#children-func) 中，以 `({ match }) => ()` 方式
- 在 [withRouter](./withRouter.md) 中，以 `this.props.match` 方式
- [matchPath](./withRouter.md) 的返回值

当一个 Route 没有 `path` 时，它会匹配一切路径，你会匹配到最近的父级。在 `withRouter` 里也是一样的。