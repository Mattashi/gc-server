import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  data?: T;

  constructor(status: number, message?: string, data?: T) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
