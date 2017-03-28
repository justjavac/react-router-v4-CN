import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// 每一个逻辑路由都包含两个组件，一个负责显示sidebar另一个则是显示主区域
// 只要当前的URL匹配，我们希望这两个部分都能被渲染出来

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>主页!</div>,
    main: () => <h2>主页</h2>
  },
  { path: '/about',
    sidebar: () => <div>关于我们!</div>,
    main: () => <h2>关于我们</h2>
  },
  { path: '/contact',
    sidebar: () => <div>联系我们!</div>,
    main: () => <h2>联系我们</h2>
  }
]

const SidebarExample = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '40%',
        background: '#f0f0f0'
      }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/">主页</Link></li>
          <li><Link to="/about">关于我们</Link></li>
          <li><Link to="/contact">联系我们</Link></li>
        </ul>

        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // 在一个app里，你可以加入多个<Route>，这些<Route>都能正常渲染，
          // 只要你的URL是匹配的。也就是说在一个给定的URL下，渲染多个组件(
          // 例如sidebar或者是breadcrumb)，不管组件是什么，只要放入多个
          // <Route>组件，就可以被正常渲染出来。

          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          // 像上面这样在一个给定的路径下渲染多个<Route>，而且每个
          // <Route>的component属性都不相同。
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
)

export default SidebarExample
