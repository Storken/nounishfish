import { parseUnits } from '@ethersproject/units'
import { notification } from 'antd'
import React, { createContext, ReactNode, useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { StyledLink } from '../components/shared'
import useContractLoader from '../hooks/ContractLoader'
import useContractData from './contract-data'
import useWeb3 from './web3'

interface ContractMutationsContextProps {
  mintToken: (amount: number) => Promise<void>
}

type ContractMutationsProviderProps = {
  children: ReactNode
}

export const ContractMutationsContext: React.Context<ContractMutationsContextProps> = createContext<
  ContractMutationsContextProps
>({} as ContractMutationsContextProps)

export const ContractMutationsContextProvider = ({
  children
}: ContractMutationsProviderProps) => {
  const { injectedProvider } = useWeb3()
  const contract = useContractLoader(injectedProvider)
  const { tokenPrice1, tokenPrice2, totalSupply } = useContractData()

  const mintToken = async (amount: number) => {
    let txn
    let tokenPrice = totalSupply < 400 ? tokenPrice1 : tokenPrice2
    //@ts-ignore
    txn = await contract.publicMint(Number(amount), {
      value: parseUnits(`${Number(amount) * tokenPrice}`)
    })

    if (txn) await addMintTransaction(txn)
  }

  const addMintTransaction = async (txn: { hash: string }) => {
    transactionSnackbar(txn.hash)
  }

  const transactionSnackbar = (hash: string) => {
    toast.success(
      <StyledLink
        dark
        target='_blank'
        rel='noreferrer noopener'
        href={`https://etherscan.io/tx/${hash}`}
      >
        View on etherscan
      </StyledLink>
    )
  }

  return (
    <ContractMutationsContext.Provider
      value={{
        mintToken
      }}
    >
      {children}
    </ContractMutationsContext.Provider>
  )
}

export default function useContractMutations () {
  const context = useContext(ContractMutationsContext)

  return context
}
