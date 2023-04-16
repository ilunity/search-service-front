import { IndexesAction, IndexesDataState } from './reducer';
import { createContext, Dispatch } from 'react';

interface IndexesContextValue {
  indexesState: IndexesDataState;
  indexesDispatch: Dispatch<IndexesAction>;
  updateIndexes: () => void;
}

export const IndexesContext = createContext<IndexesContextValue>({} as IndexesContextValue);
