import { Spinner, Text } from '@chakra-ui/react';
import { useIsFetching } from '@tanstack/react-query';
import { ReactElement } from 'react';

export function Loading(): ReactElement {
  const isFetching = useIsFetching();
  // 현재 가져오기 상태인 쿼리 호출의 수를 나타내는 정수값을 반환합니다.

  const display = isFetching ? 'inherit' : 'none';

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
