import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearNotification, returnBook } from './booksSlice'

export default function BorrowedBooksSidebar() {
  const dispatch = useAppDispatch()
  const { books, borrowedIds, notification } = useAppSelector(
    (state) => state.books,
  )
  const borrowedBooks = borrowedIds
    .map((id) => books.find((book) => book.id === id))
    .filter((book) => book !== undefined)

  const onReturn = useCallback(
    (id: string) => dispatch(returnBook(id)),
    [dispatch],
  )

  return (
    <aside className="borrowed-sidebar" aria-labelledby="borrowed-title">
      <div className="borrowed-sidebar-heading">
        <div>
          <span className="borrowed-sidebar-kicker">TỦ SÁCH CỦA BẠN</span>
          <h2 id="borrowed-title">Sách đang mượn</h2>
        </div>
        <span className="borrowed-count" aria-label={`${borrowedBooks.length} sách đang mượn`}>
          {borrowedBooks.length}/3
        </span>
      </div>

      {notification && (
        <div className="borrow-limit-notice" role="alert">
          <span>{notification}</span>
          <button
            aria-label="Đóng thông báo"
            type="button"
            onClick={() => dispatch(clearNotification())}
          >
            ×
          </button>
        </div>
      )}

      {borrowedBooks.length === 0 ? (
        <div className="borrowed-empty">
          <span className="borrowed-empty-icon" aria-hidden="true">▤</span>
          <p>Bạn chưa mượn sách nào.</p>
          <span>Chọn “Mượn” ở một cuốn sách để thêm vào đây.</span>
        </div>
      ) : (
        <ul className="borrowed-list">
          {borrowedBooks.map((book) => (
            <li className="borrowed-book" key={book.id}>
              <div className="borrowed-book-cover" aria-hidden="true">
                <span>{book.title.slice(0, 1)}</span>
              </div>
              <div className="borrowed-book-details">
                <strong title={book.title}>{book.title}</strong>
                <span>{book.author}</span>
                <small>Hạn trả sau 14 ngày</small>
                <button
                  className="borrowed-return-button"
                  type="button"
                  onClick={() => onReturn(book.id)}
                >
                  Trả sách
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="borrowed-sidebar-footer">
        Bạn có thể mượn tối đa 3 cuốn cùng lúc.
      </div>
    </aside>
  )
}
