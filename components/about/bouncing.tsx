import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Breakpoints } from '../../styles/breakpoints'
import { Font } from '../../styles/font'
import { getRandomNumber, sleep } from '../../utils/helpers'
import { FixedContainer, StyledTitle } from '../shared'

const BouncingImage = styled.img.attrs((props: any) => ({
  style: {
    left: `${props.x}px`,
    top: `${props.y}px`,
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundColor: `${props.bg}`
  }
}))`
  position: absolute;
`

const GlitchTitleContainer = styled.div.attrs(
  ({ x, y }: { x: number; y: number }) => ({
    style: {
      top: `${y}px`,
      left: `${x}px`
    }
  })
)`
  position: absolute;
  width: 352px;
  height: 32px;
  opacity: 0.7;
  z-index: 1;
`

const StyledGlitchTitle = styled(StyledTitle).attrs(
  ({ top, animation }: { top: number; animation: string }) => ({
    style: {
      top: `${top}px`,
      animation: `${animation} 200ms infinite alternate`
    }
  })
)`
  color: ${(props: any) => props.color} !important;
  flex-grow: 0;
  margin: 0;
  position: absolute;
  left: 0;
  font-size: ${Font.size.subtitle};
  ${Breakpoints.minMedia.tablet} {
    font-size: 2em;
  }

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
`

const Bouncing = () => {
  const [tick, setTick] = useState(0)
  const [titleMovement, setTitleMovement] = useState({ dx: 5, dy: 5 })
  const [titlePosition, setTitlePosition] = useState({
    x: 10,
    y: 10,
    width: 352,
    height: 32
  })
  const [imageMovement, setImageMovement] = useState({ dx: -3, dy: -3 })
  const [imagePosition, setImagePosition] = useState({
    x: window.screen.width / 2,
    y: window.screen.height / 2,
    width: 100,
    height: 100
  })

  const updateTick = async () => {
    await sleep(0.01)
    setTick((tick + 1) % 1000)
  }

  const toggleTitleDx = () => {
    setTitleMovement({ dx: -titleMovement.dx, dy: titleMovement.dy })
  }

  const toggleTitleDy = () => {
    setTitleMovement({ dx: titleMovement.dx, dy: -titleMovement.dy })
  }

  const toggleImageDx = () => {
    setImageMovement({ dx: -imageMovement.dx, dy: imageMovement.dy })
  }

  const toggleImageDy = () => {
    setImageMovement({ dx: imageMovement.dx, dy: -imageMovement.dy })
  }

  const updateTitle = () => {
    // title bounce
    const { dx, dy } = titleMovement
    const { x, y, width, height } = titlePosition
    const newX = x + dx
    const newY = y + dy
    const maxRight = window.screen.width - width
    const maxBottom = window.screen.height - height
    const randomlyToggleX = getRandomNumber(10000) < 2
    const randomlyToggleY = getRandomNumber(10000) < 2
    if (newX >= maxRight || newX <= 0 || randomlyToggleX) {
      toggleTitleDx()
    }
    if (newY >= maxBottom || newY <= 0 || randomlyToggleY) {
      toggleTitleDy()
    }
    setTitlePosition({ x: newX, y: newY, width, height })
  }

  const updateImage = () => {
    // image bounce
    const { dx, dy } = imageMovement
    const { x, y, width, height } = imagePosition
    const newX = x + dx
    const newY = y + dy
    const maxRight = window.screen.width - width
    const maxBottom = window.screen.height - height
    const randomlyToggleX = getRandomNumber(10000) < 2
    const randomlyToggleY = getRandomNumber(10000) < 2
    if (newX >= maxRight || newX <= 0 || randomlyToggleX) {
      toggleImageDx()
    }
    if (newY >= maxBottom || newY <= 0 || randomlyToggleY) {
      toggleImageDy()
    }
    setImagePosition({ x: newX, y: newY, width, height })
  }

  useEffect(() => {
    updateTick()
    updateTitle()
    updateImage()
  }, [tick])

  useEffect(() => {
    if (window.screen.width < 768) {
      setTitlePosition({ ...titlePosition, width: 176, height: 16 })
    }
  }, [])

  return (
    <FixedContainer>
      <BouncingImage
        src='/assets/fish/fidenza.png'
        height={imagePosition.height}
        width={imagePosition.width}
        //@ts-ignore
        x={imagePosition.x}
        y={imagePosition.y}
      />
      <GlitchTitleContainer
        //@ts-ignore
        x={titlePosition.x}
        y={titlePosition.y}
      >
        <StyledGlitchTitle
          //@ts-ignore
          top={2}
          color={'blue'}
          animation={'glitch-left'}
        >
          NounishFish
        </StyledGlitchTitle>
        <StyledGlitchTitle
          //@ts-ignore
          top={-2}
          color={'red'}
          animation={'glitch-right'}
        >
          NounishFish
        </StyledGlitchTitle>
        <StyledGlitchTitle
          //@ts-ignore
          top={0}
          color={'black'}
          animation={'none'}
        >
          NounishFish
        </StyledGlitchTitle>
      </GlitchTitleContainer>
    </FixedContainer>
  )
}
export default Bouncing
