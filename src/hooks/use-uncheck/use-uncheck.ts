import { useCallback } from 'react';
import {useSelector} from 'react-redux';
import { ProductProperty } from '../../const';
import {getUserStrings} from '../../store/user-data/selectors';

function useUncheck(userStrings: string[]): (userType: string[]) => string[] {
  const strings = useSelector(getUserStrings);
  userStrings = strings;
  const setUnchecked = useCallback(
    (userType: string[]) => {
      if ((userStrings.length === 0)||(userType.length === 0)) {
        return userStrings;
      }
      const allCounts = userType
        .reduce((acc: string[], item: string) => {
          const counts = ProductProperty.get(item) || [];
          return [...acc, ...counts];
        }, []);

      const actualCounts = userStrings.filter((count) => allCounts.includes(count));

      return actualCounts;
    },
    [userStrings]);

  return setUnchecked;
}

export default useUncheck;
