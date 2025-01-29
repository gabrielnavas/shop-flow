import { HttpStatus } from '@nestjs/common';

export type HttpResponseException = {
  message: string;
  statusCode: HttpStatus;
  timestamp: string;
  path: string;
};
