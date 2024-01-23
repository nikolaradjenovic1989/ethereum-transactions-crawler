import { PaginationState, Updater } from '@tanstack/react-table'
import { useTranslation, Trans } from 'react-i18next'

const PAGINATION_DEFAULT = [10, 20, 30, 50, 100]

type PaginationProps = {
  canNextPage: boolean
  canPreviousPage: boolean
  pageCount: number
  pagination: PaginationState
  setPageIndex: (updater: Updater<number>) => void
  setPageSize: (updater: Updater<number>) => void
  nextPage: () => void
  previousPage: () => void
}

const Pagination = ({
  canNextPage,
  canPreviousPage,
  pageCount,
  pagination,
  setPageIndex,
  setPageSize,
  nextPage,
  previousPage,
}: PaginationProps) => {
  const { t } = useTranslation()
  const { pageIndex, pageSize } = pagination
  const arrowButtonClass = 'p-1 border border-gray-300 px-2 disabled:opacity-30'

  return (
    <div className="flex items-center justify-end mt-2 gap-2">
      <button
        onClick={previousPage}
        disabled={!canPreviousPage}
        className={arrowButtonClass}
      >
        &lt;
      </button>
      <button
        onClick={nextPage}
        disabled={!canNextPage}
        className={arrowButtonClass}
      >
        &gt;
      </button>

      <Trans
        i18nKey="pageInfo"
        values={{ pageNumber: pageIndex + 1, pageCount }}
        components={[<strong />]}
      />

      <span className="flex items-center gap-1">
        &#124; {t('goToPage')}
        <input
          type="number"
          defaultValue={pagination.pageIndex + 1}
          min={1}
          max={pageCount}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            setPageIndex(page)
          }}
          className="border p-1 rounded w-16 bg-transparent"
        />
      </span>

      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value))
        }}
        className="p-2 bg-transparent"
      >
        {PAGINATION_DEFAULT.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {t('show', { pageSize })}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Pagination
