import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import SiteLayout from '../components/SiteLayout'
import { useFilterStore } from '../features/filters/filterStore'
import BookList from '../features/books/BookList'
import BorrowedBooksSidebar from '../features/books/BorrowedBooksSidebar'
import { fetchBooks } from '../features/books/booksSlice'
import type { BookCategory } from '../types'

const categories: Array<BookCategory | 'Tất cả'> = [
  'Tất cả',
  'CNTT',
  'Kinh tế',
  'Ngoại ngữ',
]

export default function Home() {
  const dispatch = useAppDispatch()
  const { books, borrowedIds, status } = useAppSelector(
    (state) => state.books,
  )
  const searchQuery = useFilterStore((state) => state.searchQuery)
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery)
  const categoryFilter = useFilterStore((state) => state.categoryFilter)
  const setCategoryFilter = useFilterStore(
    (state) => state.setCategoryFilter,
  )
  const sortBy = useFilterStore((state) => state.sortBy)
  const setSortBy = useFilterStore((state) => state.setSortBy)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks())
    }
  }, [dispatch, status])

  return (
    <SiteLayout>
      <main>
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="hero-badge"><span aria-hidden="true">▣</span> Thư viện mini của bạn</p>
            <h1>Khám phá kho sách đa dạng</h1>
            <p className="hero-description">
              Hàng ngàn cuốn sách hay đang chờ bạn. Tìm kiếm, khám phá và mượn
              sách để mở rộng tri thức mỗi ngày!
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-icon" aria-hidden="true">▣</span>
                <span><small>Sách có sẵn</small><strong>{books.length} cuốn</strong></span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-icon" aria-hidden="true">♟</span>
                <span><small>Đang mượn</small><strong>{borrowedIds.length} cuốn</strong></span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-icon" aria-hidden="true">◷</span>
                <span><small>Thời hạn mượn</small><strong>14 ngày</strong></span>
              </div>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-sun" />
            <div className="hero-plant"><i /><i /><i /><i /></div>
            <div className="hero-book-stack">
              <span className="stack-book stack-book-one" />
              <span className="stack-book stack-book-two" />
              <span className="stack-book stack-book-three" />
            </div>
            <div className="hero-open-book"><span /><span /></div>
            <p>Mỗi cuốn sách<br />là một hành trình mới!</p>
          </div>
        </section>

        <section aria-label="Tìm kiếm và lọc sách" className="filter-panel">
          <label>
            <span className="filter-search-icon" aria-hidden="true">⌕</span>
            <input
              className="text-input filter-search-input"
              type="search"
              placeholder="Tìm sách, tác giả, thể loại..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <label className="filter-select-wrap">
            <span className="field-label">Thể loại</span>
            <select
              className="select-input"
              value={categoryFilter}
              onChange={(event) => {
                const selectedCategory = categories.find(
                  (category) => category === event.target.value,
                )
                if (selectedCategory) setCategoryFilter(selectedCategory)
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-select-wrap">
            <span className="field-label">Sắp xếp theo</span>
            <select
              className="select-input"
              value={sortBy}
              onChange={(event) => {
                if (
                  event.target.value === 'Mới nhất' ||
                  event.target.value === 'Tên A-Z' ||
                  event.target.value === 'Nhiều bản'
                ) {
                  setSortBy(event.target.value)
                }
              }}
            >
              <option>Mới nhất</option>
              <option>Tên A-Z</option>
              <option>Nhiều bản</option>
            </select>
          </label>
        </section>

        <div className="section-heading featured-heading">
          <div>
            <h2><span aria-hidden="true">▣</span> Sách nổi bật</h2>
            <p>Những cuốn sách được nhiều bạn đọc quan tâm nhất</p>
          </div>
        </div>
        <section className="library-columns">
          <div className="library-results">
            <BookList />
          </div>
          <BorrowedBooksSidebar />
        </section>
      </main>
    </SiteLayout>
  )
}
