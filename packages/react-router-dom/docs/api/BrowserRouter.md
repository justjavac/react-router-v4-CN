# &lt;BrowserRouter>

[`<Router>`](../../../react-router/docs/api/Router.md) 使用 HTML5 提供的 history API (`pushState`, `replaceState` 和 `popstate` 事件) 来保持 UI 和 URL 的同步。

```js
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```

## basename: string

当前位置的基准 URL。如果你的页面部署在服务器的二级（子）目录，你需要将 `basename` 设置到此子目录。
正确的 URL 格式是前面有一个前导斜杠，但不能有尾部斜杠。

```js
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // 渲染为 <a href="/calendar/today">
```

## getUserConfirmation: func

当导航需要确认时执行的函数。默认使用 [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)。

```js
// 使用默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
```

## forceRefresh: bool

当设置为 `true` 时，在导航的过程中整个页面将会刷新。
只有当浏览器不支持 [HTML5 的 history API](http://caniuse.com/#feat=history) 时，才设置为 `true`。

```js
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory}/>
```

## keyLength: number

`location.key` 的长度。默认是 6。

```js
<BrowserRouter keyLength={12}/>
```

## children: node

渲染[单一子组件（元素）](https://facebook.github.io/react/docs/react-api.html#react.children.only)。
