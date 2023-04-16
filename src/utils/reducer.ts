import { InvertedIndexEnum, SearchAlgorithmEnum } from './consts';
import { ApiIndexData, ApiSearchResultData, ApiTermData } from '../api/search-service.types';

interface LastSearch {
  algorithmType: SearchAlgorithmEnum;
  query: string;
  results: ApiSearchResultData[];
}

interface IndexData {
  type: InvertedIndexEnum;
  docsCount: number;
  terms: ApiTermData[];
  lastSearch: LastSearch | null;
}


export type IndexesDataState = Record<string, IndexData>;

export type IndexesAction = {
  type: 'updateIndexes';
  payload:
    ApiIndexData;
} | {
  type: 'addLastSearch';
  indexName: string;
  payload: LastSearch;
}

export const indexesReducer = (state: IndexesDataState, action: IndexesAction) => {
  switch (action.type) {
    case 'updateIndexes':
      const undatedIndexes: IndexesDataState = {};

      for (const indexName in action.payload) {
        const lastSearch = indexName in state
          ? state[indexName].lastSearch
          : null;

        undatedIndexes[indexName] = {
          ...action.payload[indexName],
          lastSearch,
        };
      }

      return undatedIndexes;
    case 'addLastSearch':
      return {
        ...state,
        [action.indexName]: {
          ...state[action.indexName],
          lastSearch: action.payload,
        },
      };
  }
};
