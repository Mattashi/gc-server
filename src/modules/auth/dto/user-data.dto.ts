import { ApiProperty } from '@nestjs/swagger';
import { User } from 'modules/users/schemas/user.schema';

export class UserDataDto {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty()
  token: string;
}
