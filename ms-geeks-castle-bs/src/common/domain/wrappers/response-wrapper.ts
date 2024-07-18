import { ErrorResponse } from '../errors/error-response.model';

export class ResponseWrapper<T> {
  constructor(
    public data?: T,
    public error?: ErrorResponse,
  ) {}
}
