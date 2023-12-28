import validation from 'constants/validationMessages';
import success from 'constants/successMessages';
import exception from 'constants/exceptionMessages';
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Req,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { User } from 'modules/users/schemas/user.schema';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiRegisterUserResponse } from './helpers/ApiRegisterUserResponse';
import { ApiLoginUserResponse } from './helpers/ApiLoginUserResponse';
import { ApiValidationError } from 'helpers/ApiValidationError';
import { ApiResponse } from 'helpers/ApiResponse';
import { ApiError } from 'helpers/ApiError';
import { UserDataDto } from './dto/user-data.dto';
import { Request, Response } from 'express';
import { REFRESH_COOKIE_KEY, REFRESH_EXPIRES_IN } from 'constants/tokens';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as bcryptUtils from 'utils/bcrypt';

@ApiTags('Authentification')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('register')
  @ApiRegisterUserResponse(UserDataDto)
  @ApiBadRequestResponse({
    type: ApiValidationError,
    description: validation.VALIDATION_ERROR,
  })
  @ApiConflictResponse({
    type: ApiError,
    description: exception.CONFLICT_EMAIL_MSG,
  })
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<UserDataDto>> {
    const user = await this.authService.register(dto);
    const tokens = await this.authService.generateTokens({ email: dto.email });

    // save refresh token in cache
    const tokenHash = bcryptUtils.hash(tokens.refreshToken);
    this.cacheManager.set(REFRESH_COOKIE_KEY, tokenHash);

    // set httpOnly cookies to response header
    response.cookie(REFRESH_COOKIE_KEY, tokens.refreshToken, {
      expires: new Date(new Date().getTime() + REFRESH_EXPIRES_IN * 1000),
      httpOnly: true,
      secure: true,
    });

    return new ApiResponse(HttpStatus.CREATED, success.USER_REGISTER_MSG, {
      user,
      token: tokens.accessToken,
    });
  }

  @Post('login')
  @ApiLoginUserResponse(User)
  async login(@Body() dto: CreateUserDto): Promise<ApiResponse<User>> {
    const user = await this.authService.login(dto);
    return new ApiResponse(HttpStatus.OK, success.USER_LOGIN_MSG, user);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOkResponse({ type: String })
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies[REFRESH_COOKIE_KEY])
      console.log(request.cookies[REFRESH_COOKIE_KEY]);

    response.clearCookie(REFRESH_COOKIE_KEY);

    return new ApiResponse(HttpStatus.OK, success.USER_LOGOUT_MSG);
  }

  @Post('refresh')
  @ApiCreatedResponse({ type: String })
  async refresh() {}
}
