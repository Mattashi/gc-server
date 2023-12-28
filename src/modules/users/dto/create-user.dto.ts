import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import messages from 'constants/validationMessages';

export class CreateUserDto {
  @ApiProperty({ default: 'example@gmail.com' })
  @IsEmail({}, { message: messages.USER_EMAIL_MSG })
  @IsNotEmpty({ message: messages.USER_EMAIL_EMPTY_MSG })
  email: string;

  @ApiProperty({ default: 'password' })
  @IsString({ message: messages.USER_PASSWORD_STRING_MSG })
  @IsNotEmpty({ message: messages.USER_PASSWORD_EMPTY_MSG })
  @Length(4, 16, { message: messages.USER_PASSWORD_LENGTH_MSG })
  password: string;
}
