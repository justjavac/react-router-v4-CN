# &lt;NavLink>

A special version of the [`<Link>`](Link.md) that will add styling attributes to the rendered element when it matches the current URL.
`<NavLink>`是  [`<Link>`](Link.md) 的一个特定版本, 会在匹配上当前 URL 的时候会给已经渲染的元素添加样式参数 

```js
import { NavLink } from 'react-router-dom'

<NavLink to="/about">About</NavLink>
```

## activeClassName: string

The class to give the element when it is active. The default given class is `active`. This will be joined with the `className` prop.
当元素匹配上当前 URL 的时候, 这个类会被赋予给这个元素. 其默认值为 `active`, 这个值会被添加到 `className` 属性的后面(追加)

```js
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```

## activeStyle: object

当元素被选中时, 为此元素添加样式

```js
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```

## exact: bool

当值为 `true` 时, 只有当地址完全匹配 class 和 style 才会应用

```js
<NavLink
  exact
  to="/profile"
>Profile</NavLink>
```

## strict: bool

当值为 `true` 时，在确定位置是否与当前 URL 匹配时，将考虑位置 `pathname` 后的斜线 有关详细信息，请参阅[`<Route strict>`]（../../../ react-router / docs / api / Route.md＃strict-bool）文档。

```js
<NavLink
  strict
  to="/events/"
>Events</NavLink>
```

## isActive: func

添加用于确定链接是否活动的额外逻辑的功能。 如果您想要做的更多，请验证链接的路径名是否与当前URL的 `pathname` 匹配。

```js
// only consider an event active if its event id is an odd number
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink
  to="/events/123"
  isActive={oddEvent}
>Event 123</NavLink>
```
