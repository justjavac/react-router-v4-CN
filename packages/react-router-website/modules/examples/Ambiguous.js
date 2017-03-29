import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const AmbiguousExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/about">About Us (static)</Link></li>
        <li><Link to="/company">Company (static)</Link></li>
        <li><Link to="/kim">Kim (dynamic)</Link></li>
        <li><Link to="/chris">Chris (dynamic)</Link></li>
      </ul>

      {/*
          有时你想要允许类似「/about」和「/company」的这种静态路径，而且同时
          需要允许类似「/:user」这种对于路径参数的匹配，而问题是「/about」在
          这里是模糊的，它会同时匹配「/about"和"/:user」。大多数路由系统都有
          一套自己的算法来决定哪些路径可以匹配哪些不能匹配，从而匹配到一个确
          定的路由 route 。你可以使用 React Router 在很多不同的地方匹配路
          径例如：sidebars，breadcrumbs 等等。当你你想匹配「/about」而不想
          同时也匹配到「/:user」时，你可以使用 <Switch> 来把你的 <Route> 包
          一层，在 <Switch> 里的第一个匹配对象就会被渲染出来。
      */}
      <Switch>
        <Route path="/about" component={About}/>
        <Route path="/company" component={Company}/>
        <Route path="/:user" component={User}/>
      </Switch>
    </div>
  </Router>
)

const About = () => <h2>About</h2>
const Company = () => <h2>Company</h2>
const User = ({ match }) => (
  <div>
    <h2>User: {match.params.user}</h2>
  </div>
)

export default AmbiguousExample
