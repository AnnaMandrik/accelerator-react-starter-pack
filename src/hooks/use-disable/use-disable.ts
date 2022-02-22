import { useCallback } from 'react';
import { ProductProperty } from '../../const';
import { FilterState } from '../../types/state';

function useDisable(filter: FilterState): (strings: string) => boolean {
  const {types} = filter;
  const checkIsDisable = useCallback(
    (strings: string) => {
      if (types.length === 0) {
        return false;
      }
      const isDisable = !types
        .reduce((acc: string[], item: string) => {
          const counts = ProductProperty.get(item) || [];
          return [...acc, ...counts];
        }, [])
        .includes(strings);

      return isDisable;
    },
    [types]);

  return checkIsDisable;
}

export default useDisable;
