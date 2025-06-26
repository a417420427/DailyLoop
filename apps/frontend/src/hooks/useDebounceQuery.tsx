import { useEffect, useState } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseDebounceQueryProps<R, P> {
  key: string;
  params: P;
  debounce: number;
  option?: UseQueryOptions<R, unknown, R, [string, P]>;
  request: (p: P) => Promise<R>;
}

export const useDebounceQuery = <R = unknown, P = unknown>(props: UseDebounceQueryProps<R, P>) => {
  const { params, debounce, key, option, request } = props;
  const [newParams, setNewParams] = useState(params);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setNewParams(params);
    }, debounce);

    return () => clearTimeout(timerId);
  }, [params, debounce]);

  return useQuery<R, unknown, R, [string, P]>({
    queryKey: [key, newParams],
    queryFn: () => request(newParams),
    ...option
  });
};
