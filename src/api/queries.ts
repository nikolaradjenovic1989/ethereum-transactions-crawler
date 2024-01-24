import { QueryClient, useQuery } from 'react-query'
import {
  balanceQueryParams,
  baseUrl,
  blockNoQueryParams,
  txnQueryParams,
} from './config'
import { BlockAndBalanceResponse, TransactionsResponse } from './types'

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

export const useBlockNoQuery = (timestamp: string) =>
  useQuery<BlockAndBalanceResponse>({
    enabled: !!timestamp,
    queryKey: ['blockNo', timestamp],
    queryFn: () =>
      fetch(
        `${baseUrl}?${new URLSearchParams({
          ...blockNoQueryParams,
          timestamp,
        })}`
      ).then((res) => res.json()),
  })

export const useBalanceQuery = (address: string, blockno: string) =>
  useQuery<BlockAndBalanceResponse>({
    enabled: !!address && !!blockno,
    queryKey: ['balance', address, blockno],
    queryFn: () =>
      fetch(
        `${baseUrl}?${new URLSearchParams({
          ...balanceQueryParams,
          address,
          blockno,
        })}`
      ).then((res) => res.json()),
  })
