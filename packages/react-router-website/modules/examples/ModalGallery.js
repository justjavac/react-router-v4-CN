import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'


// 这个例子展示了如何在相同的 URL 下渲染两个不同的页面（或者在不同 context 下的两个相同页面）。
// 点击颜色来全屏查看，然后点击「访问Galary」并且在弹窗里查看其他颜色。注意观察弹窗里面
// 的 URL 以及组件和之前是一样的。

class ModalSwitch extends React.Component {

  // 把一个位置（location）传给 <Switch/> 意味着路由会忽略当前的位置，并且使用
  // 被传入 prop 的位置（location）。
  // 「location state」属性使用户在弹窗（modal）里面访问路径「/images/2」，而
  // 不是在主页面上来访问这个路径，而且弹窗页面（modal）会把 gallery 页面挡住。
  // 通常，「/images/2」不会匹配到 gallery 的「/」， 而为了使两个页面都能渲染，我
  // 们要保存之前的位置，并且把这个位置传入Switch，然后就算我们已经转到
  // 「/images/2」这个位置了而Switch会以为当前位置还是「/」。

  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // 如果 props.location 不是 modal 的话，就把 this.props.location 
    // 赋值给 previousLocation。
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // 不是首次渲染。
    )
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Home}/>
          <Route path='/gallery' component={Gallery}/>
          <Route path='/img/:id' component={ImageView}/>
        </Switch>
        {isModal ? <Route path='/img/:id' component={Modal} /> : null}
      </div>
    )
  }
}

const IMAGES = [
  { id: 0, title: '深兰花紫', color: 'DarkOrchid' },
  { id: 1, title: '石灰绿', color: 'LimeGreen' },
  { id: 2, title: '番茄色', color: 'Tomato' },
  { id: 3, title: '#七八九', color: '#789' },
  { id: 4, title: '赤红色', color: 'Crimson' }
]

const Thumbnail = ({ color }) =>
  <div style={{
    width: 50,
    height: 50,
    background: color
  }}/>

const Image = ({ color }) =>
  <div style={{
    width: '100%',
    height: 400,
    background: color
  }}></div>

const Home = () => (
  <div>
    <Link to='/gallery'>访问 Galary </Link>
    <h2>精选图片</h2>
    <ul>
      <li><Link to='/img/2'>番茄色</Link></li>
      <li><Link to='/img/4'>赤红色</Link></li>
    </ul>
  </div>
)

const Gallery = () => (
  <div>
    {IMAGES.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: `/img/${i.id}`,
          // 这里是关键！
          state: { modal: true }
        }}
      >
        <Thumbnail color={i.color} />
        <p>{i.title}</p>
      </Link>
    ))}
  </div>
)

const ImageView = ({ match }) => {
  const image = IMAGES[parseInt(match.params.id, 10)]
  if (!image) {
    return <div>找不到图片</div>
  }

  return (
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  )
}

const Modal = ({ match, history }) => {
  const image = IMAGES[parseInt(match.params.id, 10)]
  if (!image) {
    return null
  }
  const back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  return (
    <div
      onClick={back}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className='modal' style={{
      position: 'absolute',
        background: '#fff',
        top: 25,
        left: '10%',
        right: '10%',
        padding: 15,
        border: '2px solid #444'
      }}>
        <h1>{image.title}</h1>
        <Image color={image.color} />
        <button type='button' onClick={back}>
          关闭
        </button>
      </div>
    </div>
  )
}

const ModalGallery = () => (
  <Router>
    <Route component={ModalSwitch} />
  </Router>
)

export default ModalGallery
