# &lt;MemoryRouter>

A [`<Router>`](Router.md) that keeps the history of your "URL" in memory (does not read or write to the address bar). Useful in tests and non-browser environments like [React Native](https://facebook.github.io/react-native/).

[`<Router>`](Router.md) 能在内存保存你 "URL" 的历史纪录(并没有对地址栏读写). 在非浏览器或者测试环境比如[React Native](https://facebook.github.io/react-native/)下很有用

```js
import { MemoryRouter } from 'react-router'

<MemoryRouter>
  <App/>
</MemoryRouter>
```

## initialEntries: array

An array of `location`s in the history stack. These may be full-blown location objects with `{ pathname, search, hash, state }` or simple string URLs.
在历史栈中的一个 `location` 数组.  这些可能会成为含有 `{ pathname, search, hash, state }` 或一些简单的 URL 字符串的完整的地址对象

```js
<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>
```

## initialIndex: number

The initial location's index in the array of `initialEntries`.

`initialEntries` 数组中的初始化地址索引

## getUserConfirmation: func

用于确认导航的函数. 当使用`<MemoryRouter>`直接使用`<Prompt>`时，你必须使用这个选项
## keyLength: number


`location.key` 的长度, 默认为 6

```js
<MemoryRouter keyLength={12}/>
```

## children: node

要呈现的 [单个子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only)。
