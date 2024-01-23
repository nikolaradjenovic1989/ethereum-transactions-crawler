import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import InputField from '../Form/InputField'
import Pagination from './Pagination'
import { TransactionInfo } from '../../api'
import LoadingSpinner from '../LoadingSpinner'
import { fromWei } from 'web3-utils'

type TransactionTableProps = {
  data: TransactionInfo[]
  isLoading: boolean
}
const TransactionTable = ({ data, isLoading }: TransactionTableProps) => {
  const { t } = useTranslation()
  const columnHelper = createColumnHelper<TransactionInfo>()

  const columns = [
    columnHelper.accessor('hash', {
      cell: (info) => info.getValue(),
      header: t('txnHash'),
      size: 80,
    }),
    columnHelper.accessor('blockNumber', {
      cell: (info) => info.getValue(),
      header: t('block'),
      size: 30,
    }),
    columnHelper.accessor(
      (row) => new Date(Number(row.timeStamp) * 1000).toLocaleString('en-US'),
      {
        id: 'time',
        header: t('time'),
        size: 40,
      }
    ),
    columnHelper.accessor('from', {
      cell: (info) => info.getValue(),
      header: t('from'),
    }),
    columnHelper.accessor('to', {
      cell: (info) => info.getValue(),
      header: t('to'),
    }),

    columnHelper.accessor(
      (row) => {
        // for some reason `fromWei` function returns `0.` when `wei`
        // value is `0` so this step around is needed to avoid that
        const eth =
          row.value === '0' ? '0 ETH' : `${fromWei(row.value, 'ether')} ETH`
        return eth
      },
      {
        id: 'value',
        size: 60,
        header: t('value'),
      }
    ),
  ]

  const [globalFilter, setGlobalFilter] = useState('')

  const {
    getState,
    getCanPreviousPage,
    getCanNextPage,
    getRowModel,
    getPageCount,
    getHeaderGroups,
    setPageIndex,
    setPageSize,
    nextPage,
    previousPage,
  } = useReactTable<TransactionInfo>({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const { rows } = getRowModel()
  const { pagination } = getState()

  return (
    <div className="p-2 max-w-full mx-auto fill-gray-400">
      <div className="flex justify-between mb-2">
        <div className="w-full">
          <InputField
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            disabled={isLoading}
            showSearchIcon
            name="filter"
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder={t('filterPlaceholder')}
          />
        </div>
      </div>
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-indigo-600">
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="capitalize px-3.5 py-2"
                  style={{ maxWidth: `${header.getSize()}px` }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length ? (
            rows?.map((row, i) => (
              <tr
                key={row.id}
                className={`
                  ${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                  `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3.5 py-2 max-w-10 break-words"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={6}>
                {isLoading ? <LoadingSpinner /> : t('noTransactions')}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {rows.length > 0 && (
        <Pagination
          canNextPage={getCanNextPage()}
          canPreviousPage={getCanPreviousPage()}
          pageCount={getPageCount()}
          pagination={pagination}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </div>
  )
}

export default TransactionTable
