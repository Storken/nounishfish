import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { sleep } from '../../utils/helpers'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
`

const BackContainer = styled.div`
  position: fixed;
  top: -60px;
  left: 0;
  right: 0;
  bottom: 60px;
  pointer-events: none;
  opacity: 0.7;
`

const Droplet = styled.div.attrs((props: any) => ({
  style: {
    bottom: `${props.randoFiver - 1 + 100}%`,
    left: `${props.back ? 'auto' : `${props.startPosition}%`}`,
    right: `${props.back ? `${props.startPosition}%` : 'auto'}`,
    animationDelay: `${props.randoHundo}ms`,
    animationDuration: `${props.randoHundo + 700}ms`
  }
}))`
  position: absolute;
  width: 15px;
  height: 120px;
  pointer-events: none;
  animation: drop 0.5s linear infinite;

  @keyframes drop {
    0% {
      transform: translateY(0vh);
    }
    75% {
      transform: translateY(95vh);
    }
    100% {
      transform: translateY(95vh);
    }
  }
`

const DropletStem = styled.div<{
  startPosition: number
  randoFiver: number
  randoHundo: number
  back?: boolean
}>`
  width: 1px;
  height: 60%;
  margin-left: 7px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.5)
  );
  animation: stem 0.5s linear infinite;
  animation-delay: ${({ randoHundo }) => randoHundo}ms;
  animation-duration: ${({ randoHundo }) => randoHundo + 700}ms;

  @keyframes stem {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`

const DropletSplat = styled.div<{
  startPosition: number
  randoFiver: number
  randoHundo: number
  back?: boolean
}>`
  width: 15px;
  height: 10px;
  border-top: 2px dotted rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  opacity: 1;
  transform: scale(0);
  animation: splat 0.5s linear infinite;
  animation-delay: ${({ randoHundo }) => randoHundo}ms;
  animation-duration: ${({ randoHundo }) => randoHundo + 500}ms;

  @keyframes splat {
    0% {
      opacity: 1;
      transform: scale(0);
    }
    80% {
      opacity: 1;
      transform: scale(0);
    }
    90% {
      opacity: 0.5;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }
`

const flashAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const shake = keyframes`
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(10%, 0);
  }
  50% {
    transform: translate(0, -10%);
  }
  75% {
    transform: translate(10%, -10%);
  }
  100% {
    transform: translate(-10%, 0);
  }
`

const Lightning1 = styled.img`
  position: absolute;
  left: 5%;
  top: 0;
  min-height: 100%;
  width: auto;
  opacity: 0;
  animation: ${flashAnimation} 200ms linear forwards;
`

const Lightning2 = styled.img`
  position: absolute;
  right: 5%;
  top: 0;
  min-height: 100%;
  width: auto;
  opacity: 0;
  animation: ${flashAnimation} 200ms 300ms linear forwards;
`

const Lightning3 = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 0;
  min-height: 100%;
  width: auto;
  animation: ${flashAnimation} 500ms 500ms linear forwards;
  opacity: 0;
`

const FishContainer = styled.div`
  animation: ${flashAnimation} 2s forwards;
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FishBackdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  position: absolute;
`

const ScaryFish = styled.img`
  min-height: 100%;
  width: auto;
  z-index: 3;
  animation: ${shake} 100ms linear alternate-reverse infinite;
`

const Rain = () => {
  const [droplets, setDroplets] = useState([])
  const [backDroplets, setBackDroplets] = useState([])
  const [flashes, setFlashes] = useState([])

  const makeItRain = () => {
    //clear out everything
    setDroplets([])
    setBackDroplets([])

    let increment = 0

    const drops = []
    const backDrops = []

    let shrink = 4
    if (window.screen.width >= 768) shrink = 2

    while (increment < 100 / shrink) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1)
      //random number between 5 and 2
      const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2)
      //increment
      increment += randoFiver
      //add in a new raindrop with various randomizations to certain CSS properties

      const newDrop = (
        <Droplet
          key={`drop-${increment}`}
          //@ts-ignore
          startPosition={increment * shrink}
          //@ts-ignore
          randoFiver={randoFiver}
          //@ts-ignore
          randoHundo={randoHundo}
        >
          <DropletStem
            startPosition={increment * shrink}
            randoFiver={randoFiver}
            randoHundo={randoHundo}
          />
          <DropletSplat
            startPosition={increment * shrink}
            randoFiver={randoFiver}
            randoHundo={randoHundo}
          />
        </Droplet>
      )

      const newBackDrop = (
        <Droplet
          key={`backdrop-${increment}`}
          //@ts-ignore
          startPosition={increment * shrink}
          //@ts-ignore
          randoFiver={randoFiver}
          //@ts-ignore
          randoHundo={randoHundo}
          back
        >
          <DropletStem
            startPosition={increment * shrink}
            randoFiver={randoFiver}
            randoHundo={randoHundo}
            back
          />
          <DropletSplat
            startPosition={increment * shrink}
            randoFiver={randoFiver}
            randoHundo={randoHundo}
            back
          />
        </Droplet>
      )
      drops.push(newDrop)
      backDrops.push(newBackDrop)
    }

    // @ts-ignore
    setDroplets(drops)
    // @ts-ignore
    setBackDroplets(backDrops)
    flashScaryFish(true)
  }

  const flashScaryFish = async (first: boolean) => {
    const randomSleep = Math.floor(Math.random() * 10)
    if (first) await sleep(5)
    else await sleep(randomSleep + 10)
    setFlashes([])
    const comp = [
      <FishContainer key='fc'>
        <ScaryFish key='sf' height='500' src='/assets/lightningfish.svg' />
        <FishBackdrop key='bd' />
      </FishContainer>,
      <Lightning1 key='lg1' height='500' src='/assets/lightning1.svg' />,
      <Lightning2 key='lg2' height='500' src='/assets/lightning2.svg' />,
      <Lightning3 key='lg3' height='500' src='/assets/lightning3.svg' />
    ]

    // @ts-ignore
    setFlashes(comp)
    flashScaryFish(false)
  }

  useEffect(() => {
    makeItRain()
  }, [])

  return (
    <>
      <Container>
        {flashes.map(f => f)}
        {droplets.map(d => d)}
      </Container>
      <BackContainer>{backDroplets.map(bd => bd)}</BackContainer>
    </>
  )
}

export default Rain
