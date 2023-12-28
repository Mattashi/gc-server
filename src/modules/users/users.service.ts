import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import exceptions from 'constants/exceptionMessages';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<UserDocument> {
    await this.checkUserExistance(dto.email);

    return await this.usersRepository.create({
      userId: uuidv4(),
      ...dto,
    });
  }

  async getUserById(userId: string): Promise<UserDocument> {
    return await this.usersRepository.findOne({ userId });
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return await this.usersRepository.findOne({ email });
  }

  private async checkUserExistance(email: string): Promise<void> {
    const candidate = await this.getUserByEmail(email);
    if (candidate) {
      throw new HttpException(
        exceptions.CONFLICT_EMAIL_MSG,
        HttpStatus.CONFLICT,
      );
    }
  }
}
