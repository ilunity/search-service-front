import { InvertedIndexEnum } from '../utils/consts';

export interface ApiTermData {
  term: string;
  docsCount: number;
}

export type ApiIndexData = Record<string, {
  docsCount: number;
  terms: ApiTermData[];
  type: InvertedIndexEnum;
}>

export interface ApiSearchResultData {
  docId: number;
  score: number;
}

export type ApiGraphStructure = {
  nodes: { id: string, docIds: number[] }[];
  edges: { source: string, target: string }[];
}

export type ApiListStructure = {
  type: InvertedIndexEnum;
  structure: ApiGraphStructure
}
