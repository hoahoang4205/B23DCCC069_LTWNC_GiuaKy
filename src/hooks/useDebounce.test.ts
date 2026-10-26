import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('updates the value after the delay', () => {
    jest.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } },
    )

    rerender({ value: 'updated' })

    expect(result.current).toBe('initial')
    act(() => {
      jest.advanceTimersByTime(300)
    })
    expect(result.current).toBe('updated')
  })
})
