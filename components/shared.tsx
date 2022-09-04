import { Typography } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import styled from 'styled-components'
import { Spacings } from '../styles/spacings'

const { Title } = Typography

export const StyledTitle = styled(Title)`
  text-align: center;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin-bottom: ${Spacings.xl};
`

export const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

export const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${Spacings.md};
  max-width: 500px;
`

export const StyledLink = styled.a<{ dark?: boolean }>`
  color: ${({ dark }) => (dark ? 'darkcyan' : 'lightcyan')} !important;
  text-decoration: underline;
  cursor: pointer;
`

export enum Theme {
  DARK,
  GLITCH,
  FISHTANK
}
