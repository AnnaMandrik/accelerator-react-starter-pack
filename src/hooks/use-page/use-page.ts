import { useMemo } from 'react';
import { STEP_OF_COUNT } from '../../const';

function usePage (page: number): number[] {
  return useMemo(() => {
    let lastPage = 0;
    for (let i = page; i < page + STEP_OF_COUNT; i++) {
      if (i % STEP_OF_COUNT === 0) {
        lastPage = i;
        break;
      }
    }
    return Array(STEP_OF_COUNT).fill(null).map(() => lastPage--).reverse();
  }, [page]);
}

export default usePage;
