import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } from 'constants/tokens';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { UserDocument } from 'modules/users/schemas/user.schema';
import { UsersService } from 'modules/users/users.service';
import { TokenType, PayloadToken, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<UserDocument> {
    return await this.usersService.create(dto);
  }

  async login(dto: CreateUserDto): Promise<UserDocument> {
    return await this.usersService.getUserByEmail(dto.email);
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }

  async generateTokens(payload: PayloadToken): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.getToken(payload, 'access'),
      this.getToken(payload, 'refresh'),
    ]);

    return { accessToken, refreshToken };
  }

  private getToken(payload: PayloadToken, type: TokenType): string {
    const expiresIn =
      type === 'access' ? ACCESS_EXPIRES_IN : REFRESH_EXPIRES_IN;

    const secret =
      type === 'access'
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET;

    return this.jwtService.sign({ payload }, { expiresIn, secret });
  }
}
