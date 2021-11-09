import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'

import Layout from '@components/Layout'
import AppContextProvider from '@lib/context/AppContext'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  )
}
export default MyApp
