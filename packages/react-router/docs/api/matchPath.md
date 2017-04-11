# matchPath

这允许您使用与<Route>一样使用的相同的代码，除了在正常渲染循环之外，例如在服务器上渲染之前收集数据依赖关系

```js
import { matchPath } from 'react-router'

const match = matchPath('/users/123', {
  path: '/users/:id'
  exact: true,
  strict: false
})
```

## pathname

第一参数是你想要匹配的 pathname, 如果你正在服务端的 nodos.js 下使用, 将会是 `req.url`

## props

第二个参数是不予匹配的属性, 他们于匹配 `Route` 接收的参数属性是相同的

```js
{
  path, // like /users/:id
  strict, // 可选, 默认 false
  exact // 可选, 默认 false
}
```
