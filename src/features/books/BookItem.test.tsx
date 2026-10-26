import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, jest } from '@jest/globals'
import type { Book } from '../../types'
import BookItem from './BookItem'

const book: Book = {
  id: 'book-1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  year: 2008,
  availableCopies: 2,
}

describe('BookItem', () => {
  it('displays book information', () => {
    const { container } = render(
      <BookItem
        book={book}
        isBorrowed={false}
        onBorrow={jest.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Clean Code' })).toBeTruthy()
    expect(container.querySelector('.book-author')?.textContent).toBe(
      'Robert C. Martin',
    )
    expect(container.querySelector('article')?.textContent).toContain('2008')
    expect(container.querySelector('article')?.textContent).toContain('2 cuốn')
  })

  it('calls onBorrow with the book id when clicked', () => {
    const onBorrow = jest.fn()
    render(
      <BookItem
        book={book}
        isBorrowed={false}
        onBorrow={onBorrow}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Mượn' }))

    expect(onBorrow).toHaveBeenCalledWith('book-1')
  })

  it('disables the borrow button when no copies are available', () => {
    render(
      <BookItem
        book={{ ...book, availableCopies: 0 }}
        isBorrowed={false}
        onBorrow={jest.fn()}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Mượn' }).hasAttribute('disabled'),
    ).toBe(true)
  })
})
