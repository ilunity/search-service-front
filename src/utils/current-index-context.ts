import { createContext, Dispatch, SetStateAction } from 'react';

interface CurrentIndexContextValue {
  currentIndexName: string;
  setCurrentIndexName: Dispatch<SetStateAction<string>>;
}

export const CurrentIndexContext = createContext<CurrentIndexContextValue>({} as CurrentIndexContextValue);
