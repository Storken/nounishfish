import { useMemo } from 'react'
import styled from 'styled-components'
import { Breakpoints } from '../styles/breakpoints'

type fishProps = {
  size: 'small' | 'medium' | 'large'
  index?: number
  name?: string
}

const FishImage = styled.img<{ size: string }>`
  height: 100px;
  width: 100px;
  ${Breakpoints.minMedia.tablet} {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

const Fish = ({ size, index, name }: fishProps) => {
  const fishSize = useMemo(() => {
    switch (size) {
      case 'large':
        return '400'
      case 'medium':
        return '200'
      case 'small':
        return '100'
    }
  }, [size])

  const getSrc = (name: string) => `/assets/fish/${name}.png`

  const src = useMemo(() => {
    if (name) return name
    if (index) return index.toString()

    return (Math.floor(Math.random() * 12) + 1).toString()
  }, [index, name])

  return (
    <FishImage
      width={fishSize}
      height={fishSize}
      src={getSrc(src)}
      size={`${fishSize}px`}
    />
  )
}

export default Fish
