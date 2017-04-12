# &lt;Router>

Router是所有路由组件共用的底层接口，一般我们的应用并不会使用这个接口，而是使用高级的路由：

- [`<BrowserRouter>`](../../../react-router-dom/docs/api/BrowserRouter.md)
- [`<HashRouter>`](../../../react-router-dom/docs/api/HashRouter.md)
- [`<MemoryRouter>`](MemoryRouter.md)
- [`<NativeRouter>`](../../../react-router-native/docs/api/NativeRouter.md)
- [`<StaticRouter>`](StaticRouter.md)

最常见的使用底层的`<Router>`的情形就是用来与Redux或者Mobx之类的状态管理库的定制的`history`保持同步。注意不是说使用状态管理库就必须使用`<Router>`，它仅用作于深度集成。

```js
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>
```

## history: object

用来导航的[`history`](https://github.com/ReactTraining/history)对象.

```js
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
<Router history={customHistory}/>
```

## children: node

需要渲染的[单一组件](https://facebook.github.io/react/docs/react-api.html#react.children.only)。

```js
<Router>
  <App/>
</Router>
```
