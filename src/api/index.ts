import axios, { AxiosResponse } from 'axios';
import { token } from '../env';

export const getData = (url: string): Promise<AxiosResponse> => {
  return axios.get(url, { headers: { Authorization: token } });
};
