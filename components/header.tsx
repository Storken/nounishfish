import styled from 'styled-components'
import { Breakpoints } from '../styles/breakpoints'
import { Spacings } from '../styles/spacings'
import { socialMedia } from '../utils/config'
import Link from 'next/link'
import { Typography } from 'antd'
import { Font } from '../styles/font'

const { Title } = Typography

const Container = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  width: 100%;

  ${Breakpoints.minMedia.tablet} {
    max-width: ${Breakpoints.size.tablet};
    padding: 0 ${Spacings.lg};
  }

  ${Breakpoints.minMedia.desktop} {
    max-width: ${Breakpoints.size.desktop};
    padding: 0 ${Spacings.lg};
  }
`

const SMLink = styled.a<{ src: string; size?: string }>`
  display: block;
  height: 1.5rem;
  width: 1.5rem;
  margin: 0 ${Spacings.md};
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  ${({ size }) => size && `transform: scale(${size});`}

  ${Breakpoints.minMedia.tablet} {
    height: 2rem;
    width: 2rem;
    margin: 0 ${Spacings.md};
  }
`

const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 10px;
`

const LogoLink = styled.a`
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLogo = styled.img`
  height: 40px;
  width: auto;
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledTitle = styled(Title)`
  font-size: ${Font.size.logo};
  margin: 0;
  padding: 0;
  margin-left: ${Spacings.sm};
  line-height: 1.5;
`

export const Header = () => {
  return (
    <Container>
      <Content>
        <Link href='/' passHref>
          <LogoLink>
            <StyledLogo src='/assets/logo.svg' />
            <StyledTitle>
              Nounish
              <br />
              Fish
            </StyledTitle>
          </LogoLink>
        </Link>
        <RightContainer>
          <SocialMedia>
            <SMLink
              href={socialMedia.discord.link}
              src={socialMedia.discord.icon}
              target='_blank'
              rel='noopener noreferrer'
            />
            <SMLink
              href={socialMedia.twitter.link}
              src={socialMedia.twitter.icon}
              size={'1.4'}
              target='_blank'
              rel='noopener noreferrer'
            />
            <SMLink
              href={socialMedia.opensea.link}
              src={socialMedia.opensea.icon}
              target='_blank'
              rel='noopener noreferrer'
            />
          </SocialMedia>
        </RightContainer>
      </Content>
    </Container>
  )
}
