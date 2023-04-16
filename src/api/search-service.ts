import { HOST, InvertedIndexEnum, SearchAlgorithmEnum } from '../utils/consts';
import axios from 'axios';
import { ApiRequestFnResponse } from './types';
import { ApiIndexData, ApiListStructure, ApiSearchResultData, ApiGraphStructure } from './search-service.types';

const url = HOST;

class SearchService {
  public createIndex(name: string, type: InvertedIndexEnum): ApiRequestFnResponse<''> {
    return axios.post(url, { name, type });
  }

  public getIndexes(): ApiRequestFnResponse<ApiIndexData> {
    return axios.get(url);
  }

  public addDoc(indexName: string, content: string): ApiRequestFnResponse<number> {
    return axios.post(`${ url }/doc`, { indexName, content });
  }

  public getStructure(indexName: string, term: string): ApiRequestFnResponse<ApiListStructure> {
    return axios.post(`${ url }/structure`, { indexName, term });
  }

  public search(indexName: string, algorithmType: SearchAlgorithmEnum, query: string): ApiRequestFnResponse<ApiSearchResultData[]> {
    return axios.post(`${ url }/search`, {
      indexName,
      algorithmType,
      query,
    });
  }
}

export const searchService = new SearchService();
