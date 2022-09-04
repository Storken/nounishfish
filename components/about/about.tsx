import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Colors } from '../../styles/colors'
import { Spacings } from '../../styles/spacings'
import Fish from '../fish'
import Glitch from './glitch'
import { Container, StyledParagraph, StyledTitle, Theme } from '../shared'
import { getRandomNumber, sleep } from '../../utils/helpers'
import Bouncing from './bouncing'

const StyledContainer = styled(Container)`
  * {
    color: ${Colors.background};
  }
`

const Box = styled.div.attrs((props: any) => ({
  style: {
    left: `${props.x}%`,
    top: `${props.y}%`,
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundColor: `${props.bg}`
  }
}))`
  position: absolute;
`

const FishContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 100%;
  overflow: hidden;
  justify-content: center;
  margin: ${Spacings.xl} 0;
`

const Content = styled.div`
  max-width: 500px;
  margin: ${Spacings.xl} 0;
`

const GlitchTitleContainer = styled.div`
  position: relative;
  width: 160px;
  margin-left: 50%;
  transform: translateX(-50%);
`

const StyledGlitchTitle = styled(StyledTitle)<{ left?: boolean }>`
  flex-grow: 0;
  margin: 0;
  position: absolute;
  top: ${({ left }) => (left ? '-2px' : '2px')};
  left: 0;
  color: ${({ left }) => (left ? 'red' : 'blue')} !important;

  animation: ${({ left }) => (left ? 'glitch-left' : 'glitch-right')} 200ms
    infinite alternate;

  @keyframes glitch-left {
    0% {
      transform: translateX(-6px);
    }
    5% {
      transform: translateX(-4px);
    }
    10% {
      transform: translateX(-6px);
    }
    15% {
      transform: translateX(-4px);
    }
    90% {
      transform: translateX(-4px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes glitch-right {
    0% {
      transform: translateX(6px);
    }
    5% {
      transform: translateX(4px);
    }
    10% {
      transform: translateX(6px);
    }
    15% {
      transform: translateX(4px);
    }
    90% {
      transform: translateX(4px);
    }
    100% {
      transform: translateX(0);
    }
  }
`

type aboutProps = {
  setTheme: (theme: Theme) => void
}

const About = ({ setTheme }: aboutProps) => {
  const { ref, inView } = useInView({ threshold: 0.6 })
  const [tick, setTick] = useState(0)
  const [inProgress, setInProgress] = useState(false)
  const [glitchTitle, setGlitchTitle] = useState<JSX.Element>()

  useEffect(() => {
    if (inView) {
      setTheme(Theme.GLITCH)
    }
  }, [inView, setTheme])

  const nextGlitch = async () => {
    const sleepyTime = getRandomNumber(5)
    await sleep(sleepyTime)
    setGlitchTitle(
      <Box
        // @ts-ignore
        x={-50}
        y={10}
        width={200}
        height={40}
        bg={'black'}
      />
    )
    await sleep(0.1)
    setGlitchTitle(undefined)
    setInProgress(false)
  }

  const updateTick = async () => {
    await sleep(1)
    setTick(tick + 1)
  }

  useEffect(() => {
    updateTick()
    if (!inProgress) {
      setInProgress(true)
      nextGlitch()
    }
  }, [tick])

  return (
    <StyledContainer ref={ref}>
      {inView && <Glitch />}
      {inView && <Bouncing />}
      <Content>
        <GlitchTitleContainer>
          {glitchTitle && glitchTitle}
          <>
            <StyledGlitchTitle left={true}>About</StyledGlitchTitle>
            <StyledGlitchTitle>About</StyledGlitchTitle>
            <StyledTitle style={{ position: 'relative', zIndex: 1 }}>
              About
            </StyledTitle>
          </>
        </GlitchTitleContainer>
        <StyledParagraph>
          The year is 69BC in the underwater city of Acropolis, beneath the
          depths of Gooch Island. Far past the deepest of seas and treacherous
          waters, a fish with honor and loyalty was born, Lord Grim.
        </StyledParagraph>
        <StyledParagraph>
          A wild cryptoad appeared amongst Lord Grim
        </StyledParagraph>
        <StyledParagraph>
          &quot;No road maps, just !vibe&quot; said the cryptoad.
        </StyledParagraph>
        <StyledParagraph>
          In great confusion, Lord Grim then passed the prophecy on to the rest
          of the NounishFish. With such sage advice from the mysterious toad,
          the NounishFish were able to retaliate against the giant squid mfer.
        </StyledParagraph>
        <StyledParagraph>
          Lord Grim, destined to save them all, only saved 6,969 of them, due to
          fin problems and swimming abilities.
        </StyledParagraph>
        <StyledParagraph>
          One fish, with one mission. Destined to be great.
        </StyledParagraph>
      </Content>
      <FishContainer>
        {Array.from(Array(5)).map((_, i) => (
          <Fish size='medium' name={(i*2+2).toString()} key={'about-fish-' + i} />
        ))}
      </FishContainer>
    </StyledContainer>
  )
}

export default About
