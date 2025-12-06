import { MutableRefObject, useEffect } from 'react';

export const useOutside = (
  ref: MutableRefObject<any> | MutableRefObject<any>[] | (HTMLElement | null)[],
  callback: () => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Handle both single ref and array of refs
      const refs = Array.isArray(ref) ? ref : [ref];

      const isInside = refs.some(refItem => {
        if (refItem && 'current' in refItem) {
          return refItem.current && refItem.current.contains(event.target);
        }

        return refItem && refItem.contains(event.target as Node);
      });

      if (isInside) {
        return;
      }

      callback();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};
