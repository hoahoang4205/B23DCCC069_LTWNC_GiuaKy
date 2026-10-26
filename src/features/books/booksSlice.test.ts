import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { fetchBooks as requestBooks } from '../../api/booksApi'
import type { Book } from '../../types'
import booksReducer, {
  borrowBook,
  fetchBooks,
  returnBook,
} from './booksSlice'

jest.mock('../../api/booksApi', () => ({
  fetchBooks: jest.fn(),
}))

const mockRequestBooks = jest.mocked(requestBooks)

const sampleBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'CNTT',
    year: 2008,
    availableCopies: 2,
  },
]

function createStore() {
  return configureStore({ reducer: booksReducer })
}

describe('booksSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches books successfully', async () => {
    mockRequestBooks.mockResolvedValue({ ok: true, data: sampleBooks })
    const store = createStore()

    await store.dispatch(fetchBooks())

    expect(store.getState()).toMatchObject({
      books: sampleBooks,
      status: 'succeeded',
      error: null,
    })
  })

  it('stores an error when fetching books fails', async () => {
    mockRequestBooks.mockResolvedValue({
      ok: false,
      error: 'Không thể tải danh sách sách.',
    })
    const store = createStore()

    await store.dispatch(fetchBooks())

    expect(store.getState()).toMatchObject({
      status: 'failed',
      error: 'Không thể tải danh sách sách.',
    })
  })

  it('borrows an available book', () => {
    const loadedState = booksReducer(
      undefined,
      fetchBooks.fulfilled(sampleBooks, 'request-id'),
    )

    const state = booksReducer(loadedState, borrowBook('book-1'))

    expect(state.borrowedIds).toEqual(['book-1'])
    expect(state.books[0]?.availableCopies).toBe(1)
  })

  it('returns a borrowed book', () => {
    const loadedState = booksReducer(
      undefined,
      fetchBooks.fulfilled(sampleBooks, 'request-id'),
    )
    const borrowedState = booksReducer(loadedState, borrowBook('book-1'))

    const state = booksReducer(borrowedState, returnBook('book-1'))

    expect(state.borrowedIds).toEqual([])
    expect(state.books[0]?.availableCopies).toBe(2)
  })
})
