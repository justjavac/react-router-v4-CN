import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

/* 请把以下的 css 代码和你其他的 css 放到一起
.fade-enter {
  opacity: 0;
  z-index: 1;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
*/

const AnimationExample = () => (
  <Router>
    <Route render={({ location }) => (
      <div style={styles.fill}>
        <Route exact path="/" render={() => (
          <Redirect to="/10/90/50"/>
        )}/>

        <ul style={styles.nav}>
          <NavLink to="/10/90/50">Red</NavLink>
          <NavLink to="/120/100/40">Green</NavLink>
          <NavLink to="/200/100/40">Blue</NavLink>
          <NavLink to="/310/100/50">Pink</NavLink>
        </ul>

        <div style={styles.content}>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {/* 
                这里和使用 ReactCSSTransitionGroup 没有区别，
                唯一需要注意的是要把你的地址（location）传入
                「Route」里使它可以在动画切换的时候匹配之前的
                地址。
            */}
            <Route
              location={location}
              key={location.key}
              path="/:h/:s/:l"
              component={HSL}
            />
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )}/>
  </Router>
)

const NavLink = (props) => (
  <li style={styles.navItem}>
    <Link {...props} style={{ color: 'inherit' }}/>
  </li>
)

const HSL = ({ match: { params } }) => (
  <div style={{
    ...styles.fill,
    ...styles.hsl,
    background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
  }}>hsl({params.h}, {params.s}%, {params.l}%)</div>
)

const styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center'
}

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex'
}

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px'
}

styles.hsl  = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

export default AnimationExample
