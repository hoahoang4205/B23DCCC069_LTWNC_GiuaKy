import type { Middleware } from '@reduxjs/toolkit'
import {
  borrowBook,
  setNotification,
  type BooksState,
} from '../features/books/booksSlice'

interface BooksRootState {
  books: BooksState
}

export const borrowLimitMiddleware: Middleware<
  object,
  BooksRootState
> = (api) => (next) => (action) => {
  if (
    borrowBook.match(action) &&
    api.getState().books.borrowedIds.length >= 3
  ) {
    return api.dispatch(setNotification('Chỉ được mượn tối đa 3 cuốn!'))
  }

  return next(action)
}
