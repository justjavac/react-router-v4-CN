import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

const NoMatchExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">主页</Link></li>
        <li><Link to="/old-match">旧链接，会被重定向</Link></li>
        <li><Link to="/will-match">这个链接可以被匹配到</Link></li>
        <li><Link to="/will-not-match">这个链接不能被匹配到</Link></li>
        <li><Link to="/also/will/not/match">这个链接也不能被匹配到</Link></li>
      </ul>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Redirect from="/old-match" to="/will-match"/>
        <Route path="/will-match" component={WillMatch}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)

const Home = () => (
  <p>
    <code> &lt;Switch> </code>会渲染它里面的第一个可以匹配的
    <code> &lt;Route> </code>，而且一个没有<code> path </code>的
    <code> &lt;Route> </code> 会满足任何匹配。
  </p>
)

const WillMatch = () => <h3>匹配到了！</h3>

const NoMatch = ({ location }) => (
  <div>
    <h3>无法匹配 <code>{location.pathname}</code></h3>
  </div>
)

export default NoMatchExample
