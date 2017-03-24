# &lt;HashRouter>

`HashRouter` 是一种特定的 [`<Router>`](../../../react-router/docs/api/Router.md)， `HashRouter` 使用 URL 的 hash (例如：`window.location.hash`) 来保持 UI 和 URL 的同步。

**注意：** 使用 hash 的方式记录导航历史不支持 `location.key` 和 `location.state`。
在以前的版本中，我们为这种行为提供了 shim，但是仍有一些问题我们无法解决。
任何依赖此行为的代码或插件都将无法正常使用。
由于该技术仅用于支持传统的浏览器，因此在用于浏览器时可以使用 `<BrowserHistory>` 代替。

```js
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App/>
</HashRouter>
```

## basename: string

当前位置的基准 URL。正确的 URL 格式是前面有一个前导斜杠，但不能有尾部斜杠。

```js
<HashRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="#/calendar/today">
```

## getUserConfirmation: func

当导航需要确认时执行的函数。默认使用 [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)。

```js
// 使用默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<HashRouter getUserConfirmation={getConfirmation}/>
```

## hashType: string

`window.location.hash` 使用的 hash 类型。有如下几种：

- `"slash"` - 后面跟一个斜杠，例如 `#/` 和 `#/sunshine/lollipops`
- `"noslash"` - 后面没有斜杠，例如 `#` 和 `#sunshine/lollipops`
- `"hashbang"` - Google 风格的 ["ajax crawlable"](https://developers.google.com/webmasters/ajax-crawling/docs/learn-more)，例如 `#!/` 和 `#!/sunshine/lollipops`

默认为 `"slash"`。

## children: node

渲染[单一子组件（元素）](https://facebook.github.io/react/docs/react-api.html#react.children.only)。
