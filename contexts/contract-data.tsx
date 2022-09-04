import { formatEther, formatUnits } from '@ethersproject/units'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import useContractLoader from '../hooks/ContractLoader'
import useWeb3 from './web3'

interface ContractContextProps {
  tokenPrice1: number
  tokenPrice2: number
  publicSaleIsActive: boolean
  userTokenBalance: number
  totalSupply: number
  initialLoading: boolean
  maxTokensPerTxn: number
  ownedTokenIds: number[]
}

type ContractProviderProps = {
  children: ReactNode
}

export const ContractContext: React.Context<ContractContextProps> = createContext<
  ContractContextProps
>({} as ContractContextProps)

export const ContractContextProvider = ({
  children
}: ContractProviderProps) => {
  const { injectedProvider, address, wrongNetwork } = useWeb3()
  const contract = useContractLoader(injectedProvider)
  const [tick, setTick] = useState(0)
  const [initialLoading, setInitialLoading] = useState(true)
  const [publicSaleIsActive, setPublicSaleIsActive] = useState(false)
  const [tokenPrice1, setTokenPrice1] = useState(0)
  const [tokenPrice2, setTokenPrice2] = useState(0)
  const [userTokenBalance, setUserTokenBalance] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [maxTokensPerTxn, setMaxTokensPerTxn] = useState(0)
  const [refetchingDynamic, setRefetchingDynamic] = useState(false)
  const [ownedTokenIds, setOwnedTokenIds] = useState<number[]>([])

  const getStaticContractValues = async () => {
    if (!contract || wrongNetwork) return
    //@ts-ignore
    const sale = await contract.publicSaleIsActive()
    //@ts-ignore
    const tokenPrice1 = await contract.tokenPrice1()
    //@ts-ignore
    const tokenPrice2 = await contract.tokenPrice2()
    //@ts-ignore
    const supply = await contract.totalSupply()
    //@ts-ignore
    const tokensPerTxn = await contract.maxTokensPerTxn()

    setTotalSupply(Number(formatUnits(supply, 'wei')))
    setPublicSaleIsActive(sale)
    setTokenPrice1(Number(formatEther(tokenPrice1)))
    setTokenPrice2(Number(formatEther(tokenPrice2)))
    setMaxTokensPerTxn(Number(formatUnits(tokensPerTxn, 'wei')))

    setInitialLoading(false)

    if (!publicSaleIsActive) getSaleState()
  }

  const getSaleState = async () => {
    if (!contract || wrongNetwork) return undefined
    //@ts-ignore
    const sale = await contract.publicSaleIsActive()

    setPublicSaleIsActive(sale)
  }

  const pollDynamicValues = () => {
    getDynamicContractValues()
    getSaleState()
    setTimeout(() => {
      setTick(tick + (1 % 5))
    }, 10000)
  }

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false)
    }, 2500)
    if (address && !wrongNetwork) {
      pollDynamicValues()
    } else if (injectedProvider?.network?.name && wrongNetwork) {
      setInitialLoading(false)
    }
  }, [tick, wrongNetwork, injectedProvider?.network?.name, address])

  const getDynamicContractValues = async () => {
    if (refetchingDynamic || !contract) return undefined
    setRefetchingDynamic(true)
    //@ts-ignore
    const supply = await contract.totalSupply()

    setTotalSupply(Number(formatUnits(supply, 'wei')))

    if (address) {
      //@ts-ignore
      const userBalance = await contract.balanceOf(address)

      setUserTokenBalance(Number(formatUnits(userBalance, 'wei')))

      if (userBalance > 0) {
        const userTokens = []
        for (let i = 0; i < userBalance; i++) {
          //@ts-ignore
          const id = await contract.tokenOfOwnerByIndex(address, i)

          userTokens.push(Number(id))
        }
        setOwnedTokenIds(userTokens)
      }
    } else {
      setTimeout(async () => {
        getDynamicContractValues()
      }, 2000)
    }
    setRefetchingDynamic(false)
  }

  useEffect(() => {
    //@ts-ignore
    if (address && contract && !wrongNetwork) {
      getStaticContractValues()
      getDynamicContractValues()
      //@ts-ignore
      contract.on('Transfer', getDynamicContractValues)
    }
  }, [contract, address, wrongNetwork])

  return (
    <ContractContext.Provider
      value={{
        publicSaleIsActive,
        tokenPrice1,
        tokenPrice2,
        userTokenBalance,
        totalSupply,
        initialLoading,
        maxTokensPerTxn,
        ownedTokenIds
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}

export default function useContractData () {
  const context = useContext(ContractContext)

  return context
}
