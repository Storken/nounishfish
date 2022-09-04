import { Dispatch, MutableRefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { sleep } from '../../utils/helpers'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const FishContainer = styled.div.attrs(
  ({ startPosition }: { startPosition: number }) => ({
    style: {
      top: `${startPosition}%`
    }
  })
)`
  position: absolute;
  width: 100%;
`

const PixelFish = styled.img.attrs(
  ({ duration, reverse }: { duration: number; reverse: boolean }) => ({
    style: {
      left: `${reverse ? '-60px' : '100vw'}`,
      animation: `${reverse ? 'ltr' : 'rtl'} ${duration}s forwards`
    }
  })
)`
  position: absolute;

  @keyframes ltr {
    0% {
      transform: translateX(0) scaleX(-1);
    }
    100% {
      transform: translateX(130vw) scaleX(-1);
    }
  }

  @keyframes rtl {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-130vw);
    }
  }
`

const FishBubble = styled.div.attrs(
  ({ y, startPosition }: { y: number; startPosition: number }) => ({
    style: {
      top: `${y}%`,
      left: `${startPosition}px`
    }
  })
)`
  position: absolute;
  height: 4px;
  width: 4px;
  background-color: white;
  animation: up 1.5s linear forwards;

  @keyframes up {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-200px);
      opacity: 0;
    }
  }
`

type FishData = {
  y: number
  reverse: boolean
  e: JSX.Element
}

const FishTank = () => {
  const fishRef1 = useRef()
  const fishRef2 = useRef()
  const fishRef3 = useRef()
  const [tick, setTick] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [fish1Bubble, setFish1Bubble] = useState<JSX.Element>()
  const [fish1, setFish1] = useState<FishData>()
  const [fish2Bubble, setFish2Bubble] = useState<JSX.Element>()
  const [fish2, setFish2] = useState<FishData>()
  const [fish3Bubble, setFish3Bubble] = useState<JSX.Element>()
  const [fish3, setFish3] = useState<FishData>()

  const generateFishBubble = async (
    index: number,
    ref: MutableRefObject<unknown>,
    y: number = 0,
    reverse: boolean = false,
    setter: Dispatch<JSX.Element | undefined>
  ) => {
    if (ref.current) {
      const rect = ((ref.current as unknown) as HTMLImageElement).getBoundingClientRect()
      let startPosition = Math.floor(rect.x)
      if (reverse) {
        startPosition += rect.width
      }
      const id = 'fish' + index + 'bubble-' + startPosition
      const bubble = (
        <FishBubble
          id={id}
          key={id}
          // @ts-ignore
          y={y}
          // @ts-ignore
          startPosition={Number(startPosition)}
        />
      )

      setter(bubble)
      const sleepTime = Math.random() * 3
      await sleep(sleepTime + 2)

      setter(undefined)
    }
  }

  const generateFish = async (
    ref: MutableRefObject<unknown>,
    setter: Dispatch<FishData | undefined>
  ) => {
    const reverse = Math.random() * 10 > 5
    const startPosition = Math.floor(Math.random() * 90) + 5
    const duration = Math.floor(Math.random() * 10 + 8)
    const f = {
      y: startPosition,
      reverse,
      e: (
        <FishContainer
          //@ts-ignore
          startPosition={startPosition}
        >
          <PixelFish
            // @ts-ignore
            ref={ref}
            height='40'
            src='/assets/pixel-fish-asset.svg'
            duration={duration}
            reverse={reverse}
          />
        </FishContainer>
      )
    }
    setter(f)
    const sleepTime = Math.random() * 5
    await sleep(sleepTime + duration)

    setter(undefined)
  }

  const updateTick = async () => {
    await sleep(1)
    setTick(tick + 1)
  }

  const generate = async (first: boolean) => {
    setGenerating(true)
    first && (await sleep(1))
    if (!fish1) generateFish(fishRef1, setFish1)
    if (!fish1Bubble)
      generateFishBubble(1, fishRef1, fish1?.y, fish1?.reverse, setFish1Bubble)

    first && (await sleep(4))
    if (!fish2) generateFish(fishRef2, setFish2)
    if (!fish2Bubble)
      generateFishBubble(2, fishRef2, fish2?.y, fish2?.reverse, setFish2Bubble)

    first && (await sleep(7))
    if (!fish3) generateFish(fishRef3, setFish3)
    if (!fish3Bubble)
      generateFishBubble(3, fishRef3, fish3?.y, fish3?.reverse, setFish3Bubble)
    setGenerating(false)
  }

  useEffect(() => {
    if (!generating) generate(tick === 0)
    updateTick()
  }, [tick])

  return (
    <Container>
      {fish1Bubble}
      {fish1?.e}
      {fish2Bubble}
      {fish2?.e}
      {fish3Bubble}
      {fish3?.e}
    </Container>
  )
}

export default FishTank
