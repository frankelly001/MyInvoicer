import {AxiosError} from 'axios';

export interface HttpSuccessResponse<T> {
  readonly message: string;
  readonly status: boolean;
  readonly data: T;
}
export interface HttpAuthSuccessResponse<T> {
  readonly message: string;
  readonly status: boolean;
  readonly token: string;
  readonly data: T;
}

export interface RtkSuccessResponse<T> {
  DataPerPage: number;
  currentPage: string;
  readonly data: T;
  readonly message: string;
  readonly status: boolean;
  totalDataCount: number;
  nextPage: number | null;
  prevPage: number | null;
}

export type RtkResponse = {
  readonly DataPerPage: number;
  readonly currentPage: string;
  readonly totalDataCount: number;
  readonly nextPage: number | null;
  readonly prevPage: number | null;
};

export interface HttpErrorResponse extends AxiosError {
  readonly message: string;
  readonly status: number;
  readonly success: boolean;
  readonly error: string;
}
