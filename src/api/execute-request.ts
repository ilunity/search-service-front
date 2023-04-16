import { ApiRequestFn, IApiError } from './types';
import { defineAxiosError } from './define-axios-error';

type IApiResponse<DataType> = {
  data: DataType;
  error: null;
  success: true;
} | {
  data: null;
  error: IApiError;
  success: false;
}

export const executeRequest = async <DataType>(requestFn: ApiRequestFn<DataType>): Promise<IApiResponse<DataType>> => {
  try {
    const response = await requestFn();
    return {
      data: response.data,
      error: null,
      success: true,
    };
  } catch (error: any) {
    return {
      data: null,
      error: defineAxiosError(error),
      success: false,
    };
  }
};
