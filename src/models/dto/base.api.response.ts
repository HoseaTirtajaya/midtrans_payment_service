export class BaseApiResponse<T> {
  code: string;
  message: string;
  data: T;
}