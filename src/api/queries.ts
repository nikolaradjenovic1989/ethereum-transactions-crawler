import { QueryClient, useQuery } from 'react-query'
import { baseUrl, txnQueryParams } from './config'
import { TransactionsResponse } from './types'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})

export const useTransactionsQuery = (address: string, block: string) =>
  useQuery<TransactionsResponse>({
    enabled: !!address && !!block,
    queryKey: ['transactions', address, block],
    queryFn: () =>
      fetch(
        `${baseUrl}?${new URLSearchParams({
          ...txnQueryParams,
          address,
          block,
        })}`
      ).then((res) => res.json()),
  })
