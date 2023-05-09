import {AxiosError} from 'axios';

export interface ApiResponse<T> {
    result: T;
}

export interface Error {
    error: string;
    message: string;
    statusCode: number;
}

export interface FailedResponse extends AxiosError<Error> {}
