import { Input } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import useContractData from '../../contexts/contract-data'
import useContractMutations from '../../contexts/contract-mutations'
import useWhitelist from '../../contexts/whitelist'
import { Colors } from '../../styles/colors'
import { Font } from '../../styles/font'
import { Spacings } from '../../styles/spacings'
import { StyledParagraph, StyledTitle } from '../shared'

const Content = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin-bottom: ${Spacings.xl};
`

const MintContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const MintTools = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StyledInput = styled(Input)`
  font-size: ${Font.size.subtitle};
  font-family: 'PressStart2P';
  background-color: ${Colors.background};
  border: 0;
  border-bottom: 2px solid white;
  padding: ${Spacings.md} ${Spacings.lg};
  width: 120px;
`

const MintButton = styled.button`
  background-color: ${Colors.success};
  font-family: 'PressStart2P';
  color: black;
  border: 0;
  padding: ${Spacings.md};
  font-size: ${Font.size.subtitle};
  margin-top: ${Spacings.lg};
  width: 200px;
  cursor: pointer;
`

const AmountButton = styled.button`
  background-color: transparent;
  font-family: 'PressStart2P';
  border: 0;
  padding: ${Spacings.md};
  font-size: ${Font.size.subtitle};
  cursor: pointer;
`

const MintForm = () => {
  const { mintToken } = useContractMutations()
  const [mintAmount, setMintAmount] = useState(5)

  return (
    <Content>
      <StyledTitle level={3}>Public sale</StyledTitle>
      <MintContainer>
        <MintTools>
          <MintContainer>
            <AmountButton
              onClick={() =>
                setMintAmount(mintAmount > 1 ? mintAmount - 1 : mintAmount)
              }
            >
              -
            </AmountButton>
            <StyledInput
              value={mintAmount}
              type='number'
              min='1'
              max='10'
              disabled
            />
            <AmountButton
              onClick={() =>
                setMintAmount(mintAmount < 10 ? mintAmount + 1 : mintAmount)
              }
            >
              +
            </AmountButton>
          </MintContainer>
        </MintTools>
      </MintContainer>
      <MintButton onClick={() => mintToken(mintAmount)}>Mint</MintButton>
    </Content>
  )
}

export default MintForm
