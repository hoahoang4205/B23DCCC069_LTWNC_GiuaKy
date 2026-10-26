import { memo } from 'react'
import type { Book } from '../../types'

interface BookItemProps {
  book: Book
  isBorrowed: boolean
  onBorrow: (id: string) => void
}

function BookItem({ book, isBorrowed, onBorrow }: BookItemProps) {
  const coverClass =
    book.category === 'CNTT'
      ? 'cover-technology'
      : book.category === 'Kinh tế'
        ? 'cover-business'
        : 'cover-language'

  return (
    <article className="book-card">
      <div className="book-card-main">
        <div className={`book-cover ${coverClass}`} aria-hidden="true">
          <span className="cover-title">{book.title}</span>
          <span className="cover-author">{book.author}</span>
          <span className="cover-decoration" />
        </div>
        <div className="book-details">
          <span className={`book-category ${coverClass}`}>{book.category}</span>
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <div className="book-meta">
            <span>▦ &nbsp;{book.year}</span>
          </div>
        </div>
      </div>
      <p className="book-description">
        {book.category === 'CNTT'
          ? 'Khám phá kiến thức và ý tưởng công nghệ mới.'
          : book.category === 'Kinh tế'
            ? 'Mở rộng góc nhìn về kinh doanh và cuộc sống.'
            : 'Từng trang sách mở ra một chân trời mới.'}
      </p>
      <div className="book-card-footer">
        <span className="book-stock">
          <i
            className={
              book.availableCopies === 0 ? 'stock-dot out' : 'stock-dot'
            }
          />
          Còn {book.availableCopies} cuốn
        </span>
        {isBorrowed ? (
          <span className="borrowed-card-label">✓ Đang mượn</span>
        ) : (
          <button
            className="button-primary"
            type="button"
            disabled={book.availableCopies === 0}
            onClick={() => onBorrow(book.id)}
          >
            Mượn
          </button>
        )}
      </div>
    </article>
  )
}

export default memo(BookItem)
