import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  const [filter, setFilter] = useState('all');

  const fallback = [];
  const { data: staff = fallback } = useQuery([queryKeys.treatment], getStaff);

  return { staff, filter, setFilter };
}