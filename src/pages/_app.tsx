import { useState } from 'react'
import { type AppType } from 'next/dist/shared/lib/utils'
import { ChakraProvider } from '@chakra-ui/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { theme } from '~/theme'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const MyApp: AppType<{ dehydratedState: unknown }> = ({
  Component,
  pageProps
}) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
