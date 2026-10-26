import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import SiteLayout from '../components/SiteLayout'
import { fetchBooks } from '../features/books/booksSlice'
import type { BookCategory } from '../types'

const categories: BookCategory[] = ['CNTT', 'Kinh tế', 'Ngoại ngữ']

export default function StatsPage() {
  const dispatch = useAppDispatch()
  const { books, borrowedIds, status, error } = useAppSelector(
    (state) => state.books,
  )
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks())
    }
  }, [dispatch, status])

  const categoryStats = categories.map((category) => ({
    category,
    count: books.filter((book) => book.category === category).length,
  }))
  return (
    <SiteLayout>
      <main className="stats-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow"><span aria-hidden="true">▥</span> Thống kê hoạt động</p>
            <h1 className="page-title">Tổng quan thư viện</h1>
            <p className="stats-intro">
              Cùng xem tình hình mượn sách và số lượng sách hiện có trong thư viện.
            </p>
          </div>
        </div>

        {status === 'loading' || status === 'idle' ? (
          <div className="loading-state" role="status">
            Đang tải dữ liệu thống kê...
          </div>
        ) : status === 'failed' ? (
          <div className="error-panel" role="alert">
            {error ?? 'Không thể tải dữ liệu thống kê.'}
          </div>
        ) : (
          <>
            <section aria-label="Tổng quan" className="stats-grid">
              <article className="stat-card stat-card-books">
                <div className="stat-card-top">
                  <span className="stat-icon" aria-hidden="true">▣</span>
                  <span className="stat-label">Đầu sách</span>
                </div>
                <p className="stat-number">{books.length}</p>
                <p className="stat-caption">Tổng số đầu sách trong thư viện</p>
              </article>
              <article className="stat-card stat-card-borrowed">
                <div className="stat-card-top">
                  <span className="stat-icon" aria-hidden="true">♟</span>
                  <span className="stat-label">Đang được mượn</span>
                </div>
                <p className="stat-number">{borrowedIds.length}</p>
                <p className="stat-caption">Số sách hiện đang được mượn</p>
              </article>
              <article className="stat-card stat-card-categories">
                <div className="stat-card-top">
                  <span className="stat-icon" aria-hidden="true">◷</span>
                  <span className="stat-label">Thể loại</span>
                </div>
                <p className="stat-number">{categories.length}</p>
                <p className="stat-caption">Tổng số thể loại đang hoạt động</p>
              </article>
            </section>

            <section aria-labelledby="category-stats-title">
              <div className="section-heading">
                <div>
                  <h2 id="category-stats-title">Sách theo thể loại</h2>
                  <p>Số lượng sách phân loại trong thư viện.</p>
                </div>
              </div>
              <table className="stats-table">
                <thead>
                  <tr>
                    <th scope="col">Thể loại</th>
                    <th scope="col">Số đầu sách</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryStats.map(({ category, count }, index) => (
                    <tr key={category}>
                      <td>
                        <span className={`category-icon category-${index}`} aria-hidden="true">
                          ▣
                        </span>
                        {category}
                      </td>
                      <td>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </SiteLayout>
  )
}
