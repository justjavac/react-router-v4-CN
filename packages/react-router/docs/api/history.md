# history

本文档中的「history」以及「`history`对象」请参照 [`history` 包](https://github.com/ReactTraining/history)中的内容。
History 是 React Router 的两大重要依赖之一（除去 React 本身），在不同的 Javascript 环境中，`history` 以多种形式实现了对于 session 历史的管理。

我们会经常使用以下术语：

- 「browser history」 - history 在 DOM 上的实现，经常使用于支持 HTML5 history API 的浏览器端。
- 「hash history」 - history 在 DOM 上的实现，经常使用于旧版本浏览器端。
- 「memory history」 - 一种存储于内存的 history 实现，经常用于测试或是非 DOM 环境（例如 React Native）。

`history` 对象通常会具有以下属性和方法：


- `length` -（ number 类型）指的是 history 堆栈的数量。
- `action` -（ string 类型）指的是当前的动作（action），例如 `PUSH`，`REPLACE` 以及 `POP` 。
- `location` -（ object类型）是指当前的位置（location），location 会具有如下属性：
  - `pathname` -（ string 类型）URL路径。
  - `search` -（ string 类型）URL中的查询字符串（query string）。
  - `hash` -（ string 类型）URL的 hash 分段。
  - `state` -（ string 类型）是指 location 中的状态，例如在 `push(path, state)` 时，state会描述什么时候 location 被放置到堆栈中等信息。这个 state 只会出现在 browser history 和 memory history 的环境里。
- `push(path, [state])` -（ function 类型）在 hisotry 堆栈顶加入一个新的条目。
- `replace(path, [state])` -（ function 类型）替换在 history 堆栈中的当前条目。
- `go(n)` -（ function 类型）将 history 对战中的指针向前移动 `n` 。
- `goBack()` -（ function 类型）等同于 `go(-1)` 。
- `goForward()` -（ function 类型）等同于 `go(1)` 。
- `block(prompt)` -（ function 类型）阻止跳转，（请参照 [ history 文档](https://github.com/ReactTraining/history#blocking-transitions)）。

## history 是可变的（mutable）

history 对象是可变的，因此我们建议从 [`<Route>`](./Route.md) 的 prop里来获取 [`location`](./location.md) ，而不是从 `history.location` 直接获取。这样做可以保证 React 在生命周期中的钩子函数正常执行，例如以下代码：

```js
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // locationChanged 变量为 true
    const locationChanged = nextProps.location !== this.props.location

    // 不正确，locationChanged 变量会 *永远* 为 false ，因为 history 是可变的（mutable）。
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}

<Route component={Comp}/>
```

不同的实现也许会提供给你额外的属性，更多详情请参照 [history 文档](https://github.com/ReactTraining/history#properties)。
