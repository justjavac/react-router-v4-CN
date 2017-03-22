# Quick Start | 快速开始

如果这是你首次开发 React Native 应用，我们推荐你阅读 facebook 的官方指南：["Getting Started"](https://facebook.github.io/react-native/docs/getting-started.html)。

## Installation | 安装

React Router Native 已经 [发布到 npm](https://npm.im/react-router-native) 因此你可以使用 `npm` 或者 [`yarn`](https://yarnpkg.com)。

```sh
npm install react-router-native
# 或
yarn add react-router-native
```

当你创建完 React Native 项目后，你可以复制任意的示例代码，并粘贴到 `index.ios.js` 和 `index.android.js`。

代码如下：

```jsx
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native'

import { NativeRouter, Route, Link } from 'react-router-native'

const Home = () => (
  <Text style={styles.header}>
    首页
  </Text>
)

const About = () => (
  <Text style={styles.header}>
    关于
  </Text>
)

const Topic = ({ match }) => (
  <Text style={styles.topic}>
    {match.params.topicId}
  </Text>
)

const Topics = ({ match }) => (
  <View>
    <Text style={styles.header}>主题列表</Text>
    <View>
      <Link
        to={`${match.url}/rendering`}
        style={styles.subNavItem}
        underlayColor='#f0f4f7'>
          <Text>Rendering with React</Text>
      </Link>
      <Link
        to={`${match.url}/components`}
        style={styles.subNavItem}
        underlayColor='#f0f4f7'>
          <Text>Components</Text>
      </Link>
      <Link
        to={`${match.url}/props-v-state`}
        style={styles.subNavItem}
        underlayColor='#f0f4f7'>
          <Text>Props v. State</Text>
      </Link>
    </View>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <Text style={styles.topic}>选择一个主题。</Text>
    )} />
  </View>
)

const nativeRouterExamples = () => (
  <NativeRouter>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link
          to="/"
          underlayColor='#f0f4f7'
          style={styles.navItem}>
            <Text>首页</Text>
        </Link>
        <Link
          to="/about"
          underlayColor='#f0f4f7'
          style={styles.navItem}>
            <Text>关于</Text>
        </Link>
        <Link
          to="/topics"
          underlayColor='#f0f4f7'
          style={styles.navItem} >
            <Text>主题列表</Text>
        </Link>
      </View>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </View>
  </NativeRouter>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  }
})

AppRegistry.registerComponent('MyApp', () => App);
```
