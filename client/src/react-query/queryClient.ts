import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = 'react-query-error';
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 600000, // 10 minutes, 얼마의 시간이 흐른 후에 데이터를 stale 취급할 것인지
      cacheTime: 900000, // 15, 메모리에 얼마만큼 있을 건지
      refetchOnMount: false, // 새로운 쿼리 인스턴스가 마운트했을 때
      refetchOnReconnect: false, // 네트워크가 다시 연결됐을 때
      refetchOnWindowFocus: false, // 새로운 쿼리 인스턴스가 마운트했을 때
    },
  },
});

// https://github.com/FE-Lex-Kim/-TIL/blob/master/React/React%20Query%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC(3)%20-%20Background%20Refetch%20%EC%98%B5%EC%85%98.md#refetchonmount
