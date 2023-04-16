export const HOST = 'http://localhost:5000/api/v1/index';

export const SIDE_BAR_WIDTH = 350;

export enum SearchAlgorithmEnum {
  BM25_SCORE = 'BM25_SCORE',
  FREQUENCY_SCORE = 'FREQUENCY_SCORE',
  DISTANCE_SCORE = 'DISTANCE_SCORE',
}

export enum InvertedIndexEnum {
  BTREE_INDEX = 'BTREE_INDEX',
  LINKED_LIST_INDEX = 'LINKED_LIST_INDEX',
}
