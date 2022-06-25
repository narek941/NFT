import { AxiosError, AxiosResponse } from 'axios';

export const isAxiosError = (candidate: any): candidate is AxiosError => {
  return candidate.isAxiosError === true;
};

export const mockSuccess: (data: any) => Promise<AxiosResponse<any, any>> = (
  data: any
) =>
  Promise.resolve({
    data,
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {},
  });

export const mockError: (message: string) => Promise<AxiosError<any, any>> = (
  message: string
) =>
  Promise.reject({
    message,
    code: 400,
    config: {},
    isAxiosError: true,
  });
