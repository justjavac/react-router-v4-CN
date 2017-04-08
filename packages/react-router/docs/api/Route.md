# &lt;Route>

想要理解并使用好React Router，最重要的可能就是Route组件了。Route组件主要的作用
就是当一个[location](./location.md)匹配路由的`path`时，渲染某些UI。

考虑这样的代码：

```js
import { BrowserRouter as Router, Route } from 'react-router-dom'

<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>
```

如果应用的地址是`/`,那么相应的UI会类似这个样子：

```html
<div>
  <Home/>
  <!-- react-empty: 2 -->
</div>
```

如果应用的地址是`/news`,那么相应的UI就会成为这个样子：

```html
<div>
  <!-- react-empty: 1 -->
  <NewsFeed/>
</div>
```

这里的`react-empty`注释只是演示了React渲染`null`的细节，但对我们具有启发性。其实Route就算是`null`也会被渲染，只要地址与路由的路径匹配，组件就会渲染。

## Route渲染方法

使用`<Route>`有三种渲染内容的方法：

- [`<Route component>`](#component-func)
- [`<Route render>`](#render-func)
- [`<Route children>`](#children-func)

在不同的情况下每个都特别有用，对于某个`<Route>`，你只能使用这些`props`其中的一个，绝大多数的时候会使用`component`。

## Route props

这三种[渲染方法](#route-render-methods)都会被传到相同的三个props中：

- [match](./match.md)
- [location](./location.md)
- [history](./history.md)

## component

只有在地址匹配的时候React的组件才会被渲染，[route props](#route-props)也会随着一起被渲染。

```js
<Route path="/user/:username" component={User}/>

const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```

如果你使用`component`(而不是像下面这样使用`render`),路由会根据指定的组件使用[`React.createElement`](https://facebook.github.io/react/docs/react-api.html#createelement)来创建一个新的[React element](https://facebook.github.io/react/docs/rendering-elements.html)。这就意味着如果你提供的是一个内联的函数的话会带来很多意料之外的重新挂载。所以，对于内联渲染，要使用`render`属性(如下所示)。

## render: func

这种方式对于内联渲染和包装组件却不引起意料之外的重新挂载特别方便。

使用`render`属性，你可以选择传一个在地址匹配时被调用的函数，而不是像使用[`component`](#component-func)属性那样得到一个新创建的[React element](https://facebook.github.io/react/docs/rendering-elements.html)。使用`render`属性会获得跟使用`component`属性一样的[route props](#route-props)。

```js
// 便捷的行内渲染
<Route path="/home" render={() => <div>Home</div>}/>

// 包装/合成
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```

**警告:** `<Route component>`的优先级要比`<Route render>`高，所以不要在同一个 `<Route>`中同时使用这两个属性。

## children: func

有时候你可能想不管地址是否匹配都渲染一些内容，这种情况你可以使用`children`属性。它与`render`属性的工作方式基本一样，除了它是不管地址匹配与否都会被调用。

除了在路径不匹配URL时`match`的值为`null`之外，`children`渲染属性会获得与`component`和`render`一样的[route props](#route-props)。这就允许你根据是否匹配路由来动态地调整UI了，来看这个例子，如果理由匹配的话就添加一个`active`类：

```js
<ul>
  <ListItemLink to="/somewhere"/>
  <ListItemLink to="/somewhere-else"/>
</ul>

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)
```

这种属性对于动画也特别有用:

```js
<Route children={({ match, ...rest }) => (
  {/* Animate总会被渲染, 所以你可以使用生命周期来使它的子组件出现
    或者隐藏
  */}
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```

**Warning:** `<Route component>`和`<Route render>` 的优先级都比`<Route children>` 高，所以在同一个`<Route>`中不要同时使用一个以上的属性.

## path: string

可以是任何[`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp)能理解的有效URL。

```js
<Route path="/users/:id" component={User}/>
```

没有`path`属性的Route _总是会_ 匹配。

## exact: bool

当值为`true`时，则要求路径与`location.pathname`必须 _完全_ 匹配。

```js
<Route exact path="/one" component={About}/>
```

| 路径 | location.pathname | exact | 是否匹配? |   
|---|---|---|---|---|   
| `/one`  | `/one/two`  | `true` | 否 |   
| `/one`  | `/one/two`  | `false` | 是 |   

## strict: bool

当设为`true`的时候，有结尾斜线的路径只能匹配有斜线的`location.pathname`，这个值并不会对`location.pathname`中有其他的片段有影响。

```js
<Route strict path="/one/" component={About}/>
```

| 路径 | location.pathname | 是否匹配? |
| --- | --- | --- |
| `/one/` | `/one` | 否 |
| `/one/` | `/one/` | 是 |
| `/one/` | `/one/two` | 是 |

**警告:** `stict`可以强制`location.pathname`不包含结尾的斜线，但是要做到这点必须把`strict`和`exect`都设置为`true`。

```js
<Route exact strict path="/one" component={About}/>
```

| 路径 | location.pathname | 是否匹配? |
| --- | --- | --- |
| `/one` | `/one` | 是 |
| `/one` | `/one/` | 否 |
| `/one` | `/one/two` | 否 |
