import { useCallback } from 'react';
import { ProductProperty } from '../../const';
import { FilterState } from '../../types/state';

function useUncheck(filter: FilterState): (types: string[]) => string[] {
  const {strings} = filter;
  const setUnchecked = useCallback(
    (types: string[]) => {
      if ((strings.length === 0)||(types.length === 0)) {
        return strings;
      }
      const allCounts = types
        .reduce((acc: string[], item: string) => {
          const counts = ProductProperty.get(item) || [];
          return [...acc, ...counts];
        }, []);

      const actualCounts = strings.filter((count) => allCounts.includes(count));

      return actualCounts;
    },
    [strings]);

  return setUnchecked;
}

export default useUncheck;
