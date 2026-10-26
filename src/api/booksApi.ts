import type { ApiResponse, Book } from '../types'

const initialBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Lập trình React hiện đại',
    author: 'Nguyễn Văn A',
    category: 'CNTT',
    year: 2023,
    availableCopies: 4,
  },
  {
    id: 'book-2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'CNTT',
    year: 2008,
    availableCopies: 2,
  },
  {
    id: 'book-3',
    title: 'Cấu trúc dữ liệu và giải thuật',
    author: 'Trần Minh B',
    category: 'CNTT',
    year: 2022,
    availableCopies: 3,
  },
  {
    id: 'book-4',
    title: 'Kinh tế học cơ bản',
    author: 'N. Gregory Mankiw',
    category: 'Kinh tế',
    year: 2021,
    availableCopies: 5,
  },
  {
    id: 'book-5',
    title: 'Tư duy nhanh và chậm',
    author: 'Daniel Kahneman',
    category: 'Kinh tế',
    year: 2011,
    availableCopies: 2,
  },
  {
    id: 'book-6',
    title: 'Quản trị học',
    author: 'Lê Thanh C',
    category: 'Kinh tế',
    year: 2020,
    availableCopies: 3,
  },
  {
    id: 'book-7',
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    category: 'Ngoại ngữ',
    year: 2019,
    availableCopies: 4,
  },
  {
    id: 'book-8',
    title: 'Từ vựng tiếng Anh theo chủ đề',
    author: 'Phạm Thu D',
    category: 'Ngoại ngữ',
    year: 2022,
    availableCopies: 0,
  },
  {
    id: 'book-9',
    title: 'Tiếng Nhật sơ cấp',
    author: 'Yuki Tanaka',
    category: 'Ngoại ngữ',
    year: 2021,
    availableCopies: 2,
  },
  {
    id: 'book-10',
    title: 'Design Patterns',
    author: 'Erich Gamma và cộng sự',
    category: 'CNTT',
    year: 1994,
    availableCopies: 1,
  },
  {
    id: 'book-11',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    category: 'CNTT',
    year: 2019,
    availableCopies: 3,
  },
  {
    id: 'book-12',
    title: 'Bạn có thể đàm phán bất cứ điều gì',
    author: 'Herb Cohen',
    category: 'Kinh tế',
    year: 2001,
    availableCopies: 2,
  },
  {
    id: 'book-13',
    title: 'Dám bị ghét',
    author: 'Kishimi Ichiro, Koga Fumitake',
    category: 'Ngoại ngữ',
    year: 2013,
    availableCopies: 4,
  },
  {
    id: 'book-14',
    title: 'You Don’t Know JS Yet',
    author: 'Kyle Simpson',
    category: 'CNTT',
    year: 2020,
    availableCopies: 2,
  },
  {
    id: 'book-15',
    title: 'Từ tốt đến vĩ đại',
    author: 'Jim Collins',
    category: 'Kinh tế',
    year: 2001,
    availableCopies: 3,
  },
  {
    id: 'book-16',
    title: 'Nhà giả kim',
    author: 'Paulo Coelho',
    category: 'Ngoại ngữ',
    year: 1988,
    availableCopies: 5,
  },
  {
    id: 'book-17',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    category: 'CNTT',
    year: 2022,
    availableCopies: 1,
  },
  {
    id: 'book-18',
    title: 'Nghĩ giàu và làm giàu',
    author: 'Napoleon Hill',
    category: 'Kinh tế',
    year: 1937,
    availableCopies: 2,
  },
  {
    id: 'book-19',
    title: 'English Vocabulary in Use',
    author: 'Michael McCarthy',
    category: 'Ngoại ngữ',
    year: 2017,
    availableCopies: 3,
  },
  {
    id: 'book-20',
    title: 'Học sâu',
    author: 'Andrew Ng',
    category: 'CNTT',
    year: 2024,
    availableCopies: 2,
  },
]

export function fetchBooks(
  shouldFail = false,
): Promise<ApiResponse<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể tải danh sách sách.' })
        return
      }

      resolve({
        ok: true,
        data: initialBooks.map((book) => ({ ...book })),
      })
    }, 500)
  })
}
