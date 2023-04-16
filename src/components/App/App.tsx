import { Box } from '@mui/material';
import { Sidebar } from '../Sidebar';
import { IndexManager } from '../IndexManager';
import { Reducer, useEffect, useReducer, useState } from 'react';
import { IndexesAction, IndexesDataState, indexesReducer } from '../../utils/reducer';
import { IndexesContext } from '../../utils';
import { CurrentIndexContext } from '../../utils/current-index-context';
import { executeRequest } from '../../api/execute-request';
import { searchService } from '../../api';

const initIndexesState: IndexesDataState = {};

export const App = () => {
  const [indexesState, indexesDispatch] = useReducer<Reducer<IndexesDataState, IndexesAction>>(indexesReducer, initIndexesState);
  const [currentIndexName, setCurrentIndexName] = useState<string>('');

  const updateIndexes = async () => {
    const { success, data: updateIndexesData } = await executeRequest(searchService.getIndexes);

    if (success) {
      indexesDispatch({
        type: 'updateIndexes',
        payload: updateIndexesData,
      });
    }
  };

  useEffect(() => {
    updateIndexes();
    const interval = setInterval(updateIndexes, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <IndexesContext.Provider value={ {
      indexesState,
      indexesDispatch,
      updateIndexes,
    } }>
      <CurrentIndexContext.Provider
        value={ {
          currentIndexName,
          setCurrentIndexName,
        } }
      >
        <Box
          sx={ {
            // width: '100%',
            minHeight: '100vh',
            display: 'flex',
            // flexDirection: 'column',
          } }
        >
          <Sidebar />
          <IndexManager />
        </Box>
      </CurrentIndexContext.Provider>
    </IndexesContext.Provider>
  );
};
