import { Web3Provider } from '@ethersproject/providers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { INFURA_ID, NETWORKS } from '../utils/constants'

interface Web3ContextProps {
  address: string | undefined
  injectedProvider: Web3Provider | undefined
  wrongNetwork: boolean
  logoutOfWeb3Modal: () => Promise<void>
  loadWeb3Modal: () => Promise<void>
  loading: boolean
}

type Web3ProviderProps = {
  children: ReactNode
}

export const Web3Context: React.Context<Web3ContextProps> = createContext<
  Web3ContextProps
>({} as Web3ContextProps)

export const Web3ContextProvider = ({ children }: Web3ProviderProps) => {
  const [injectedProvider, setInjectedProvider] = useState<
    Web3Provider | undefined
  >()
  const [address, setAddress] = useState<string | undefined>()
  const [wrongNetwork, setWrongNetwork] = useState(true)
  const [loading, setLoading] = useState(false)
  const [tick, setTick] = useState(0)

  const logoutOfWeb3Modal = async () => {
    const web3Modal = await getWeb3Modal()
    if (web3Modal) {
      await web3Modal.clearCachedProvider()
    }
    setTimeout(() => {
      window.location.reload()
    }, 1)
  }

  useEffect(() => {
    if (window && window.ethereum)
      window.ethereum.on('accountsChanged', function (accounts: string[]) {
        loadWeb3Modal()
      })
  }, [])

  const getWeb3Modal = useCallback(async () => {
    const Web3Modal = (await import('web3modal')).default
    const options = {
      // network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: INFURA_ID
          }
        }
      }
    }
    return new Web3Modal(options)
  }, [])

  const loadWeb3Modal = useCallback(async () => {
    setLoading(true)
    const web3Modal = await getWeb3Modal()
    if (web3Modal) {
      const provider = await web3Modal.connect()
      if (provider) {
        const web3Provider = new Web3Provider(provider)
        setInjectedProvider(web3Provider)
        setAddress(await web3Provider.getSigner().getAddress())
      }
    }
  }, [getWeb3Modal, setInjectedProvider])

  const loadNetwork = () => {
    if (injectedProvider?.network) {
      if (injectedProvider?.network?.chainId === NETWORKS.mainnet.chainId) {
        setWrongNetwork(false)
      } else {
        setWrongNetwork(true)
      }
      setLoading(false)
    }
    setTimeout(() => {
      setTick(tick + (1 % 5))
    }, 2000)
  }

  useEffect(() => {
    loadNetwork()
  }, [tick])

  useEffect(() => {
    const initWeb3Modal = async () => {
      const web3Modal = await getWeb3Modal()
      if (web3Modal && web3Modal.cachedProvider) {
        loadWeb3Modal()
      }
    }
    initWeb3Modal()
  }, [getWeb3Modal, loadWeb3Modal])

  return (
    <Web3Context.Provider
      value={{
        address,
        injectedProvider,
        wrongNetwork,
        loading,
        loadWeb3Modal,
        logoutOfWeb3Modal
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export default function useWeb3 () {
  const context = useContext(Web3Context)

  return context
}
