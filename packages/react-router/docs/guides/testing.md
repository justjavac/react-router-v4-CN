# Testing

React Router relies on React context to work. This affects how you can
test your components that use our components.

React Router 依赖于React的上下文才能工作，这影响到如何你如何测试你那些使用了我们的组件的组件。

## Context

If you try to unit test one of your components that renders a `<Link>` or a `<Route>`, etc. you'll get some errors and warnings about context.  While you may be tempted to stub out the router context yourself, we recommend you wrap your unit test in a `<StaticRouter>` or a `<MemoryRouter>`. Check it out:

如果你尝试使用单元测试去测试其中一个渲染了`<Link>` 或者 `<Route>`的组件，你就会得到一些关于上下文（context）的错误或者警告。虽然你可能试图自己去储存路由的上下文，但我们建议您将单元测试封装在`<StaticRouter>`或`<MemoryRouter>`中。来一探究竟：

```jsx
class Sidebar extends Component {
  // ...
  render() {
    return (
      <div>
        <button onClick={this.toggleExpand}>
          expand
        </button>
        <ul>
          {users.map(user => (
            <li>
               <Link to={user.path}>
                 {user.name}
               </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// broken
test('it expands when the button is clicked', () => {
  render(
    <Sidebar/>
  )
  click(theButton)
  expect(theThingToBeOpen)
})

// fixed!
test('it expands when the button is clicked', () => {
  render(
    <MemoryRouter>
      <Sidebar/>
    </MemoryRouter>
  )
  click(theButton)
  expect(theThingToBeOpen)
})
```

That's all there is to it.

这就是它的全部。

## Starting at specific routes | 从特定的路由开始

`<MemoryRouter>` supports the `initialEntries` and `initialIndex` props,
so you can boot up an app (or any smaller part of an app) at a specific
location.

`<MemoryRouter>` 支持`initialEntries` 和 `initialIndex` 属性。，因此你可以从一个特定的地址（location）来启动你的app（或者是app的一个小部分）。 


```js
test('current user is active in sidebar', () => {
  render(
    <MemoryRouter initialEntries={[ '/users/2' ]}>
      <Sidebar/>
    </MemoryRouter>
  )
  expectUserToBeActive(2)
})
```

## Navigating


当地址（location）发生变化的时候，我们会对路由进行大量的测试，所以你可能没有必要对这个（Navigating
）进行测试。但是如果你必须这样做，基于一切都在渲染中发生，我们可以对此做一些聪明的事情：

```js
import { render, unmountComponentAtNode } from 'react-dom'
import React from 'react'
import { Route, Link, MemoryRouter } from 'react-router-dom'
import { Simulate } from 'react-addons-test-utils'


// 把整个app都放在一个MemoryRouter里面渲染的其中一个方法是
// 把他们都放进一个要执行的步骤列表里面，
// 当地址（location）发生变化的时候，
// 它就会连同`match`， `location`, 和 `history`一起被回调，
// 因此，你可以控制整个流程和做断言。
 
const renderTestSequence = ({
  initialEntries,
  initialIndex,
  subject: Subject,
  steps
}) => {
  const div = document.createElement('div')

  class Assert extends React.Component {

    componentDidMount() {
      this.assert()
    }

    componentDidUpdate() {
      this.assert()
    }

    assert() {
      const nextStep = steps.shift()
      if (nextStep) {
        nextStep({ ...this.props, div })
      } else {
        unmountComponentAtNode(div)
      }
    }

    render() {
      return this.props.children
    }
  }

  class Test extends React.Component {
    render() {
      return (
        <MemoryRouter
          initialIndex={initialIndex}
          initialEntries={initialEntries}
        >
          <Route render={(props) => (
            <Assert {...props}>
              <Subject/>
            </Assert>
          )}/>
        </MemoryRouter>
      )
    }
  }

  render(<Test/>, div)
}

// 我们的主题是这个App，但是你也可以测试你的应用的一个小部分
const App = () => (
  <div>
    <Route exact path="/" render={() => (
      <div>
        <h1>Welcome</h1>
      </div>
    )}/>
    <Route path="/dashboard" render={() => (
      <div>
        <h1>Dashboard</h1>
        <Link to="/" id="click-me">Home</Link>
      </div>
    )}/>
  </div>
)

// 实际测试！
it('navigates around', (done) => {

  renderTestSequence({

    // 告诉它你正在测试的 subject
    subject: App,

    // 以及每次地址（location）改变时执行的步骤
    steps: [

      // 初始渲染
      ({ history, div }) => {
        // assert the screen says what we think it should
        //断言屏幕的输出和我们期望的输出是否一样
        console.assert(div.innerHTML.match(/Welcome/))

        // 现在我们可以强制导航作为测试
        history.push('/dashboard')
      },

      // 从新的地址（location）发起二次渲染
      ({ div }) => {
        console.assert(div.innerHTML.match(/Dashboard/))

 
        //或者我们可以模拟点击链接，而不使用  history.push
        Simulate.click(div.querySelector('#click-me'), {
          button: 0
        })
      },

      // 最终渲染
      ({ location }) => {
        console.assert(location.pathname === '/')

        //你需要在这里写下 `done()`，如果你从未这样做，你的测试是失败的。 
        done()
      }
    ]
  })
})
```

