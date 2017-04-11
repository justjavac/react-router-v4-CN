# &lt;StaticRouter>

[`<Router>`](Router.md) 从不会改变地址

当用户实际上没有点击时, 这在服务端的渲染场景中可能会非常有用, 所以这个地址从来没有改变.  因此, 称为: static (静态). 当您只需要插入一个位置并在渲染输出上作出断言时，它也可用于简单的测试
这里有一个简单 nodejs 服务 : 为[`<Redirect>`]（Redirect.md）和其他请求的常规HTML发送302状态代码：

```js
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

createServer((req, res) => {

  // This context object contains the results of the render
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  )

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(html)
    res.end()
  }
}).listen(3000)
```

## basename: string

所有地址的基本 URL . 正确格式化的基本名称应该有一个主要的斜杠，但没有尾部斜杠

```js
<StaticRouter basename="/calendar">
  <Link to="/today"/> // renders <a href="/calendar/today">
</StaticRouter>
```

## location: string

服务器收到的 URL, 在 node 服务上可能是 `req.url`

```js
<StaticRouter location={req.url}>
  <App/>
</StaticRouter>
```

## location: object

一个格式像 `{ pathname, search, hash, state }` 的地址对象

```js
<StaticRouter location={{ pathname: '/bubblegum' }}>
  <App/>
</StaticRouter>
```

## context: object

记录渲染结果的纯JavaScript对象。 见上面的例子

## children: node

要呈现的 [单个子元素](https://facebook.github.io/react/docs/react-api.html#react.children.only)。