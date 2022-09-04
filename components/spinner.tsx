import { Typography } from 'antd'
import styled from 'styled-components'

const { Title } = Typography

const Container = styled.div`
  width: 200px;
  height: 70px;
  position: relative;
`

const LoadingText = styled(Title)`
  position: absolute;
  left: 50%;
  bottom: 0;
  margin: 0;
  padding: 0;
  transform: translateX(-50%);
  color: rgba(250, 250, 250, 0.5);
`

const PixelFish = styled.img`
  position: absolute;
  right: 0;
  top: 0;

  animation-name: swimming-fish;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  @keyframes swimming-fish {
    0% {
      transform: translateX(0);
    }
    40% {
      transform: translateX(-160px);
    }
    60% {
      transform: translateX(-160px) scaleX(-1);
    }
    90% {
      transform: translateX(0) scaleX(-1);
    }
    100% {
      transform: translateX(0);
    }
  }
`

const Spinner = () => {
  return (
    <Container>
      <LoadingText level={3}>Loading...</LoadingText>
      <PixelFish height='40' src='/assets/pixel-fish-asset.svg' />
    </Container>
  )
}

export default Spinner
