import { AppProps } from 'next/app'
import Head from 'next/head'
import { ContractContextProvider } from '../contexts/contract-data'
import { ContractMutationsContextProvider } from '../contexts/contract-mutations'
import { Web3ContextProvider } from '../contexts/web3'
import { WhitelistContextProvider } from '../contexts/whitelist'
import { GlobalStyle } from '../styles/global-styles'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'

function MyApp ({ Component, pageProps }: AppProps) {

  const InView = dynamic(() => import('react-intersection-observer'))
  return (
    <>
      <Script
        defer
        data-domain='nounishfish.com'
        src='https://plausible.io/js/plausible.js'
      ></Script>
      <Head>
        <link
          rel='preconnect'
          href='https://dank.tools'
          crossOrigin='anonymous'
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            </style>
              <link
                href='/fonts.css'
                rel='preload'
                as='style'
                onload="this.rel='stylesheet'"
              ></link>
            <style>`
          }}
        ></style>
        <noscript>
          <link rel='stylesheet' href='https://dank.tools/fonts.css' />
        </noscript>
        <title>NounishFish</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <GlobalStyle />
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Web3ContextProvider>
        <WhitelistContextProvider>
          <ContractContextProvider>
            <ContractMutationsContextProvider>
              <InView>
                <Component {...pageProps} />
              </InView>
            </ContractMutationsContextProvider>
          </ContractContextProvider>
        </WhitelistContextProvider>
      </Web3ContextProvider>
    </>
  )
}

export default MyApp
