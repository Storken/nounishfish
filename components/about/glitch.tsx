import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getRandomNumber, sleep } from '../../utils/helpers'
import { FixedContainer } from '../shared';

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
  z-index: 3;
`

const GlitchFish = styled.div`
  position: absolute;
  background-image: url('/assets/fish/glitch.gif');
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100%;
`

const Glitch = () => {
  const glitchColors = ['blue', 'red', 'yellow', 'black', 'greenyellow']
  const [tick, setTick] = useState(0)
  const [glitchElements, setGlitchElements] = useState<JSX.Element[]>([])
  const [inProgress, setInProgress] = useState(false)


  const nextGlitch = async () => {
    await sleep(getRandomNumber(2))
    const count = getRandomNumber(30)
    const boxes: JSX.Element[] = []
    const showFish = getRandomNumber(15) < 5

    if (showFish) {
      boxes.push(<GlitchFish key='glitchfish' />)
    } else {
      for (let i = 0; i < count; i++) {
        const w = getRandomNumber(300)
        const h = getRandomNumber(300)
        const x = getRandomNumber(100)
        const y = getRandomNumber(100)
        const color = getRandomNumber(5)
        boxes.push(
          <Box
            key={`box-${w}${h}${x}${y}`}
            //@ts-ignore
            bg={glitchColors[color]}
            //@ts-ignore
            width={w}
            //@ts-ignore
            height={h}
            //@ts-ignore
            x={x}
            //@ts-ignore
            y={y}
            //@ts-ignore
            delay={0}
          />
        )
      }
    }
    setGlitchElements(boxes)
    if (showFish) await sleep(0.2)
    else await sleep(0.05)
    setGlitchElements([])
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

  return <FixedContainer>{glitchElements.map(e => e)}</FixedContainer>
}

export default Glitch
