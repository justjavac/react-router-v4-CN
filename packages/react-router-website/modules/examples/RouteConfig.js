import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// 一些程序员喜欢把路由配置集中到一个地方，要知道路由的配置其实只是普通的数据
// 在把数据映射到组件上这方面，React非常强大，而且，这里的<Route>就是一个普
// 通的组件

////////////////////////////////////////////////////////////
// 我们先来定义route相关的组件
const Main = () => <h2>主页</h2>

const Redbull = () => <h2>红牛</h2>

const Snacks = ({ routes }) => (
  <div>
    <h2>小吃</h2>
    <ul>
      <li><Link to="/snacks/spicy">辣条</Link></li>
      <li><Link to="/snacks/chips">薯片</Link></li>
    </ul>

    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))}
  </div>
)

const Spicy = () => <h3>辣条</h3>
const Chips = () => <h3>薯片</h3>

////////////////////////////////////////////////////////////
// 这里是路由的配置
const routes = [
  { path: '/redbull',
    component: Redbull
  },
  { path: '/snacks',
    component: Snacks,
    routes: [
      { path: '/snacks/spicy',
        component: Spicy
      },
      { path: '/snacks/chips',
        component: Chips
      }
    ]
  }
]

// wrap <Route> and use this everywhere instead, then when
// 把<Route>组件像这样包一层，然后在需要使用<Route>的地方使用<RouteWithSubRoutes>
// 自路由可以加到任意路由组件上。
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // 把自路由向下传递来达到嵌套
    <route.component {...props} routes={route.routes}/>
  )}/>
)

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/snacks">小吃</Link></li>
        <li><Link to="/redbull">红牛</Link></li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
)

export default RouteConfigExample
