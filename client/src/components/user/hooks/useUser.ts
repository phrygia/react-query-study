import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

// 사용자 데이터를 얻기위한 함수
async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
    },
  );
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  // TODO: call useQuery to update user data from server
  const queryClient = useQueryClient();
  // useQueryClient : 캐시에 있는 QueryClient 인스턴스를 반환
  const { data: user } = useQuery([queryKeys.user], () => getUser(user), {
    initialData: getStoredUser,
    onSuccess: (received: User | null) => {
      // localstorage에 데이터 저장
      console.log(received);
      if (!received) {
        clearStoredUser();
      } else {
        setStoredUser(received);
      }
    },
  });

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // TODO: update the user in the query cache
    queryClient.setQueriesData([queryKeys.user], newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
    queryClient.setQueryData([queryKeys.user], null);
    queryClient.removeQueries();
  }

  return { user, updateUser, clearUser };
}

// user : 사용자 데이터
// updateUser : 사용자 정보 업데이트
// clearUser : 로그아웃
// 쿼리 캐시, localStorage에서 사용자 정보 유지

// useAuth : 서버와 통신하도록 하는 함수
