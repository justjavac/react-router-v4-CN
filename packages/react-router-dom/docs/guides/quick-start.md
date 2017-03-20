# 快速开始

一种简单的快速创建 React web 项目的方式是使用 [Create React App][crapp] 工具，此工具由 Facebook 开发并维护。

如果你还没有使用过 create-react-app，你需要先安装。然后就可以通过它创建一个新项目。

```sh
npm install -g create-react-app
create-react-app demo-app
cd demo-app
```

## 安装

React Router DOM is [published to npm](https://npm.im/react-router-dom) so you can install it with either `npm` or [`yarn`](https://yarnpkg.com). Create React App uses yarn, so that's what we'll use.

```sh
yarn add react-router-dom
# or, if you're not using yarn
npm install react-router-dom
```

Now you can copy/paste any of the examples into `src/App.js`. Here's the
basic one:

```jsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample
```

Now you're ready to tinker. Happy routing!

  [crapp]:https://github.com/facebookincubator/create-react-app
