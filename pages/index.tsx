import { NextPage } from 'next'
import styled from 'styled-components'
import { Colors } from '../styles/colors'
import { Breakpoints } from '../styles/breakpoints'
import { Spacings } from '../styles/spacings'
import { Header } from '../components/header'
import Mint from '../components/minting/mint'
import About from '../components/about/about'
import Team from '../components/team/team'
import { useState } from 'react'
import { Theme } from '../components/shared'
import { injectStyle } from 'react-toastify/dist/inject-style'

const Container = styled.div<{ bg: string }>`
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${({ bg }) => bg};
  align-items: center;
  padding: ${Spacings.sm} ${Spacings.lg};
  ${Breakpoints.minMedia.tablet} {
    padding: 0;
  }

  transition: all 0.5s;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${Breakpoints.size.desktop};
  width: 100%;
`

const Home: NextPage = () => {
  const [bg, setBg] = useState(Colors.background)
  injectStyle()

  const setTheme = (theme: Theme) => {
    switch (theme) {
      case Theme.DARK:
        setBg(Colors.background)
        break
      case Theme.GLITCH:
        setBg('white')
        break
      case Theme.FISHTANK:
        setBg(Colors.background3)
        break
    }
  }

  return (
    <Container bg={bg}>
      <Header />
      <Content>
        <Mint setTheme={setTheme} />
        <About setTheme={setTheme} />
      </Content>
      <Team setTheme={setTheme} />
    </Container>
  )
}

export default Home
