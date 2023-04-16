import { AxiosResponse } from 'axios';

export interface IApiError {
  status: number;
  message: string | string[];
}

export type ApiRequestFnResponse<DataType> = Promise<AxiosResponse<DataType>>;
export type ApiRequestFn<DataType> = () => ApiRequestFnResponse<DataType>;
