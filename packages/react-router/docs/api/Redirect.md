# &lt;Redirect>

渲染`<Redirect>` 的时候将会导航到一个新的地址（location）。这个新的地址（location）将会覆盖在访问历史记录里面的原地址，就像服务端的重定向（HTTP 3XX）一样。

```js
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

## to: string

需要重定向到的URL。

```js
<Redirect to="/somewhere/else"/>
```

## to: object

需要重定向到的地址（location）。

```js
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>
```

## push: bool

当设置为 `true` 时，重定向（redirecting）将会把新地址加入访问历史记录里面，而不是替换掉目前的地址。




```js
<Redirect push to="/somewhere/else"/>
```

## from: string

需要被重定向的路径（pathname）。当渲染一个包含在[`<Switch>`](./Switch.md)里面的`<Redirect>`的时候，这可以用作匹配一个地址（location）。
```js
<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  <Route path='/new-path' component={Place}/>
</Switch>
```
