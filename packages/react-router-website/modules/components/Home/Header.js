import React from 'react'
import { Link } from 'react-router-dom'
import { Block, Flex, Row, Inline } from 'jsxstyle'
import { SMALL_SCREEN, LIGHT_GRAY, BRIGHT_GRAY } from '../../Theme'
import Logo from '../Logo'
import SmallScreen from '../SmallScreen'

const NavLink = ({ href, ...props }) => (
  <Block
    component="a"
    props={{ href }}
    margin="0 10px"
    {...props}
  />
)

const Button = ({ to, small, ...props }) => (
  <Block component={Link}
    activeBoxShadow="2px 2px 4px rgba(0,0,0,.25)"
    activeTop="5px"
    background="white"
    borderRadius="100px"
    boxShadow={small ? (
      '0 5px 15px rgba(0, 0, 0, .25)'
    ) : (
      '0 10px 30px rgba(0, 0, 0, .25)'
    )}
    cursor="pointer"
    flex="1"
    fontSize="10px"
    fontWeight="bold"
    hoverBoxShadow={small ? (
      '0 5px 10px rgba(0, 0, 0, .25)'
    ) : (
      '0 10px 25px rgba(0, 0, 0, .25)'
    )}
    hoverTop="1px"
    marginRight={small ? '10px' : '20px'}
    padding={small ? '10px' : '15px 25px'}
    position="relative"
    props={{ to }}
    textAlign="center"
    top="0"
    userSelect="none"
    whiteSpace="nowrap"
    {...props}
  />
)

const NavBar = () => (
  <Row
    textTransform="uppercase"
    fontWeight="bold"
    width="100%"
  >
    <Block flex="1" fontSize="14px">
      <Inline component="a" props={{ href:"https://reacttraining.com/react-router/" }}>
        English
      </Inline>
      <Inline> / </Inline>
      <Inline
        component="a"
        props={{ href: 'https://reacttraining.cn/' }}
        color={LIGHT_GRAY}
      >简体中文</Inline>
    </Block>
    <Row fontSize="12px">
      <NavLink href="https://github.com/ReactTraining/react-router">Github</NavLink>
      <NavLink href="https://www.npmjs.com/package/react-router">NPM</NavLink>
      <NavLink href="https://reacttraining.com" margin="0">Get Training</NavLink>
    </Row>
  </Row>
)

const Banner = () => (
  <SmallScreen>
    {(isSmallScreen) => (
      <Row width="100%">
        {!isSmallScreen && (
          <Block flex="1">
            <Logo />
          </Block>
        )}
        <Block flex="1">
          <Block lineHeight="1">
            <Block
              fontSize={isSmallScreen ? '80%' : '120%'}
              fontWeight="bold"
            >
              一次学习，随处路由
            </Block>
            <Block
              component="h2"
              fontSize={isSmallScreen ? '200%' : '350%'}
              fontWeight="bold"
            >
              React Router
            </Block>
          </Block>

          <Block
            margin={`${isSmallScreen ? 20 : 20}px 0`}
            fontSize={isSmallScreen ? '80%' : null}
          >
          通过声明式编程模型定义组件，是 React 最强大的核心功能。
          React Router 可以为您的应用已声明式的方式定义<b>导航组件</b>最强大的核心功能。
          无论是 Web App 的<b>浏览器书签 URLs</b>，还是 <b>React Native</b> 的导航功能，
          只要是可以使用 React 的地方，就可以使用 React Router -- 因此，做出你的选择！
          </Block>

          <Row>
            <Button to="/web" small={isSmallScreen}>Web</Button>
            <Button to="/native" small={isSmallScreen}>Native</Button>
            <Button to="/core" small={isSmallScreen}>Anywhere</Button>
          </Row>
        </Block>
      </Row>
    )}
  </SmallScreen>
)

const Header = () => (
  <SmallScreen query={SMALL_SCREEN}>
    {(isSmallScreen) => (
      <Block background="linear-gradient(125deg, #fff, #f3f3f3 41%, #ededed 0, #fff)">
        <Block padding="20px" maxWidth="1000px" margin="auto" >
          {!isSmallScreen && (
            <NavBar/>
          )}
          <Block height={isSmallScreen ? '20px' : '40px'}/>
          <Banner/>
          <Block height="20px"/>
        </Block>
      </Block>
    )}
  </SmallScreen>
)

export default Header
