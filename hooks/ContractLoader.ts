import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import { contractABI } from '../contracts/TokenContract.abi'
import { contractAddress } from '../contracts/TokenContract.address'
import { contractByteCode } from '../contracts/TokenContract.bytecode'

/*
  ~ What it does? ~

  Loads your local contracts and gives options to read values from contracts
  or write transactions into them

  ~ How can I use? ~

  const readContracts = useContractLoader(localProvider) // or
  const writeContracts = useContractLoader(userProvider)

  ~ Features ~

  - localProvider enables reading values from contracts
  - userProvider enables writing transactions into contracts
  - Example of keeping track of "purpose" variable by loading contracts into readContracts
    and using ContractReader.js hook:
    const purpose = useContractReader(readContracts,"YourContract", "purpose")
  - Example of using setPurpose function from our contract and writing transactions by Transactor.js helper:
    tx( writeContracts.YourContract.setPurpose(newPurpose) )
*/

const loadContract = (signer: any) => {
  const newContract = new Contract(contractAddress, contractABI, signer)
  try {
    //@ts-ignore
    newContract.bytecode = contractByteCode
  } catch (e) {
    console.log(e)
  }
  return newContract
}

export default function useContractLoader (
  providerOrSigner: Web3Provider | undefined
) {
  const [contract, setContract] = useState<Contract>()
  useEffect(() => {
    async function loadContracts () {
      if (typeof providerOrSigner !== 'undefined') {
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          let signer: Web3Provider | JsonRpcSigner
          let accounts
          if (
            providerOrSigner &&
            typeof providerOrSigner.listAccounts === 'function'
          ) {
            accounts = await providerOrSigner.listAccounts()
          }

          if (accounts && accounts.length > 0) {
            signer = providerOrSigner.getSigner()
          } else {
            signer = providerOrSigner
          }

          setContract(loadContract(signer))
        } catch (e) {
          console.log('ERROR LOADING CONTRACTS!!', e)
        }
      }
    }
    loadContracts()
  }, [providerOrSigner])
  return contract
}
