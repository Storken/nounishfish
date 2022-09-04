import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import FishTank from './fish-tank'
import { Container, StyledParagraph, StyledTitle, Theme } from '../shared'
import styled from 'styled-components'
import { Spacings } from '../../styles/spacings'
import { socialMedia } from '../../utils/config'
import { Colors } from '../../styles/colors'
import { Breakpoints } from '../../styles/breakpoints'

const Wrapper = styled.div`
  width: 100%;
`

const TextContainer = styled(Container)`
  align-items: flex-start;
  max-width: 500px;
  h3 {
    text-align: left;
    line-height: 1.4;
  }
  position: relative;
  z-index: 2;
`

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${Spacings.xl};
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  max-width: ${Breakpoints.size.desktop};
`

type teamProps = {
  setTheme: (theme: Theme) => void
}

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${Spacings.md} ${Spacings.lg};
  min-width: 300px;
`

const MemberImage = styled.img`
  border-radius: 200px;
  border: 5px solid white;
`

const TwitterLogo = styled.img`
  transition: all 0.2s;
  &:hover {
    transform: rotateZ(25deg);
  }
`

const FooterBanner = styled.img`
  width: 100%;
`

const FooterContainer = styled.div`
  background: linear-gradient(${Colors.background3}, #144f94);
  margin: -${Spacings.sm} -${Spacings.lg};
  ${Breakpoints.minMedia.tablet} {
    margin: 0;
  }
`

const Team = ({ setTheme }: teamProps) => {
  const { ref, inView, entry } = useInView({ threshold: 1 })
  const [fishTankRef, fishTankInView] = useInView({ threshold: 0.1 })

  const teamMembers = [
    {
      name: 'LordGrim',
      title: 'Main Artist / Pixel Wizard',
      twitter: 'https://twitter.com/CryptoAlpacaNFT',
      src: '/assets/fish/grim.gif'
    },
    {
      name: 'Choons',
      title: 'Co Artist / Founder',
      twitter: 'https://twitter.com/monkeychoons',
      src: '/assets/fish/choons2.png'
    },
    {
      name: 'Emkey',
      title: 'Frontend Developer',
      twitter: 'https://twitter.com/TheNFTKid0x',
      src: '/assets/fish/jjust.gif'
    },
    {
      name: 'Moonfarm',
      title: 'Frontend / Smart Contract Developer ',
      twitter: 'https://twitter.com/moonfarm_eth',
      src: '/assets/fish/moonfarm.gif'
    },
    {
      name: 'Jjust.eth',
      title: 'Community Manager / Moderator',
      twitter: 'https://twitter.com/justboredape',
      src: '/assets/fish/emkey.gif'
    },
    {
      name: 'Howflyboys',
      title: 'Fish builder / Moderator',
      twitter: 'https://twitter.com/currensydollasn',
      src: '/assets/fish/howfly.gif'
    },
    {
      name: 'Brypto',
      title: 'Marketing Lead / Strategic Planner',
      twitter: 'https://twitter.com/bryptoburrency',
      src: '/assets/fish/brypto2.png'
    },
    {
      name: 'NFTer_Matt',
      title: 'Merch Designer / Community Manager',
      twitter: 'https://twitter.com/nfter_matt',
      src: '/assets/fish/matt2.png'
    },
    {
      name: 'Trenkyy',
      title: 'Fish builder / NPC',
      twitter: 'https://twitter.com/trenkyy',
      src: '/assets/fish/trenkyy.png'
    }
  ]

  useEffect(() => {
    if (inView) {
      setTheme(Theme.FISHTANK)
    }
  }, [inView, setTheme, entry])

  return (
    <>
      <Wrapper ref={fishTankRef}>
        <Container>
          <TextContainer>
            <div ref={ref}>
              <StyledTitle style={{ alignSelf: 'center' }}>FAQ</StyledTitle>
              <StyledTitle level={3}>What is a cc0 project?</StyledTitle>
              <StyledParagraph>
                Projects with CC0 licenses are on the public domain, meaning
                anyone can use the content without worrying about copyright
                infringement.
              </StyledParagraph>
            </div>
            <StyledTitle level={3}>Is NounishFish a cc0 project?</StyledTitle>
            <StyledParagraph>
              Yes, Nounishfish is on the public domain so anyone can use the
              artwork for whatever they want!
            </StyledParagraph>
            <StyledTitle level={3}>
              Fishbuilders, and how you can become one
            </StyledTitle>
            <StyledParagraph>
              Fishbuilders are artist/devs/communitybuilders that share ideas on
              how to enrich the fish community. If you have any suggestions or
              want to help us build, place your ideas/artwork in the #fish-ideas
              channel on discord. We welcome creatives and artist to share!
            </StyledParagraph>
            <StyledTitle level={3}>Wen mint?</StyledTitle>
            <StyledParagraph>
              We have not set the launch date yet but will keep you guys updated
              on the discord.
            </StyledParagraph>
          </TextContainer>
          <StyledTitle style={{ alignSelf: 'center' }}>Team</StyledTitle>
          <TeamContainer>
            {teamMembers.map(({ name, twitter, title, src }) => (
              <MemberContainer key={name}>
                <MemberImage height='200px' width='200px' src={src} />
                <StyledTitle level={5}>{name}</StyledTitle>
                <StyledParagraph style={{textAlign: 'center'}}>{title}</StyledParagraph>
                <a href={twitter}>
                  <TwitterLogo
                    height='40px'
                    width='40px'
                    src={socialMedia.twitter.icon}
                  />
                </a>
              </MemberContainer>
            ))}
          </TeamContainer>
          {fishTankInView && <FishTank />}
        </Container>
        <FooterContainer>
          <FooterBanner src='/assets/bottom.png' />
        </FooterContainer>
      </Wrapper>
    </>
  )
}

export default Team
