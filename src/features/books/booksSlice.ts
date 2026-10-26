import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchBooks as requestBooks } from '../../api/booksApi'
import type { Book } from '../../types'

export interface BooksState {
  books: Book[]
  borrowedIds: string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  notification: string | null
}

const initialState: BooksState = {
  books: [],
  borrowedIds: [],
  status: 'idle',
  error: null,
  notification: null,
}

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    const response = await requestBooks()

    if (!response.ok) {
      return rejectWithValue(response.error)
    }

    return response.data
  },
)

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: { payload: string }) {
      const book = state.books.find(({ id }) => id === action.payload)

      if (
        !book ||
        book.availableCopies === 0 ||
        state.borrowedIds.includes(action.payload)
      ) {
        return
      }

      book.availableCopies -= 1
      state.borrowedIds.push(action.payload)
      state.notification = null
    },
    returnBook(state, action: { payload: string }) {
      const borrowedIndex = state.borrowedIds.indexOf(action.payload)
      const book = state.books.find(({ id }) => id === action.payload)

      if (borrowedIndex === -1 || !book) {
        return
      }

      book.availableCopies += 1
      state.borrowedIds.splice(borrowedIndex, 1)
      state.notification = null
    },
    clearNotification(state) {
      state.notification = null
    },
    setNotification(state, action: { payload: string }) {
      state.notification = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books = action.payload
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Đã xảy ra lỗi khi tải sách.')
      })
  },
})

export const {
  borrowBook,
  returnBook,
  clearNotification,
  setNotification,
} = booksSlice.actions

export default booksSlice.reducer
