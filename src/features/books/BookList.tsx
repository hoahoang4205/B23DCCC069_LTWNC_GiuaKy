import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { borrowBook } from './booksSlice'
import { useFilterStore } from '../filters/filterStore'
import { useDebounce } from '../../hooks/useDebounce'
import BookItem from './BookItem'

export default function BookList() {
  const dispatch = useAppDispatch()
  const { books, borrowedIds, status, error } = useAppSelector(
    (state) => state.books,
  )
  const searchQuery = useFilterStore((state) => state.searchQuery)
  const categoryFilter = useFilterStore((state) => state.categoryFilter)
  const sortBy = useFilterStore((state) => state.sortBy)
  const debouncedQuery = useDebounce(searchQuery.trim().toLocaleLowerCase(), 300)

  const filteredBooks = useMemo(
    () =>
      books
        .filter((book) => {
          const matchesCategory =
            categoryFilter === 'Tất cả' || book.category === categoryFilter
          const matchesSearch =
            !debouncedQuery ||
            `${book.title} ${book.author} ${book.category}`
              .toLocaleLowerCase()
              .includes(debouncedQuery)

          return matchesCategory && matchesSearch
        })
        .sort((left, right) => {
          if (sortBy === 'Tên A-Z') return left.title.localeCompare(right.title)
          if (sortBy === 'Nhiều bản') {
            return right.availableCopies - left.availableCopies
          }
          return right.year - left.year
        }),
    [books, categoryFilter, debouncedQuery, sortBy],
  )

  const onBorrow = useCallback(
    (id: string) => dispatch(borrowBook(id)),
    [dispatch],
  )
  if (status === 'loading' || status === 'idle') {
    return (
      <div className="loading-state" role="status">
        Đang tải danh sách sách...
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="error-panel" role="alert">
        {error ?? 'Không thể tải danh sách sách.'}
      </div>
    )
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="empty-state">
        Không tìm thấy sách phù hợp. Hãy thử từ khóa hoặc thể loại khác.
      </div>
    )
  }

  return (
    <div className="book-grid">
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isBorrowed={borrowedIds.includes(book.id)}
          onBorrow={onBorrow}
        />
      ))}
    </div>
  )
}
