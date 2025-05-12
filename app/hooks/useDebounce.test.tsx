import { vi, describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@hooks/useDebounce';

describe('Given a useDebounce custom hook', () => {
  describe('When it is called with a value and a delay', () => {
    it('should return the debounced value after the specified delay', () => {
      vi.useFakeTimers();

      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
        initialProps: { value: 'initial' }
      });

      expect(result.current).toBe('initial');

      rerender({ value: 'new value' });
      expect(result.current).toBe('initial');

      act(() => vi.advanceTimersByTime(1000));

      expect(result.current).toBe('new value');

      vi.useRealTimers();
    });
  });
});
