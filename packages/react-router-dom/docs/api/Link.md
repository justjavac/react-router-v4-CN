# &lt;Link>

为您的应用提供声明式的、无障碍导航。

```js
import { Link } from 'react-router-dom'

<Link to="/about">关于</Link>
```

## to: string

需要跳转到的路径(pathname)或地址（location）。

```js
<Link to="/courses"/>
```

## to: object

需要跳转到的地址（location）。

```js
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```

## replace: bool

当设置为 `true` 时，点击链接后将使用新地址替换掉访问历史记录里面的原地址。

当设置为 `false` 时，点击链接后将在原有访问历史记录的基础上添加一个新的纪录。

默认为 `false`。

```js
<Link to="/courses" replace />
```
