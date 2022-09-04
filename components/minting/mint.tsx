import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import useContractData from '../../contexts/contract-data'
import useWeb3 from '../../contexts/web3'
import { Colors } from '../../styles/colors'
import { Font } from '../../styles/font'
import { Spacings } from '../../styles/spacings'
import Rain from './rain'
import { Container, StyledParagraph, StyledTitle, Theme } from '../shared'
import Spinner from '../spinner'
import MintForm from './mint-form'
import Fish from '../fish'

const ConnectButton = styled.button`
  background: black;
  font-family: 'PressStart2P';
  border: 0;
  font-size: ${Font.size.subtitle};
  padding: ${Spacings.md} ${Spacings.lg};
  cursor: pointer;
`

const FishContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 100%;
  overflow: hidden;
  justify-content: center;
  margin: ${Spacings.xl} 0;
`

const FishContent = styled.div<{ delay: number }>`
  animation: fold-in 1s forwards;
  animation-delay: ${({ delay }) => delay}ms;
  transform: scaleX(0);

  @keyframes fold-in {
    to {
      transform: scaleX(1);
    }
  }
`

enum mintStates {
  INITIAL_LOAD,
  WRONG_NETWORK,
  NO_ADDRESS,
  OK
}

type mintProps = {
  setTheme: (theme: Theme) => void
}

const Mint = ({ setTheme }: mintProps) => {
  const { address, loadWeb3Modal, wrongNetwork } = useWeb3()
  const { publicSaleIsActive, initialLoading, totalSupply } = useContractData()
  const { ref, inView, entry } = useInView({ threshold: 0.6 })

  useEffect(() => {
    if (inView) {
      setTheme(Theme.DARK)
    }
  }, [inView, setTheme])

  const mintState = useMemo(() => {
    if (!address) return mintStates.NO_ADDRESS
    if (initialLoading) return mintStates.INITIAL_LOAD
    if (wrongNetwork) return mintStates.WRONG_NETWORK
    return mintStates.OK
  }, [address, wrongNetwork, initialLoading])

  const mintComponent = useMemo(() => {
    switch (mintState) {
      case mintStates.NO_ADDRESS:
        return (
          <ConnectButton onClick={() => loadWeb3Modal()}>
            Connect web3
          </ConnectButton>
        )
      case mintStates.INITIAL_LOAD:
        return <Spinner />
      case mintStates.WRONG_NETWORK:
        return (
          <StyledTitle level={5} style={{ color: 'red' }}>
            Wrong network
          </StyledTitle>
        )
      case mintStates.OK:
      default:
        return (
          <>
            <StyledParagraph key='mint-p1'>
              Connected wallet: <b>{address?.substring(0, 8)}...</b>
            </StyledParagraph>
            <StyledParagraph key='mint-p2'>
              Currently minted: {totalSupply}/6969
            </StyledParagraph>
            <StyledParagraph key='mint-p4'>
              Minting is FREE: 0Ξ / token
            </StyledParagraph>
            {publicSaleIsActive && <MintForm />}
            {!publicSaleIsActive && (
              <StyledTitle level={3}>Sale is not open yet</StyledTitle>
            )}
          </>
        )
    }
  }, [address, loadWeb3Modal, mintState, publicSaleIsActive, totalSupply])

  return (
    <Container ref={ref}>
      {inView && <Rain />}
      <FishContainer>
        {Array.from(Array(5)).map((_, i) => (
          <FishContent delay={i * 1000} key={'mint-fish-' + i}>
            <Fish size='medium' index={i + 1} />
          </FishContent>
        ))}
      </FishContainer>
      <StyledTitle>SOLD OUT, THANK YOU ALL</StyledTitle>
      <FishContainer>
        {Array.from(Array(5)).map((_, i) => (
          <FishContent delay={4000 - i * 1000} key={'mint-fish2-' + i}>
            <Fish size='medium' index={i + 6} />
          </FishContent>
        ))}
      </FishContainer>
    </Container>
  )
}

export default Mint
