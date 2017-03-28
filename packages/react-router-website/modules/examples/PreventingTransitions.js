import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt
} from 'react-router-dom'

const PreventingTransitionsExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">表单</Link></li>
        <li><Link to="/one">页面1</Link></li>
        <li><Link to="/two">页面2</Link></li>
      </ul>
      <Route path="/" exact component={Form}/>
      <Route path="/one" render={() => <h3>页面1</h3>}/>
      <Route path="/two" render={() => <h3>页面2</h3>}/>
    </div>
  </Router>
)

class Form extends React.Component {
  state = {
    isBlocking: false
  }

  render() {
    const { isBlocking } = this.state

    return (
      <form
        onSubmit={event => {
          event.preventDefault()
          event.target.reset()
          this.setState({
            isBlocking: false
          })
        }}
      >
        <Prompt
          when={isBlocking}
          message={location => (
            `你真的要跳转到 ${location.pathname}么？`
          )}
        />

        <p>
          是否无法跳转? {isBlocking ? '好，现在试试再试试点击那些链接' : '可以正常跳转'}
        </p>

        <p>
          <input
            size="50"
            placeholder="你这里面输入了以后就不能正常跳转了"
            onChange={event => {
              this.setState({
                isBlocking: event.target.value.length > 0
              })
            }}
          />
        </p>

        <p>
          <button>提交表单以后就可以正常跳转了</button>
        </p>
      </form>
    )
  }
}

export default PreventingTransitionsExample
