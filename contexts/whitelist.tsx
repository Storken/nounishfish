import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import useWeb3 from './web3'
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'

interface WhitelistContextProps {
  proof: string[] | undefined
}

type WhitelistProviderProps = {
  children: ReactNode
}

type Access = {
  og: boolean
  whitelist: boolean
}

export const WhitelistContext: React.Context<WhitelistContextProps> = createContext<
  WhitelistContextProps
>({} as WhitelistContextProps)

export const WhitelistContextProvider = ({
  children
}: WhitelistProviderProps) => {
  const { address } = useWeb3()
  const [whitelistProof, setWhitelistProof] = useState<string[]>()
  const [whitelist, setWhitelist] = useState([])

  const whitelistMerkleTree = useMemo(() => {
    if (!whitelist) return
    return new MerkleTree(whitelist, keccak256, {
      sortPairs: true
    })
  }, [whitelist])

  const setWhitelists = async () => {
    const whitelistRequest = await fetch('/assets/whitelist.json')
    const whitelist = JSON.parse(await whitelistRequest.text())
    setWhitelist(whitelist)
  }

  useEffect(() => {
    setWhitelists()
  }, [])

  useEffect(() => {
    if (address && whitelistMerkleTree) {
      const proof = whitelistMerkleTree.getHexProof(keccak256(address))
      setWhitelistProof(proof)
    }
  }, [address, whitelistMerkleTree])

  return (
    <WhitelistContext.Provider
      value={{
        proof: whitelistProof
      }}
    >
      {children}
    </WhitelistContext.Provider>
  )
}

export default function useWhitelist () {
  const context = useContext(WhitelistContext)

  return context
}
