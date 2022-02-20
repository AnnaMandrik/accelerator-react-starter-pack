import { useCallback } from 'react';
import {useSelector} from 'react-redux';
import { ProductProperty } from '../../const';
import {getUserType} from '../../store/user-data/selectors';

function useDisable(userType: string[]): (userStrings: string) => boolean {
  const type = useSelector(getUserType);
  userType = type;
  const checkIsDisable = useCallback(
    (userStrings: string) => {
      if (userType.length === 0) {
        return false;
      }
      const isDisable = !userType
        .reduce((acc: string[], item: string) => {
          const counts = ProductProperty.get(item) || [];
          return [...acc, ...counts];
        }, [])
        .includes(userStrings);

      return isDisable;
    },
    [userType]);

  return checkIsDisable;
}

export default useDisable;
