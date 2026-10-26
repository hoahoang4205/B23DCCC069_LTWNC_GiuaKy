export type BookCategory = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ'

export interface Book {
  id: string
  title: string
  author: string
  category: BookCategory
  year: number
  availableCopies: number
}

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export function isSuccess<T>(
  response: ApiResponse<T>,
): response is { ok: true; data: T } {
  return response.ok
}
