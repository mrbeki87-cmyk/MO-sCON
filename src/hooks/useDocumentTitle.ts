import { useEffect } from 'react';

export function useDocumentTitle(title: string, suffix: string = " | MO'sCON Engineering") {
  useEffect(() => {
    document.title = `${title}${suffix}`;
  }, [title, suffix]);
}
