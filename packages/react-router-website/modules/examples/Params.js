import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const ParamsExample = () => (
  <Router>
    <div>
      <h2>账号</h2>
      <ul>
        <li><Link to="/react-router">React Router</Link></li>
        <li><Link to="/leoashin">LeoAshin</Link></li>
        <li><Link to="/justjavac">justjavac</Link></li>
        <li><Link to="/reacttraining">React Training</Link></li>
      </ul>

      <Route path="/:id" component={Child}/>
    </div>
  </Router>
)

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

export default ParamsExample
