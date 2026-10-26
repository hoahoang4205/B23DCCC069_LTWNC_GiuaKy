import { create } from 'zustand'
import type { BookCategory } from '../../types'

export type BookSort = 'Mới nhất' | 'Tên A-Z' | 'Nhiều bản'

interface FilterState {
  searchQuery: string
  categoryFilter: BookCategory | 'Tất cả'
  sortBy: BookSort
  setSearchQuery: (query: string) => void
  setCategoryFilter: (category: BookCategory | 'Tất cả') => void
  setSortBy: (sortBy: BookSort) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  categoryFilter: 'Tất cả',
  sortBy: 'Mới nhất',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  setSortBy: (sortBy) => set({ sortBy }),
}))
