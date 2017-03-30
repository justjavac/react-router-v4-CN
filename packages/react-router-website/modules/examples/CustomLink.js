import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const CustomLinkExample = () => (
  <Router>
    <div>
      <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="首页"/>
      <OldSchoolMenuLink to="/about" label="关于"/>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
)

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div className={match ? 'active' : ''}>
      {match ? '> ' : ''}<Link to={to}>{label}</Link>
    </div>
  )}/>
)

const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
)

const About = () => (
  <div>
    <h2>关于</h2>
  </div>
)

export default CustomLinkExample
