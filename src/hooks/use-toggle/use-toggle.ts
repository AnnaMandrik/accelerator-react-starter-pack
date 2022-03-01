import { useState } from 'react';

export function useToggle (initialValue: boolean): [boolean, ()=>void] {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((pvevValue) => !pvevValue);

  return [value, toggle];
}
