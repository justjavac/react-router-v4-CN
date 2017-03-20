import React from 'react'
import { Block, Inline } from 'jsxstyle'
import { DARK_GRAY, BRIGHT_GRAY, LIGHT_GRAY } from '../Theme'
import NewsletterSignup from './NewsletterSignup'

const FooterLink = ({ href, ...rest }) => (
  <Inline component="a" props={{ href }} {...rest} textDecoration="underline"/>
)

const ReactTraining = () => (
  <FooterLink href="https://reacttraining.com">React Training</FooterLink>
)

const Contributors = () => (
  <FooterLink href="https://github.com/ReactTraining/react-router/graphs/contributors">
    contributors
  </FooterLink>
)

const CC = () => (
  <FooterLink href="https://creativecommons.org/licenses/by/4.0/">CC 4.0</FooterLink>
)

const year = new Date().getFullYear()

const Footer = () => (
  <Block>
    <NewsletterSignup/>
    <Block
      background={DARK_GRAY}
      color={BRIGHT_GRAY}
      padding="40px"
      textAlign="center"
      fontSize="80%"
    >
      <Block component="p">
        React Router 由 <ReactTraining/> 和一些协作者 <Contributors/> 共同构建
      </Block>
      <Block
        marginTop="20px"
        color={LIGHT_GRAY}
      >
        &copy; {year} React Training
      </Block>
      <Block color={LIGHT_GRAY}>
        示例代码和文档基于 <CC/> 协议发布
      </Block>
    </Block>
  </Block>
)

export default Footer
